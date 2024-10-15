import { Router } from "express";
import { regUser, loginUser, refreshToken, authRequire } from "../controller/user.controller.js";

const router = Router();

router.post("/signup", regUser);

router.post("/login", loginUser);

router.post('/refresh-token', refreshToken);

router.post('/auth-required', authRequire, (req, res) => {
    res.json({ message: "Access allowed only for authenticated users" });
});

export default router;