import jwt from 'jsonwebtoken';
import * as dotenv from "dotenv";
import User from "../models/UserModel";
import bcrypt from "bcrypt";
import { Request, Response } from 'express';
import { TUser } from '../utils/types';
dotenv.config();

const jwtSecretKey: string = process.env.JWT_SECRET_KEY!;

const generateToken = (payload: TUser) => {
    const token = jwt.sign(payload, jwtSecretKey, { expiresIn: 3600 });
    return token;
};

const login = async (username: string, password: string) => {
    try{
        const user = await User.findOne({ username: username });

        if(!user){
            return {message: "User not found", status: 404}
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if(passwordMatch){
            const token = generateToken({username: user.username });
            return {message: token, status: 200};
        }
        else{
            return {message: "Wrong Password", status: 401}
        }

    }catch(err){
        return {message: "Something went wrong", status: 500}
    }
};

const register = async (username: string, password: string) => {

        const hashedPassword = await bcrypt.hash(password, 10);

        try{
            console.log();
            const user = await User.create({username: username, password: hashedPassword});
            return {user, status: 200};
        } catch(err){
           return {message: "Could not create user", status: 500, err: err}
        }
};

const JWTController = {
    login,
    generateToken,
    register
}

export default JWTController;