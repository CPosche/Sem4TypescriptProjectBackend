import { Router } from "express";
import data from "../controllers/Data";

const Datarouter = Router();

Datarouter.get("/", data.getDungeons);
Datarouter.get("/classes", data.getClasses);
Datarouter.get("/dungeons", data.getDungeonsFromDB);

export default Datarouter;
