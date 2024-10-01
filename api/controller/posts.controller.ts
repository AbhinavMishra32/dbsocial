import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma.js';
import { errorHandler } from '../utils/error.js';

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

export const getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reqWithAddedUser = req as RequestWithAddedUser;
        // const posts = await prisma.post.findMany({where: {authorId: reqWithAddedUser.addedUser.userId}});

        const { username } = reqWithAddedUser.addedUser;
        // console.log("Username of makeAllPosts: ", username);

        const openPosts = await prisma.post.findMany({
            where: {
                author: {
                    is: { id: reqWithAddedUser.addedUser.userId }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
        // console.log(openPosts);

        if (!openPosts) {
            return res.status(404).json({ message: "No posts found for this user." });
        }

        res.status(200).json({ posts: openPosts });
    } catch (error) {
        console.log("Error while getting posts: ", error);
        next(errorHandler(500, "An error occurred while fetching the posts. Please try again later."));
    }
}

export const getPostById = async (req: RequestWithAddedUser, res: Response, next: NextFunction) => {
    try {
        const postId = parseInt(req.params.postId, 10);
        console.log("postId in getPostById: ", postId);
        const post = await prisma.post.findUnique({where: {id: postId}, include: {likedBy: true}})

        if (!post) {
            return res.status(404).json({message: "Post not found."});
        }

        return res.status(200).json({post});
    } catch (error) {
        console.log("Error in getPostById: ", error);
        next(errorHandler(500, "An error occured while fetching this post."));
        return
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

        const alreadyLiked = post.likedBy.some((user) => user.id === req.addedUser.userId);

        if (alreadyLiked) {
            await prisma.post.update({
                where: { id: postId },
                data: {
                    likes: { decrement: 1 },
                    likedBy: {
                        disconnect: { id: req.addedUser.userId }
                    }
                }
            });
            return res.status(200).json({ updatedPost: post, isLiked: !alreadyLiked });
        } else {
            await prisma.post.update({
                where: { id: postId },
                data: {
                    likes: { increment: 1 },
                    likedBy: {
                        connect: { id: req.addedUser.userId }
                    }
                },
            })
            return res.status(200).json({ updatedPost: post, isLiked: !alreadyLiked });
        }
    } catch (error) {
        console.log(error);
        next(errorHandler(500, "An error occured while updating post likes."));
        return
    }
}

export const checkIsLiked = async (req: RequestWithAddedUser, res: Response, next: NextFunction) => {
    try {
        const postId = parseInt(req.params.postId);

        const post = await prisma.post.findUnique({ where: { id: postId }, include: { likedBy: true } })

        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }

        const alreadyLiked = post.likedBy.some((user) => user.id === req.addedUser.userId);

        return res.status(200).json({ isLiked: alreadyLiked });
    } catch (error) {
        console.log("Error occured while checking for likes: ", error);
        next(errorHandler(500, "An error occured while checking for likes."));
        return
    }
}

export const getCommentsOfPost = async (req: RequestWithAddedUser, res: Response, next: NextFunction) => {
    try {
        const postId = parseInt(req.params.postId);
        const comments = await prisma.comment.findMany({ where: { postId: postId }, include: { author: true } });

        if (!comments) {
            return res.status(404).json({ message: "Comments not found for this post" });
        }

        return res.status(200).json({ comments });
    } catch (error) {
        next(errorHandler(500, "An error occured while fetching comments for post."));
        return
    }
}

export const setCommentsOfPost = async (req: RequestWithAddedUser, res: Response, next: NextFunction) => {
    try {
        const postId = parseInt(req.params.postId);
        const { content } = req.body;
        const authorId = req.addedUser.userId;
        const newComment = await prisma.comment.create({
            data: {
                content,
                author: {
                    connect: { id: authorId },
                },
                post: {
                    connect: { id: postId }
                }
            }
        });

        if (!newComment) {
            return res.status(404).json({ message: "There was an error while posting the comment." });
        }

        return res.status(201).json({ message: "Comment posted successfully.", newComment });
    } catch (error) {
        console.log("Error while posting comments: ", error);
        next(errorHandler(500, "An error occured while posting comments for this post."));
    }
}