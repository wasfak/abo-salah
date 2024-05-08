"use client";
import logo from "../public/logo.png";
import Link from "next/link";
import Humburg from "./Humburg";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function NavLast() {
  const path = usePathname();
  return (
    <div className="flex items-center justify-between max-w-7xl bg-black text-white mx-auto">
      <Link href="/" className="flex items-center gap-1">
        <Image src={logo} alt="logo" width={40} height={40} />
        <span className="font-bold">Logo</span>
      </Link>
      <div className="flex w-[200px] items-center justify-center gap-4 font-semibold">
        <Link
          href="/"
          className={
            path === "/"
              ? "font-bold text-red-800 transition-all duration-300 ease-in-out"
              : ""
          }
        >
          Home
        </Link>
        <Link
          href="/dashboard/notes"
          className={
            path === "/dashboard/notes"
              ? "font-bold text-red-800 transition-all duration-300 ease-in-out"
              : ""
          }
        >
          Dashboard
        </Link>
      </div>
      <Humburg />
    </div>
  );
}
