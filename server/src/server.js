require("dotenv").config();
const mongoose = require("mongoose");
const { initBot } = require("./bot");
const bodyParser = require("body-parser");
const express = require("express");
const dbName = process.env.MONGO_DBNAME;
const dbPort = process.env.MONGO_PORT;
const dbHost = process.env.MONGO_HOST;
const dbUrl = `mongodb://${dbHost}:${dbPort}/${dbName}`;
const session = require("./util/session");
const passport = require("./util/passport");
const LoginRouter = require("./controllers/users-router");
const OrdersRouter = require("./controllers/orders-router");
const FileRouter = require("./controllers/files-router");
const cors = require("cors");

mongoose
  .connect(dbUrl)
  .then(initExpressApp)
  // .then(launchBot)
  .catch(console.error);

async function launchBot() {
  try {
    return initBot().launch();
  } catch (error) {
    console.log(error);
  }
}

function initExpressApp() {
  const app = express();

  app.use(bodyParser.json({ strict: false, limit: "50mb" }));
  app.use(bodyParser.urlencoded({ extended: true }));

  if (app.get("env") === "production") {
    app.set("trust proxy", 1);
  } else {
    app.use(cors());
  }

  app.disable("x-powered-by");
  app.use(session);
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(FileRouter);
  app.use(OrdersRouter);
  app.use(LoginRouter);

  const PORT = process.env.PORT;

  return app.listen(PORT, async () => {
    console.log(`App listening on port ${PORT}`);
  });
}
