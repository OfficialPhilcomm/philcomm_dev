<?php
include 'general.php';

requireLogin();

$arguments['user_order_id'] = 'integer';
$body = validateBody($arguments);

$conn = new mysqli(db_host(), db_user(), db_pass(), db_name());

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$stmt = $conn->prepare("select ID from UserOrder
where ID = ?
and UserID = ?
and AcceptedOfferID is not null
and Finished = 1");
$stmt->bind_param("ii", $body->user_order_id, getUserID());
$stmt->execute();
$result = $stmt->get_result();
if($result->num_rows === 0) throwError("no valid order found");

$stmt = $conn->prepare("update UserOrder
set Closed = 1, where ID = ?");

$stmt->bind_param("i", $body->user_order_id);
$stmt->execute();

$stmt->close();

$conn->close();
