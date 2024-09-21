import { Router } from "express";
import { getUsers, createUser } from "../controller/user.controller.js";

const router = Router();

router.get("/", getUsers)
.post("/", createUser);

export default router;