import { Router } from "express";
import { testController } from "../controller/user.controller.js";

const router = Router();

router.get('/', testController);



export default router;