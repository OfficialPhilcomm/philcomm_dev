<?php
include 'general.php';

requireLogin();

$arguments['user_order_id'] = 'integer';
$body = validateBody($arguments);

$conn = new mysqli(db_host(), db_user(), db_pass(), db_name());

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$api_result = new stdClass();
$api_result->type = "order_info";

$stmt = $conn->prepare("select
uo.ID as UserOrderID,
u.Username as Username,
uo.State as State,
o.Price as Price,
od.PokemonName as PokemonName
from UserOrder uo
join Offer o on uo.AcceptedOfferID = o.ID
and uo.ID = ?
and o.UserID = ?
join User u on uo.UserID = u.ID
join OrderData od on uo.OrderDataID = od.ID");
$stmt->bind_param("ii", $body->user_order_id, getUserID());
$stmt->execute();

$result = $stmt->get_result();
if($result->num_rows === 0) throwError("no valid order found");
while($row = $result->fetch_assoc()) {
  $order = new stdClass();
  $order->user_order_id = $row["UserOrderID"];
  $order->username = $row["Username"];
  $order->state = $row["State"];
  $order->price = $row["Price"];
  $order->pokemon_name = $row["PokemonName"];
  $api_result->order = $order;
}

echo json_encode($api_result);

$stmt->close();

$conn->close();
