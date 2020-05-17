class BackendAPI {
  static submitOrder(orderData) {
    const url = "api/new_order.php";

    var request = new XMLHttpRequest();
    request.open('POST', url, false);
    request.send(JSON.stringify(
      orderData
    ));

    if (request.status === 200) {
      let apiResponse = request.responseText;

      console.log(apiResponse);
    }
  }
}
