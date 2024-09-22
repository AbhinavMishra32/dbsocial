import { Router } from "express";
import { getUsers, regUser, loginUser, refreshToken, authRequire } from "../controller/user.controller.js";

const router = Router();

router.get("/", getUsers)
.post("/", regUser);

router.post("/login", loginUser);

router.post('/refresh-token', refreshToken);

router.post('/auth-required', authRequire, (req, res) => {
    res.json({message: "You can access this route."});
});

export default router;