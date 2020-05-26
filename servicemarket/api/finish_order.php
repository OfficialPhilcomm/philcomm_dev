<?php
include 'general.php';

requireLogin();

$arguments['user_order_id'] = 'integer';
$body = validateBody($arguments);

$conn = new mysqli(db_host(), db_user(), db_pass(), db_name());

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$stmt = $conn->prepare("select uo.ID from UserOrder uo
join Offer o on uo.AcceptedOfferID = o.ID
and o.UserID = ?
and uo.ID = ?
and uo.State = 4
and uo.Finished = 0
and uo.Closed = 0");
$stmt->bind_param("ii", getUserID(), $body->user_order_id);
$stmt->execute();
$result = $stmt->get_result();
if($result->num_rows === 0) throwError("no valid order found");

$stmt = $conn->prepare("update UserOrder
set Finished = 1 where ID = ?");

$stmt->bind_param("i", $body->user_order_id);
$stmt->execute();

$stmt->close();

$conn->close();
