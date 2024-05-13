"use client";
import React, { useState } from "react";
import Link from "next/link";
import { AiFillProduct } from "react-icons/ai";
import { MdFiberNew } from "react-icons/md";

import { SlHome } from "react-icons/sl";
import { BsInfoSquare, BsEnvelopeAt } from "react-icons/bs";
import { FaRedhat } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { FcShop } from "react-icons/fc";

import { Plus } from "lucide-react";

type SideBarProps = {
  show: boolean;
  setter: React.Dispatch<React.SetStateAction<boolean>>;
};

type MenuItemsProps = {
  name: string;
  route: string;
  icon: any;
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
    "bg-[#8cd9c4] text-black w-[250px] transition-[margin-left] ease-in-out duration-500 fixed md:static top-0 bottom-0 left-0 z-40";
  // Append class based on state of sidebar visiblity
  const appendClass = show ? " ml-0" : " ml-[-250px] md:ml-0";

  // Clickable menu items
  const MenuItem = ({ icon, name, route }: MenuItemsProps) => {
    // Highlight menu item based on currently displayed route
    const colorClass =
      path === route ? "text-white" : "text-black hover:text-white";

    return (
      <Link
        href={route}
        onClick={() => {
          setter((oldVal) => !oldVal);
        }}
        className={`flex gap-1  [&>*]:my-auto text-md pl-6 py-3 border-b-[1px] border-b-white/10 ${colorClass}`}
      >
        <div className="text-xl flex [&>*]:mx-auto w-[30px]">{icon}</div>
        <div>{name}</div>
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
          <MenuItem name="Home Page" route="/" icon={<SlHome />} />
          <div className="flex items-center justify-between">
            <MenuItem
              name="Products"
              route="/dashboard/products"
              icon={<AiFillProduct />}
            />
            <span
              className="text-xl text-center my-2"
              onClick={toggleProductsDropdown}
            >
              <Plus className="hover:cursor-pointer" />
            </span>
          </div>
          {showProductsDropdown && (
            <div className="flex flex-col pl-4">
              <MenuItem
                name="Add Product"
                route="/dashboard/products/new"
                icon={<MdFiberNew />}
              />
            </div>
          )}
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

          {/*     <MenuItem name="About Us" route="/about" icon={<BsInfoSquare />} />
          <MenuItem name="Contact" route="/contact" icon={<BsEnvelopeAt />} /> */}
        </div>
      </div>
      {show ? <ModalOverlay /> : <></>}
    </>
  );
}
