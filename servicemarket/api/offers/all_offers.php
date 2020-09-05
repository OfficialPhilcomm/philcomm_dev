<?php
include '../general.php';

requireLogin();

$arguments['user_order_id'] = 'integer';
$body = validateBody($arguments);

$conn = new mysqli(db_host(), db_user(), db_pass(), db_name());

if ($conn->connect_error) {
  throwError("connection error");
}

$api_result = new stdClass();
$api_result->type = "all_offers";
$api_result->offers = array();

$stmt = $conn->prepare("select o.ID as OfferID, o.Price as Price, o.DaysNeeded, u.Username as Username from UserOrder uo
join Offer o on uo.ID = ?
and uo.UserID = ?
and o.UserOrderID = uo.ID
and uo.AcceptedOfferID is null
join User u on u.ID = o.UserID
order by o.CreatedAt desc");
$stmt->bind_param("ii", $body->user_order_id, getUserID());
$stmt->execute();

$result = $stmt->get_result();
while($row = $result->fetch_assoc()) {
  $offer = new stdClass();
  $offer->id = $row["OfferID"];
  $offer->price = $row["Price"];
  $offer->days_needed = $row["DaysNeeded"];
  $offer->username = $row["Username"];
  $api_result->offers[] = $offer;
}

echo json_encode($api_result);

$stmt->close();

$conn->close();
