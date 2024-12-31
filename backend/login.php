<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Database connection
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "expense_tracker";  // Make sure this is your database name

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Check if the email and password match a user in the database
    $sql = "SELECT * FROM users WHERE email='$email' AND password='$password'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // User found, log in
        session_start();
        $user = $result->fetch_assoc();
        $_SESSION['user_id'] = $user['id']; // Store user ID in session
        $_SESSION['email'] = $email;

        // Redirect to the login page with success message
        header("Location: ../frontend/userLogin.html?login_success=success");
        exit();
    } else {
        // Incorrect credentials, redirect with error
        header("Location: ../frontend/userLogin.html?login_error=Invalid credentials");
        exit();
    }

    $conn->close();
}
?>