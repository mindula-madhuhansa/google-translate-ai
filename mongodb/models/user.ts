import mongoose from "mongoose";

import { IUser, Translation } from "@/types";
import connectDB from "@/mongodb/db";
import { userSchema } from "@/mongodb/schemas";

// Check if the model already exists to prevent overwriting
const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export async function addOrUpdateUser(
  userId: string,
  translation: Translation
): Promise<IUser> {
  const filter = { userId: userId };

  const update = {
    $set: { userId: userId },
    $push: { translations: translation },
  };

  const options = { upsert: true, new: true, setDefaultOnInsert: true };

  await connectDB();

  try {
    const user: IUser | null = await User.findOneAndUpdate(
      filter,
      update,
      options
    );

    console.log("User added or updated:", user);

    if (!user) {
      throw new Error("Use not found and was not created.");
    }

    return user;
  } catch (error) {
    console.error("Error adding or updating user:", error);
    throw error;
  }
}
