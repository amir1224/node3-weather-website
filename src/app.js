const path = require("path");
const express = require("express");
const hbs = require("hbs");

//! my own modules
const geoCode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");
const { errorMonitor } = require("events");

const app = express();

const port = process.env.PORT || 3000;

//? Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//* Setup handlebars engine and views locartion
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//* Setup static derectory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Amir Noghani",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Amir N",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    helpText: "How can I help you",
    name: "Amir N",
  });
});

app.get("/help/*", (req, res) => {
  res.render("help-article", {
    title: "404",
    name: "Amir",
    errorMessage: "Help article Not found",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Enter a valid address",
    });
  }
  const { address } = req.query;

  geoCode(address, (error, { latitude, longtitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longtitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: forecastData,
        location,
        address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  res.send({
    product: [],
  });

  console.log(req.query);
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Amir",
    errorMessage: "Page Not Found",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
