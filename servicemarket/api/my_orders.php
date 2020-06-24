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

$stmt = $conn->prepare("select uo.ID as UserOrderID, u.Username as Username, od.*, count(o.ID) as OfferCount, uo.State as State, uo.Finished as Finished from UserOrder uo
join User u on uo.UserID = ? and uo.UserID = u.ID
and uo.Closed = 0
join OrderData od on uo.OrderDataID = od.ID
left join Offer o on o.UserOrderID = uo.ID
group by uo.ID
order by uo.CreatedAt desc");
$stmt->bind_param("i", getUserID());
$stmt->execute();

$result = $stmt->get_result();
while($row = $result->fetch_assoc()) {
  $order = new stdClass();
  $order->id = $row["UserOrderID"];
  $order->username = $row["Username"];
  $order->finished = $row["Finished"];
  $order->pokemon_name = $row["PokemonName"];
  $order->level = $row["Level"];
  $order->offer_count = $row["OfferCount"];
  $order->state = $row["State"];
  $order->move1 = $row["Move1"];
  $order->move2 = $row["Move2"];
  $order->move3 = $row["Move3"];
  $order->move4 = $row["Move4"];
  $order->iv_hp = $row["IVHP"];
  $order->iv_atk = $row["IVATK"];
  $order->iv_def = $row["IVDEF"];
  $order->iv_spatk = $row["IVSPATK"];
  $order->iv_spdef = $row["IVSPDEF"];
  $order->iv_spe = $row["IVSPE"];
  $api_result->orders[] = $order;
}

echo json_encode($api_result);

$stmt->close();

$conn->close();
