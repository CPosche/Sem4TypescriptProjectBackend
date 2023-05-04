import JWTController from "../../controllers/JWTController";
import {Args, TUser} from "../../utils/types";
import userModel from "../../models/UserModel";
import User from "../../models/UserModel";

export default {

    login: async (_parent: never, {username,password}: Args) => {
        return await JWTController.login(username,password!);
    },
    register: async (_parent: never, {username,password}: Args) => {
         const user = await JWTController.register(username, password!);
         console.log(user);
        return user;
    },
    addFavoriteClass: async (_parent: never, {username, classId}: Args) => {
        const OldUser = await userModel.findOne({username: username});
        if(OldUser){
            await User.findByIdAndUpdate(OldUser._id, {favoriteClass: classId});
            const user = await userModel.findOne({username: username});
            return {user, status: 200};
        }
    }
}