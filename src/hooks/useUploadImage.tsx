"use client";
import { useState } from "react";

export default function useUploadImage() {
  // cropped image base64 result from ImageCropper (can be used to process further)
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [imageSignatureUrl, setImageSignatureUrl] = useState<string | null>(
    null,
  );
  // console.log(croppedImage, "croppedImage from hooks");
  return {
    croppedImage,
    setCroppedImage,
    imageSignatureUrl,
    setImageSignatureUrl,
  };
}
