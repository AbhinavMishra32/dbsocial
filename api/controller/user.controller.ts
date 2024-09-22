import { Request, Response } from 'express';
import { PrismaClient, User } from '@prisma/client';
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { access } from 'fs';
import { JsonArray } from '@prisma/client/runtime/library';
import { Jwt } from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_TOKEN_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET || !REFRESH_TOKEN_SECRET) {
    throw new Error("JWT_SECRET or REFRESH_TOKEN_SECRET is not defined");
}

export const getUsers = (req: Request, res: Response) => {
    const users = prisma.user.findMany();
    res.json(users);
}

export const regUser = async (req: Request, res: Response, next: Function) => {
    try {
    // console.log("Request body:", req);
    const { name, email, password } = req.body;
    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = bcryptjs.hashSync(password, salt);
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });

    res.status(201).json({message: "User created successfully."});
    } catch (error) {
        if (error.code === 'P2002') {
            next(errorHandler(400, "User with this email already exists."));
        }
        // console.error("Error creating user:", error);
        next(errorHandler(500, "An error occurred while creating the user. Please try again later."));
    }
};

export const loginUser = async(req: Request, res: Response, next: Function) => {
    try {
        const { name, email, password } = req.body;
        const user = await prisma.user.findUnique({where: {name}});
        if (!user) return res.status(401).json({message: "Invalid credentials"});

        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if(!isPasswordValid) return res.status(401).json({message: "Invalid credentials"});

        const accessToken = jwt.sign({userId: user.id}, JWT_SECRET, {expiresIn: '15m'});
        const refreshToken = jwt.sign({userId: user.id}, REFRESH_TOKEN_SECRET, {expiresIn: '7d'});

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 7 * 24* 3600000,
        })
        res.json({accessToken});
    } catch (error) {
        next(errorHandler(500, "An error occurred while logging in. Please try again later."));
    }
}

export const refreshToken = (req: Request, res: Response, next: Function)=> {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);

    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err: any, user: JwtPayload) =>{
        if (err) return res.sendStatus(403);

        const newAccessToken = jwt.sign({userId: user.id}, JWT_SECRET, {expiresIn: '15m'});
        res.json({accessToken: newAccessToken});
    });
};

interface ReqWithUser extends Request {
    user: JwtPayload
}

export const authRequire = (req: Request, res: Response, next: Function) =>{
    const authHeader = req.headers['authorization'];
    console.log("Auth header:", authHeader);
    // we are doing .split(' ')[1] because the authHeader is in the format "Bearer <token>"
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user: JwtPayload) => {
        if (err) return res.sendStatus(403);
        let reqWithUser = req as ReqWithUser;
        reqWithUser.user = user as JwtPayload;
        next();
    })
}