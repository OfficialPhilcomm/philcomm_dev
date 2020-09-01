<?php
include '../general.php';

// $arguments['email'] = 'string';
// $arguments['username'] = 'string';
// $arguments['password'] = 'string';
// $body = validateBody($arguments);
$body = new stdClass();
$body->email = "tester@philcomm.dev";
$body->username = 'testuser123';
$body->password = "t";

$conn = new mysqli(db_host(), db_user(), db_pass(), db_name());

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$stmt = $conn->prepare("insert into User (Email, Username, Password) values (?, ?, password(?))");
$stmt->bind_param("sss", $body->email, $body->username, $body->password);
$stmt->execute();
$result = $stmt->get_result();
if($result->num_rows === 0) throwError("no success");

$userID = $conn->insert_id;
echo "UserID: ".$userID."\n";
$stmt = $conn->prepare("insert into UserActivation (UserID, RegistrationKey) values (?, uuid())");

$stmt->bind_param("i", $userID);
$stmt->execute();

$userActivationID = $conn->insert_id;
echo "UserActivationID: ".$userActivationID."\n";

$stmt = $conn->prepare("select RegistrationKey from UserActivation
where ID = ? limit 1");

$stmt->bind_param("i", $userActivationID);
$stmt->execute();

$userActivationKey = "";

$result = $stmt->get_result();
while($row = $result->fetch_assoc()) {
  $userActivationKey = $row['RegistrationKey'];
}

echo "Key: ".$userActivationKey."\n";

$msg = "To activate your account, click the link below\n
https://philcomm.dev/servicemarket/api/activate_user.php?activation_code=$userActivationKey";

echo $msg;


// use wordwrap() if lines are longer than 70 characters
$msg = wordwrap($msg,70);

// send email
mail($body->email, "PokeMMO ServiceMarket Account Verification", $msg);

$stmt->close();

$conn->close();

$apiResponse = new stdClass();
$apiResponse->success = true;
exit(json_encode($apiResponse));
