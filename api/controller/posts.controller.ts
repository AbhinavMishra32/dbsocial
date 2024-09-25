import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma.js';
import { errorHandler } from '../utils/error.js';
import { open } from 'fs';

interface RequestWithAddedUser extends Request {
    // this is the authorized user
    addedUser: { userId: number, username: string, email: string };

    //this is the user whose profile is being viewed
    username: string;
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
        res.status(201).json({ message: "Post created successfully.", post });
    }
    catch (error) {
        next(errorHandler(500, "An error occurred while creating the post. Please try again later."));
    }
}

export const getPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reqWithAddedUser = req as RequestWithAddedUser;
        // const posts = await prisma.post.findMany({where: {authorId: reqWithAddedUser.addedUser.userId}});

        const { username } = reqWithAddedUser;

        const openPosts = await prisma.post.findMany({ where: { author: { username } } });

        if (!openPosts) {
            return res.status(404).json({ message: "No posts found for this user." });
        }

        res.status(200).json({ posts: openPosts.reverse() });
    } catch (error) {
        next(errorHandler(500, "An error occurred while fetching the posts. Please try again later."));
    }
}

export const changeLikes = async (req: RequestWithAddedUser, res: Response, next: NextFunction) => {
    try {
        // console.log(req.addedUser);
        const postId = parseInt(req.params.postId);
        const post = await prisma.post.findUnique({ where: { id: postId }, include: { likedBy: true } })

        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }

        res.status(200).json({ postByUser: post });
    } catch (error) {
        console.log(error);
        next(errorHandler(500, "An error occured while updating post likes."));
    }
}