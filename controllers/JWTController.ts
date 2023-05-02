import jwt from 'jsonwebtoken';
import * as dotenv from "dotenv";
import User from "../models/UserModel";
import bcrypt from "bcrypt";
import { Request, Response } from 'express';
import { TUser } from '../utils/types';
dotenv.config();

const jwtSecretKey: string = process.env.JWT_SECRET_KEY!;

const generateToken = (payload: TUser) => {
    console.log(jwtSecretKey, payload);
    const token = jwt.sign(payload, jwtSecretKey, { expiresIn: 3600 });
    console.log(token);
    return token;
};

const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try{
        const user = await User.findOne({ name: username });

        if(!user){
            return res.status(401).json({ message: "Authentication failed" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if(passwordMatch){
            const token = generateToken({name: user.name });
            return res.status(200).json({ token });
        }
        else{
            return res.status(401).json({ message: "Authentication failed" });
        }

    }catch(err){
        return res.status(400).json({message: "Something went wrong"});
    }
};

const register = async (req: Request, res: Response) => {
        const { username, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        try{
            console.log();
            const user = await User.create({name: username, password: hashedPassword});
            res.status(201).json({user , message: "User created successfully"});
        } catch(err){
            res.status(500).json({username, hashedPassword,message: "Error creating user"});

        }
};

const JWTController = {
    login,
    generateToken,
    register
}

export default JWTController;