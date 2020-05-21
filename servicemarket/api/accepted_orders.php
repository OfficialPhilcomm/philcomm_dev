<?php
include 'general.php';

requireLogin();

$conn = new mysqli(db_host(), db_user(), db_pass(), db_name());

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$api_result = new stdClass();
$api_result->type = "accepted_orders";
$api_result->orders = array();

$stmt = $conn->prepare("select uo.ID as UserOrderID, u.Username as Username, uo.State as State from UserOrder uo
join Offer o on uo.AcceptedOfferID = o.ID
and o.UserID = ?
join User u on uo.UserID = u.ID");
$stmt->bind_param("i", getUserID());
$stmt->execute();

$result = $stmt->get_result();
while($row = $result->fetch_assoc()) {
  $order = new stdClass();
  $order->id = $row["UserOrderID"];
  $order->username = $row["Username"];
  $order->state = $row["State"];
  $api_result->orders[] = $order;
}

echo json_encode($api_result);

$stmt->close();

$conn->close();
