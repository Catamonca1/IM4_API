<?php

function fetchWeatherData() {
    $url = "https://flood-api.open-meteo.com/v1/flood?latitude=51.9225&longitude=4.4792&daily=river_discharge,river_discharge_mean,river_discharge_median,river_discharge_max,river_discharge_min,river_discharge_p25,river_discharge_p75&past_days=1&forecast_days=1";

    // Initialisiert eine cURL-Sitzung
    $ch = curl_init($url);

    // Setzt Optionen
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    // Führt die cURL-Sitzung aus und erhält den Inhalt
    $response = curl_exec($ch);

    // Schließt die cURL-Sitzung
    curl_close($ch);

    // Dekodiert die JSON-Antwort und gibt Daten zurück
    return json_decode($response, true);
     //echo $response;
}

// Gibt die Daten zurück, wenn dieses Skript eingebunden ist
return fetchWeatherData();
?>