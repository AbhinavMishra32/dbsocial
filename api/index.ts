import express, {Request, Response} from 'express';
import userRouter from './routes/user.js';
import { CustomError } from './utils/error.js';

const app = express();
const PORT = 3000;
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use('/api/user', userRouter);

app.use((err: CustomError, req: Request, res: Response, next: Function) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
})