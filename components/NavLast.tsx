"use client";
import logo from "../public/logo.png";
import Link from "next/link";
import Humburg from "./Humburg";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

export default function NavLast() {
  const [mounted, setMounted] = useState(false);
  const { isSignedIn, user, isLoaded } = useUser();
  const path = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isSignedIn && (path === "/sign-in" || path === "/sign-up")) {
      window.location.href = "/";
    }
  }, [isSignedIn, path]);

  if (!mounted) {
    return null; // Return null to avoid rendering anything before the component is mounted
  }

  return (
    <div
      className={`${
        !path.includes("/dashboard")
          ? "fixed top-0 left-0 w-full bg-transparent text-[#919294] px-6 py-2 z-50 flex items-center justify-between"
          : "flex items-center justify-between max-w-full mx-auto px-6 py-2 bg-black text-white"
      }`}
    >
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt="logo" width={40} height={40} priority />
          <span className="hidden sm:block">Logo</span>
        </Link>
      </div>
      <div className="hidden md:flex items-center gap-4">
        <Link
          href="/"
          className={`transition-all duration-300 ease-in-out hover:text-white ${
            path === "/" ? "text-white" : ""
          }`}
        >
          Home
        </Link>
        <Link
          href="/dashboard"
          className={`transition-all duration-300 ease-in-out hover:text-white ${
            path === "/dashboard" ? "text-white" : ""
          }`}
        >
          Dashboard
        </Link>
      </div>
      <div className="flex items-center gap-2">
        {isLoaded && isSignedIn && <UserButton afterSignOutUrl="/" />}
        {isLoaded && !isSignedIn && (
          <Button asChild>
            <Link href="/sign-in">Login</Link>
          </Button>
        )}
      </div>
      <div className="md:hidden">
        <Humburg />
      </div>
    </div>
  );
}
