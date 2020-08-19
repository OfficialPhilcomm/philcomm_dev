<?php
include 'general.php';

$arguments['auth_token'] = 'string';
$body = validateBody($arguments);

$api_response = new stdClass();

$conn = new mysqli(db_host(), db_user(), db_pass(), db_name());

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$stmt = $conn->prepare("select at.ID, u.Username from AccessToken at
join User u on at.Token = ?
and at.CreatedAt > NOW() - INTERVAL 1 DAY
limit 1");
$stmt->bind_param("s", $body->auth_token);
$stmt->execute();

$result = $stmt->get_result();

$tokenValid = false;
$username = "";

if($result->num_rows !== 0) {
  while($row = $result->fetch_assoc()) {
    $tokenValid = true;
    $username = $row['Username'];
  }
}

$api_response->token_valid = $tokenValid;
if($tokenValid) {
  $api_response->username = $username;
}

exit(json_encode($api_response));
