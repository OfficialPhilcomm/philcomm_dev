<?php
include '../general.php';

$arguments['note'] = 'string';
$body = validateBody($arguments);

$conn = new mysqli(db_host(), db_user(), db_pass(), db_name());

if ($conn->connect_error) {
  throwError("db error");
}
$stmt = $conn->prepare("insert into Note (FrontID,Note) values (uuid(), ?)");
echo $stmt->error;
$stmt->bind_param("s", $body->note);
$stmt->execute();

$stmt->close();

$conn->close();

$api_response = new stdClass();
$api_response->success = true;
exit(json_encode($api_response));