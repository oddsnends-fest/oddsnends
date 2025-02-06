"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

function BackButton() {
    const router = useRouter();

    const handleClick = () => {
        router.back(); // Go back to the previous page
    };

    return (
        <button
            onClick={handleClick}
            className="fixed top-4 left-4 text-black bg-transparent border-black border-2 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black hover:text-white z-30"
        >
            ←
        </button>
    );
};

export default BackButton;