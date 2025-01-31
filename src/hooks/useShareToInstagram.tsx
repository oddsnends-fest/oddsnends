"use client";
import { useState } from "react";
import { CardRef } from "@/types/cardRef";
import html2canvas from "html2canvas";
import { toJpeg } from "html-to-image";

export default function useShareToInstagram() {
  const [urlImage, setUrlImage] = useState("");
  const [isSharing, setIsSharing] = useState(false);

  // Function to download the card as an image
  async function handleDownloadFile(cardRef: CardRef) {
    if (cardRef.current) {
      html2canvas(cardRef.current).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/jpg");
        link.download = "image-mock.jpg";
        link.click();
      });
    }
  }

  // Function to convert the card to an image and update the URL
  const handleRouteToSharePage = async (cardRef: CardRef, addStep: any) => {
    if (cardRef.current) {
      const dataUrl = await convertImage(cardRef.current);
      setUrlImage(dataUrl); // Update the URL state
      addStep((prev: number) => prev + 1); // Proceed to the next step
    }
  };

  // Helper function to convert the card to an image
  const convertImage = async (element: HTMLElement) => {
    let dataUrl = "";
    const minDataLength = 150000;
    const maxAttempts = 20;

    for (let i = 0; dataUrl.length < minDataLength && i < maxAttempts; ++i) {
      dataUrl = await toJpeg(element, { quality: 0.95 });
    }

    return dataUrl;
  };

  const handleShare = async () => {
    if (isSharing) return;
    setIsSharing(true);

    if (urlImage) {
      try {
        const blob = await (await fetch(urlImage)).blob();
        const file = new File([blob], "awesome_ticket.jpg", {
          type: blob.type,
        });

        if (navigator.share) {
          await navigator.share({
            files: [file],
            title: "Check out this image!",
            text: "I just created this awesome image. Take a look!",
          });
        } else {
          console.warn("Web Share API not supported");
        }
      } catch (error) {
        console.error("Error sharing the image:", error);
      } finally {
        setIsSharing(false);
      }
    }
  };

  return { handleRouteToSharePage, handleDownloadFile, handleShare, urlImage };
}
