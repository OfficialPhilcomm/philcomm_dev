<?php
include 'general.php';

requireLogin();

$body = json_decode(file_get_contents('php://input'));
echo "asd " . implode(", ", get_object_vars($body));

$conn = new mysqli(db_host(), db_user(), db_pass(), db_name());

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$stmt = $conn->prepare("insert into OrderData (PokemonName, Gender, Move1, Move2, Move3, Move4, Ability)
values (?, ?, ?, ?, ?, ?, ?)");
echo $body->pokemon_name . "\n";
echo $body->gender . "\n";
echo $body->move1 . "\n";
echo $body->move2 . "\n";
echo $body->move3 . "\n";
echo $body->move4 . "\n";
echo $body->ability . "\n";
$stmt->bind_param("sssssss", $body->pokemon_name, $body->gender, $body->move1, $body->move2, $body->move3, $body->move4, $body->ability);
$stmt->execute();

echo $stmt->affected_rows . "\n";

$userID = getUserID();
$orderDataID = $conn->insert_id;

echo $userID . " asd " . $orderDataID;

$stmt = $conn->prepare("insert into UserOrder (UserID,OrderDataID) values (?, ?)");
$stmt->bind_param("ii", $userID, $orderDataID);
$stmt->execute();

$stmt->close();

$conn->close();
