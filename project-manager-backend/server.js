require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8000;

const mongoUri = process.env.MONGODB_URI;
// console.log("MONGODB URI", mongoUri);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected!");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use((req, res, next) => {
  const allowedOrigins = [
    "https://momentumhub.onrender.com",
    "http://localhost:5173"
  ]

  const origin = req.headers.origin

  console.log("REQ HEADER ORIGIN", origin)

  if(allowedOrigins.includes(origin)){
    res.header("Access-Control-Allow-Origin", origin)
  }

  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const mainRoutes = require("./routes/main");

app.use(mainRoutes);

app.listen(PORT, () => {
  console.log("Node.js is listening on port: " + PORT);
});
