"use client";

import { useState, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { RotateCcw, Check, PenTool } from "lucide-react"; // Import Lucide icons
import { upload } from "@vercel/blob/client";
import Image from "next/image";

export default function Signature() {
  const sigCanvas = useRef<SignatureCanvas | null>(null);
  const [base64ImageUrl, setBase64ImageUrl] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [blobUrl, setBlobUrl] = useState<string | null>(null);

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

  function dataURLtoFile(dataURL: string, filename: string): File {
    const blob = dataURLtoBlob(dataURL);
    return new File([blob], filename, { type: blob.type });
  }

  const handleUploadSignature = async (base64ImageUrl: string) => {
    try {
      // Convert base64 to Blob or File
      const file = dataURLtoFile(base64ImageUrl, "signature.png");

      // Upload to Vercel Blob
      const newBlob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/upload",
      });

      console.log("Blob URL:", newBlob);
      return newBlob.url; // Return the blob URL
    } catch (error) {
      console.error("Error uploading signature:", error);
      return null;
    }
  };

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

  const handleUploadandCreateBlobSignature = async () => {
    if (!base64ImageUrl) {
      alert("Please sign your name first.");
      return;
    }
    const url = await handleUploadSignature(base64ImageUrl);
    if (url) {
      setBlobUrl(url);
    }
  };

  // Function to open modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Signature Pad Header with PenTool Icon */}
      <div className="mb-2 flex items-center gap-2 text-left">
        <p className="text-[22px] font-medium">Signature</p>
        <PenTool size={22} className="transform text-gray-700" />
      </div>

      {/* Signature Pad Container */}
      <div className="relative h-[80px] w-[350px] rounded-md border border-gray-300 p-4">
        {/* Clickable Signature Box */}
        <div onClick={openModal} className="h-full w-full cursor-pointer">
          {base64ImageUrl ? (
            <img
              src={base64ImageUrl}
              alt="Saved Signature"
              className="h-full w-full object-contain"
            />
          ) : null}
        </div>
      </div>

      {/* Modal for Signature Pad */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-20 flex items-center justify-center overflow-hidden bg-white bg-opacity-50 backdrop-blur-sm"
          onClick={closeModal} // Clicking outside closes the modal
        >
          <div
            className="flex w-auto flex-col items-start rounded-lg bg-white p-4"
            onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
          >
            {/* Modal Header */}
            <div className="mb-4 flex items-center gap-2 px-4 text-left">
              <p className="text-[22px] font-medium">Signature</p>
              <PenTool size={22} className="transform text-gray-700" />
            </div>

            {/* Signature Canvas */}
            <SignatureCanvas
              ref={sigCanvas}
              penColor="black"
              canvasProps={{
                width: 400,
                height: 150,
                className: "border border-gray-300 rounded-md",
              }}
            />

            {/* Buttons */}
            <div className="mt-4 flex justify-center gap-8">
              {/* Reset */}
              <button
                onClick={resetSignatureInModal}
                className="rounded-full bg-gray-800 p-3 text-white"
              >
                <RotateCcw size={24} />
              </button>

              {/* Save */}
              <button
                onClick={saveSignature}
                className="rounded-full bg-gray-800 p-3 text-white"
              >
                <Check size={24} />
              </button>
            </div>
          </div>
        </div>
      )}
      <button onClick={handleUploadandCreateBlobSignature}>Upload</button>
    </div>
  );
}
