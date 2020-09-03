<?php
include '../general.php';

$arguments['username'] = 'string';
$arguments['password'] = 'string';
$body = validateBody($arguments);

if(strlen($body->password) < 8) throwError("password must be 8 characters");

$conn = new mysqli(db_host(), db_user(), db_pass(), db_name());

if ($conn->connect_error) {
  throwError("db error");
}

$stmt = $conn->prepare("select ID from User where Username = ?");
$stmt->bind_param("s", $body->username);
$stmt->execute();
$resukt = $stmt->get_result();
if($result->num_rows === 1) throwError("username taken");

$stmt = $conn->prepare("insert into User (Username, Password, Activated) values (?, password(?), 1)");
$stmt->bind_param("ss", $body->username, $body->password);
$stmt->execute();
$result = $stmt->get_result();
if($result->num_rows === 0) throwError("no success");

/*$userID = $conn->insert_id;
$stmt = $conn->prepare("insert into UserActivation (UserID, RegistrationKey) values (?, uuid())");

$stmt->bind_param("i", $userID);
$stmt->execute();

$userActivationID = $conn->insert_id;

$stmt = $conn->prepare("select RegistrationKey from UserActivation
where ID = ? limit 1");

$stmt->bind_param("i", $userActivationID);
$stmt->execute();

$userActivationKey = "";

$result = $stmt->get_result();
while($row = $result->fetch_assoc()) {
  $userActivationKey = $row['RegistrationKey'];
}

$msg = "To activate your account, click the link below\n
https://philcomm.dev/servicemarket/api/auth/activate_user.php?activation_code=$userActivationKey";

// use wordwrap() if lines are longer than 70 characters
$msg = wordwrap($msg,70);

// send email
mail($body->email, "PokeMMO ServiceMarket Account Verification", $msg);*/

$stmt->close();

$conn->close();

$apiResponse = new stdClass();
$apiResponse->success = true;
exit(json_encode($apiResponse));
