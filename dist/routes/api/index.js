import { Router } from "express";
import usersRoute from "./usersRoute.js";
import thoughtsRoute from "./thoughtsRoute.js";
const router = Router();
router.use("/users", usersRoute);
router.use("/thought", thoughtsRoute);
export default router;
