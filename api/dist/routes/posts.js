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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9yb3V0ZXMvcG9zdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUNqQyxPQUFPLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3hKLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUUvRCxNQUFNLE1BQU0sR0FBRyxNQUFNLEVBQUUsQ0FBQztBQUV4QixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxXQUFXLEVBQUUsUUFBUSxDQUFDO0tBQ2xDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBRXhDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQztBQUN2RCxNQUFNLENBQUMsR0FBRyxDQUFDLHVCQUF1QixFQUFFLFdBQVcsRUFBRSxZQUFZLENBQUMsQ0FBQztBQUMvRCxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUM7QUFDakQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxXQUFXLEVBQUUsaUJBQWlCLENBQUM7S0FDMUQsSUFBSSxDQUFDLG1CQUFtQixFQUFFLFdBQVcsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0FBRS9ELGVBQWUsTUFBTSxDQUFDIn0=