<?php
include 'general.php';

$arguments['username'] = 'string';
$arguments['password'] = 'string';
$body = validateBody($arguments);

$conn = new mysqli(db_host(), db_user(), db_pass(), db_name());

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$stmt = $conn->prepare("insert into User (Username, Password) values (?, password(?))");
$stmt->bind_param("ii", $body->username, $body->password);
$stmt->execute();
$result = $stmt->get_result();
if($result->num_rows === 0) throwError("no success");
$stmt->close();

$conn->close();

$apiResponse = new stdClass();
$apiResponse->success = true;
exit(json_encode($apiResponse));
