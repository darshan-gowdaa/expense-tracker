<?php
header('Content-Type: application/json');

// Include the database connection
include_once 'db.php';

// Get the transaction ID from the URL query string
$transaction_id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($transaction_id > 0) {
    // Prepare and execute the SQL query to delete the transaction
    $query = "DELETE FROM transactions WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('i', $transaction_id);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Transaction deleted successfully.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Error deleting the transaction.']);
    }

    $stmt->close();
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid transaction ID.']);
}

$conn->close();
?>
