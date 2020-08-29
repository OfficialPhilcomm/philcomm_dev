<?php
include 'general.php';

$arguments['username'] = 'string';
$body = validateBody($arguments);

$conn = new mysqli(db_host(), db_user(), db_pass(), db_name());

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$stmt = $conn->prepare("select ID from User where Username = ? limit 1");
$stmt->bind_param("s", $body->username);
$stmt->execute();

$result = $stmt->get_result();

$taken = false;

if($result->num_rows > 0) {
  $taken = true;
}

$api_response = new stdClass();
$api_response->taken = $success;
$api_response->username = $body->username;

$stmt->close();

$conn->close();

exit(json_encode($api_response));
