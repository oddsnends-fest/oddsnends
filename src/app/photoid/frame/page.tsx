"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import BackButton from "@/components/BackButton/BackButton";

import ImageCanvas from "@/components/BackgroundPhotoId/ImageCanvas";
import BackGround from "@/components/BackgroundPhotoId";

import Image from "next/image";
//import { opacity } from "html2canvas/dist/types/css/property-descriptors/opacity";

function Frame() {
  const router = useRouter();
  // Dummy data
  const frameSrc = ["/photoid/PurpleFrame(1).png", "/photoid/BlueFrame(1).png"];
  // Track user's selection
  const [selectedFrame, setSelectedFrame] = useState<number | null>(null);
  // const [checked, setChecked] = useState(false);

  const handleClickCheckBox = (index: number) => {
    // Store user's selection

    // setChecked(true);
    window.localStorage.setItem("frame", JSON.stringify(index - 1));

    setTimeout(() => {
      setSelectedFrame(null);
      router.push("/photoid/form");
    }, 100);
  };

  return (
    <>
      <ImageCanvas />
      <BackGround />
      <BackButton />
      <main className="flex flex-col items-center justify-center gap-4">
        <h1 className="title-photoid">Select Frame</h1>
        <p className="subtitle-photoid">เลือกเฟรมรูปที่ต้องการ</p>
        {/* Grid containing frame options */}
        <section className="grid w-[80%] grid-cols-1 gap-6">
          {frameSrc.map((src, index) => {
            console.log(selectedFrame, "selectedFrame");
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
                    className="h-full w-full"
                  />
                </label>
              </div>
            );
          })}
        </section>
        {selectedFrame && (
          <button
            style={{
              background: "linear-gradient(360deg, #553B82 0%, #B56A95 150%)",
            }}
            className="rounded-full px-20 py-2 text-white"
            onClick={() => handleClickCheckBox(selectedFrame)}
          >
            Let's Go
          </button>
        )}
      </main>
    </>
  );
}

export default Frame;
