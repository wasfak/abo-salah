"use client";
import logo from "../public/logo.png";
import Link from "next/link";
import Humburg from "./Humburg";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

export default function NavLast() {
  const path = usePathname();
  return (
    <div className="flex items-center justify-between max-w-full bg-black text-white mx-auto px-4 py-2">
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt="logo" width={40} height={40} priority />
          <span className=" hidden sm:block">Logo</span>
        </Link>
      </div>
      <div className="flex w-full items-center justify-center gap-4 hidden md:flex">
        <Link
          href="/"
          className={`transition-all duration-300 ease-in-out ${
            path === "/" ? " text-red-800" : ""
          }`}
        >
          Home
        </Link>
        <Link
          href="/dashboard"
          className={`transition-all duration-300 ease-in-out ${
            path === "/dashboard" ? " text-red-800" : ""
          }`}
        >
          Dashboard
        </Link>
      </div>
      <div className="hidden md:flex items-center gap-2">
        <SignedIn>
          <div className="flex items-center gap-2">
            <UserButton afterSignOutUrl="/" />
          </div>
        </SignedIn>
        <SignedOut>
          <Button asChild>
            <Link href="/sign-in">Login</Link>
          </Button>
        </SignedOut>
      </div>
      <div className="flex md:hidden">
        <Humburg />
      </div>
    </div>
  );
}
