<?php
header('Content-Type: application/json');

// Include the database connection
include_once 'db.php';

// Get the raw POST data
$data = json_decode(file_get_contents("php://input"), true);

// Ensure required data is provided
if (isset($data['id'], $data['date'], $data['description'], $data['amount'], $data['type'], $data['user_id'])) {
    $transaction_id = $data['id'];
    $date = $data['date'];
    $description = $data['description'];
    $amount = $data['amount'];
    $type = $data['type'];
    $user_id = $data['user_id'];

    // Prepare the SQL query to update the transaction
    $query = "UPDATE transactions SET date = ?, description = ?, amount = ?, type = ?, user_id = ? WHERE id = ?";
    $stmt = $conn->prepare($query);

    // Bind the parameters
    $stmt->bind_param("ssdsii", $date, $description, $amount, $type, $user_id, $transaction_id);

    // Execute the statement
    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Transaction updated successfully.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Error updating the transaction.']);
    }

    // Close the statement
    $stmt->close();
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid data provided.']);
}

// Close the connection
$conn->close();
?>
