<?php
include 'general.php';

$body = json_decode(file_get_contents('php://input'));

$conn = new mysqli(db_host(), db_user(), db_pass(), db_name());

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$stmt = $conn->prepare("select ID,Username from User
where Username = ? and Password = password(?) limit 1");
$stmt->bind_param("ss", $body->user, $body->pass);
$stmt->execute();

$result = $stmt->get_result();

$success = false;

if($result->num_rows !== 0) {
  while($row = $result->fetch_assoc()) {
    $success = true;
    $_SESSION['valid_login'] = true;
    $_SESSION['user_id'] = $row['ID'];
    echo $row['ID'] . "\n";
    $_SESSION['username'] = $row['Username'];
  }
}

$api_response = new stdClass();
$api_response->success = $success;
if($success) {
  $api_response->username = $_SESSION['username'];
}
exit(json_encode($api_response));

$stmt->close();

$conn->close();
