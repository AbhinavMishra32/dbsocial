import { Router } from "express";
import { getUsers, regUser, loginUser, refreshToken } from "../controller/user.controller.js";

const router = Router();

router.get("/", getUsers)
.post("/", regUser);

router.post("/login", loginUser);

router.post('/refresh-token', refreshToken);

export default router;