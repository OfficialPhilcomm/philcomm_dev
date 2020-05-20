<?php
include 'general.php';

requireLogin();

$conn = new mysqli(db_host(), db_user(), db_pass(), db_name());

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$api_result = new stdClass();
$api_result->type = "all_orders";
$api_result->orders = array();

$stmt = $conn->prepare("select uo.ID as ID, u.Username as Username, od.PokemonName as PokemonName from UserOrder uo
join User u on uo.UserID = u.ID
and uo.AcceptedOfferID is null
join OrderData od on uo.OrderDataID = od.ID
order by uo.CreatedAt desc");
$stmt->bind_param("i", getUserID());
$stmt->execute();

$result = $stmt->get_result();
while($row = $result->fetch_assoc()) {
  $order = new stdClass();
  $order->id = $row["ID"];
  $order->username = $row["Username"];
  $order->pokemon_name = $row["PokemonName"];
  $api_result->orders[] = $order;
}

echo json_encode($api_result);

$stmt->close();

$conn->close();
