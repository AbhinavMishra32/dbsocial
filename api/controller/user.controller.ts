import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET, REFRESH_TOKEN_SECRET } from '../config.js';
import prisma from '../prisma.js';


export const regUser = async (req: Request, res: Response, next: Function) => {
    try {
        // console.log("Request body:", req);
        const { name, email, username, password } = req.body;
        const existing = await prisma.user.findFirst({
            where: {
                OR: [
                    { email },
                    { name }
                ]
            }
        });
        if (existing) {
            next(errorHandler(400, "User with this email or username already exists"));
            return;
        }
        const salt = bcryptjs.genSaltSync(10);
        const hashedPassword = bcryptjs.hashSync(password, salt);
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });

        res.status(201).json({ message: "User created successfully." });
    } catch (error) {
        next(errorHandler(500, "An error occurred while creating the user. Please try again later."));
    }
};

export const loginUser = async (req: Request, res: Response, next: Function) => {
    try {
        const { name, password } = req.body;
        const user = await prisma.user.findUnique({ where: { name } });
        if (!user) return res.status(401).json({ message: "Invalid credentials" });

        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials" });

        const accessToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ userId: user.id }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'none',
            maxAge: 7 * 24 * 3600000, // 7 days
        })
        res.json({
            id: user.id,
            token: accessToken,
            refreshToken: refreshToken,
            name: user.name,
            email: user.email
        });
    } catch (error) {
        next(errorHandler(500, "An error occurred while logging in. Please try again later."));
    }
}

export const refreshToken = (req: Request, res: Response, next: Function) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);

    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err: any, user: JwtPayload) => {
        if (err) return res.sendStatus(403);

        const newAccessToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '15m' });
        res.json({ accessToken: newAccessToken });
    });
};

interface ReqWithUser extends Request {
    addedUser: JwtPayload
}

export const authRequire = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    // we are doing .split(' ')[1] because the authHeader is in the format "Bearer <token>"
    const token = authHeader && authHeader.split(' ')[1];

    // console.log("Accessed Protected route with token: ", token);
    // console.log("Request headers: ", req.headers);
    if (!token) return res.sendStatus(401);


    try {
        jwt.verify(token, JWT_SECRET, (err, user: JwtPayload) => {
            if (err) return res.sendStatus(403);
            let reqWithUser = req as ReqWithUser;
            reqWithUser.addedUser = user as JwtPayload;
            // console.log("addedUser in authRequire: ", reqWithUser.addedUser);
            next();
        })
    }
    catch (error) {
        console.log("Token is invalid: ");
        next(errorHandler(401, "Token is invalid"));
    }
}

export const getUser = async (req: Request, res: Response, next: Function) => {
    try {
        const { username } = req.params;
        const user = await prisma.user.findUnique({ where: { name: username } })
        if (!user) {
            res.status(404).json({ message: "User not found." });
        }
        res.status(200).json({ message: "User fetched successfully.", user });
    }
    catch (error) {
        next(errorHandler(500, "An error occurred while fetching the user. Please try again later."));
    }
}