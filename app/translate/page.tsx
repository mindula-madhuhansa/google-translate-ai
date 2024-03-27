import { auth } from "@clerk/nextjs/server";

const TranslatePage = () => {
  auth().protect();

  const { userId } = auth();
  if (!userId) throw new Error("User not logged in");

  return (
    <div>
      {/* TranslationForm */}
      {/* TranslationHistory */}
    </div>
  );
};

export default TranslatePage;
