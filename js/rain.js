$(document).ready(function () {
  function checkForItem(elementName) {
    if ($(elementName).length >= 1) {
      clearInterval(elementChecker);
      //Perform whatever actions you want, here.
      if ($(".weather-widget").is(".rain, .snow, .mist")) {
        // create rain elements
        for (let i = 0; i < 100; i++) {
          $(".rain-drops").append($('<i class="rain-drop"></i>'));
        }
      }
    }
  }
  var elementChecker = setInterval(function () {
    checkForItem(".ready");
  }, 500);

});
