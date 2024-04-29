<?php

// Include the transformation script, which is expected to return a JSON string
$jsonData = include('transform.php');

// Decode the JSON data into an associative array
$dataArray = json_decode($jsonData, true);

require_once 'config.php'; // Includes the database configuration

$pdo = null; // Initialize the PDO object to null to handle exceptions before creation

try {
    // Create a new PDO instance using the configuration from config.php
    $pdo = new PDO($dsn, $username, $password, $options);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // SQL query with named placeholders for inserting data
    $sql = "INSERT INTO RiverData (
        date, 
        river_discharge, 
        river_discharge_mean, 
        river_discharge_median, 
        river_discharge_max, 
        river_discharge_min, 
        river_discharge_p25, 
        river_discharge_p75
    ) VALUES (
        :date, 
        :river_discharge, 
        :river_discharge_mean, 
        :river_discharge_median, 
        :river_discharge_max, 
        :river_discharge_min, 
        :river_discharge_p25, 
        :river_discharge_p75
    )";

    // Prepare the SQL statement
    $stmt = $pdo->prepare($sql);

    // Begin a transaction
    $pdo->beginTransaction();

    // Insert each element in the array into the database
    foreach ($dataArray as $item) {
        $stmt->execute([
            ':date' => $item['date'],
            ':river_discharge' => $item['river_discharge'],
            ':river_discharge_mean' => $item['river_discharge_mean'],
            ':river_discharge_median' => $item['river_discharge_median'],
            ':river_discharge_max' => $item['river_discharge_max'],
            ':river_discharge_min' => $item['river_discharge_min'],
            ':river_discharge_p25' => $item['river_discharge_p25'],
            ':river_discharge_p75' => $item['river_discharge_p75']
        ]);
    }

    // Commit the transaction
    $pdo->commit();

    echo "Data successfully inserted.";
} catch (PDOException $e) {
    // Roll back the transaction in case of an error
    if ($pdo) {
        $pdo->rollBack();
    }
    die("Database connection failed: " . $e->getMessage());
}
?>
