"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

function BackButton({ onClick }: { onClick?: () => void }) {
  const router = useRouter();
  const pathName = usePathname();

  const isPhotoidRoute = pathName.split("/").includes("photoid");

  const handleClick = () => {
    router.back(); // Go back to the previous page
  };

  return (
    <button
      onClick={onClick ?? handleClick}
      className={
        isPhotoidRoute
          ? "absolute left-5 top-5 z-30 flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#3D245B] text-[1.5rem] text-[#3D245B] hover:bg-[#3D245B] hover:text-white"
          : "absolute left-5 top-5 z-30 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-transparent text-[1.5rem] text-white hover:bg-white hover:text-black"
      }
    >
      <ArrowLeft className="size-5 bg-transparent text-inherit" />
    </button>
  );
}

export default BackButton;
