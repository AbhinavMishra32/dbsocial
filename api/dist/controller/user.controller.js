import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, REFRESH_TOKEN_SECRET } from '../config.js';
import prisma from '../prisma.js';
export const regUser = async (req, res, next) => {
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
    }
    catch (error) {
        next(errorHandler(500, "An error occurred while creating the user. Please try again later."));
    }
};
export const loginUser = async (req, res, next) => {
    try {
        const { name, password } = req.body;
        const user = await prisma.user.findUnique({ where: { name } });
        if (!user)
            return res.status(401).json({ message: "Invalid credentials" });
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid)
            return res.status(401).json({ message: "Invalid credentials" });
        const accessToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ userId: user.id }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'none',
            maxAge: 7 * 24 * 3600000, // 7 days
        });
        res.json({
            id: user.id,
            token: accessToken,
            refreshToken: refreshToken,
            name: user.name,
            email: user.email
        });
    }
    catch (error) {
        next(errorHandler(500, "An error occurred while logging in. Please try again later."));
    }
};
export const refreshToken = (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
        return res.sendStatus(401);
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
        if (err)
            return res.sendStatus(403);
        const newAccessToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '15m' });
        res.json({ accessToken: newAccessToken });
    });
};
export const authRequire = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    // we are doing .split(' ')[1] because the authHeader is in the format "Bearer <token>"
    const token = authHeader && authHeader.split(' ')[1];
    // console.log("Accessed Protected route with token: ", token);
    // console.log("Request headers: ", req.headers);
    if (!token)
        return res.sendStatus(401);
    try {
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err)
                return res.sendStatus(403);
            let reqWithUser = req;
            reqWithUser.addedUser = user;
            // console.log("addedUser in authRequire: ", reqWithUser.addedUser);
            next();
        });
    }
    catch (error) {
        console.log("Token is invalid: ");
        next(errorHandler(401, "Token is invalid"));
    }
};
export const getUser = async (req, res, next) => {
    try {
        const { username } = req.params;
        const user = await prisma.user.findUnique({ where: { name: username } });
        if (!user) {
            res.status(404).json({ message: "User not found." });
        }
        res.status(200).json({ message: "User fetched successfully.", user });
    }
    catch (error) {
        next(errorHandler(500, "An error occurred while fetching the user. Please try again later."));
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vY29udHJvbGxlci91c2VyLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sUUFBUSxNQUFNLFVBQVUsQ0FBQztBQUNoQyxPQUFPLEdBQW1CLE1BQU0sY0FBYyxDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDaEUsT0FBTyxNQUFNLE1BQU0sY0FBYyxDQUFDO0FBR2xDLE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FBRyxLQUFLLEVBQUUsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFjLEVBQUUsRUFBRTtJQUN6RSxJQUFJLENBQUM7UUFDRCxxQ0FBcUM7UUFDckMsTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7UUFDckQsTUFBTSxRQUFRLEdBQUcsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUN6QyxLQUFLLEVBQUU7Z0JBQ0gsRUFBRSxFQUFFO29CQUNBLEVBQUUsS0FBSyxFQUFFO29CQUNULEVBQUUsSUFBSSxFQUFFO2lCQUNYO2FBQ0o7U0FDSixDQUFDLENBQUM7UUFDSCxJQUFJLFFBQVEsRUFBRSxDQUFDO1lBQ1gsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsaURBQWlELENBQUMsQ0FBQyxDQUFDO1lBQzNFLE9BQU87UUFDWCxDQUFDO1FBQ0QsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN0QyxNQUFNLGNBQWMsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN6RCxNQUFNLElBQUks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