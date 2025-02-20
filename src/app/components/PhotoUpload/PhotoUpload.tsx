"use client";
import React from "react";
import { useState, useRef } from "react";
import Image from "next/image";
import Modal from "../Modal/Modal";
import ImageCropper from "./ImageCropper/ImageCropper";
// import useUploadImage from "@/hooks/useUploadImage";
// upload photo // click tick consider functuoon
function PhotoUpload({
  setCroppedImage,
}: {
  setCroppedImage: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const photoInputRef = useRef<HTMLInputElement>(null);

  const [confirm, setConfirm] = useState(false);
  // cropped image base64 result from ImageCropper (can be used to process further)

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  // modal state to open and close modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  //   console.log(croppedImage, "croppedImage from hook");
  // handle clicking the hidden input button
  const handleClickUpload = () => {
    if (photoInputRef.current) {
      // Scroll to the top of the page
      window.scrollTo({ top: 0, behavior: "smooth" });
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
      } catch (error) {
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
  };

  // set CroppedImage to base64 data from ImageCropper
  const handleSaveCrop = (croppedImage: string) => {
    setCroppedImage(croppedImage);
    console.log(croppedImage[0], "croppedImage from PhotoUpload");
    //   ==> success to display the result
    closeModal();
    setConfirm(false);
  };

  return (
    <>
      {/* Grid Layout */}
      <div
        className="grid cursor-pointer grid-cols-[1fr,2fr] grid-rows-2 gap-x-2 bg-white p-2 text-black"
        onClick={handleClickUpload}
      >
        {/* Left Column (Spanning 2 rows) */}
        <div className="row-span-2 flex items-center justify-center">
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
          <span className="font-bold">Upload Image</span>
        </div>
        <div>
          <span>*jpeg, png*</span>
        </div>
      </div>

      {/* Modal for Cropping Image */}
      {isModalOpen && (
        <Modal className="flex max-h-screen items-center justify-center">
          {uploadedImage && (
            <>
              <div className="flex flex-col items-center justify-center gap-4 p-4 text-black">
                <h1 className="text-3xl font-bold">Crop Your Image</h1>
                <div className="rounded-lg bg-white p-4">
                  <ImageCropper
                    src={uploadedImage}
                    onSaveCrop={handleSaveCrop}
                    confirm={confirm}
                  />
                </div>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={handleClickRefresh}
                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-black font-bold text-white hover:border-gray-400 hover:bg-gray-400 hover:text-white"
                  >
                    ↻
                  </button>
                  <button
                    onClick={handleClickConfirm}
                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-black font-bold text-white hover:border-gray-400 hover:bg-gray-400 hover:text-white"
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
