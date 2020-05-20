<?php
include 'general.php';

requireLogin();

$body = json_decode(file_get_contents('php://input'));

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
set AcceptedOfferID = ?, State = 'started' where ID = ?");

$stmt->bind_param("ii", $offer_id, getUserID(), $user_order_id);
$stmt->execute();

$stmt->close();

$conn->close();
