"use client";
import React from "react";
import { useRouter } from "next/navigation";

function BackButton() {
  const router = useRouter();

  const handleClick = () => {
    router.back(); // Go back to the previous page
  };

  return (
    <button
      onClick={handleClick}
      className="fixed left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-transparent text-black hover:bg-black hover:text-white"
    >
      ←
    </button>
  );
}

export default BackButton;
