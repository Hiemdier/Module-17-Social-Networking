import {Schema,Document,Types} from 'mongoose';
import mongoose from 'mongoose';

interface IFriend extends Document {
    _id: Types.ObjectId;
    friendId: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const friendSchema = new mongoose.Schema<IFriend>(
  {
    _id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    friendId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Friend = mongoose.model<IFriend>('Friend', friendSchema);

export default Friend;