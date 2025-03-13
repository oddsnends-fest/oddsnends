"use client";
import React from "react";
import { useState, useRef } from "react";
import Image from "next/image";
import Modal from "../Modal/Modal";
import ImageCropper from "./ImageCropper/ImageCropper";

import { type PutBlobResult } from "@vercel/blob";
import { upload } from "@vercel/blob/client";
import Link from "next/link";
function PhotoUpload() {
  const photoInputRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  // cropped image base64 result from ImageCropper (can be used to process further)
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  // handle clicking the hidden input button
  const handleClickUpload = () => {
    if (photoInputRef.current) {
      // Scroll to the top of the page
      window.scrollTo({ top: 0, behavior: "smooth" });
      photoInputRef.current.click();
    }
  };

  // read the upload image and open modal for cropping
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      try {
        const reader = new FileReader(); // filereader
        reader.onload = () => {
          setUploadedImage(reader.result as string);
          setIsModalOpen(true);
        };
        reader.readAsDataURL(file);

        // const newBlob = await upload(file.name, file, {
        //   access: "public",
        //   handleUploadUrl: "/api/upload",
        // });

        // setBlob(newBlob);
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

  //convert base64 to file

  function dataURLtoFile(dataURL: string, filename: string): File {
    const arr = dataURL.split(",");
    const mime = arr[0]?.match(/:(.*?);/)![1]; // Extract MIME type
    const bstr = atob(arr[1]!); // Decode base64 string
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  // set CroppedImage to base64 data from ImageCropper
  const handleSaveCrop = async (croppedImage: string) => {
    const file = dataURLtoFile(croppedImage, "cropped-image.png");

    const newBlob = await upload(file.name, file, {
      access: "public",
      handleUploadUrl: "/api/upload",
    });

    setBlob(newBlob);
    setCroppedImage(croppedImage);
    closeModal();
    setConfirm(false);
  };

  const handleSubmitUpload = () => {
    const file = photoInputRef.current?.files?.[0];
    console.log(file);

    console.log("upload already");
  };

  return (
    <div>
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
        <div className="ml-6">
          {" "}
          {/* Added margin-left for spacing between image and text */}
          <span className="font-bold">Upload Image</span>
          <div>
            <span>*jpeg, png*</span>
          </div>
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

      {blob && (
        <div>
          uploaded photo:{" "}
          <Link target="_blank" href={blob.url}>
            {blob.url}
          </Link>
          {/* <Image src={blob.url} alt={blob.pathname} width="200" height="200" /> */}
        </div>
      )}

      {/* For testing cropped results */}
      {croppedImage && (
        <>
          <Image
            src={croppedImage}
            alt="Cropped Image"
            width={200}
            height={200}
          />
        </>
      )}
      <button onClick={handleSubmitUpload}>Upload</button>
    </div>
  );
}

export default PhotoUpload;
