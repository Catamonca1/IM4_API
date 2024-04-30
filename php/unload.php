<?php

// Datenbankkonfiguration einbinden
require_once 'config.php';

// Header setzen, um JSON-Inhaltstyp zurückzugeben
header('Content-Type: application/json');

try {
    // Erstellt eine neue PDO-Instanz mit der Konfiguration aus config.php
    $pdo = new PDO($dsn, $username, $password, $options);

    // SQL-Query, um Daten basierend auf dem Standort auszuwählen, sortiert nach Zeitstempel
    $sql = "SELECT * FROM RiverData ORDER BY date ASC";  // Sortierung hinzugefügt

    // Bereitet die SQL-Anweisung vor
    $stmt = $pdo->prepare($sql);

    // Führt die Abfrage aus
    $stmt->execute();

    // Holt alle passenden Einträge
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Erstellen eines neuen Arrays, das die Daten nach Datum organisiert
    $formattedResults = [];
    foreach ($results as $row) {
        // Verwendet das Datum als Schlüssel für das neue Array
        $date = $row['date']; // Annahme, dass 'date' der Spaltenname für das Datum ist
        if (!isset($formattedResults[$date])) {
            $formattedResults[$date] = [];
        }
        $formattedResults[$date][] = $row;
    }

    // Gibt die formatierten Ergebnisse im JSON-Format zurück
    echo json_encode($formattedResults);
} catch (PDOException $e) {
    // Gibt eine Fehlermeldung zurück, wenn etwas schiefgeht
    echo json_encode(['error' => $e->getMessage()]);
}
?>
