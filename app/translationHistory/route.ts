import { NextRequest } from "next/server";

import { getTranslations } from "@/mongodb/models/user";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get("userId");

  const translations = await getTranslations(userId!);

  return Response.json({ translations });
}
