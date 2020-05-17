<?php
include 'general.php';

requireLogin();

$conn = new mysqli(db_host(), db_user(), db_pass(), db_name());

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "select * from Order";

$result = $conn->query($sql);
if($result->num_rows === 0) exit('No rows');
while($row = $result->fetch_assoc()) {
  echo $row['ID'];
}

$conn->close();
