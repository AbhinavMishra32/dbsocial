import { Router } from "express";
import { makePost, getAllPosts, changeLikes, checkIsLiked, getCommentsOfPost, setCommentsOfPost, getPostById } from "../controller/posts.controller.js";
import { authRequire } from "../controller/user.controller.js";

const router = Router();

router.post("/", authRequire, makePost)
    .get("/", authRequire, getAllPosts);

router.post("/like/:postId", authRequire, changeLikes);
router.get("/like/isliked/:postId", authRequire, checkIsLiked);
router.get("/:postId", authRequire, getPostById);
router.get("/:postId/comments", authRequire, getCommentsOfPost)
    .post('/:postId/comments', authRequire, setCommentsOfPost);

export default router;