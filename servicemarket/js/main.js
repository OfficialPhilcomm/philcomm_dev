var loginUsername = document.getElementById("login-username");
var loginPassword = document.getElementById("login-password");

var userData = new LiveData();
userData.value = false;

function login() {
  BackendAPI.login(loginUsername, loginPassword);
}
