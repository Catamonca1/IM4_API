<?php

// Assumes extract.php returns the full JSON structure as an associative array
$data = include('extract.php');

// Initialize an array to store the transformed data
$transformedData = [];

// Check if the 'daily' key and sub-keys exist before trying to access them
if (isset($data['daily']) && is_array($data['daily']['time'])) {
    // Loop through the 'time' array which contains the dates
    foreach ($data['daily']['time'] as $index => $date) {
        // Ensure that each data type has an entry at the current index
        if (isset($data['daily']['river_discharge'][$index])) {
            // Create a new entry for each day with all associated data
            $transformedData[] = [
                'date' => $date,
                'river_discharge' => $data['daily']['river_discharge'][$index],
                'river_discharge_mean' => $data['daily']['river_discharge_mean'][$index],
                'river_discharge_median' => $data['daily']['river_discharge_median'][$index],
                'river_discharge_max' => $data['daily']['river_discharge_max'][$index],
                'river_discharge_min' => $data['daily']['river_discharge_min'][$index],
                'river_discharge_p25' => $data['daily']['river_discharge_p25'][$index],
                'river_discharge_p75' => $data['daily']['river_discharge_p75'][$index]
            ];
        }
    }
}

// Encode the transformed data into JSON with pretty printing
$jsonData = json_encode($transformedData, JSON_PRETTY_PRINT);

// Return the JSON data instead of outputting it
return $jsonData;
?>
