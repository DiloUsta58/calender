<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

$year = isset($_GET['year']) ? (int)$_GET['year'] : 0;
$region = isset($_GET['region']) ? trim((string)$_GET['region']) : '';

if ($year < 2026 || $year > 2100 || $region === '') {
    http_response_code(400);
    echo json_encode(['error' => 'invalid_params']);
    exit;
}

$regionSlugMap = [
    'Baden-Württemberg' => 'baden-wuerttemberg',
    'Bayern' => 'bayern',
    'Berlin' => 'berlin',
    'Brandenburg' => 'brandenburg',
    'Bremen' => 'bremen',
    'Hamburg' => 'hamburg',
    'Hessen' => 'hessen',
    'Mecklenburg-Vorpommern' => 'mecklenburg-vorpommern',
    'Niedersachsen' => 'niedersachsen',
    'Nordrhein-Westfalen' => 'nordrhein-westfalen',
    'Rheinland-Pfalz' => 'rheinland-pfalz',
    'Saarland' => 'saarland',
    'Sachsen' => 'sachsen',
    'Sachsen-Anhalt' => 'sachsen-anhalt',
    'Schleswig-Holstein' => 'schleswig-holstein',
    'Thüringen' => 'thueringen'
];

if (!isset($regionSlugMap[$region])) {
    http_response_code(400);
    echo json_encode(['error' => 'invalid_region']);
    exit;
}

$targetSlug = $regionSlugMap[$region];
$url = "https://www.schulferien.org/deutschland/ferien/{$year}/";
$html = @file_get_contents($url);
if ($html === false || $html === '') {
    http_response_code(502);
    echo json_encode(['error' => 'source_unreachable']);
    exit;
}

libxml_use_internal_errors(true);
$dom = new DOMDocument();
$dom->loadHTML($html);
$xpath = new DOMXPath($dom);

$rows = $xpath->query("//table[contains(@class,'sf_table_responsive_block')]//tbody/tr");
if (!$rows || $rows->length === 0) {
    http_response_code(502);
    echo json_encode(['error' => 'source_parse_failed']);
    exit;
}

$rowNode = null;
foreach ($rows as $tr) {
    $a = $xpath->query(".//td[1]//a", $tr)->item(0);
    if (!$a instanceof DOMElement) {
        continue;
    }
    $href = (string)$a->getAttribute('href');
    if (strpos($href, "/deutschland/ferien/{$targetSlug}/") !== false) {
        $rowNode = $tr;
        break;
    }
}

if (!$rowNode) {
    http_response_code(404);
    echo json_encode(['error' => 'region_row_not_found']);
    exit;
}

$cells = $xpath->query(".//td[contains(@class,'land_ferien_termin')]", $rowNode);
if (!$cells || $cells->length < 6) {
    http_response_code(502);
    echo json_encode(['error' => 'cells_not_found']);
    exit;
}

$keys = ['winter', 'easter', 'pentecost', 'summer', 'autumn', 'christmas'];
$out = [
    'winter' => [],
    'easter' => [],
    'pentecost' => [],
    'summer' => [],
    'autumn' => [],
    'christmas' => []
];

for ($i = 0; $i < 6; $i++) {
    $text = trim((string)$cells->item($i)->textContent);
    $text = preg_replace('/\s+/', ' ', $text ?? '');
    $text = str_replace(["\xC2\xA0", '*'], [' ', ''], $text);
    $text = trim((string)$text);
    $out[$keys[$i]] = parseHolidayCell($text, $year);
}

echo json_encode([
    'source' => 'schulferien.org',
    'year' => $year,
    'region' => $region,
    'data' => $out
], JSON_UNESCAPED_UNICODE);

function parseHolidayCell(string $value, int $year): array {
    if ($value === '' || $value === '-' || stripos($value, 'keine') !== false) {
        return [];
    }

    $parts = preg_split('/\s*\+\s*/', $value) ?: [];
    $ranges = [];
    foreach ($parts as $part) {
        $part = trim($part);
        if ($part === '' || $part === '-') {
            continue;
        }
        $range = parseRangePart($part, $year);
        if ($range) {
            $ranges[] = $range;
        }
    }
    return $ranges;
}

function parseRangePart(string $part, int $defaultYear): ?array {
    if (preg_match('/(\d{1,2})\.(\d{1,2})\.(\d{4})?\s*-\s*(\d{1,2})\.(\d{1,2})\.(\d{4})?/', $part, $m)) {
        $sd = (int)$m[1];
        $sm = (int)$m[2];
        $sy = isset($m[3]) && $m[3] !== '' ? (int)$m[3] : $defaultYear;
        $ed = (int)$m[4];
        $em = (int)$m[5];
        if (isset($m[6]) && $m[6] !== '') {
            $ey = (int)$m[6];
        } else {
            $ey = ($em < $sm || ($em === $sm && $ed < $sd)) ? $sy + 1 : $sy;
        }
        return [iso($sy, $sm, $sd), iso($ey, $em, $ed)];
    }

    if (preg_match('/(\d{1,2})\.(\d{1,2})\.(\d{4})?/', $part, $m)) {
        $d = (int)$m[1];
        $mth = (int)$m[2];
        $y = isset($m[3]) && $m[3] !== '' ? (int)$m[3] : $defaultYear;
        $iso = iso($y, $mth, $d);
        return [$iso, $iso];
    }

    return null;
}

function iso(int $y, int $m, int $d): string {
    return sprintf('%04d-%02d-%02d', $y, $m, $d);
}

