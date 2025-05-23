import {Router} from 'express';
import friendControl from '../../controllers/friendControl.js';

const router = Router();
router.route('/').post(friendControl.addFriend);
router.route('/:userId').delete(friendControl.removeFriend);

export default router;