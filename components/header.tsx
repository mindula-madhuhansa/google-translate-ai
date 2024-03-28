import Image from "next/image";
import Link from "next/link";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export const Header = () => {
  const { userId } = auth();

  const url = `${
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.VERCEL_URL
  }/translate`;

  return (
    <header className="flex items-center justify-between px-8 border-b mb-5">
      <div className="flex items-center justify-center overflow-hidden h-20">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Logo"
            height={100}
            width={200}
            className="object-contain h-32 cursor-pointer"
          />
        </Link>
      </div>

      {userId ? (
        <div>
          <UserButton afterSignOutUrl="/" />
        </div>
      ) : (
        <SignInButton afterSignInUrl={url} afterSignUpUrl={url} mode="modal" />
      )}
    </header>
  );
};
