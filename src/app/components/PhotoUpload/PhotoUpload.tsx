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
                    className="ml-6"
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
