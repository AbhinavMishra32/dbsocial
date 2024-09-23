import { Router } from "express";
import { makePost, getPost } from "../controller/posts.controller.js";
import { authRequire } from "../controller/user.controller.js";

const router = Router();

router.post("/", authRequire, makePost)
.get("/", authRequire, getPost);

export default router;