import {api} from '../services/axios';
import {Request, Response, NextFunction} from 'express';
import prisma from '../prisma.js';
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, REFRESH_TOKEN_SECRET } from '../config.js';


export const makePost = async (req: Request, res: Response, next: NextFunction){
    try {
        const {content} = req.body;
        prisma.post.create({
            data: {
                content,
                authorId: req.user?.id
            },
            
        });
    }
}