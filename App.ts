import * as dotenv from "dotenv";
dotenv.config();
import express = require("express");
import morgan = require("morgan");
import logger from "./utils/logger";

const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log("Development mode...");
}

app.use((req, res, next) => {
  logger.info(
    `Request received: ${req.method} ${req.url} at ${new Date()} with code ${
      res.statusCode
    }`
  );
  next();
});

app.use(express.json());

export default app;
