import { Schema } from "mongoose";
import { ObjectId } from "../db/DbUtils.js";

export const TicketSchema = new Schema({
  eventId: { type: ObjectId, required: true, ref: 'Event' },
  accountId: { type: ObjectId, required: true, ref: 'Account' },

}, {
  timestamps: true, toJSON: { virtuals: true }
})

TicketSchema.virtual('event', {
  localField: 'eventId',
  foreignField: '_id',
  justOne: true,
  ref: 'Event'
})

TicketSchema.virtual('profile', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
