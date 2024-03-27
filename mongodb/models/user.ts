import mongoose from "mongoose";

import { ITranslation, IUser, Translation } from "@/types";
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

export async function getTranslations(
  userId: string
): Promise<Array<ITranslation>> {
  await connectDB();

  try {
    const user: IUser | null = await User.findOne({ userId: userId });
    if (user) {
      // Sort translations by timestamp in descending order
      user.translations.sort(
        (a: ITranslation, b: ITranslation) =>
          b.timestamp.getTime() - a.timestamp.getTime()
      );

      return user.translations;
    } else {
      console.log(`User with userId ${userId} not found.`);
      return [];
    }
  } catch (error) {
    console.error("Error retrieving translations:", error);
    throw error;
  }
}

export async function removeTranslation(
  userId: string,
  translationId: string
): Promise<IUser> {
  await connectDB();

  try {
    const user: IUser | null = await User.findOneAndUpdate(
      { userId: userId },
      { $pull: { translations: { _id: translationId } } },
      { new: true }
    );
    if (!user) {
      throw new Error("User not found.");
    }
    console.log("Translation removed:", user);

    return user;
  } catch (error) {
    console.error("Error removing translation:", error);
    throw error;
  }
}
