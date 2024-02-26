"use client";

import React from "react";
import Link from "next/link";
import Signout from "./Signout";
import { useSession } from "next-auth/react";
// import { ModeToggle } from "./ModeToggle";

const Navbar = () => {
  const { data: session, status } = useSession();
  return (
    <div className="sticky top-0 flex items-center justify-between h-16 px-3 bg-purple-600 border-t-2 border-purple-600 ">
      <Link href="/">
        <span className="text-2xl font-semibold text-yellow-300 md:text-3xl">
          Odyssey
        </span>
      </Link>
      {/* <ModeToggle /> */}
      {session && <Signout />}
    </div>
  );
};

export default Navbar;
