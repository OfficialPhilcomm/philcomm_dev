<?php
include '../general.php';

requireLogin();

$arguments['user_order_id'] = 'integer';
$body = validateBody($arguments);

$conn = new mysqli(db_host(), db_user(), db_pass(), db_name());

if ($conn->connect_error) {
  throwError("Internal error");
}

$api_result = new stdClass();
$api_result->type = "order_info";

$stmt = $conn->prepare("select 
uo.ID as UserOrderID, 
bu.ID as BuyerID,
bu.Username as BuyerName,
bu.ID as BuyerID,
uo.State,
uo.Finished,
uo.Closed,
od.*,
o.Price,
u.Username as BreederName,
u.ID as BreederID
from UserOrder uo
join OrderData od on uo.ID = ?
and uo.OrderDataID = od.ID
join User bu on uo.UserID = bu.ID
left join Offer o on uo.AcceptedOfferID = o.ID
left join User u on o.UserID = u.ID
where (uo.State is null or o.UserID = ? or o.UserID = ?)
and uo.Closed = 0");
$stmt->bind_param("iii", $body->user_order_id, getUserID(), getUserID());
$stmt->execute();

$result = $stmt->get_result();
if($result->num_rows === 0) throwError("no valid order found");
while($row = $result->fetch_assoc()) {
  $order = new stdClass();
  $order->user_order_id = $row["UserOrderID"];
  $order->is_my_order = ($row["BuyerID"] === getUserID() ? true : false);

  $order->state = $row["State"];
  if($row["BreederID"] === getUserID()) {
    $order->state_changeable = true;
    $order->finishable = (($order->state === 4 && $row["Finished"] === 0) ? true : false);
  }
  $order->finished = ($row["Finished"] === 1 ? true : false);
  if($row["BuyerID"] === getUserID()) {
    $order->closeable = (($row["Finished"] === 1 && $row["Closed"] === 0) ? true : false);
  }
  $order->closed = ($row["Closed"] === 1 ? true : false);
  $order->buyer = $row["BuyerName"];
  $order->breeder = $row["BreederName"];
  $order->price = $row["Price"];

  $order_data = new stdClass();
  $order_data->pokemon_name = $row["PokemonName"];
  $order_data->level = $row["Level"];
  $order_data->gender = $row["Gender"];
  $order_data->ability = $row["Ability"];
  
  $moves = new stdClass();
  $moves->move1 = $row["Move1"];
  $moves->move2 = $row["Move2"];
  $moves->move3 = $row["Move3"];
  $moves->move4 = $row["Move4"];
  $order_data->moves = $moves;

  $ivs = new stdClass();
  $ivs->iv_hp = $row["IVHP"];
  $ivs->iv_atk = $row["IVATK"];
  $ivs->iv_def = $row["IVDEF"];
  $ivs->iv_spatk = $row["IVSPATK"];
  $ivs->iv_spdef = $row["IVSPDEF"];
  $ivs->iv_spe = $row["IVSPE"];
  $order_data->ivs = $ivs;

  $evs = new stdClass();
  $evs->ev_hp = $row["EVHP"];
  $evs->ev_atk = $row["EVATK"];
  $evs->ev_def = $row["EVDEF"];
  $evs->ev_spatk = $row["EVSPATK"];
  $evs->ev_spdef = $row["EVSPDEF"];
  $evs->ev_spe = $row["EVSPE"];
  $order_data->evs = $evs;

  $order->order_data = $order_data;

  $api_result->order = $order;
}

echo json_encode($api_result);

$stmt->close();

$conn->close();
