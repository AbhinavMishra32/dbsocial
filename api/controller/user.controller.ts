import { Request, Response } from 'express';
import {PrismaClient} from '@prisma/client';
import { errorHandler } from '../utils/error.js';

const prisma = new PrismaClient();

export const getUsers = (req: Request, res: Response) => {
    const users = prisma.user.findMany();
    res.json(users);
}

export const createUser = async (req: Request, res: Response, next: Function) => {
    try {
    const { name, email } = req.body;
    // console.log(name, email);
    const user = await prisma.user.create({
        data: {
            name, email
        }
    });
    res.status(201).send({"Message": "User created successfully", user});
    } catch (error) {
        if (error.code === 'P2002') {
            next(errorHandler(400, "User with this email already exists."));
        }
        // console.error("Error creating user:", error);
        next(errorHandler(500, "An error occurred while creating the user. Please try again later."));
    }
};