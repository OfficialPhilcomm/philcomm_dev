// View Elements
var popupContainer = document.getElementById("popup-container");
var logoutImg = document.getElementById("logout");
var usernameDisplay = document.getElementById("username-display");
var myOrdersBox = document.getElementById("my-orders");
var allOrdersBox = document.getElementById("all-orders");
var moreInformationBox = document.getElementById("more_information");

var pokemonList = PokemonAPI.requestPokemonNames();

// Live Data
var loggedIn = new LiveData();
loggedIn.value = false;
var username = new LiveData();
username.value = undefined;
requestLoginStatus();

function requestLoginStatus() {
  let loginStatus = BackendAPI.requestLoginStatus();

  if(loginStatus.logged_in) {
    loggedIn.value = true;
    username.value = loginStatus.username;
  }
}

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
  BackendAPI.logout();
  loggedIn.value = false;
  username.value = undefined;
}

function requestAllOrders() {
  let allOrders = BackendAPI.allOrders();

  allOrdersBox.innerHTML = "";

  for(let order of allOrders.orders) {
    allOrdersBox.appendChild(generateAllOrderBox(order));
  }
}

function requestMyOrders() {
  myOrdersBox.innerHTML = "";

  let myOrders = BackendAPI.myOrders();

  if(myOrders.orders.length > 0) {
    myOrdersBox.appendChild(UIBuilder.fromObject({
      type: 'div',
      class: 'order-title',
      children: [
        {
          type: 'span',
          content: 'My orders'
        },
        {
          type: 'img',
          src: 'icons/plus-solid.svg',
          onclick: function() {
            openNewOrderDialog();
          }
        }
      ]
    }));

    for(let order of myOrders.orders) {
      myOrdersBox.appendChild(generateMyOrderBox(order));
    }
  }

  let acceptedOrders = BackendAPI.acceptedOrders();

  if(acceptedOrders.orders.length > 0) {
    myOrdersBox.appendChild(UIBuilder.fromObject({
      type: 'div',
      content: 'Accepted orders'
    }));
  }

  for(let acceptedOrder of acceptedOrders.orders) {
    myOrdersBox.appendChild(generateAcceptedOrderBox(acceptedOrder));
  }
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
  usernameDisplay.innerHTML = newValue;
});

function generateAllOrderBox(userOrder) {
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

  container.appendChild(buttons);

  return container;
}

