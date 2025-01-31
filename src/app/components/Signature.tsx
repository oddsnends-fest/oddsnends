"use client";

import { useState, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { RotateCcw, Check, Trash } from "lucide-react"; // Import Lucide icons

export default function Signature() {
  const sigCanvas = useRef<SignatureCanvas | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to clear only the signature in the modal
  const resetSignatureInModal = () => {
    sigCanvas.current?.clear();
  };

  // Function to save the signature as an image
  const saveSignature = () => {
    if (sigCanvas.current) {
      const dataURL = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
      setImageURL(dataURL);
      console.log(dataURL.search("png"))
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
      {/* Signature Pad Header with Delete Button */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-[22px]">Signature Box</p>
      </div>

      {/* Signature Pad Container */}
      <div className="relative w-[350px] h-[80px] border border-gray-300 rounded-md p-4">
        {/* Clickable Signature Box */}
        <div onClick={openModal} className="cursor-pointer w-full h-full">
          {imageURL ? (
            <img src={imageURL} alt="Saved Signature" className="w-full h-full object-contain" />
          ) : null}
        </div>
      </div>

      {/* Modal for Signature Pad */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg p-[4px] w-auto max-w-[410px] h-[160px]"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
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
              {/* Reset (Only clears modal signature) */}
              <button
                onClick={resetSignatureInModal}
                className="p-3 bg-[#353535] text-white rounded-full"
              >
                <RotateCcw size={24} />
              </button>

              {/* Save */}
              <button
                onClick={saveSignature}
                className="p-3 bg-[#353535] text-white rounded-full"
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
