import { Router } from 'express';
const router = Router();
import apiRoutes from './api/index';

router.use('/api', apiRoutes);

router.use((_req, res) => {
  return res.send('Wrong route!');
});

export default router;
