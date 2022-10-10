import { Schema } from "mongoose"
import { ObjectId } from "../db/DbUtils.js"

export const EventSchema = new Schema({

  creatorId: { type: ObjectId, required: true, ref: 'Account' },
  name: { type: String, required: true, maxlength: 40, minlength: 1 },
  description: { type: String, required: true },
  coverImg: { type: String, },
  location: { type: String, required: true, minlength: 1 },
  capacity: { type: Number, required: true, },
  startDate: { type: Date, required: true, },
  isCanceled: { type: Boolean, default: false, },
  type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'], required: true }

}, {
  timestamps: true, toJSON: { virtuals: true }
})


EventSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})