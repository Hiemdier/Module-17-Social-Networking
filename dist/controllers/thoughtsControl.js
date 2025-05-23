import Thoughts from '../models/thought.js';
import User from '../models/users.js';
const getAllThoughts = async (_, res) => {
    try {
        const thoughts = await Thoughts.find();
        return res.status(200).json(thoughts);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error retrieving thoughts' });
    }
};
const getThoughtById = async (req, res) => {
    try {
        const thought = await Thoughts.findById(req.params.thoughtId);
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        return res.status(200).json(thought);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error retrieving thought' });
    }
};
const createThought = async (req, res) => {
    try {
        const thought = await Thoughts.create({
            thoughtText: req.body.thoughtText,
            username: req.body.username,
        });
        await User.findByIdAndUpdate(req.body.userId, {
            $push: { thoughts: thought._id }
        });
        return res.status(201).json(thought);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error creating thought' });
    }
};
const updateThought = async (req, res) => {
    try {
        const thought = await Thoughts.findByIdAndUpdate(req.params.thoughtId, req.body, {
            new: true,
            runValidators: true,
        });
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        return res.status(200).json(thought);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error updating thought' });
    }
};
const deleteThought = async (req, res) => {
    try {
        const thought = await Thoughts.findByIdAndDelete(req.params.thoughtId);
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        return res.json({ message: 'Thought deleted successfully' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error deleting thought' });
    }
};
const addReaction = async (req, res) => {
    try {
        const thought = await Thoughts.findByIdAndUpdate(req.params.thoughtId, { $addToSet: { reactions: req.body } }, { new: true });
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        return res.status(200).json(thought);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error adding reaction' });
    }
};
const removeReaction = async (req, res) => {
    try {
        const thought = await Thoughts.findByIdAndUpdate(req.params.thoughtId, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { new: true });
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        return res.status(200).json(thought);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error removing reaction' });
    }
};
const thoughtsControl = {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
};
export default thoughtsControl;
