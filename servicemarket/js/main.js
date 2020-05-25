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
var moreInformation = new LiveData();
moreInformation.value = undefined;

window.setInterval(function() {
  if(loggedIn.value === true) {
    refreshOrders();

    if(moreInformation.value !== undefined) {
      if(moreInformation.value.type === 'order_info') {
        let userOrderID = moreInformation.value.user_order_id;

        moreInformation.value = {
          type: 'order_info',
          my_order: moreInformation.value.my_order,
          user_order_id: userOrderID
        }
      }
    }
  }
}, 300000);

requestLoginStatus();

function refreshOrders() {
  requestAllOrders();
  requestMyOrders();
}

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
  moreInformation.value = undefined;
}

function requestAllOrders() {
  let allOrders = BackendAPI.allOrders();

  allOrdersBox.innerHTML = "";

  if(allOrders.orders.length !== 0) {
    for(let order of allOrders.orders) {
      allOrdersBox.appendChild(generateAllOrderBox(order));
    }
  } else {
    allOrdersBox.appendChild(UIBuilder.fromObject({
      type: 'div',
      class: 'no-orders',
      content: 'You have encountered a very rare case. It seems like no order is created yet. Be the first user to create one by pressing the + button next to "My orders"'
    }));
  }
}

function requestMyOrders() {
  myOrdersBox.innerHTML = "";

  let myOrders = BackendAPI.myOrders();

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

  if(myOrders.orders.length > 0) {
    for(let order of myOrders.orders) {
      myOrdersBox.appendChild(generateMyOrderBox(order));
    }
  } else {
    myOrdersBox.appendChild(UIBuilder.fromObject({
      type: 'div',
      class: 'no-orders',
      content: 'You have no orders yet. Create one by pressing the + button'
    }));
  }

  let acceptedOrders = BackendAPI.acceptedOrders();

  if(acceptedOrders.orders.length > 0) {
    myOrdersBox.appendChild(UIBuilder.fromObject({
      type: 'div',
      class: 'order-title',
      children: [
        {
          type: 'span',
          content: 'Accepted orders'
        }
      ]
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

    refreshOrders();

    let disclaimer = UIBuilder.fromObject({
      type: 'div',
      content: BackendAPI.requestDisclaimer()
    });
    createCloseablePopup(disclaimer);
  } else {
    logoutImg.style.display = "none";

    let usernameInput = UIBuilder.fromObject({ type: 'input', class: 'td-username', input_type: 'text' });
    let passwordInput = UIBuilder.fromObject({ type: 'input', class: 'td-password', input_type: 'password' });

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
                    usernameInput
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
                    passwordInput
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
    usernameInput.onkeypress = function(event) {
      if(event.keyCode === 13) loginClick();
    }
    passwordInput.onkeypress = function(event) {
      if(event.keyCode === 13) loginClick();
    }

    function loginClick() {
      login(popup.getElementsByClassName("td-username")[0].value, popup.getElementsByClassName("td-password")[0].value);
    }

    popupContainer.appendChild(popup);
    popupChange();

    usernameInput.focus();

    allOrdersBox.innerHTML = "";
    myOrdersBox.innerHTML = "";
  }
});

username.registerListener(function(newValue) {
  if(newValue !== undefined) {
    usernameDisplay.innerHTML = newValue;
  } else {
    usernameDisplay.innerHTML = "";
  }
});

moreInformation.registerListener(function(newValue) {
  if(newValue !== undefined) {
    if(newValue.type === 'order_info') {
      if(newValue.my_order) {
        let orderInfo = BackendAPI.getOrderInfo(newValue.user_order_id);
        showOrderInfo(orderInfo.order);
      } else {
        let orderInfo = BackendAPI.acceptedOrderInfo(newValue.user_order_id);
        showAcceptedOrderInfo(orderInfo.order);
      }
    }
  } else {
    moreInformationBox.innerHTML = "";

    moreInformationBox.appendChild(UIBuilder.fromObject({
      type: 'div',
      class: 'no-information',
      content: 'To show information about an order, click on the "Show Info" button on an order'
    }));
  }
});

function generateAllOrderBox(userOrder) {
  let ivs = [userOrder.iv_hp, userOrder.iv_atk, userOrder.iv_def, userOrder.iv_spatk, userOrder.iv_spdef, userOrder.iv_spe];

  let thirtyOneCount = 0;
  let thirtyCount = 0;
  for(let iv of ivs) {
    if(iv === 30) thirtyCount++;
    if(iv === 31) thirtyOneCount++;
  }

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

  let container = UIBuilder.fromObject({
    type: 'div',
    class: 'order-box',
    children: [
      {
        type: 'table',
        class: 'stats-container',
        children: [
          {
            type: 'tr',
            children: [
              {
                type: 'td',
                children: [
                  {
                    type: 'div',
                    content: StringUtils.humanize(userOrder.pokemon_name) + " lvl " + userOrder.level
                  },
                  {
                    type: 'div',
                    content: userOrder.username
                  },
                  {
                    type: 'div',
                    content: thirtyOneCount + 'x31 ' + thirtyCount + 'x30'
                  }
                ]
              },
              {
                type: 'td',
                children: [
                  {
                    type: 'div',
                    content: StringUtils.humanize(userOrder.move1)
                  },
                  {
                    type: 'div',
                    content: StringUtils.humanize(userOrder.move2)
                  },
                  {
                    type: 'div',
                    content: StringUtils.humanize(userOrder.move3)
                  },
                  {
                    type: 'div',
                    content: StringUtils.humanize(userOrder.move4)
                  }
                ]
              },
              {
                type: 'td',
                children: [
                  {
                    type: 'table',
                    children: [
                      {
                        type: 'tr',
                        children: [
                          {
                            type: 'th',
                            content: 'HP'
                          },
                          {
                            type: 'th',
                            content: 'Atk'
                          },
                          {
                            type: 'th',
                            content: 'Def'
                          },
                          {
                            type: 'th',
                            content: 'SpAtk'
                          },
                          {
                            type: 'th',
                            content: 'SpDef'
                          },
                          {
                            type: 'th',
                            content: 'Speed'
                          }
                        ]
                      },
                      {
                        type: 'tr',
                        children: [
                          {
                            type: 'th',
                            content: userOrder.iv_hp.toString()
                          },
                          {
                            type: 'th',
                            content: userOrder.iv_atk.toString()
                          },
                          {
                            type: 'th',
                            content: userOrder.iv_def.toString()
                          },
                          {
                            type: 'th',
                            content: userOrder.iv_spatk.toString()
                          },
                          {
                            type: 'th',
                            content: userOrder.iv_spdef.toString()
                          },
                          {
                            type: 'th',
                            content: userOrder.iv_spe.toString()
                          }
                        ]
                      },
                      {
                        type: 'tr',
                        children: [
                          {
                            type: 'th',
                            content: userOrder.ev_hp.toString()
                          },
                          {
                            type: 'th',
                            content: userOrder.ev_atk.toString()
                          },
                          {
                            type: 'th',
                            content: userOrder.ev_def.toString()
                          },
                          {
                            type: 'th',
                            content: userOrder.ev_spatk.toString()
                          },
                          {
                            type: 'th',
                            content: userOrder.ev_spdef.toString()
                          },
                          {
                            type: 'th',
                            content: userOrder.ev_spe.toString()
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      buttons
    ]
  });

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
      }
    ]
  });
  infoTable.appendChild(thRow);

  let infoRow = UIBuilder.fromObject({
    type: 'tr',
    children: [
      {
        type: 'td',
        content: StringUtils.humanize(userOrder.pokemon_name) + " lvl " + userOrder.level
      }
    ]
  });
  infoTable.appendChild(infoRow);

  if(userOrder.state === null && userOrder.offer_count > 0) {
    thRow.appendChild(UIBuilder.fromObject({
      type: 'th',
      content: 'Offers'
    }));
    infoRow.appendChild(UIBuilder.fromObject({
      type: 'td',
      content: userOrder.offer_count
    }));
  }

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
                acceptOffer(userOrder.id, offer.id);
              }
            }]
          }));
        }
        let closeFunction = createCloseablePopup(dom);

        function acceptOffer(uoid, oid) {
          BackendAPI.acceptOffer(uoid, oid);
          closeFunction();
          refreshOrders();
        }
      }
    });
    buttons.appendChild(allOffersButton);
  }
  if(userOrder.state !== null && userOrder.state !== undefined) {
    let userOrderInfoButton = UIBuilder.fromObject({
      type: 'button',
      content: 'Show Info',
      onclick: function() {
        moreInformation.value = {
          type: 'order_info',
          my_order: true,
          user_order_id: userOrder.id
        }
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
      moreInformation.value = {
        type: 'order_info',
        my_order: false,
        user_order_id: acceptedOrder.id
      }
    }
  }));

  return container;
}

