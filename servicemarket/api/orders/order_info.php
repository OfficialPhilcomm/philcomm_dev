<?php
include '../general.php';

requireLogin();

$arguments['user_order_id'] = 'integer';
$body = validateBody($arguments);

$conn = new mysqli(db_host(), db_user(), db_pass(), db_name());

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$api_result = new stdClass();
$api_result->type = "order_info";

$stmt = $conn->prepare("select uo.ID as UserOrderID, od.PokemonName as PokemonName, od.Level as Level, uo.State as State, uo.Finished as Finished, uo.Closed as Closed, u.Username as Breeder, o.Price as Price from UserOrder uo
join Offer o on uo.ID = ?
and uo.UserID = ?
and uo.AcceptedOfferID = o.ID
join User u on o.UserID = u.ID
join OrderData od on uo.OrderDataID = od.id");
$stmt->bind_param("ii", $body->user_order_id, getUserID());
$stmt->execute();

$result = $stmt->get_result();
if($result->num_rows === 0) throwError("no valid order found");
while($row = $result->fetch_assoc()) {
  $order = new stdClass();
  $order->user_order_id = $row["UserOrderID"];
  $order->pokemon_name = $row["PokemonName"];
  $order->level = $row["Level"];
  $order->state = $row["State"];
  $order->finished = ($row["Finished"] === 1 ? true : false);
  $order->closeable = (($row["Finished"] === 1 && $row["Closed"] === 0) ? true : false);
  $order->closed = ($row["Closed"] === 1 ? true : false);
  $order->breeder = $row["Breeder"];
  $order->price = $row["Price"];
  $api_result->order = $order;
}

echo json_encode($api_result);

$stmt->close();

$conn->close();
