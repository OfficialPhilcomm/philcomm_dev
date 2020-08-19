<?php
include 'general.php';

$arguments['user'] = 'string';
$arguments['pass'] = 'string';
$body = validateBody($arguments);

$conn = new mysqli(db_host(), db_user(), db_pass(), db_name());

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$stmt = $conn->prepare("select ID,Username from User
where Username = ? and Password = password(?) and Activated = 1 limit 1");
$stmt->bind_param("ss", $body->user, $body->pass);
$stmt->execute();

$result = $stmt->get_result();

$success = false;
$username = "";
$userID = 0;

if($result->num_rows === 0) {
  throwError("invalid login");
} else {
  while($row = $result->fetch_assoc()) {
    $success = true;
    $username = $row['Username'];
    $userID = $row['ID'];
  }
}

$stmt = $conn->prepare("insert into AccessToken(Token,UserID) values
(uuid(),?)");
$stmt->bind_param("i", $userID);
$stmt->execute();

$tokenID = $conn->insert_id;
$stmt = $conn->prepare("select Token from AccessToken
where ID = ?
limit 1");
$stmt->bind_param("i", $tokenID);
$stmt->execute();

$result = $stmt->get_result();

$token = "";

if($result->num_rows === 0) {
  throwError("api token seems to not be created");
} else {
  while($row = $result->fetch_assoc()) {
    $token = $row['Token'];
  }
}

$api_response = new stdClass();
$api_response->success = $success;
if($success) {
  $api_response->username = $username;
  $api_response->auth_token = $token;
}
exit(json_encode($api_response));

$stmt->close();

$conn->close();
