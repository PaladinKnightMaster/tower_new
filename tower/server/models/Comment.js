import { Schema } from "mongoose";
import { ObjectId } from "../db/DbUtils.js";

export const CommentSchema = new Schema({
  creatorId: { type: ObjectId, required: true, ref: 'Account' },
  eventId: { type: ObjectId, required: true, ref: 'Event' },
  body: { type: String, required: true, maxlength: 150, minlength: 1 },
}, {
  timestamps: true, toJSON: { virtuals: true }
})

CommentSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})