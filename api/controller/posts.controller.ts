import {Request, Response, NextFunction} from 'express';
import prisma from '../prisma.js';
import { errorHandler } from '../utils/error.js';

interface RequestWithAddedUser extends Request {
    addedUser: {userId: number, username: string, email: string};
}

export const makePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reqWithAddedUser = req as RequestWithAddedUser;
        const { content, title } = reqWithAddedUser.body;
        const post = await prisma.post.create({
            data: {
                content,
                title,
                author: {
                    connect: { id: reqWithAddedUser.addedUser.userId },
                },
            },
        });
        res.status(201).json({ message: "Post created successfully.", post});
    }
    catch (error) {
        next(errorHandler(500, "An error occurred while creating the post. Please try again later."));
    }
}

export const getPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reqWithAddedUser = req as RequestWithAddedUser;
        const posts = await prisma.post.findMany({where: {authorId: reqWithAddedUser.addedUser.userId}});

        res.status(200).json({posts});
    } catch (error) {
        next(errorHandler(500, "An error occurred while fetching the posts. Please try again later."));
    }
}