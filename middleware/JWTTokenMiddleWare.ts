import {Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import * as dotenv from "dotenv";
import { AuthRequest } from '../utils/types';
dotenv.config();

const JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY!;

const JWTMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        try {
            const decoded = jwt.verify(token, JWT_SECRET_KEY);
            req.user = decoded;
            next();
        } catch (err) {
            return res.status(401).json({ message: 'Authentication failed' });
    }
};

export default JWTMiddleware;