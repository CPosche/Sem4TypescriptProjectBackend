import jwt from 'jsonwebtoken';
import * as dotenv from "dotenv";
import User from "../models/UserModel";
import bcrypt from "bcrypt";
import { Request, Response } from 'express';
import { TUser } from '../utils/types';
import UserModel from "../models/UserModel";
dotenv.config();

const jwtSecretKey: string = process.env.JWT_SECRET_KEY!;

const generateToken = (payload: TUser) => {
    console.log(jwtSecretKey, payload);
    const token = jwt.sign(payload, jwtSecretKey, { expiresIn: 3600 });
    console.log(token);
    return token;
};

const login = async (username: string, password: string) => {
    try{
        const user = await User.findOne({ username: username });

        if(!user){
            return {message: "Authentication failed"}
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if(passwordMatch){
            const token = generateToken({username: user.username });
            return token
        }
        else{
            return {message: "Authentication failed"}
        }

    }catch(err){
        return {message: "Something went wrong"}
    }
};

const register = async (username: string, password: string) => {

        const hashedPassword = await bcrypt.hash(password, 10);

        const testUsername = await UserModel.findOne({username: username});
        if(!testUsername){
            try{
                console.log(username, hashedPassword)
                const user = await User.create({username: username, password: hashedPassword});
                console.log("Hello");
                return {user, status:200};
            } catch(err){
                return {user: null , status: 400};
            }
        }
        else{
            return {user: null , status: 400};
        }

};

const JWTController = {
    login,
    generateToken,
    register
}

export default JWTController;