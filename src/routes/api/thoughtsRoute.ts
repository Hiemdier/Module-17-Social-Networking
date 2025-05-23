import { Router } from "express";
import thoughtsControl from "../../controllers/thoughtsControl.js";

const router = Router();

router.route("/").get(thoughtsControl.getAllThoughts).post(thoughtsControl.createThought);
router.route("/:thoughtId").get(thoughtsControl.getThoughtById).put(thoughtsControl.updateThought).delete(thoughtsControl.deleteThought);
router.route("/:thoughtId/reactions").post(thoughtsControl.addReaction);
router.route("/:thoughtId/reactions/:reactionId").delete(thoughtsControl.removeReaction);

export default router;