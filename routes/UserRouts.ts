import { Router } from "express";
import JWTController from "../controllers/JWTController";


const UserRouts = Router();


UserRouts.post("/login", JWTController.login);
UserRouts.post("/register", JWTController.register);

export default UserRouts;
