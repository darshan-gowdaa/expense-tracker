<?php
header('Content-Type: application/json');

// Include your database connection
include 'db.php'; 

$user_id = 1;  // Replace with the actual user ID if needed

// Fetch transactions for the user
$query = "SELECT * FROM transactions WHERE user_id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

// Check if we have results
if ($result->num_rows > 0) {
    $transactions = [];
    while ($row = $result->fetch_assoc()) {
        $transactions[] = $row;
    }
    echo json_encode($transactions);
} else {
    echo json_encode([]);
}

$stmt->close();
$conn->close();
?>
