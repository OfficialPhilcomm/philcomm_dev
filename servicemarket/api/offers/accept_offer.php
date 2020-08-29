<?php
include '../general.php';

requireLogin();

$arguments['user_order_id'] = 'integer';
$arguments['offer_id'] = 'integer';
$body = validateBody($arguments);

$conn = new mysqli(db_host(), db_user(), db_pass(), db_name());

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$stmt = $conn->prepare("select o.ID from UserOrder uo
join Offer o on uo.ID = ?
and uo.UserID = ?
and uo.AcceptedOfferID is null
and uo.ID = o.UserOrderID
and o.ID = ?");
$stmt->bind_param("iii", $body->user_order_id, getUserID(), $body->offer_id);
$stmt->execute();
$result = $stmt->get_result();
if($result->num_rows === 0) throwError("no valid order found");

$user_order_id = $body->user_order_id;
$offer_id = $body->offer_id;

$stmt = $conn->prepare("update UserOrder
set AcceptedOfferID = ?, State = 0 where ID = ?");

$stmt->bind_param("ii", $offer_id, $user_order_id);
$stmt->execute();

$stmt->close();

$conn->close();
