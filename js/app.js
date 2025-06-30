/* PUT YOUR OWN KEY HERE - THIS MIGHT NOT WORK
SUBSCRIBE HERE: https://home.openweathermap.org/users/sign_up */
const apiKey = "80701dba075f06003a038ffda4045d08";

// set zipcode for this method 
const inputZip = "38135";

// doc ready 
$(document).ready(function() {
  // ajax here
  const url = `https://api.openweathermap.org/data/2.5/weather?zip=${inputZip},us&appid=${apiKey}&units=imperial`;


  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // json response
      const { main, name, sys, weather } = data;

      /* ===================================
              Condition Set 
      ===================================== */
      var condition = weather[0].description;
      condition = condition.split(" ");

      // capitalize the first letter of each word
      for (let i = 0; i < condition.length; i++) {
        condition[i] =
          condition[i].charAt(0).toUpperCase() + condition[i].slice(1);
      }

      condition = condition.join(" ");

      /* ===================================
              Temperature Set
      ===================================== */
      var temp = main.temp;
      temp = Math.round(temp);

      /* ===================================
              Time Set
      ===================================== */
      var dayTime = true;

      // format function from unix -> hh:mm am
      function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? "0" + minutes : minutes;
        var strTime = hours + ":" + minutes + " " + ampm;

        // return time in a string
        return strTime;
      }

      // update time in widget
      function updateTime() {
        var timeDisplay = formatAMPM(new Date());
        $(".time").text(timeDisplay);

        // cross reference via sunset (multiple to add zeros)
        var sunrise = sys.sunrise * 1000;
        var sunset = sys.sunset * 1000;
        var sunsetYesterday = sunset - 86400 * 1000;

        if (Date.now() < sunrise && Date.now() > sunsetYesterday) {
          if ($(".weather-widget").hasClass("nighttime")) {
          } else {
            $(".weather-widget").addClass("nighttime");
          }
        } else {
          if ($(".weather-widget").hasClass("nighttime")) {
            $(".weather-widget").removeClass("nighttime");
          }
        }
      }

      updateTime();

      // update time by the second
      setInterval(function () {
        var newTime = formatAMPM(new Date());
        if (newTime != $(".time").text()) {
          updateTime();
        }
      }, 1000);

      /* ===================================
              Location Set
      ===================================== */
      var location = name;

      /* ===================================
              Output Data 
      ===================================== */
      $(".condition").text(condition);
      $(".temp").text(temp);
      $(".location").text(`${location}, US`);

      /* ===================================
              Css Weather Conditions
      ===================================== */
      var shortCondition = "default";

      // very specific conditions for interactive colors
      switch (weather[0].main) {
        // clear
        case "Clear":
          if (dayTime == true) {
            shortCondition = "sunny";
            break;
          }
          shortCondition = "clear";
          break;
        // cloudy
        case "Clouds":
          if (main.humidity < 50) {
            shortCondition = "cloudsLight";
            break;
          }
          shortCondition = "cloudsDark";
          break;
        // default is lowercase
        default:
          shortCondition =
            weather[0].main.charAt(0).toLowerCase() + weather[0].main.slice(1);
      }

      // add class
      $(".weather-widget").addClass(shortCondition);

      /* ===================================
              App Ready
      ===================================== */
      $(".weather-widget").addClass("ready");
    });
});

