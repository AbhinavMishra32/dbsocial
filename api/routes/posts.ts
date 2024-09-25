import { Router } from "express";
import { makePost, getPost, changeLikes } from "../controller/posts.controller.js";
import { authRequire } from "../controller/user.controller.js";

const router = Router();

router.post("/", authRequire, makePost)
    .get("/", authRequire, getPost);

router.post("/like/:postId", authRequire, changeLikes);

export default router;