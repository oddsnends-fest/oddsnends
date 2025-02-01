"use client"
import React from "react";
import { useRef } from "react";
import Image from "next/image";

function PhotoUpload() {
    const photoInputRef = useRef<HTMLInputElement>(null);

    const handleClickUpload = () => {
        if (photoInputRef.current) {
            photoInputRef.current.click();
        }
    };

    return (
        <>
            {/* Grid Layout */}
            <div
                className="grid grid-cols-[1fr,2fr] grid-rows-2 gap-x-2 p-2 text-black bg-white cursor-pointer"
                onClick={handleClickUpload}
            >
                {/* Left Column (Spanning 2 rows) */}
                <div
                    className="row-span-2 flex justify-center items-center"
                >
                    <Image
                        src="/images/camera.png"
                        alt="Upload"
                        width={64}
                        height={64}
                        className="h-4/5 w-auto" // Fill height 80% and maintain aspect ratio for width
                    />
                </div>

                {/* Right Column */}
                <div>
                    <span
                        className="font-bold"
                    >Upload Image</span>
                </div>
                <div>
                    <span>*jpeg, png*</span>
                </div>
            </div>

            <input
                type="file"
                accept="image/jpeg, image/png, image/jpg"
                className="hidden"
                ref={photoInputRef}
            />
        </>
    );
}

export default PhotoUpload;