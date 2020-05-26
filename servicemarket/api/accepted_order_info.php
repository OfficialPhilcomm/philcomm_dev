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
uo.Finished as Finished,
o.Price as Price,
od.PokemonName as PokemonName,
od.Level as Level,
od.Move1 as Move1,
od.Move2 as Move2,
od.Move3 as Move3,
od.Move4 as Move4,
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
  if($order->state === 4 && $row["Finished"] === 0) {
    $order->finishable = true;
  } else {
    $order->finished = false;
  }
  $order->price = $row["Price"];
  $order->pokemon_name = $row["PokemonName"];
  $order->level = $row["Level"];
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
  $api_result->order = $order;
}

echo json_encode($api_result);

$stmt->close();

$conn->close();
