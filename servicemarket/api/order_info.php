<?php
include 'general.php';

requireLogin();

$body = json_decode(file_get_contents('php://input'));

$conn = new mysqli(db_host(), db_user(), db_pass(), db_name());

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$api_result = new stdClass();
$api_result->type = "order_info";

$stmt = $conn->prepare("select uo.State as State, o.UserID as Breeder, o.Price as Price from UserOrder uo
join Offer o on uo.ID = ?
and uo.UserID = ?
and uo.AcceptedOfferID = o.ID");
$stmt->bind_param("ii", );
$stmt->execute();

$result = $stmt->get_result();
while($row = $result->fetch_assoc()) {
  $order = new stdClass();
  $order->state = $row["State"];
  $order->breeder = $row["Breeder"];
  $order->price = $row["Price"];
  $api_result->order = $order;
}

echo json_encode($api_result);

$stmt->close();

$conn->close();
