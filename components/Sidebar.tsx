"use client";
import React, { useState } from "react";
import Link from "next/link";
import { AiFillProduct } from "react-icons/ai";
import { MdFiberNew } from "react-icons/md";

import { SlHome } from "react-icons/sl";
import { AiFillSkin } from "react-icons/ai";
import { AiFillTruck } from "react-icons/ai";
import { AiFillHome } from "react-icons/ai";

import { FaRedhat } from "react-icons/fa";
import { usePathname } from "next/navigation";

import { Plus } from "lucide-react";

type SideBarProps = {
  show: boolean;
  setter: React.Dispatch<React.SetStateAction<boolean>>;
};

type MenuItemsProps = {
  name: string;
  route: string;
  icon: any;
  className?: string;
};

export default function Sidebar({ show, setter }: SideBarProps) {
  const path = usePathname();
  const [showProductsDropdown, setShowProductsDropdown] = useState(false);
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);

  const toggleProductsDropdown = () => {
    setShowProductsDropdown(!showProductsDropdown);
  };

  const toggleCategoriesDropdown = () => {
    setShowCategoriesDropdown(!showCategoriesDropdown);
  };

  // Define our base class
  const className =
    "bg-[#ebebeb] text-sm font-semibold text-black w-[250px] transition-[margin-left] ease-in-out duration-500 fixed md:static top-0 bottom-0 left-0 z-40 ";

  const appendClass = show ? " ml-0" : " ml-[-250px] md:ml-0";

  // Clickable menu items
  const MenuItem = ({ icon, name, route, className }: MenuItemsProps) => {
    // Highlight menu item based on currently displayed route
    const colorClass =
      path === route ? "text-[#327bdb] " : "text-black hover:text-gray-600";

    return (
      <Link
        href={route}
        onClick={() => {
          setter((oldVal) => !oldVal);
        }}
        className={`flex gap-2 items-center [&>*]:my-auto text-md pl-6 py-3 border-b-[1px] border-b-white/10 ${colorClass}`}
      >
        <div className="text-xl flex [&>*]:mx-auto w-[20px]">{icon}</div>
        <p className={`${className}`}>{name}</p>
      </Link>
    );
  };

  // Overlay to prevent clicks in background, also serves as our close button
  const ModalOverlay = () => (
    <div
      className={`flex md:hidden fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-30`}
      onClick={() => {
        setter((oldVal) => !oldVal);
      }}
    />
  );

  return (
    <>
      <div className={`${className} ${appendClass}`}>
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <MenuItem
              name="Products"
              route="/dashboard/products"
              icon={<AiFillSkin />}
            />
            <span
              className="text-xl text-center my-2"
              onClick={toggleProductsDropdown}
            >
              <Plus className="hover:cursor-pointer" />
            </span>
          </div>
          {showProductsDropdown && (
            <div className="flex flex-col pl-4 text-sm">
              <MenuItem
                name="Add Product"
                route="/dashboard/products/new"
                icon={<MdFiberNew />}
                className="text-black"
              />
            </div>
          )}
          <MenuItem name="Orders" route="/" icon={<AiFillTruck />} />

          <div className="flex items-center justify-between">
            <MenuItem
              name="Categories"
              route="/dashboard/categories"
              icon={<FaRedhat />}
            />
            <span
              className="text-xl text-center my-2"
              onClick={toggleCategoriesDropdown}
            >
              <Plus className="hover:cursor-pointer" />
            </span>
          </div>
          {showCategoriesDropdown && (
            <div className="flex flex-col pl-4">
              <MenuItem
                name="Add Category"
                route="/dashboard/categories/new"
                icon={<MdFiberNew />}
              />
            </div>
          )}
          <MenuItem name="Home" route="/" icon={<AiFillHome />} />
        </div>
      </div>
      {show ? <ModalOverlay /> : <></>}
    </>
  );
}
