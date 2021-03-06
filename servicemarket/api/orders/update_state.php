<?php
include '../general.php';

requireLogin();

$arguments['user_order_id'] = 'integer';
$arguments['state'] = 'integer';
$body = validateBody($arguments);

$conn = new mysqli(db_host(), db_user(), db_pass(), db_name());

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$stmt = $conn->prepare("select uo.ID from UserOrder uo
join Offer o on uo.AcceptedOfferID = o.ID
and o.UserID = ?
and uo.ID = ?
and uo.Finished = 0");
$stmt->bind_param("ii", getUserID(), $body->user_order_id);
$stmt->execute();
$result = $stmt->get_result();
if($result->num_rows === 0) throwError("no valid order found");

if(gettype($body->state) !== 'integer') throwError("state must be integer");
if($body->state < 0 || $body->state > 4) throwError("state must be between 0 and 4");

$stmt = $conn->prepare("update UserOrder
set State = ? where ID = ?");

$stmt->bind_param("ii", $body->state, $body->user_order_id);
$stmt->execute();
$result = $stmt->get_result();
if($result->num_rows === 0) throwError("update failed");

$api_result = new stdClass();
$api_result->type = "update_state";
$api_result->success = true;
echo json_encode($api_result);

$stmt->close();

$conn->close();
