// View Elements
var popupContainer = document.getElementById("popup-container");
var logoutImg = document.getElementById("logout");
var usernameDisplay = document.getElementById("username-display");
var myOrdersBox = document.getElementById("my-orders");
var allOrdersBox = document.getElementById("all-orders");
var moreInformationBox = document.getElementById("more_information");

// Live Data
var loggedIn = new LiveData();
loggedIn.value = false;
var username = new LiveData();
username.value = undefined;

function login(un, pw) {
  let result = BackendAPI.login(un, pw);
  if(result != undefined) {
    if(result.success) {
      username.value = result.username;
      loggedIn.value = true;
    }
  }
}

function logout() {
  console.log(BackendAPI.logout());
  loggedIn.value = false;
  username.value = undefined;
}

function requestAllOrders() {
  let allOrders = BackendAPI.allOrders();

  allOrdersBox.innerHTML = "";

  for(let order of allOrders.orders) {
    allOrdersBox.appendChild(generateOrderBox(order));
  }

  console.log(allOrders);
}

function requestMyOrders() {
  let myOrders = BackendAPI.myOrders();

  myOrdersBox.innerHTML = "";

  for(let order of myOrders.orders) {
    myOrdersBox.appendChild(generateOrderBox(order));
  }

  console.log(BackendAPI.acceptedOffers());

  console.log(myOrders);
}

loggedIn.registerListener(function(newValue) {
  if(newValue) {
    popupContainer.innerHTML = "";
    popupChange();

    logoutImg.style.display = "block";

    requestAllOrders();
    requestMyOrders();
  } else {
    logoutImg.style.display = "none";

    let popup = UIBuilder.fromObject({
      type: 'div', class: 'popup',
      children: [
        {
          type: 'table',
          children: [
            {
              type: 'tr',
              children: [
                {
                  type: 'td',
                  content: 'Username:'
                },
                {
                  type: 'td',
                  children: [
                    {
                      type: 'input',
                      class: 'td-username',
                      input_type: 'text'
                    }
                  ]
                }
              ]
            },
            {
              type: 'tr',
              children: [
                {
                  type: 'td',
                  content: 'Password:'
                },
                {
                  type: 'td',
                  children: [
                    {
                      type: 'input',
                      class: 'td-password',
                      input_type: 'password'
                    }
                  ]
                }
              ]
            },
            {
              type: 'tr',
              children: [
                {
                  type: 'td',
                  children: [
                    {
                      type: 'button',
                      content: 'Login',
                      onclick: loginClick
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    });

    function loginClick() {
      login(popup.getElementsByClassName("td-username")[0].value, popup.getElementsByClassName("td-password")[0].value);
    }

    popupContainer.appendChild(popup);
    popupChange();
  }
});

username.registerListener(function(newValue) {
  console.log("userData listener called");

  usernameDisplay.innerHTML = newValue;
});

function generateOrderBox(userOrder) {
  let container = document.createElement("div");
  container.className = "order-box";

  let infoTable = document.createElement("table");

  let thRow = UIBuilder.fromObject({
    type: 'tr',
    children: [
      {
        type: 'th',
        content: 'Pokemon'
      },
      {
        type: 'th',
        content: 'User'
      },
      {
        type: 'th',
        content: 'Payment'
      }
    ]
  });
  infoTable.appendChild(thRow);

  let infoRow = UIBuilder.fromObject({
    type: 'tr',
    children: [
      {
        type: 'td',
        content: StringUtils.humanize(userOrder.pokemon_name)
      },
      {
        type: 'td',
        content: userOrder.username
      },
      {
        type: 'td',
        content: 10000 // TODO: implement price
      }
    ]
  });
  infoTable.appendChild(infoRow);

  container.appendChild(infoTable);

  let buttons = UIBuilder.fromObject({
    type: 'div',
    class: 'buttons'
  });

  if(userOrder.username !== username.value) {
    let makeOfferButton = UIBuilder.fromObject({
      type: 'button',
      content: 'Make offer',
      onclick: function() {
        let price = parseInt(window.prompt("Price offer"));
        if(!Number.isNaN(price)) {
          BackendAPI.makeOffer(userOrder.id, price);
        }
      }
    });
    buttons.appendChild(makeOfferButton);
  }

  if(userOrder.state === null && userOrder.offer_count > 0) {
    let allOffersButton = UIBuilder.fromObject({
      type: 'button',
      content: 'List all offers',
      onclick: function() {
        let dom = UIBuilder.fromObject({type: 'div'});
        let apiResponse = BackendAPI.allOffers(userOrder.id);
        console.log(apiResponse);
        for(let offer of apiResponse.offers) {
          dom.appendChild(UIBuilder.fromObject({
            type: 'div',
            content: offer.id + " " + offer.price + " " + offer.username,
            children: [{
              type: 'button',
              content: 'Accept',
              onclick: function() {
                BackendAPI.acceptOffer(userOrder.id, offer.id);
              }
            }]
          }));
        }
        createCloseablePopup(dom);
      }
    });
    buttons.appendChild(allOffersButton);
  }
  if(userOrder.state !== null && userOrder.state !== undefined) {
    let userOrderInfoButton = UIBuilder.fromObject({
      type: 'button',
      content: 'Show Info',
      onclick: function() {
        let orderInfo = BackendAPI.getOrderInfo(userOrder.id);
        showOrderInfo(orderInfo.order);
      }
    });
    buttons.appendChild(userOrderInfoButton);
  }

  container.appendChild(buttons);

  return container;
}

function popupChange() {
  let childCount = popupContainer.childElementCount;
  if(childCount > 0) {
    popupContainer.style.display = "flex";
  } else {
    popupContainer.style.display = "none";
  }
}

function createCloseablePopup(domElement) {
  let popup = UIBuilder.fromObject({
    type: 'div',
    class: 'popup'
  })
  popup.appendChild(domElement);
  popup.appendChild(UIBuilder.fromObject({
    type: 'img',
    class: 'close',
    src: 'icons/times-circle-solid.svg',
    onclick: function() {
      popupContainer.removeChild(popup);
      popupChange();
    }
  }));
  popupContainer.appendChild(popup);
  popupChange();
}

function createPopup(domElement) {
  let popup = UIBuilder.fromObject({
    type: 'div',
    class: 'popup'
  })
  popup.appendChild(domElement);
  popupContainer.appendChild(popup);
  popupChange();
}

function showOrderInfo(object) {
  moreInformationBox.innerHTML = "";
  let progressBar = new ProgressBar(['accepted', 'started', 'breeded', 'leveled', 'finished'], object.state);
  moreInformationBox.appendChild(progressBar.element);
  moreInformationBox.appendChild(UIBuilder.fromObject({
    type: 'span',
    content: 'Breeder: ' + object.breeder
  }));
  moreInformationBox.appendChild(UIBuilder.fromObject({
    type: 'span',
    content: 'Price: ' + object.price
  }));
}
