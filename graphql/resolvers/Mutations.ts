import JWTController from "../../controllers/JWTController";
import {Args} from "../../utils/types";

export default {

        login: async (_parent: never, {username,password}: Args) => {
            return await JWTController.login(username,password);
        },
        register: async (_parent: never, {username,password}: Args) => {
            return await JWTController.register(username, password);
        }

}