const express = require("express");
const cors = require("cors");

const app = express(); //express app, act as a middleware
const corsOptions = {
  origin: "http://localhost:4200", // chỉ cho phép frontend từ localhost:3001
  methods: ["GET", "POST", "PUT", "DELETE"],
  // credentials: true, // nếu bạn dùng cookies hoặc Authorization headers
};

app.use(cors(corsOptions));

const bodyParser = require("body-parser"); //imnport body-parser

const userRoutes = require("./routes/user");
const expenseRoutes = require("./routes/expense");

const connectionString = "mongodb://localhost:27017/expense_tracker";

const mongoose = require("mongoose");
mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Not able to connect to database");
  });

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,authentication",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,DELETE,PATCH,OPTIONS",
  );
  next();
});

app.use("/v1/api", expenseRoutes);
app.use("/v1/api/USER", userRoutes);

module.exports = app;
