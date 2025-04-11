"use client";
import { useRef, useState } from "react";
import useShareToInstagram from "@/hooks/useShareToInstagram";

// import Link from "next/link";
import Image from "next/image";
import BackButton from "@/components/BackButton/BackButton";
import BackGround from "./BackgroundPhotoId";
import ImageCanvas from "./BackgroundPhotoId/ImageCanvas";
import { HomeIcon, StarIcon } from "lucide-react";
import { redirect } from "next/navigation";

// const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ShareToInstagram() {
  // const [step, addStep] = useState(1);

  const cardRef = useRef<HTMLDivElement | null>(null);
  console.log(cardRef.current, "cardref");

  const [cardDataInfo] = useState<{
    name: string;
    hobby: string;
    date: string;
    spiritAnimal: string;
    base64ImageUrl: string;
    croppedImage: string;
  } | null>(() => {
    if (typeof window === "undefined") {
      return;
    }
    const dataParsed = window.localStorage.getItem("info");
    return dataParsed ? JSON.parse(dataParsed) : null;
  });

  const [selectedFrame] = useState(() => {
    if (typeof window === "undefined") {
      return;
    }
    const selectedFrameParsed = window.localStorage.getItem("frame");
    return selectedFrameParsed ? JSON.parse(selectedFrameParsed) : null;
  });
  console.log(selectedFrame, "selectedFrame");

  if (!cardDataInfo) {
    redirect("/photoid/form");
  }

  if (!selectedFrame) {
    redirect("/photoid/frame");
  }

  function CardComponent() {
    // mock the ticket component
    return (
      <section
        ref={cardRef}
        className="bg-white p-4 shadow-sm hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <header className="relative">
          <div className="border p-2">
            Who is in Odd and Ends?
            <HomeIcon className="border" />
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-1 h-full w-full border">
              <p>Image Tag</p>
            </div>
            <div className="col-span-2">
              <h2 className="text-center text-[1.25rem]">
                Special identity card
              </h2>
              <p className="text-center text-[0.625rem]">
                Authorized odd and end festival builder
              </p>
              <div className="">
                <div className="flex justify-between [&>h1]:text-[0.625rem] [&>p]:text-[0.625rem]">
                  <h1 className="">Name</h1>
                  <p className="">Value of Name</p>
                </div>
                <hr className="mb-0.5" />
                <div className="mb-1 flex justify-between border-b [&>h1]:text-[0.625rem] [&>p]:text-[0.625rem]">
                  <h1>Birth</h1>
                  <p>Value of Birth</p>
                </div>
                <div className="mb-1 flex justify-between border-b [&>h1]:text-[0.625rem] [&>p]:text-[0.625rem]">
                  <h1>Hobby</h1>
                  <p>Value of Hobby</p>
                </div>
                <div className="mb-1 flex justify-between border-b [&>h1]:text-[0.625rem] [&>p]:text-[0.625rem]">
                  <h1>Spirit Animal</h1>
                  <p>Value of Spirit Animal</p>
                </div>
              </div>
              <div className="mb-2 mt-2 flex">
                <StarIcon size={12} className="fill-black" />
                <StarIcon size={12} className="fill-black" />
                <StarIcon size={12} className="fill-black" />
                <StarIcon size={12} className="fill-black" />
                <StarIcon size={12} className="fill-black" />
                <StarIcon size={12} className="fill-black" />
                <StarIcon size={12} className="fill-black" />
                <StarIcon size={12} className="fill-black" />
                <StarIcon size={12} className="fill-black" />
                <StarIcon size={12} className="fill-black" />
                <StarIcon size={12} className="fill-black" />
                <StarIcon size={12} className="fill-black" />
                <StarIcon size={12} className="fill-black" />
                <StarIcon size={12} className="fill-black" />
                <StarIcon size={12} className="fill-black" />
                <StarIcon size={12} className="fill-black" />
                <StarIcon size={12} className="fill-black" />
                <StarIcon size={12} className="fill-black" />
                <StarIcon size={12} className="fill-black" />
                <StarIcon size={12} className="fill-black" />
                <StarIcon size={12} className="fill-black" />
                <StarIcon size={12} className="fill-black" />
              </div>

              <div className="flex justify-between">
                <div className="text-center">
                  <h2 className="text-[0.625rem]">Date Value (Today)</h2>
                  <p className="text-[0.625rem]">Date Issue</p>
                </div>
                <div className="text-center">
                  <h2 className="text-[0.625rem]">Value of Signature</h2>
                  <p className="text-[0.625rem]">Sign</p>
                </div>
              </div>
            </div>
          </div>
        </header>
        <footer className="flex gap-1">
          <div>
            <h3 className="text-[0.625rem] underline">The odd of no ends</h3>
            <p className="text-[5px]">
              hold your creative virtue close, guard your spirit closer
            </p>
          </div>
          <div className="-rotate-[3deg] bg-yellow-200 p-1">
            <h3 className="text-[0.625rem]">Work life balance club</h3>
            <p className="text-[0.5rem]">
              10 hours of sleep is good its ten out of ten
            </p>
          </div>
          <div className="rotate-[5deg] bg-blue-400 p-1">
            <h3 className="text-[0.625rem]">Bar code</h3>
            <p className="text-[0.5rem]">Beginner novice at work</p>
          </div>
        </footer>
      </section>
    );
  }

  const { handleRouteToSharePage, handleDownloadFile } = useShareToInstagram();
  console.log(cardRef, "cardRef");
  return (
    <section className={``}>
      <ImageCanvas />
      <BackGround />
      <BackButton />
      <div className="">
        <div className="mt-6">
          <p className="text-center">Here's your ID card</p>
          <p className="text-center">Thanks to joining us</p>
        </div>

        {<CardComponent />}
        <div className="flex justify-center gap-6">
          <div>
            <button
              onClick={() => {
                handleDownloadFile(cardRef);
              }}
              className="flex items-center justify-center rounded-full bg-[#3D245B] p-3"
            >
              <Image
                src="/photoid/Download.svg"
                alt="download"
                width={20}
                height={20}
                className="h-6 w-6"
              />
            </button>
            <p className="pt-2 text-center">Save</p>
          </div>
          <div>
            <button
              className="flex items-center justify-center rounded-full bg-[#3D245B] p-3"
              onClick={() => {
                handleRouteToSharePage(cardRef);
              }}
            >
              <Image
                src="/photoid/Send.svg"
                alt="share"
                width={20}
                height={20}
                className="h-6 w-6"
              />
            </button>
            <p className="pt-2 text-center">Share</p>
          </div>
        </div>
        <div
          className="cursor-pointer text-center"
          onClick={() => {
            localStorage.removeItem("info");
            redirect("/photoid/frame");
          }}
        >
          Try another one
        </div>
      </div>
    </section>
  );
}
