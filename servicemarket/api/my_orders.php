<?php
include 'general.php';

requireLogin();

$conn = new mysqli(db_host(), db_user(), db_pass(), db_name());

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$api_result = new stdClass();
$api_result->type = "my_orders";
$api_result->orders = array();

$stmt = $conn->prepare("select uo.ID as ID, u.Username as Username from UserOrder uo
join User u on uo.UserID = ? and uo.UserID = u.ID");
$stmt->bind_param("i", getUserID());
$stmt->execute();

$result = $stmt->get_result();
if($result->num_rows === 0) exit('No rows');
while($row = $result->fetch_assoc()) {
  $order = new stdClass();
  $order->id = $row["ID"];
  $order->user_name = $row["Username"];
  $api_result->orders[] = $order;
}

echo json_encode($api_result);

$stmt->close();

$conn->close();
