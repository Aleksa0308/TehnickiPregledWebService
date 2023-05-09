const express = require("express");
const path = require("path");
const { sequelize } = require("./models");
const jwt = require("jsonwebtoken");
var cors = require("cors");
require("dotenv").config();


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var corsOptions = {
  origin: "http://192.168.0.41:3000",
  //origin: "*",

  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

const agencijeRouter = require("./routes/agency");
const brandRouter = require("./routes/brand");
const typeRouter = require("./routes/type");
const userRouter = require("./routes/user");
const specRouter = require("./routes/specification");
const statRouter = require("./routes/statistics");

app.use("/api/agencije", agencijeRouter);
app.use("/api/marke", brandRouter);
app.use("/api/vrste", typeRouter);
app.use("/api/user", userRouter);
app.use("/api/evidencije", specRouter);
app.use("/api/statistika", statRouter);

app.listen(8080, '192.168.0.41', async () => {
  await sequelize.authenticate();
});
