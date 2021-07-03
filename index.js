const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv/config");

const app = express();

//helpers
const auth = require("./helpers/auth");
const errorHandler = require("./helpers/error");

//Routers
const Classes = require("./Routes/Classes");
const User = require("./Routes/User");
const News = require("./Routes/News");
const Leave = require("./Routes/Leave");
const DS = require("./Routes/D&S");
const Dairy = require("./Routes/Dairy");

// ENV Variables
const admin = process.env.ADMIN;
const password = process.env.DBPASSWORD;
const dbName = process.env.DBNAME;

// Middleware
app.use(auth());
app.use(cors());
app.use("*", cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use("/upload", express.static(__dirname + "/upload"));
app.use(errorHandler);

//Routers Use
app.use("/Class", Classes);
app.use("/User", User);
app.use("/News", News);
app.use("/Leave", Leave);
app.use("/DS", DS);
app.use("/Dairy", Dairy);

// Main Api
app.get("/", (req, res) => {
  res.send("Welcome to School App server");
});

// DataBase connection
mongoose
  .connect(
    `mongodb+srv://${admin}:${password}@cluster0.lfxvc.mongodb.net/${dbName}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("working");
  });

var server = app.listen(process.env.PORT || 3000, () => {
  var port = server.address().port;
  console.log(`server on port ${port}`);
});
