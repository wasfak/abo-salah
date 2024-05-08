"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Humburg() {
  const path = usePathname();
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetDescription className="text-left flex gap-y-6 justify-evenly flex-col">
            <Link
              href="/dashboard/notes"
              className={
                path === "/dashboard/notes"
                  ? "font-bold text-red-800 text-lg transition-all duration-300 ease-in-out hover:text-gray-500 "
                  : "font-bold text-black text-lg leading-5 hover:text-gray-500 transition-all duration-300 ease-in-out tracking-widest"
              }
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/notes"
              className={
                path === "/dashboard/notes"
                  ? "font-bold text-red-800 text-lg transition-all duration-300 ease-in-out "
                  : "font-bold text-black text-lg leading-5"
              }
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/notes"
              className={
                path === "/dashboard/notes"
                  ? "font-bold text-red-800 text-lg transition-all duration-300 ease-in-out "
                  : "font-bold text-black text-lg leading-5"
              }
            >
              Dashboard
            </Link>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
