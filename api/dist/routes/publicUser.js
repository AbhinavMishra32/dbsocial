import { Router } from "express";
import { getUser } from "../controller/user.controller.js";
const router = Router();
router.get("/:username", getUser);
export default router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3JvdXRlcy9wdWJsaWNVc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFFakMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRTNELE1BQU0sTUFBTSxHQUFHLE1BQU0sRUFBRSxDQUFDO0FBRXhCLE1BQU0sQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBRWxDLGVBQWUsTUFBTSxDQUFDIn0=