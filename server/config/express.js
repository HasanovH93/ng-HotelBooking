require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("../middlewares/session");
const trimBody = require("../middlewares/trimBody");

module.exports = (app) => {
  app.use("*", cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(trimBody());
  app.use(session());
};
