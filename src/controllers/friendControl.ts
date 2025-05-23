import { Request, Response } from 'express';
import User from '../models/users.js';

export const addFriend = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    );
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(user);
    return;
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const removeFriend = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(user);
    return;
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const friendControl = {
    addFriend,
    removeFriend
    };

export default friendControl;