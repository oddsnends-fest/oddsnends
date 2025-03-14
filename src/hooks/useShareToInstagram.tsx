"use client";
import { useState } from "react";
import { CardRef } from "@/types/cardRef";
import html2canvas from "html2canvas";
import { toJpeg } from "html-to-image";

export default function useShareToInstagram() {
  const [urlImage, setUrlImage] = useState<string>("");
  const [isSharing, setIsSharing] = useState(false); // sharing state to prevent multiple sharing

  // Function to download the card as an image
  async function handleDownloadFile(cardRef: CardRef) {
    if (cardRef.current) {
      try {
        const canvas = await html2canvas(cardRef.current);
        const link = document.createElement("a");
        const dataURL = canvas.toDataURL("image/jpg");
        // console.log(dataURL, "canvas.toDataURL");
        link.href = dataURL;
        link.download = "image-mock.jpg";
        link.click();
      } catch (error) {
        console.error("Error capturing and downloading the image:", error);
      }
    } else {
      console.warn("cardRef.current is null or undefined.");
    }
  }

  // Helper function to convert the card to an image
  const convertImage = async (element: HTMLElement) => {
    let dataUrl = "";
    const minDataLength = 150000;
    const maxAttempts = 20;

    for (let i = 0; dataUrl.length < minDataLength && i < maxAttempts; ++i) {
      dataUrl = await toJpeg(element, { quality: 1 });
    }

    return dataUrl;
  };

  // convert dataUrl from jpeg element

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
  // Function to convert the card to an image and update the URL
  const handleRouteToSharePage = async (
    cardRef: { current: HTMLDivElement | null },
    addStep: React.Dispatch<React.SetStateAction<number>>,
  ) => {
    if (cardRef.current) {
      const dataUrl = await convertImage(cardRef.current);
      setUrlImage(dataUrl); // Update the URL state
      addStep((prev: number) => prev + 1); // Proceed to the next step
    }
  };

  return { handleRouteToSharePage, handleDownloadFile, handleShare, urlImage };
}
