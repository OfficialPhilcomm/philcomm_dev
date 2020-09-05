<?php
include '../general.php';

requireLogin();

$conn = new mysqli(db_host(), db_user(), db_pass(), db_name());

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$api_result = new stdClass();
$api_result->type = "all_orders";
$api_result->orders = array();

$stmt = $conn->prepare("select
uo.ID as OrderID,
u.Username as Username,
u.ID as UserID,
od.*,
o.Price as OfferedPrice,
o.DaysNeeded,
from UserOrder uo
join User u on uo.UserID = u.ID
and uo.AcceptedOfferID is null
join OrderData od on uo.OrderDataID = od.ID
left join Offer o on o.UserOrderId = uo.ID 
and o.UserID = ?
order by uo.CreatedAt desc");
$stmt->bind_param("i", getUserID());
$stmt->execute();

$result = $stmt->get_result();
while($row = $result->fetch_assoc()) {
  $order = new stdClass();
  $order->id = $row["OrderID"];
  $order->username = $row["Username"];
  $order->is_my_order = (($row["UserID"] === getUserID()) ? true : false);
  $order->offer_possible = (($row["UserID"] !== getUserID()) ? true : false);
  $order->pokemon_name = $row["PokemonName"];
  $order->level = $row["Level"];
  $order->nature = $row["Nature"];
  $order->ability = $row["Ability"];
  if($row["OfferedPrice"] !== null) {
    $my_offer = new stdClass();
    $my_offer->price = $row["OfferedPrice"];
    $my_offer->days_needed = $row["DaysNeeded"];
    $order->my_offer = $my_offer;
  }
  $order->item = $row["Item"];
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
