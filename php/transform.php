<?php

// Bindet das Skript extract.php für Rohdaten ein
$data = include('extract.php');

// Initialisiert ein Array, um die transformierten Daten zu speichern
$transformedData = [];

// Transformiert und fügt die notwendigen Informationen hinzu
foreach ($data['daily'] as $index => $day) {
    // Erstellt ein Datumsschlüssel für jede Datenreihe
    $dateKey = $day['time'];

    // Harmonisiert die Struktur für den Tagesdatensatz
    $transformedData[] = [
        'date' => $dateKey,
        'river_discharge' => $day['river_discharge'],
        'river_discharge_mean' => $day['river_discharge_mean'],
        'river_discharge_median' => $day['river_discharge_median'],
        'river_discharge_max' => $day['river_discharge_max'],
        'river_discharge_min' => $day['river_discharge_min'],
        'river_discharge_p25' => $day['river_discharge_p25'],
        'river_discharge_p75' => $day['river_discharge_p75']
    ];
}

// Kodiert die transformierten Daten in JSON
$jsonData = json_encode($transformedData, JSON_PRETTY_PRINT);

// Gibt die JSON-Daten zurück, anstatt sie auszugeben
return $jsonData;
?>