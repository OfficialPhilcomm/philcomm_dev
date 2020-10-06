<?php
include '../general.php';

$arguments['id'] = 'string';
$body = validateBody($arguments);

$conn = new mysqli(db_host(), db_user(), db_pass(), db_name());

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$api_result = new stdClass();
$api_result->note = array();

$stmt = $conn->prepare("select * from Note where FrontID = ? limit 1");
$stmt->bind_param("s", $body->id);
$stmt->execute();

$result = $stmt->get_result();
if($result->num_rows === 0) throwError("note id not found");
while($row = $result->fetch_assoc()) {
  $api_result->note = $row["Note"];
}

echo json_encode($api_result);

$stmt->close();

$conn->close();
