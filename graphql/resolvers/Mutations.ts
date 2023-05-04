import JWTController from "../../controllers/JWTController";
import {Args} from "../../utils/types";
import userModel from "../../models/UserModel";

export default {

        login: async (_parent: never, {username,password}: Args) => {
            return await JWTController.login(username,password!);
        },
        register: async (_parent: never, {username,password}: Args) => {
            return await JWTController.register(username, password!);
        },
        addFavoriteClass: async (_parent: never, {username, classId}: Args) => {
            const user = await userModel.findOne({username: username});
            if(user){
                user.favoriteClasses.push(classId);
                await user.save();
                return user;
            }
        }
}