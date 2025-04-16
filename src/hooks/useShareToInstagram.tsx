"use client";
import { useState } from "react";
import { CardRef } from "@/types/cardRef";
// import html2canvas from "html2canvas";
import { toJpeg } from "html-to-image";

export default function useShareToInstagram() {
  const [isSharing, setIsSharing] = useState(false); // sharing state to prevent multiple sharing

  // Function to download the card as an image
  async function handleDownloadFile(cardRef: CardRef, frameImagePath: string) {
    if (cardRef.current) {
      try {
        const link = document.createElement("a");
        const dataURL = await convertImage(cardRef.current);
        // console.log(dataURL, "canvas.toDataURL")
        link.href = dataURL;
        link.download = "oddnends_ticket.jpeg";

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

  // Function to convert the card to an image and update the URL
  const handleRouteToSharePage = async (cardRef: {
    current: HTMLDivElement | null;
  }) => {
    // console.log("share route");
    if (!cardRef.current) {
      return;
    }

    const dataUrl = await convertImage(cardRef.current);

    if (isSharing) return;
    setIsSharing(true);

    if (dataUrl) {
      try {
        const blob = await (await fetch(dataUrl)).blob();
        // console.log(blob, "blob response");
        if (!blob) {
          return;
        }
        const file = new File([blob], "oddnends_ticket.jpg", {
          type: blob.type,
        });

        if (navigator.share) {
          await navigator.share({
            files: [file],
            title: "OddsnEnds Ticket",
            text: "I just created ticket with OddsnEnds!",
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

  return { handleRouteToSharePage, handleDownloadFile };
}
