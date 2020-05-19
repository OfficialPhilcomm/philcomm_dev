// View Elements
var loginContainer = document.getElementById("login-container");
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
      loggedIn.value = true;
      username.value = result.username;
    }
  }
}

loggedIn.registerListener(function(newValue) {
  if(newValue) {
    logoutImg.style.display = "block";

    loginContainer.style.display = "none";
  } else {
    logoutImg.style.display = "none";

    loginContainer.style.display = "flex";
  }
});

username.registerListener(function(newValue) {
  console.log("userData listener called");

  usernameDisplay.innerHTML = newValue;
});

function logout() {
  console.log(BackendAPI.logout());
}
