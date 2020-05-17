<?php
include 'general.php';

requireLogin();

$body = json_decode(file_get_contents('php://input'));

$conn = new mysqli(db_host(), db_user(), db_pass(), db_name());

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$stmt = $conn->prepare("insert into OrderData (PokemonName, Gender, Move1, Move2, Move3, Move4, Ability)
values (?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sssssss", $body->pokemon_name, $body->gender, $body->move1, $body->move2, $body->move3, $body->move4, $body->ability);
$stmt->execute();

$userID = getUserID();
$orderDataID = $conn->insert_id;

$stmt = $conn->prepare("insert into UserOrder (UserID,OrderDataID) values (?, ?)");
$stmt->bind_param("ii", $userID, $orderDataID);
$stmt->execute();

$stmt->close();

$conn->close();
