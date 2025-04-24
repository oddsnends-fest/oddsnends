"use client";
import React from "react";
import { useState, useRef } from "react";
import Image from "next/image";
// import Modal from "../Modal/Modal";
import ImageCropper from "./ImageCropper/ImageCropper";

import { type PutBlobResult } from "@vercel/blob";
import { upload } from "@vercel/blob/client";
// import Link from "next/link";
import BackGround from "../BackgroundPhotoId";
import SponsorSection from "../SponsorSection/SponsorSection";
import SocialMediaBar from "../SocialMediaBar/SocialMediaBar";
import Header from "../Header/Header";
function PhotoUpload({
  croppedImage,
  setCroppedImage,
}: {
  croppedImage: string | null;
  setCroppedImage: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const photoInputRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  // cropped image base64 result from ImageCropper (can be used to process further)
  // const [croppedImage, setCroppedImage] = useState<string | null>(null);

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
    setCroppedImage(croppedImage);
    closeModal();
    setConfirm(false);
  };

  const handleSubmitUpload = async (croppedImage: string) => {
    if (!croppedImage) {
      alert("Please crop and choose the image before uploading.");
      return;
    }

    const file = dataURLtoFile(croppedImage, "cropped-image.png");

    const newBlob = await upload(file.name, file, {
      access: "public",
      handleUploadUrl: "/api/upload",
    });

    setBlob(newBlob);

    // console.log("upload already");
  };

  return (
    <div className="">
      {/* Image + Text aligned horizontally */}
      {!croppedImage && (
        <button
          className="relative inline-block rounded-lg border bg-white p-4"
          onClick={handleClickUpload}
        >
          <div className="flex items-center justify-center">
            <Image
              src="/photoid/add_photo_alternate-2.png"
              alt="Upload"
              width={40}
              height={40}

              // Fill height 80% and maintain aspect ratio for width
            />
          </div>

          <div className="ml-6">
            {" "}
            {/* Added margin-left for spacing between image and text */}
            {/* <span className="font-bold">Upload Image</span>
            <div>
              <span>*jpeg, png*</span>
            </div> */}
          </div>
        </button>
      )}

      {isModalOpen && (
        <button
          className="absolute left-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#3D245B]"
          onClick={closeModal}
        >
          ←
        </button>
      )}

      {/* Modal for Cropping Image */}
      {isModalOpen && (
        <div className="absolute inset-0 top-0 z-20 flex flex-col items-center justify-center">
          <div className="absolute top-0">
            <Header />
          </div>

          <BackGround />
          <Image
            className="absolute -z-10 h-full w-full"
            src="/photoid/starlogo.png"
            alt="starlogo"
            width={200}
            height={200}
          />
          <div className="mt-2 flex w-full flex-col justify-center">
            <h1 className="title-photoid">Your ID Photo</h1>
            <p className="subtitle-photoid">ตกแต่งรูปถ่ายของคุณ</p>
          </div>
          {uploadedImage && (
            <div className="flex flex-col items-center justify-center gap-4 p-4 text-black">
              <div className="relative flex h-[400px] w-[300px] items-center justify-center rounded-lg bg-white">
                <ImageCropper
                  src={uploadedImage}
                  onSaveCrop={handleSaveCrop}
                  confirm={confirm}
                />
                <button
                  onClick={handleClickRefresh}
                  className="absolute right-2 top-2 rounded-full px-4 py-2"
                >
                  <Image
                    src="/photoid/Refresh.png"
                    alt="refresh"
                    width={20}
                    height={20}
                  />
                </button>
              </div>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleClickConfirm}
                  className="cursor-pointer rounded-full bg-purple-gradient px-20 py-2 text-white"
                >
                  NEXT
                </button>
              </div>
            </div>
          )}

          <div className="absolute -bottom-6 -z-10">
            <SponsorSection />
          </div>
          {/* COrrect */}

          <SocialMediaBar />
        </div>
      )}

      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/jpeg, image/png, image/jpg"
        className="hidden"
        ref={photoInputRef}
        onChange={handleFileChange}
      />

      {/* {blob && (
        <div>
          uploaded photo:{" "}
          <Link target="_blank" href={blob.url}>
            {blob.url}
          </Link>
         
        </div>
      )} */}

      {/* For testing cropped results */}
      {croppedImage && (
        <div className="relative z-0 h-full w-full" onClick={handleClickUpload}>
          <Image
            src={croppedImage}
            alt="Cropped Image"
            width={80}
            height={80}
            quality={1.0}
            className="-z-20 rounded-lg object-contain"
          />
        </div>
      )}
      {/* <button onClick={() => handleSubmitUpload(croppedImage || "")}>
        Upload
      </button> */}
    </div>
  );
}

export default PhotoUpload;
