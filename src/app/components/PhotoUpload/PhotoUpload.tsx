"use client"
import React from "react";
import { useState, useRef } from "react";
import Image from "next/image";
import Modal from "../Modal/Modal";

function PhotoUpload() {
    const photoInputRef = useRef<HTMLInputElement>(null);
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);          // Zoom level of the image

    const handleClickUpload = () => {
        if (photoInputRef.current) {
            photoInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                const reader = new FileReader();
                reader.onload = () => {
                    setUploadedImage(reader.result as string);
                    setIsModalOpen(true);
                };
                reader.readAsDataURL(file);
            }
            catch (error) {
                console.error(error);
            }
        }

        // Reset the input value to allow uploading the same file again
        if (photoInputRef.current) {
            photoInputRef.current.value = "";
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setUploadedImage(null);
    };

    const handleClickRefresh = () => {
        closeModal();
        console.log("refesh");
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

            {/* Modal for Cropping Image */}
            {isModalOpen && (
                <Modal
                // onClick={closeModal}
                >
                    {uploadedImage && (
                        <>
                            <div
                                className="flex flex-col justify-center items-center gap-4 p-4 text-black"
                            >
                                <h1
                                    className="font-bold text-3xl"
                                >
                                    Crop Your Image
                                </h1>
                                <div
                                    className="bg-white rounded-lg p-4"
                                >
                                    <Image
                                        src={uploadedImage}
                                        alt="Uploaded Image"
                                        width={1440}
                                        height={1440}
                                    />
                                </div>
                                <div
                                    className="flex gap-4 justify-center"
                                >
                                    <button
                                        onClick={handleClickRefresh}
                                        className="text-white font-bold bg-black border-black border-2 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-400 hover:text-white hover:border-gray-400"
                                    >
                                        ↻
                                    </button>
                                    <button
                                        className="text-white font-bold bg-black border-black border-2 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-400 hover:text-white hover:border-gray-400"
                                    >
                                        ✓
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </Modal>
            )}

            <input
                type="file"
                accept="image/jpeg, image/png, image/jpg"
                className="hidden"
                ref={photoInputRef}
                onChange={handleFileChange}
            />
        </>
    );
}

export default PhotoUpload;