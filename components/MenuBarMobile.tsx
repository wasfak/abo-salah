"use client";
import React from "react";
import Link from "next/link";
import { FiMenu as Icon } from "react-icons/fi";
import { FaUser } from "react-icons/fa";

type SideBarProps = {
  setter: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MenuBarMobile({ setter }: SideBarProps) {
  return (
    <nav className="md:hidden z-20 fixed top-0 left-0 right-0 h-[60px] bg-black flex [&>*]:my-auto px-2">
      <button
        className="text-4xl flex text-white"
        onClick={() => {
          setter((oldVal) => !oldVal);
        }}
      >
        <Icon />
      </button>
      <Link href="/" className="mx-auto">
        {/*eslint-disable-next-line*/}
      </Link>
      <Link className="text-3xl flex text-white" href="/login">
        <FaUser />
      </Link>
    </nav>
  );
}
