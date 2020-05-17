<?php
include 'general.php';

requireLogin();

$conn = new mysqli(db_host(), db_user(), db_pass(), db_name());

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$stmt = $conn->prepare("select * from UserOrder where UserID = ?");
$stmt->bind_param("i", getUserID());
$stmt->execute();

$result = $stmt->get_result();
if($result->num_rows === 0) exit('No rows');
while($row = $result->fetch_assoc()) {
  echo $row['ID'] . "\n";
}

$stmt->close();

$conn->close();
