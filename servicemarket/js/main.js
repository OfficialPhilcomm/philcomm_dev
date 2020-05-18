var loginUsername = document.getElementById("login-username");
var loginPassword = document.getElementById("login-password");
var logoutImg = document.getElementById("logout");
var usernameDisplay = document.getElementById("username-display");

var loggedIn = new LiveData();
loggedIn.value = false;
var username = new LiveData();
username.value = undefined;

function login() {
  let result = BackendAPI.login(loginUsername.value, loginPassword.value);
  if(result != undefined) {
    if(result.success) {
      loggedIn.value = false;
      username.value = result.username;
    }
  }
}

username.registerListener(function(newValue) {
  console.log("userData listener called");

  usernameDisplay.innerHTML = newValue;
});

function logout() {
  console.log(BackendAPI.logout());
}
