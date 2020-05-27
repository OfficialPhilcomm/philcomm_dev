<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <input id="un" type="text" />
    <input id="pw" type="password" />
    <button onclick="register()">Register</button>

    <div id="result"></div>

    <script type="text/javascript">
      let usernameInput = document.getElementById("un");
      let passwordInput = document.getElementById("pw");
      let result = document.getElementById("result");

      function register() {
        if(usernameInput.value !== "" && passwordInput.value !== "") {
          var request = new XMLHttpRequest();
          request.open('POST', "api/register.php", false);
          request.send(JSON.stringify(
            {
              username: usernameInput.value,
              password: passwordInput.value
            }
          ));

          if (request.status === 200) {
            let apiResponse = request.responseText;

            result.innerHTML = apiResponse;
          }
        }
      }
    </script>
  </body>
</html>
