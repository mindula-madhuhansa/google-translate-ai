import { auth } from "@clerk/nextjs/server";
import { MoveRight } from "lucide-react";

import { ITranslation } from "@/types";
import { TimeAgoText } from "@/components/time-ago-text";
import { DeleteTranslationButton } from "@/components/delete-translation-button";

const getLanguage = (countryCode: string) => {
  const lang = new Intl.DisplayNames(["en"], { type: "language" });
  return lang.of(countryCode);
};

export const TranslationHistory = async () => {
  const { userId } = auth();

  const url = `${
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.VERCEL_URL
  }/translationHistory?userId=${userId}`;

  const response = await fetch(url, {
    next: {
      tags: ["translationHistory"],
    },
  });

  const { translations }: { translations: Array<ITranslation> } =
    await response.json();

  return (
    <div>
      <h1 className="text-3xl my-5">History</h1>

      {/* If there is no translations */}
      {translations.length === 0 && (
        <p className="mb-5 text-gray-400">No translations yet...</p>
      )}

      <ul className="divide-y border rounded-md">
        {translations.map((translation) => (
          <li
            key={translation._id}
            className="flex justify-between items-center p-5 hover:bg-gray-50 relative"
          >
            <div>
              <p className="flex items-center text-sm mb-5 text-gray-500 gap-x-3">
                {getLanguage(translation.from)}
                <MoveRight />
                {getLanguage(translation.to)}
              </p>

              <div className="space-y-2 pr-5">
                <p>{translation.fromText}</p>
                <p className="text-gray-400">{translation.toText}</p>
              </div>
            </div>

            {/* Timestamp */}
            <p className="text-sm text-gray-400 absolute top-2 right-2">
              <TimeAgoText
                date={new Date(translation.timestamp).toISOString()}
              />
            </p>

            {/* Delete */}
            <DeleteTranslationButton id={translation._id} />
          </li>
        ))}
      </ul>
    </div>
  );
};
