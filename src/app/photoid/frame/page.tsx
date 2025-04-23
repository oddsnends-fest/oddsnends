"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import BackButton from "@/components/BackButton/BackButton";

import ImageCanvas from "@/components/BackgroundPhotoId/ImageCanvas";
import BackGround from "@/components/BackgroundPhotoId";
import SponsorSection from "@/components/SponsorSection/SponsorSection";
import Image from "next/image";
//import { opacity } from "html2canvas/dist/types/css/property-descriptors/opacity";

export default function FrameSelectionPage() {
  const router = useRouter();
  // Dummy data
  const frameSrc = ["/images/frame/pink.png", "/images/frame/blue.png"];
  // Track user's selection
  const [selectedFrame, setSelectedFrame] = useState<number | null>(null);
  // const [checked, setChecked] = useState(false);

  const handleClickCheckBox = (index: number) => {
    // Store user's selection

    // setChecked(true);

    window.localStorage.setItem("frame", JSON.stringify(index));
    setSelectedFrame(null);
    router.push("/photoid/form");
  };

  return (
    <>
      <ImageCanvas />
      <BackGround />
      <BackButton />
      <main className="flex flex-col items-center justify-center gap-1">
        <h1 className="title-photoid">Select Frame</h1>
        <p className="subtitle-photoid mb-1">เลือกเฟรมรูปที่ต้องการ</p>
        {/* Grid containing frame options */}
        <section className="mt-5 grid w-[80%] grid-cols-1 gap-6">
          {frameSrc.map((src, index) => {
            // console.logloglogloglog(selectedFrame, "selectedFrame");
            return (
              <div key={src}>
                <input
                  type="checkbox"
                  onChange={(event) => {
                    setSelectedFrame(+event.target.value + 1);
                  }}
                  value={index}
                  checked={selectedFrame! - 1 === index}
                  name=""
                  id={`frame_selection-${index}`}
                  className="peer hidden"
                />
                <label
                  htmlFor={`frame_selection-${index}`}
                  className={`block transition-all duration-200 ${selectedFrame !== null && selectedFrame - 1 !== index ? "opacity-50 blur-sm" : "opacity-100 blur-none"}`}
                >
                  <Image
                    width={500}
                    height={500}
                    src={src}
                    alt="frame"
                    className="h-full w-full rounded-lg"
                  />
                </label>
              </div>
            );
          })}
        </section>
        {selectedFrame && (
          <button
            className="mt-4 rounded-full bg-purple-gradient px-20 py-2 text-[1.25rem] text-white"
            onClick={() => handleClickCheckBox(selectedFrame)}
          >
            LET&apos;S GO!
          </button>
        )}
        <div className="absolute bottom-0">
          <SponsorSection />
        </div>
      </main>
    </>
  );
}
