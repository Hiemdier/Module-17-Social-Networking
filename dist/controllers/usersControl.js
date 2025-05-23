import User from '../models/users.js';
import Thoughts from '../models/thought.js';
const getAllUsers = async (_, res) => {
    try {
        const users = await User.find().populate('thoughts').populate('friends');
        res.json(users);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving users' });
    }
};
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate('thoughts').populate('friends');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json(user);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error retrieving user' });
    }
};
const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating user' });
    }
};
const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
            new: true,
            runValidators: true,
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json(user);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error updating user' });
    }
};
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await Thoughts.deleteMany({ _id: { $in: user.thoughts } });
        return res.json({ message: 'User and associated thoughts deleted' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error deleting user' });
    }
};
const usersControl = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
export default usersControl;