function generateMyOrderBox(userOrder) {
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

  if(userOrder.state === null && userOrder.offer_count > 0) {
    let allOffersButton = UIBuilder.fromObject({
      type: 'button',
      content: 'List all offers',
      onclick: function() {
        let dom = UIBuilder.fromObject({type: 'div'});
        let apiResponse = BackendAPI.allOffers(userOrder.id);

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

function generateAcceptedOrderBox(acceptedOrder) {
  let container = document.createElement("div");
  container.className = "order-box";

  container.appendChild(UIBuilder.fromObject({
    type: 'div',
    content: 'User: ' + acceptedOrder.username + ' State: ' + acceptedOrder.state
  }));

  container.appendChild(UIBuilder.fromObject({
    type: 'button',
    content: 'Show info',
    onclick: function() {
      let acceptedOrderInfo = BackendAPI.acceptedOrderInfo(acceptedOrder.id);
      showAcceptedOrderInfo(acceptedOrderInfo);
    }
  }));

  return container;
}

function openNewOrderDialog() {
  let popup = UIBuilder.fromObject({type: 'div'});
  let pokemonSelect = UIBuilder.fromObject({type: 'select'});
  let move1Select = UIBuilder.fromObject({type: 'select'});
  let move2Select = UIBuilder.fromObject({type: 'select'});
  let move3Select = UIBuilder.fromObject({type: 'select'});
  let move4Select = UIBuilder.fromObject({type: 'select'});
  let submitButton = UIBuilder.fromObject({type: 'button', content: 'Submit'});
  for(let pokemon of pokemonList) {
    let option = UIBuilder.fromObject({type: 'option', content: StringUtils.humanize(pokemon.name), select_value: pokemon.name});
    pokemonSelect.appendChild(option);
  }
  pokemonList[pokemonSelect.selectedIndex].fillData(PokemonAPI.requestPokemonData(pokemonList[pokemonSelect.selectedIndex].url));

  let selectedPokemon = pokemonList[pokemonSelect.selectedIndex];
  for(let move of selectedPokemon.moves) {
    let option = UIBuilder.fromObject({type: 'option', content: StringUtils.humanize(move.name), select_value: move.name});
    move1Select.appendChild(option.cloneNode(true));
    move2Select.appendChild(option.cloneNode(true));
    move3Select.appendChild(option.cloneNode(true));
    move4Select.appendChild(option.cloneNode(true));
  }

  pokemonSelect.onchange = function() {
    pokemonList[pokemonSelect.selectedIndex].fillData(PokemonAPI.requestPokemonData(pokemonList[pokemonSelect.selectedIndex].url));

    let selectedPokemon = pokemonList[pokemonSelect.selectedIndex];
    move1Select.innerHTML = "";
    move2Select.innerHTML = "";
    move3Select.innerHTML = "";
    move4Select.innerHTML = "";
    for(let move of selectedPokemon.moves) {
      let option = UIBuilder.fromObject({type: 'option', content: StringUtils.humanize(move.name), select_value: move.name});
      move1Select.appendChild(option.cloneNode(true));
      move2Select.appendChild(option.cloneNode(true));
      move3Select.appendChild(option.cloneNode(true));
      move4Select.appendChild(option.cloneNode(true));
    }
  }

  popup.appendChild(pokemonSelect);
  popup.appendChild(move1Select);
  popup.appendChild(move2Select);
  popup.appendChild(move3Select);
  popup.appendChild(move4Select);
  popup.appendChild(submitButton);

  let closeFunction = createCloseablePopup(popup);

  submitButton.onclick = function() {
    let pokemonName = pokemonList[pokemonSelect.selectedIndex].name;
    let gender = "none"; // TODO: link to select
    let move1 = move1Select[move1Select.selectedIndex].value;
    let move2 = move2Select[move2Select.selectedIndex].value;
    let move3 = move3Select[move3Select.selectedIndex].value;
    let move4 = move4Select[move4Select.selectedIndex].value;
    let ability = "ability"; // TODO: Add ability

    let orderData = new OrderData(pokemonName, gender, move1, move2, move3, move4, ability);
    BackendAPI.submitOrder(orderData);
    closeFunction();
  }
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
  let closeFunction = function() {
    popupContainer.removeChild(popup);
    popupChange();
  }
  popup.appendChild(UIBuilder.fromObject({
    type: 'img',
    class: 'close',
    src: 'icons/times-circle-solid.svg',
    onclick: closeFunction
  }));
  popupContainer.appendChild(popup);
  popupChange();

  return closeFunction;
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

function showAcceptedOrderInfo(object) {
  moreInformationBox.innerHTML = "";
  moreInformationBox.appendChild(UIBuilder.fromObject({
    type: 'span',
    content: 'Order of ' + object.order.pokemon_name
  }));
  let progressBar = new ProgressBar(['accepted', 'started', 'breeded', 'leveled', 'finished'], object.order.state);
  moreInformationBox.appendChild(progressBar.element);
  moreInformationBox.appendChild(UIBuilder.fromObject({
    type: 'span',
    content: 'User: ' + object.order.username
  }));
  moreInformationBox.appendChild(UIBuilder.fromObject({
    type: 'span',
    content: 'Price: ' + object.order.price
  }));
  moreInformationBox.appendChild(UIBuilder.fromObject({
    type: 'button',
    content: 'Change state',
    onclick: function() {
      let popup = UIBuilder.fromObject({
        type: 'div'
      });
      let stateSelect = UIBuilder.fromObject({type: 'select'});
      stateSelect.appendChild(UIBuilder.fromObject({type: 'option', content: 'accepted', select_value: '0'}));
      stateSelect.appendChild(UIBuilder.fromObject({type: 'option', content: 'started', select_value: '1'}));
      stateSelect.appendChild(UIBuilder.fromObject({type: 'option', content: 'breeded', select_value: '2'}));
      stateSelect.appendChild(UIBuilder.fromObject({type: 'option', content: 'leveled', select_value: '3'}));
      stateSelect.appendChild(UIBuilder.fromObject({type: 'option', content: 'finished', select_value: '4'}));
      popup.appendChild(stateSelect);
      let closeFunction = createCloseablePopup(popup);
      stateSelect.onchange = function() {
        BackendAPI.updateState(object.order.user_order_id, parseInt(stateSelect.value));
        closeFunction();
      }
    }
  }));
}
