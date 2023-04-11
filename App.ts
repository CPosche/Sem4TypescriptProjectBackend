import * as dotenv from "dotenv";
dotenv.config();
import express = require("express");
import morgan = require("morgan");
import Datarouter from "./routes/DataRoute";
import logger from "./utils/logger";
import cors from "cors";

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

app.use(cors());

app.use(express.json());

app.use("/api/v1/data", Datarouter);

export default app;
