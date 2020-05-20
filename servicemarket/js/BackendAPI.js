class BackendAPI {
  static submitOrder(orderData) {
    const url = "api/new_order.php";

    var request = new XMLHttpRequest();
    request.open('POST', url, false);
    request.send(orderData.serialize());

    if (request.status === 200) {
      let apiResponse = request.responseText;

      console.log(apiResponse);
    }
  }

  static myOrders() {
    const url = "api/my_orders.php";

    var request = new XMLHttpRequest();
    request.open('GET', url, false);
    request.send(null);

    if (request.status === 200) {
      let apiResponse = JSON.parse(request.responseText);

      return apiResponse;
    }
  }

  static allOrders() {
    const url = "api/all_orders.php";

    var request = new XMLHttpRequest();
    request.open('GET', url, false);
    request.send(null);

    if (request.status === 200) {
      let apiResponse = JSON.parse(request.responseText);

      return apiResponse;
    }
  }

  static login(user, pass) {
    const url = "api/login.php";

    var request = new XMLHttpRequest();
    request.open('POST', url, false);
    request.send(JSON.stringify(
      {
        user: user,
        pass: pass
      }
    ));

    if (request.status === 200) {
      let apiResponse = request.responseText;

      return JSON.parse(apiResponse);
    }
  }

  static logout() {
    const url = "api/logout.php";
    var request = new XMLHttpRequest();
    request.open('GET', url, false);
    request.send(null);
  }

  static allOffers(userOrderID) {
    const url = "api/all_offers.php";
    var request = new XMLHttpRequest();
    request.open('POST', url, false);
    request.send(JSON.stringify(
      {
        user_order_id: userOrderID
      }
    ));
    if(request.status === 200) {
      let apiResponse = request.responseText;

      console.log(apiResponse);
    }
  }

  static makeOffer(userOrderID, price) {
    const url = "api/new_offer.php";
    var request = new XMLHttpRequest();
    request.open('POST', url, false);
    request.send(JSON.stringify(
      {
        user_order_id: userOrderID,
        price: price
      }
    ));
    if(request.status === 200) {
      let apiResponse = request.responseText;

      console.log(apiResponse);
    }
  }

  static acceptOffer(userOrderID, offerID) {
    const url = "api/accept_offer.php";
    var request = new XMLHttpRequest();
    request.open('POST', url, false);
    request.send(JSON.stringify(
      {
        user_order_id: userOrderID,
        offer_id: offerID
      }
    ));
    if (request.status === 200) {
      let apiResponse = request.responseText;

      console.log(JSON.parse(apiResponse));
    }
  }
}
