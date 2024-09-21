import express from 'express';
import userRouter from './routes/user.js';
const app = express();
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
app.use('/user', userRouter);
