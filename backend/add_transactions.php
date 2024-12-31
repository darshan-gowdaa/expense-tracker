<?php
header('Content-Type: application/json'); // Ensure JSON response

// Clear output buffer to prevent additional characters
ob_clean();

// Database connection details
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "expense_tracker";

// Establish connection to the database
$conn = new mysqli($servername, $username, $password, $dbname);

// Check if connection is successful
if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Database connection failed."]);
    exit();
}

// Get POST data
$date = $_POST['date'] ?? null;
$description = $_POST['description'] ?? null;
$amount = $_POST['amount'] ?? null;
$type = $_POST['type'] ?? null;
$user_id = $_POST['user_id'] ?? null;

// Validate input data
if (!$date || !$description || $amount === null || !$type || !$user_id) {
    echo json_encode(["status" => "error", "message" => "All fields are required."]);
    exit();
}

// SQL query to insert the transaction into the database
$sql = "INSERT INTO transactions (user_id, date, description, amount, type) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("issds", $user_id, $date, $description, $amount, $type);

// Execute the query and respond with success message
if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Transaction added successfully."]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to add transaction."]);
}

// Close the prepared statement and database connection
$stmt->close();
$conn->close();
?>
