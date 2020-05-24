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

$stmt = $conn->prepare("select
uo.ID as ID,
u.Username as Username,
od.PokemonName as PokemonName,
od.Move1 as Move1,
od.Move1 as Move2,
od.Move1 as Move3,
od.Move1 as Move4,
od.IVHP as IVHP,
od.IVATK as IVATK,
od.IVDEF as IVDEF,
od.IVSPATK as IVSPATK,
od.IVSPDEF as IVSPDEF,
od.IVSPE as IVSPE,
od.EVHP as EVHP,
od.EVATK as EVATK,
od.EVDEF as EVDEF,
od.EVSPATK as EVSPATK,
od.EVSPDEF as EVSPDEF,
od.EVSPE as EVSPE
from UserOrder uo
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
  $order->ev_hp = $row["EVHP"];
  $order->ev_atk = $row["EVATK"];
  $order->ev_def = $row["EVDEF"];
  $order->ev_spatk = $row["EVSPATK"];
  $order->ev_spdef = $row["EVSPDEF"];
  $order->ev_spe = $row["EVSPE"];
  $api_result->orders[] = $order;
}

echo json_encode($api_result);

$stmt->close();

$conn->close();
