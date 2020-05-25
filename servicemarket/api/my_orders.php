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

$stmt = $conn->prepare("select uo.ID as ID, u.Username as Username, od.PokemonName as PokemonName, od.Level as Level, count(o.ID) as OfferCount, uo.State as State from UserOrder uo
join User u on uo.UserID = ? and uo.UserID = u.ID
join OrderData od on uo.OrderDataID = od.ID
left join Offer o on o.UserOrderID = uo.ID
group by ID
order by uo.CreatedAt desc");
$stmt->bind_param("i", getUserID());
$stmt->execute();

$result = $stmt->get_result();
while($row = $result->fetch_assoc()) {
  $order = new stdClass();
  $order->id = $row["ID"];
  $order->username = $row["Username"];
  $order->pokemon_name = $row["PokemonName"];
  $order->level = $row["Level"];
  $order->offer_count = $row["OfferCount"];
  $order->state = $row["State"];
  $api_result->orders[] = $order;
}

echo json_encode($api_result);

$stmt->close();

$conn->close();
