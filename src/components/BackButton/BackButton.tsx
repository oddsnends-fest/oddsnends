"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";

function BackButton() {
  const router = useRouter();
  const pathName = usePathname();

  const isPhotoidRoute = pathName.split("/").includes("photoid");

  const handleClick = () => {
    router.back(); // Go back to the previous page
  };

  return (
    <button
      onClick={handleClick}
      className={
        isPhotoidRoute
          ? "absolute left-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#3D245B] text-[1.5rem]"
          : "absolute left-5 top-5 z-30 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-transparent text-[1.5rem] text-white hover:bg-black hover:text-white"
      }
    >
      ←
    </button>
  );
}

export default BackButton;