function generateOrderDataBox(orderData) {
  let container = UIBuilder.fromObject({
    type: 'div',
    class: 'order-data',
    children: [
      {
        type: 'table',
        children: [
          {
            type: 'tr',
            children: [
              {
                type: 'td',
                content: StringUtils.humanize(orderData.move1)
              },
              {
                type: 'td',
                content: StringUtils.humanize(orderData.move2)
              }
            ]
          },
          {
            type: 'tr',
            children: [
              {
                type: 'td',
                content: StringUtils.humanize(orderData.move3)
              },
              {
                type: 'td',
                content: StringUtils.humanize(orderData.move4)
              }
            ]
          }
        ]
      },
      {
        type: 'table',
        children: [
          {
            type: 'tr',
            children: [
              {
                type: 'td',
                content: 'HP'
              },
              {
                type: 'td',
                content: 'Atk'
              },
              {
                type: 'td',
                content: 'Def'
              },
              {
                type: 'td',
                content: 'SpAtk'
              },
              {
                type: 'td',
                content: 'SpDef'
              },
              {
                type: 'td',
                content: 'Speed'
              }
            ]
          },
          {
            type: 'tr',
            children: [
              {
                type: 'td',
                content: orderData.iv_hp.toString()
              },
              {
                type: 'td',
                content: orderData.iv_atk.toString()
              },
              {
                type: 'td',
                content: orderData.iv_def.toString()
              },
              {
                type: 'td',
                content: orderData.iv_spatk.toString()
              },
              {
                type: 'td',
                content: orderData.iv_spdef.toString()
              },
              {
                type: 'td',
                content: orderData.iv_spe.toString()
              }
            ]
          },
          {
            type: 'tr',
            children: [
              {
                type: 'td',
                content: orderData.ev_hp.toString()
              },
              {
                type: 'td',
                content: orderData.ev_atk.toString()
              },
              {
                type: 'td',
                content: orderData.ev_def.toString()
              },
              {
                type: 'td',
                content: orderData.ev_spatk.toString()
              },
              {
                type: 'td',
                content: orderData.ev_spdef.toString()
              },
              {
                type: 'td',
                content: orderData.ev_spe.toString()
              }
            ]
          }
        ]
      }
    ]
  });

  return container;
}

