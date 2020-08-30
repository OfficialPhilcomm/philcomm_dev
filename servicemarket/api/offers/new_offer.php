<?php
include '../general.php';

requireLogin();

$arguments['user_order_id'] = 'integer';
$arguments['price'] = 'integer';
$body = validateBody($arguments);

$conn = new mysqli(db_host(), db_user(), db_pass(), db_name());

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$stmt = $conn->prepare("select ID from UserOrder
where ID = ?
and UserID != ?
and AcceptedOfferID is null");
$stmt->bind_param("ii", $body->user_order_id, getUserID());
$stmt->execute();
$result = $stmt->get_result();
if($result->num_rows === 0) throwError("no valid order found");

$stmt = $conn->prepare("insert into Offer (Price,UserID,UserOrderID) values (?, ?, ?)");
$stmt->bind_param("iii", $body->price, getUserID(), $body->user_order_id);
$stmt->execute();

$stmt->close();

$conn->close();