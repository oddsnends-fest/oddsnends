"use client"
import React from "react";
import { useState, useRef } from "react";
import Image from "next/image";
import Modal from "../Modal/Modal";
import ImageCropper from "./ImageCropper/ImageCropper";

function PhotoUpload() {
    const photoInputRef = useRef<HTMLInputElement>(null);
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [confirm, setConfirm] = useState(false);
    // cropped image base64 result from ImageCropper (can be used to process further)
    const [croppedImage, setCroppedImage] = useState<string | null>(null);

    // handle clicking the hidden input button
    const handleClickUpload = () => {
        if (photoInputRef.current) {
            // Scroll to the top of the page
            window.scrollTo({ top: 0, behavior: 'smooth' });
            photoInputRef.current.click();
        }
    };

    // read the upload image and open modal for cropping
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

    // close the modal and reset the uploaded image data
    const closeModal = () => {
        setIsModalOpen(false);
        setUploadedImage(null);
    };

    const handleClickRefresh = () => {
        closeModal();
    };

    // set confirm to true => trigger cropped image save in ImageCropper
    const handleClickConfirm = () => {
        setConfirm(true);
    }

    // set CroppedImage to base64 data from ImageCropper
    const handleSaveCrop = (croppedImage: string) => {
        setCroppedImage(croppedImage);
        closeModal();
        setConfirm(false);
    };

    return (
        <>
            {/* Image + Text aligned horizontally */}
            <div
                className="flex items-center justify-center"
                onClick={handleClickUpload}
            >
                <Image
                    src="/images/camera.png"
                    alt="Upload"
                    width={64}
                    height={64}
                    className="h-4/5 w-auto" // Fill height 80% and maintain aspect ratio for width
                />
                <div
                    className="ml-2"
                > {/* Added margin-left for spacing between image and text */}
                    <span
                        className="font-bold"
                    >
                        Upload Image
                    </span>
                    <div>
                        <span>*jpeg, png*</span>
                    </div>
                </div>
            </div>

            {/* Modal for Cropping Image */}
            {isModalOpen && (
                <Modal
                    className="flex items-center justify-center max-h-screen"
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
                                    <ImageCropper
                                        src={uploadedImage}
                                        onSaveCrop={handleSaveCrop}
                                        confirm={confirm}
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
                                        onClick={handleClickConfirm}
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

            {/* Hidden File Input */}
            <input
                type="file"
                accept="image/jpeg, image/png, image/jpg"
                className="hidden"
                ref={photoInputRef}
                onChange={handleFileChange}
            />
            {/* For testing cropped results */}
            {/* {croppedImage && (
                <>
                    <Image
                        src={croppedImage}
                        alt="Cropped Image"
                        width={1440}
                        height={1440}
                    />
                </>
            )} */}
        </>
    );
}

export default PhotoUpload;