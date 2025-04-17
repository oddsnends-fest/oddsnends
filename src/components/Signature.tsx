"use client";

import React, { useState, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { RotateCcw, Check, PenTool } from "lucide-react"; // Import Lucide icons

type SignatureProps = {
  signatureURL: string;
  setSignatureURL: React.Dispatch<React.SetStateAction<string>>;
}

export default function Signature({signatureURL, setSignatureURL}: SignatureProps) {
  const sigCanvas = useRef<SignatureCanvas | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to clear only the signature in the modal
  const resetSignatureInModal = () => {
    sigCanvas.current?.clear();
  };

  // Function to save the signature as an image
  const saveSignature = () => {
    if (sigCanvas.current) {
      const dataURL = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
      setSignatureURL(dataURL);
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
      <div className="flex items-center gap-2 text-left mb-2">
        <p className="text-[22px] font-medium">Signature</p>
        <PenTool size={22} className="text-gray-700 transform " />
      </div>

      {/* Signature Pad Container */}
      <div className="relative w-[350px] h-[80px] border border-gray-300 rounded-md p-4">
        {/* Clickable Signature Box */}
        <div onClick={openModal} className="cursor-pointer w-full h-full">
          {signatureURL ? (
            <img src={signatureURL} alt="Saved Signature" className="w-full h-full object-contain" />
          ) : null}
        </div>
      </div>

      {/* Modal for Signature Pad */}
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center backdrop-blur-sm"
            onClick={closeModal} // Clicking outside closes the modal
          >
            <div 
              className="flex flex-col items-start w-auto bg-white rounded-lg p-4"
              onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
            >
              {/* Modal Header */}
              <div className="flex items-center gap-2 text-left mb-4 px-4">
                <p className="text-[22px] font-medium">Signature</p>
                <PenTool size={22} className="text-gray-700 transform" />
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
              <div className="flex justify-center gap-8 mt-4">
                {/* Reset */}
                <button
                  onClick={resetSignatureInModal}
                  className="p-3 bg-gray-800 text-white rounded-full"
                >
                  <RotateCcw size={24} />
                </button>

                {/* Save */}
                <button
                  onClick={saveSignature}
                  className="p-3 bg-gray-800 text-white rounded-full"
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