function openNewOrderDialog() {
  let pokemonSelect = UIBuilder.fromObject({type: 'select'});
  let levelSelect = UIBuilder.fromObject({
    type: 'select',
    children: [
      {
        type: 'option',
        select_value: '0',
        content: 'Lvl 0'
      },
      {
        type: 'option',
        select_value: '50',
        content: 'Lvl 50'
      },
      {
        type: 'option',
        select_value: '100',
        content: 'Lvl 100'
      }
    ]
  });

  let abilitySelect = UIBuilder.fromObject({type: 'select'});

  let move1Select = UIBuilder.fromObject({type: 'select'});
  let move2Select = UIBuilder.fromObject({type: 'select'});
  let move3Select = UIBuilder.fromObject({type: 'select'});
  let move4Select = UIBuilder.fromObject({type: 'select'});

  let ivHPSelect = UIBuilder.fromObject({type: 'input', class: 'iv', input_type: 'number', select_value: '0', min: '-1', max: '31'});
  let ivAtkSelect = UIBuilder.fromObject({type: 'input', class: 'iv', input_type: 'number', select_value: '0', min: '-1', max: '31'});
  let ivDefSelect = UIBuilder.fromObject({type: 'input', class: 'iv', input_type: 'number', select_value: '0', min: '-1', max: '31'});
  let ivSpAtkSelect = UIBuilder.fromObject({type: 'input', class: 'iv', input_type: 'number', select_value: '0', min: '-1', max: '31'});
  let ivSpDefSelect = UIBuilder.fromObject({type: 'input', class: 'iv', input_type: 'number', select_value: '0', min: '-1', max: '31'});
  let ivSpeSelect = UIBuilder.fromObject({type: 'input', class: 'iv', input_type: 'number', select_value: '0', min: '-1', max: '31'});

  let evHPSelect = UIBuilder.fromObject({type: 'input', class: 'ev', input_type: 'number', select_value: '0', min: '0', max: '252'});
  let evAtkSelect = UIBuilder.fromObject({type: 'input', class: 'ev', input_type: 'number', select_value: '0', min: '0', max: '252'});
  let evDefSelect = UIBuilder.fromObject({type: 'input', class: 'ev', input_type: 'number', select_value: '0', min: '0', max: '252'});
  let evSpAtkSelect = UIBuilder.fromObject({type: 'input', class: 'ev', input_type: 'number', select_value: '0', min: '0', max: '252'});
  let evSpDefSelect = UIBuilder.fromObject({type: 'input', class: 'ev', input_type: 'number', select_value: '0', min: '0', max: '252'});
  let evSpeSelect = UIBuilder.fromObject({type: 'input', class: 'ev', input_type: 'number', select_value: '0', min: '0', max: '252'});

  let statsTable = UIBuilder.fromObject({
    type: 'table',
    class: 'stats-table',
    children: [
      {
        type: 'tr',
        children: [
          {
            type: 'td',
            content: 'IV HP'
          },
          ivHPSelect,
          {
            type: 'td',
            content: 'EV HP'
          },
          evHPSelect
        ]
      },
      {
        type: 'tr',
        children: [
          {
            type: 'td',
            content: 'IV Atk'
          },
          ivAtkSelect,
          {
            type: 'td',
            content: 'EV Atk'
          },
          evAtkSelect
        ]
      },
      {
        type: 'tr',
        children: [
          {
            type: 'td',
            content: 'IV Def'
          },
          ivDefSelect,
          {
            type: 'td',
            content: 'EV Def'
          },
          evDefSelect
        ]
      },
      {
        type: 'tr',
        children: [
          {
            type: 'td',
            content: 'IV SpAtk'
          },
          ivSpAtkSelect,
          {
            type: 'td',
            content: 'EV SpAtk'
          },
          evSpAtkSelect
        ]
      },
      {
        type: 'tr',
        children: [
          {
            type: 'td',
            content: 'IV SpDef'
          },
          ivSpDefSelect,
          {
            type: 'td',
            content: 'EV SpDef'
          },
          evSpDefSelect
        ]
      },
      {
        type: 'tr',
        children: [
          {
            type: 'td',
            content: 'IV Speed'
          },
          ivSpeSelect,
          {
            type: 'td',
            content: 'EV Speed'
          },
          evSpeSelect
        ]
      }
    ]
  });

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
  for(let ability of selectedPokemon.abilities) {
    let option = UIBuilder.fromObject({type: 'option', content: StringUtils.humanize(ability.name), select_value: ability.name});
    abilitySelect.appendChild(option);
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

    abilitySelect.innerHTML = "";
    for(let ability of selectedPokemon.abilities) {
      let option = UIBuilder.fromObject({type: 'option', content: StringUtils.humanize(ability.name), select_value: ability.name});
      abilitySelect.appendChild(option);
    }
  }

  let popup = UIBuilder.fromObject({
    type: 'div',
    children: [
      {
        type: 'div',
        children: [
          pokemonSelect,
          levelSelect
        ]
      },
      {
        type: 'div',
        children: [abilitySelect]
      },
      {
        type: 'table',
        children: [
          {
            type: 'tr',
            children: [
              {
                type: 'td',
                children: [
                  move1Select,
                  move2Select
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
                  move3Select,
                  move4Select
                ]
              }
            ]
          }
        ]
      },
      statsTable,
      submitButton
    ]
  });

  let closeFunction = createCloseablePopup(popup);

  submitButton.onclick = function() {
    let pokemonName = pokemonList[pokemonSelect.selectedIndex].name;
    let gender = "none"; // TODO: link to select
    let level = parseInt(levelSelect[levelSelect.selectedIndex].value);
    let move1 = move1Select[move1Select.selectedIndex].value;
    let move2 = move2Select[move2Select.selectedIndex].value;
    let move3 = move3Select[move3Select.selectedIndex].value;
    let move4 = move4Select[move4Select.selectedIndex].value;

    let ivHP = parseInt(ivHPSelect.value);
    let ivAtk = parseInt(ivAtkSelect.value);
    let ivDef = parseInt(ivDefSelect.value);
    let ivSpAtk = parseInt(ivSpAtkSelect.value);
    let ivSpDef = parseInt(ivSpDefSelect.value);
    let ivSpe = parseInt(ivSpeSelect.value);

    let evHP = parseInt(evHPSelect.value);
    let evAtk = parseInt(evAtkSelect.value);
    let evDef = parseInt(evDefSelect.value);
    let evSpAtk = parseInt(evSpAtkSelect.value);
    let evSpDef = parseInt(evSpDefSelect.value);
    let evSpe = parseInt(evSpeSelect.value);

    let ability = "ability"; // TODO: Add ability

    let orderData = new OrderData(pokemonName, gender, level, move1, move2, move3, move4, ability,
      ivHP, ivAtk, ivDef, ivSpAtk, ivSpDef, ivSpe,
      evHP, evAtk, evDef, evSpAtk, evSpDef, evSpe);
    BackendAPI.submitOrder(orderData);
    closeFunction();

    refreshOrders();
  }
}

