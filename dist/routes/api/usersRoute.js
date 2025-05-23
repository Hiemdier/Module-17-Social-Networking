import { Router } from 'express';
import usersControl from '../../controllers/usersControl.js';
const router = Router();
router.route('/').get(usersControl.getAllUsers).post(usersControl.createUser);
router.route('/:userId').get(usersControl.getUserById).put(usersControl.updateUser).delete(usersControl.deleteUser);
router.route('/:userId/friends/:friendId').post(usersControl.addFriend).delete(usersControl.removeFriend);
export default router;
