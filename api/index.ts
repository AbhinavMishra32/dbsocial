import express, { NextFunction, Request, Response } from 'express';
import userRouter from './routes/user.js';
import postRouter from './routes/posts.js';
import publicUserRouter from './routes/publicUser.js';
import { CustomError } from './utils/error.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    // origin: '', // for access from anywhere, use '*'
    // origin: process.env.CLIENT_URL,
    origin: 'https://dbsocial.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}))

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use('/api/user', userRouter);
app.use('/api/posts', postRouter);
app.use('/user', publicUserRouter);


app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
})