function openRegisterDialog() {
  let usernameInput = UIBuilder.fromObject({
    type: 'input'
  });
  let passwordInput = UIBuilder.fromObject({
    type: 'input',
    input_type: 'password'
  });
  let submitButton = UIBuilder.fromObject({
    type: 'button',
    content: 'Register'
  });

  let container = UIBuilder.fromObject({type: 'div'});

  let table = UIBuilder.fromObject({
    type: 'table',
    children: [
      {
        type: 'tr',
        children: [
          {
            type: 'td',
            content: 'Username'
          },
          {
            type: 'td',
            children: [ usernameInput ]
          }
        ]
      },
      {
        type: 'tr',
        children: [
          {
            type: 'td',
            content: 'Password'
          },
          {
            type: 'td',
            children: [ passwordInput ]
          }
        ]
      }
    ]
  });
  container.appendChild(table);
  container.appendChild(submitButton);

  let closeFunction = createCloseablePopup(container);

  submitButton.onclick = function() {
    console.log('register username: ' + usernameInput.value + ' pw: ' + passwordInput.value);
    closeFunction();
  }
}

function openOrderCopyDialog(orderData) {
  let popup = UIBuilder.fromObject({
    type: 'textarea',
    select_value: "Username: " + orderData.username + "\n\n" +
    StringUtils.humanize(orderData.pokemon_name) + "\n\n" +
    "Moves: \n" +
    StringUtils.humanize(orderData.move1) + "\n" +
    StringUtils.humanize(orderData.move2) + "\n" +
    StringUtils.humanize(orderData.move3) + "\n" +
    StringUtils.humanize(orderData.move4) + "\n\n" +
    "Stats: " + "\n" +
    "IV: " + orderData.iv_hp + " " + orderData.iv_atk + " " + orderData.iv_def + " " + orderData.iv_spatk + " " + orderData.iv_spdef + " " + orderData.iv_spe + "\n" +
    "EV: " + orderData.ev_hp + " " + orderData.ev_atk + " " + orderData.ev_def + " " + orderData.ev_spatk + " " + orderData.ev_spdef + " " + orderData.ev_spe
  });
  createCloseablePopup(popup);
}

