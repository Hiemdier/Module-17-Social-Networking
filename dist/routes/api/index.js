import { Router } from 'express';
import userRoutes from './usersRoute.js';
import thoughtRoutes from './thoughtsRoute.js';
const router = Router();
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);
export default router;
