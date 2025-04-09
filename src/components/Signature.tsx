"use client";

import { useState, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
// import { RotateCcw, Check, PenTool } from "lucide-react"; // Import Lucide icons
// import { upload } from "@vercel/blob/client";
import Image from "next/image";
import BackGround from "./BackgroundPhotoId";
import SponsorSection from "./SponsorSection/SponsorSection";
import SocialMediaBar from "./SocialMediaBar/SocialMediaBar";
export default function Signature({
  base64ImageUrl,
  setBase64ImageUrl,
}: {
  base64ImageUrl: string | null;
  setBase64ImageUrl: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const sigCanvas = useRef<SignatureCanvas | null>(null);
  // const [base64ImageUrl, setBase64ImageUrl] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const [blobUrl, setBlobUrl] = useState<string | null>(null);

  // refactor this function for future use convert dataUrl to blob response
  function dataURLtoBlob(dataURL: string): Blob {
    const arr = dataURL.split(",");
    const mime = arr[0]?.match(/:(.*?);/)![1]; // Extract MIME type
    const bstr = atob(arr[1]!); // Decode base64 string
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], { type: mime });
  }

  // refactor function for blob response for future use

  // function dataURLtoFile(dataURL: string, filename: string): File {
  //   const blob = dataURLtoBlob(dataURL);
  //   return new File([blob], filename, { type: blob.type });
  // }

  // const handleUploadSignature = async (base64ImageUrl: string) => {
  //   try {
  //     // Convert base64 to Blob or File
  //     const file = dataURLtoFile(base64ImageUrl, "signature.png");

  //     // Upload to Vercel Blob
  //     const newBlob = await upload(file.name, file, {
  //       access: "public",
  //       handleUploadUrl: "/api/upload",
  //     });

  //     console.log("Blob URL:", newBlob);
  //     return newBlob.url; // Return the blob URL
  //   } catch (error) {
  //     console.error("Error uploading signature:", error);
  //     return null;
  //   }
  // };

  console.log(sigCanvas.current, "sigCanvas response");

  // Function to clear only the signature in the modal
  const resetSignatureInModal = () => {
    sigCanvas.current?.clear();
  };

  // Function to save the signature as an image
  const saveSignature = async () => {
    if (!sigCanvas.current) {
      return;
    }

    const base64ImageUrl = sigCanvas.current
      .getTrimmedCanvas()
      .toDataURL("image/png"); // base64

    setBase64ImageUrl(base64ImageUrl);

    console.log(base64ImageUrl, "dataUrl");

    closeModal();
  };

  // const handleUploadandCreateBlobSignature = async () => {
  //   if (!base64ImageUrl) {
  //     alert("Please sign your name first.");
  //     return;
  //   }
  //   const url = await handleUploadSignature(base64ImageUrl);
  //   if (url) {
  //     setBlobUrl(url);
  //   }
  // };

  // Function to open modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  console.log(base64ImageUrl, "base64ImageUrl");

  return (
    <div className="col-span-1">
      {/* Signature Pad Header with PenTool Icon */}

      {/* Signature Pad Container */}
      <div className="relative rounded-md border border-gray-300">
        {/* Clickable Signature Box */}
        <div onClick={openModal} className="cursor-pointer">
          {base64ImageUrl && base64ImageUrl.length > 500 ? (
            <Image
              width={30}
              height={30}
              src={base64ImageUrl}
              alt="Saved Signature"
              className="h-[80px] w-[80px]"
            />
          ) : (
            <div className="flex items-center justify-center bg-white py-4">
              <Image
                width={40}
                height={40}
                src="/photoid/Pentool.png"
                alt="Pentool signature"
              />
            </div>
          )}
        </div>
      </div>

      {/* Modal for Signature Pad */}
      {isModalOpen && (
        <div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center"
          onClick={closeModal} // Clicking outside closes the modal
        >
          <div className="absolute top-20 mt-5">
            <h1 className="title-photoid">Your Signature</h1>
            <p className="subtitle-photoid">วาดลายเซ็นของคุณ</p>
          </div>
          <div className="absolute top-0 -z-10 h-full w-full">
            <Image
              src="/photoid/starlogo.png"
              alt="starlogo"
              width={200}
              height={200}
              className=""
            />
          </div>
          <div className="absolute top-0 mt-10">
            <Image
              src="/images/oddsnends-logo.png"
              alt=""
              width={50}
              height={50}
            />
          </div>

          <BackGround></BackGround>
          <div
            className="relative flex w-auto flex-col items-start rounded-lg bg-white"
            onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
          >
            {/* Modal Header */}

            {/* Signature Canvas */}
            <SignatureCanvas
              ref={sigCanvas}
              penColor="black"
              canvasProps={{
                width: 400,
                height: 300,
                className: "border border-gray-300 rounded-md",
              }}
            />
            <button
              onClick={resetSignatureInModal}
              className="absolute right-2 top-2"
            >
              <Image
                src="/photoid/eraser.svg"
                alt="eraser"
                width={30}
                height={30}
              />
            </button>

            {/* Buttons */}
          </div>
          <div className="mt-4 flex w-full justify-center gap-8">
            {/* Reset */}

            {/* Save */}
            <button
              onClick={saveSignature}
              style={{
                background: "linear-gradient(360deg, #553B82 0%, #B56A95 150%)",
              }}
              className="rounded-full px-20 py-2 text-white"
            >
              Next
            </button>
          </div>

          <SponsorSection />
          <SocialMediaBar />
        </div>
      )}

      {/* <button onClick={handleUploadandCreateBlobSignature}>Upload</button> */}
    </div>
  );
}
