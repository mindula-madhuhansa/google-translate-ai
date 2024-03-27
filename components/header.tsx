import { SignInButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  const { userId } = auth();

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
        <SignInButton afterSignInUrl="/translate" mode="modal" />
      )}
    </header>
  );
};
