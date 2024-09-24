import { Router } from "express";
import { authRequire } from "../controller/user.controller.js";
import { getUser } from "../controller/user.controller.js";

const router = Router();

router.get("/:username", getUser);

export default router;