"use client";

import { useState, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { RotateCcw, Check, PenTool } from "lucide-react"; // Import Lucide icons

export default function Signature({
  imageSignatureUrl,
  setImageSignatureUrl,
}: {
  imageSignatureUrl: string | null;
  setImageSignatureUrl: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const sigCanvas = useRef<SignatureCanvas | null>(null);
  // const [imageSignatureUrl, setImageSignatureUrl] = useState<string | null>(
  //   null,
  // );
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to clear only the signature in the modal
  const resetSignatureInModal = () => {
    sigCanvas.current?.clear();
  };

  // Function to save the signature as an image
  const saveSignature = () => {
    if (sigCanvas.current) {
      const dataURL = sigCanvas.current
        .getTrimmedCanvas()
        .toDataURL("image/png");
      setImageSignatureUrl(dataURL);
      closeModal();
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
          {imageSignatureUrl ? (
            <img
              src={imageSignatureUrl}
              alt="Saved Signature"
              className="h-full w-full object-contain"
            />
          ) : null}
        </div>
      </div>

      {/* Modal for Signature Pad */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 backdrop-blur-sm"
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
    </div>
  );
}
