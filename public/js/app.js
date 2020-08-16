console.log("Client side javascrip is loaded!");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const forecast = document.querySelector("#forecast");
const locationText = document.querySelector("#location");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const location = search.value;

  locationText.textContent = "Loading...";
  forecast.textContent = "";

  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        locationText.textContent = data.error;
      } else {
        forecast.textContent = data.forecast;
        locationText.textContent = data.location;
      }
    });
  });
});