function popupChange() {
  let childCount = popupContainer.childElementCount;
  if(childCount > 0) {
    popupContainer.style.display = "flex";
  } else {
    popupContainer.style.display = "none";
  }
}

function createYesNoPopup(message, yesFunction) {
  let yesButton = UIBuilder.fromObject({type: 'button', content: 'Yes'});
  let noButton = UIBuilder.fromObject({type: 'button', content: 'No', class: 'no-button'});

  let popup = UIBuilder.fromObject({
    type: 'div',
    class: 'popup',
    children: [
      {
        type: 'div',
        content: message
      },
      {
        type: 'div',
        class: 'buttons',
        children: [
          yesButton,
          noButton
        ]
      }
    ]
  });
  yesButton.onclick = function() {
    yesFunction();
    popupContainer.removeChild(popup);
    popupChange();
  };
  noButton.onclick = function() {
    popupContainer.removeChild(popup);
    popupChange();
  };

  popupContainer.appendChild(popup);
  popupChange();
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

  moreInformationBox.appendChild(UIBuilder.fromObject({
    type: 'div',
    class: 'title',
    content: 'Order of ' + StringUtils.humanize(object.pokemon_name) + " lvl " + object.level
  }));
  let progressBar = new ProgressBar(['accepted', 'started', 'breeded', 'leveled', 'finished'], object.state);
  moreInformationBox.appendChild(progressBar.element);
  moreInformationBox.appendChild(UIBuilder.fromObject({
    type: 'table',
    children: [
      {
        type: 'tr',
        children: [
          {
            type: 'td',
            content: 'Breeder',
            class: 'right'
          },
          {
            type: 'td',
            content: object.breeder
          }
        ]
      },
      {
        type: 'tr',
        children: [
          {
            type: 'td',
            content: 'Price',
            class: 'right'
          },
          {
            type: 'td',
            content: object.price
          }
        ]
      }
    ]
  }));
}

