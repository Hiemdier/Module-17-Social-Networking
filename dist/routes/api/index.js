import { Router } from "express";
import usersRoute from "./usersRoute.js";
import thoughtsRoute from "./thoughtsRoute.js";
import friendRoute from "./friendRoute.js";
const router = Router();
router.use("/users", usersRoute);
router.use("/thought", thoughtsRoute);
router.use("/friends", friendRoute);
export default router;
