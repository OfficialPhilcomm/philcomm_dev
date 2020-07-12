<?php
include 'general.php';

$activation_code = $_GET['activation_code'];

$conn = new mysqli(db_host(), db_user(), db_pass(), db_name());

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$stmt = $conn->prepare("select ua.ID as UserActivationID, u.ID as UserID from UserActivation ua
join User u on ua.RegistrationKey = ?
and ua.UserID = u.ID
and u.Activated = 0
limit 1");
$stmt->bind_param("i", $activation_code);
$stmt->execute();
$result = $stmt->get_result();
if($result->num_rows === 0) throwError("no valid user");

$userActivationID = 0;
$userID = 0;

$result = $stmt->get_result();
while($row = $result->fetch_assoc()) {
  $userActivationID = $row['UserActivationID'];
  $userID = $row['UserID'];
}

// activate user

$stmt = $conn->prepare("update User
set Activated = 1 where ID = ?");

$stmt->bind_param("i", $userID);
$stmt->execute();

// delete user activation

$stmt = $conn->prepare("delete from UserActivation
where ID = ?");

$stmt->bind_param("i", $userActivationID);
$stmt->execute();

$stmt->close();

$conn->close();
