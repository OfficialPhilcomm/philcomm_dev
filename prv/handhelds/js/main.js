let canvas = document.getElementById("scanner-canvas");
let resultBox = document.getElementById("result");

Quagga.init({
  inputStream : {
    name : "Live",
    type : "LiveStream",
    target: canvas
  },
  decoder : {
    readers : ["code_128_reader"]
  }
}, function(err) {
  if (err) {
    console.log(err);
    return
  }
  console.log("Initialization finished. Ready to start");
  Quagga.start();
});

Quagga.onDetected(function(result) {
  let code = result.codeResult.code;
  resultBox.innerHTML = code;
  window.navigator.vibrate(300);
})
