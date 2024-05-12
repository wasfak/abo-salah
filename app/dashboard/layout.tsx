"use client";
import MenuBarMobile from "@/components/MenuBarMobile";
import Sidebar from "@/components/Sidebar";
import React, { useState } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Mobile sidebar visibility state
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <div className="min-h-screen">
        <div className="flex">
          <MenuBarMobile setter={setShowSidebar} />
          <Sidebar show={showSidebar} setter={setShowSidebar} />
          <div className="flex flex-col flex-grow w-screen md:w-full min-h-screen">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
