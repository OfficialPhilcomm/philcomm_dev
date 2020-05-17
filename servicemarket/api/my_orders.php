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

$stmt = $conn->prepare("
select uo.ID as ID, u.Username as Username from UserOrder uo on uo.UserID = ?
join User u on uo.UserID = u.ID");
$stmt->bind_param("i", getUserID());
$stmt->execute();

$result = $stmt->get_result();
if($result->num_rows === 0) exit('No rows');
$orders = array();
while($row = $result->fetch_assoc()) {
  $order->id = $row["ID"];
  $order->user_name = $row["Username"]
  array_push($orders, $order);
}
$api_result->orders = $orders;

echo json_encode($api_result);

$stmt->close();

$conn->close();