function showAcceptedOrderInfo(order) {
  moreInformationBox.innerHTML = "";
  moreInformationBox.appendChild(UIBuilder.fromObject({
    type: 'div',
    class: 'title',
    content: 'Order of ' + StringUtils.humanize(order.pokemon_name) + " lvl " + order.level
  }));
  let progressBar = new ProgressBar(['accepted', 'started', 'breeded', 'leveled', 'finished'], order.state);
  moreInformationBox.appendChild(progressBar.element);
  moreInformationBox.appendChild(UIBuilder.fromObject({
    type: 'table',
    children: [
      {
        type: 'tr',
        children: [
          {
            type: 'td',
            content: 'User',
            class: 'right'
          },
          {
            type: 'td',
            content: order.username
          }
        ]
      },
      {
        type: 'tr',
        children: [
          {
            type: 'td',
            content: 'Price',
            class: 'right'
          },
          {
            type: 'td',
            content: order.price
          }
        ]
      }
    ]
  }));
  let buttons = UIBuilder.fromObject({type: 'div', class: 'buttons'});
  buttons.appendChild(UIBuilder.fromObject({
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
      stateSelect.selectedIndex = order.state;
      popup.appendChild(stateSelect);
      let closeFunction = createCloseablePopup(popup);
      stateSelect.onchange = function() {
        BackendAPI.updateState(order.user_order_id, parseInt(stateSelect.value));
        closeFunction();

        moreInformation.value = {
          type: 'order_info',
          my_order: true,
          user_order_id: order.user_order_id
        }
      }
    }
  }));
  buttons.appendChild(UIBuilder.fromObject({
    type: 'button',
    content: 'Export data as txt',
    onclick: function() {
      openOrderCopyDialog(order);
    }
  }));
  moreInformationBox.appendChild(buttons);
  moreInformationBox.appendChild(generateOrderDataBox(order));
}
