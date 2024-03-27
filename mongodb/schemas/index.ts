import { Schema } from "mongoose";

import { IUser } from "@/types";

export const translationSchema = new Schema({
  timestamp: { type: Date, default: Date.now },
  fromText: String,
  from: String,
  toText: String,
  to: String,
});

export const userSchema = new Schema<IUser>({
  userId: String,
  translations: [translationSchema],
});
