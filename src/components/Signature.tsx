"use client";

import { useState, useRef, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
// import { RotateCcw, Check, PenTool } from "lucide-react"; // Import Lucide icons
// import { upload } from "@vercel/blob/client";
import Image from "next/image";
import BackGround from "./BackgroundPhotoId";
import SponsorSection from "./SponsorSection/SponsorSection";
import SocialMediaBar from "./SocialMediaBar/SocialMediaBar";
import Header from "./Header/Header";
import { redirect } from "next/navigation";
export default function Signature({
  base64ImageUrl,
  setBase64ImageUrl,
}: {
  base64ImageUrl: string | null;
  setBase64ImageUrl: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const sigCanvas = useRef<SignatureCanvas | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
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

    // console.log(base64ImageUrl, "dataUrl");

    closeModal();
  };

  // Function to open modal
  const openModal = () => {
    setIsModalOpen(true);
    localStorage.setItem("isModalOpenSignature", "true");
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // console.log(base64ImageUrl, "base64ImageUrl");

  return (
    <div className="col-span-1">
      {/* Signature Pad Header with PenTool Icon */}
      {isModalOpen && (
        <button
          className="absolute left-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#3D245B]"
          onClick={closeModal}
        >
          ←
        </button>
      )}
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
              className="h-[80px] w-full rounded-lg bg-white px-2 py-2"
            />
          ) : (
            <div className="flex items-center justify-center rounded-lg bg-white py-4">
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
          // Clicking outside closes the modal ==> onClick = {closeModal}
        >
          <div className="absolute top-24 mt-10">
            <h1 className="title-photoid">Your Signature</h1>
            <p className="subtitle-photoid">วาดลายเซ็นของคุณ</p>
          </div>
          <div className="absolute inset-0 top-0 -z-10">
            <Image
              src="/photoid/starlogo.png"
              alt="starlogo"
              width={200}
              height={200}
              className="h-full w-full"
            />
          </div>
          <div className="absolute top-0">
            <Header />
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
                width: 330,
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
              className="rounded-full bg-purple-gradient px-20 py-2 text-white"
            >
              Next
            </button>
          </div>
          <div className="absolute bottom-16">
            <SponsorSection />
          </div>

          <SocialMediaBar />
        </div>
      )}

      {/* <button onClick={handleUploadandCreateBlobSignature}>Upload</button> */}
    </div>
  );
}
