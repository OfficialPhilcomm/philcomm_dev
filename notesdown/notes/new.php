<?php
include '../general.php';

$arguments['note'] = 'string';
$body = validateBody($arguments);

$conn = new mysqli(db_host(), db_user(), db_pass(), db_name());

if ($conn->connect_error) {
  throwError("db error");
}

$uuid = "";

$stmt = $conn->prepare("select uuid() as uuid");
$stmt->execute();

$result = $stmt->get_result();
while($row = $result->fetch_assoc()) {
  $uuid = $row["uuid"];
}

$stmt = $conn->prepare("insert into Note (FrontID,Note) values (?, ?)");
echo $stmt->error;
$stmt->bind_param("ss", $uuid, $body->note);
$stmt->execute();

$stmt->close();

$conn->close();

$api_response = new stdClass();
$api_response->success = true;
$api_response->uuid = $uuid;
exit(json_encode($api_response));
