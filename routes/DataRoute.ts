import { Router } from "express";
import data from "../controllers/Data";

const Datarouter = Router();

Datarouter.get("/", data.getItem);
Datarouter.get("/classes", data.getClasses);

export default Datarouter;
