import { model, Schema, Types } from 'mongoose';
// Schema to create Reaction model
// This schema is used as a subdocument in the Thought model
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    toJSON: {
        getters: true,
    },
    id: false,
    _id: false,
});
const Reactions = model('Reaction', reactionSchema);
export default Reactions;
