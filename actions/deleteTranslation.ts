"use server";

import { revalidateTag } from "next/cache";
import { auth } from "@clerk/nextjs/server";

import { removeTranslation } from "@/mongodb/models/user";

export async function deleteTranslation(id: string) {
  auth().protect();

  const { userId } = auth();

  const user = await removeTranslation(userId!, id);

  revalidateTag("translationHistory");

  return {
    translations: JSON.stringify(user.translations),
  };
}
