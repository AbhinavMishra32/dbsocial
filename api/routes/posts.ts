import { Router } from "express";
import { makePost, getPost, changeLikes, checkIsLiked, getCommentsOfPost, setCommentsOfPost } from "../controller/posts.controller.js";
import { authRequire } from "../controller/user.controller.js";

const router = Router();

router.post("/", authRequire, makePost)
    .get("/", authRequire, getPost);

router.post("/like/:postId", authRequire, changeLikes);
router.get("/like/isliked/:postId", authRequire, checkIsLiked);
router.get("/:postId/comments", authRequire, getCommentsOfPost)
    .post('/:postId/comments', authRequire, setCommentsOfPost);

export default router;