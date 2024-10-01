// Constants
const baseUrl = "https://api.weatherapi.com";
const apiKey = "d7c567cfbec544258f045217242008";

// Elements
const temperatureField = document.querySelector(".temp");
const cityField = document.querySelector(".time_location p");
const dateField = document.querySelector(".time_location span");
const emojiField = document.querySelector(".weather_condition img");
const weatherField = document.querySelector(".weather_condition span");
const errorField = document.querySelector(".errorText");
const searchField = document.querySelector(".searchField");
const form = document.querySelector("form");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  console.log(searchField.value);

  if (searchField.value) {
    getWeatherforCity(searchField.value);
  }
});

async function getWeatherforCity(city) {
  try {
    // 1. Call the Weather API
    const response = await fetch(
      `${baseUrl}/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
    );
    const data = await response.json();

    console.log(response);

    if (!data.location) {
      throw new Error();
    }

    // 2. Update the DOM based on data
    const { location, current } = data;
    const { name, localtime, lat, lon } = location;
    const {
      temp_c,
      condition: { icon, text },
    } = current;

    temperatureField.innerText = `${temp_c} °C`;
    cityField.innerText = name;
    dateField.innerText = localtime;
    emojiField.src = icon;
    weatherField.innerText = text;

    // Initialize the map with the latitude and longitude
    initialize(lat, lon);

    // Resetting the search field
    searchField.value = "";

    // Reset/Hide Error
    errorField.style.display = "none";
  } catch (err) {
    searchField.value = "";
    errorField.innerText = "Please, enter a valid location";
    errorField.style.display = "block";

    return;
  }
}

function initialize(lat, lon) {
  var latlng = new google.maps.LatLng(lat, lon);
  var map = new google.maps.Map(document.getElementById("map"), {
    center: latlng,
    zoom: 13,
  });
  var marker = new google.maps.Marker({
    map: map,
    position: latlng,
    draggable: false,
    anchorPoint: new google.maps.Point(0, -29),
  });
  var infowindow = new google.maps.InfoWindow();
  google.maps.event.addListener(marker, "click", function () {
    var iwContent =
      '<div id="iw_container">' +
      '<div class="iw_title"><b>Location</b> : ' + cityField.innerText + '</div></div>';
    // including content to the infowindow
    infowindow.setContent(iwContent);
    // opening the infowindow in the current map and at the current marker location
    infowindow.open(map, marker);
  });
}

google.maps.event.addDomListener(window, "load", initialize);
