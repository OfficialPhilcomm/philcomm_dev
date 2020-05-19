// View Elements
var loginContainer = document.getElementById("login-container");
var loginUsername = document.getElementById("login-username");
var loginPassword = document.getElementById("login-password");
var logoutImg = document.getElementById("logout");
var usernameDisplay = document.getElementById("username-display");
var myOrdersBox = document.getElementById("my-orders");

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

function logout() {
  console.log(BackendAPI.logout());
  loggedIn.value = false;
  username.value = undefined;
}

function requestMyOrders() {
  let myOrders = BackendAPI.myOrders();

  for(let order of myOrders.orders) {
    myOrdersBox.appendChild(generateOrderBox(order));
  }

  console.log(myOrders);
}

loggedIn.registerListener(function(newValue) {
  if(newValue) {
    logoutImg.style.display = "block";

    loginContainer.style.display = "none";

    requestMyOrders();
  } else {
    logoutImg.style.display = "none";

    loginContainer.style.display = "flex";
  }
});

username.registerListener(function(newValue) {
  console.log("userData listener called");

  usernameDisplay.innerHTML = newValue;
});

function generateOrderBox(userOrder) {
  let container = document.createElement("div");
  container.className = "order-box";

  let spriteImg = document.createElement("img");
  spriteImg.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/2000px-Placeholder_no_text.svg.png"; // TODO: Add sprite
  container.appendChild(spriteImg);

  let infoDiv = document.createElement("div");
  infoDiv.innerHTML = "username: " + userOrder.username;
  container.appendChild(infoDiv);

  return container;
}
