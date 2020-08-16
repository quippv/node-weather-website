const hbs = require("hbs");
const path = require("path");
const express = require("express");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlerbars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    author: "MYAP",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    author: "MYAP",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    message: "Call me if you wanna some help",
    author: "MYAP",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must send provide a address term",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longtitude, location } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }

      forecast(latitude, longtitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error,
          });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must send provide a search term",
    });
  }

  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "Help article not found.",
    author: "MYAP",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "Page not found",
    author: "MYAP",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
