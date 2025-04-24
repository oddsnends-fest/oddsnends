"use client";
import React from "react";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  type Crop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";

interface ImageCropperProps {
  src: string;
  onSaveCrop: (croppedImage: string) => void;
  confirm: boolean;
}

function ImageCropper({ src, onSaveCrop, confirm }: ImageCropperProps) {
  const [crop, setCrop] = useState<Crop>();
  const [croppedArea, setCroppedArea] = useState<Crop | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // set initial crop area to center of the image and aspect ratio 4:5
  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth: width, naturalHeight: height } = e.currentTarget;

    const crop = centerCrop(
      makeAspectCrop(
        {
          unit: "%",
          width: 90,
        },
        4 / 5, // Set the aspect ratio to 4:5
        width,
        height,
      ),
      width,
      height,
    );

    setCrop(crop);
  };

  // save crop area data each time the user move / resize the crop area
  const handleCropComplete = (c: Crop) => {
    setCroppedArea(c);
  };

  // helper for useEffect to generate cropped image
  const generateCroppedImage = useCallback(() => {
    if (!croppedArea || !imgRef.current) {
      return;
    }

    const canvas = document.createElement("canvas");
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;

    const TARGET_HEIGHT = 100; // 6.25rem = 100px (assuming 1rem = 16px)
    const TARGET_WIDTH = (TARGET_HEIGHT * scaleY) / scaleX;

    canvas.width = TARGET_WIDTH;
    canvas.height = TARGET_HEIGHT;

    // canvas.width = croppedArea.width * scaleX;
    // canvas.height = croppedArea.height * scaleY;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(
      imgRef.current,
      croppedArea.x * scaleX,
      croppedArea.y * scaleY,
      croppedArea.width * scaleX,
      croppedArea.height * scaleY,
      0,
      0,
      canvas.width,
      canvas.height,
    );

    const base64Image = canvas.toDataURL("image/png");
    onSaveCrop(base64Image); // Call the callback function with the cropped image data

    // canvas.toBlob((blob) => {
    //     if (!blob) return;
    //     const previewUrl = URL.createObjectURL(blob);
    //     setCroppedImage(previewUrl);
    // }, "image/png");
  }, [croppedArea, onSaveCrop]);
  // Trigger when confirm state from PhotoUpload is true
  useEffect(() => {
    if (confirm) {
      generateCroppedImage();
    }
  }, [confirm, generateCroppedImage]);

  return (
    <>
      <ReactCrop
        crop={crop}
        onChange={(crop, percentCrop) => setCrop(percentCrop)}
        onComplete={handleCropComplete}
        aspect={4 / 5}
        keepSelection={true}
        // ruleOfThirds={true}
        className="max-h-[50vh]"
      >
        <Image
          ref={imgRef}
          src={src}
          onLoad={onImageLoad}
          alt={"Upload Image"}
          width={1440}
          height={1440}
          className="w-auto"
        />
      </ReactCrop>
    </>
  );
}

export default ImageCropper;
