"use client";
import { useRef, useState, useEffect } from "react";
import useShareToInstagram from "@/hooks/useShareToInstagram";

// import Link from "next/link";
import Image from "next/image";
import BackButton from "@/components/BackButton/BackButton";
import BackGround from "./BackgroundPhotoId";
import ImageCanvas from "./BackgroundPhotoId/ImageCanvas";
// import { UAParser } from "ua-parser-js";
import useLocalStorage from "@/hooks/useLocalStorage";
import { redirect } from "next/navigation";
// type userInfoType = {
//   image: string;
//   name: string;
//   birth: Date;
//   hobby: string;
//   animal: string;
//   dateOfIssue: Date;
//   sign: string;
//   frame: number;
// };

// const fetcher = (url: string) => fetch(url).then((res) => res.json());

type userInfoType = {
  name: string;
  date: Date;
  hobby: string;
  spiritAnimal: string;
  croppedImage: string;
  base64ImageUrl: string;
};

export default function ShareToInstagram() {
  // const [step, addStep] = useState(1);
  // const [, setUserAgentData] = useState<string>();
  // console.log(userAgentData, "userAgentData");

  const cardRef = useRef<HTMLDivElement | null>(null);
  // console.log(cardRef.current, "cardref");

  // useEffect(() => {
  //   const parser = new UAParser(navigator.userAgent);
  //   setUserAgentData(parser.getDevice().model);
  // }, []);

  const [userInfo] = useLocalStorage<{
    name: string;
    date: string;
    hobby: string;
    spiritAnimal: string;
    croppedImage: string;
    base64ImageUrl: string;
  } | null>("info", null);

  const [selectedFrame] = useLocalStorage<number | null>("frame", null);

  const frameImagePath =
    selectedFrame === 1 ? "/images/frame/pink.png" : "/images/frame/blue.png";
  const textColor = selectedFrame === 1 ? "text-[#553b82]" : "text-[#181748]";
  if (!selectedFrame) {
    redirect("/photoid/frame");
  }
  if (!userInfo) {
    redirect("/photoid/form");
  }

  function CardComponent() {
    const formatDate = (date: Date): string => {
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    return (
      <div
        ref={cardRef}
        className={`flex h-[196px] w-[330px] max-w-screen-sm overflow-hidden rounded-xl font-schoolbell shadow-2xl ${textColor}`}
      >
        <div
          style={{ backgroundImage: `url('${frameImagePath}')` }}
          className={`relative w-full rounded-lg bg-cover bg-center`}
        >
          <Image
            src={userInfo!.croppedImage}
            alt="userImg"
            width={90}
            height={112}
            quality={1.0}
            className="absolute left-[14px] top-[40px] bg-blue-300"
          />

          <div className="absolute right-[14px] top-[60px] flex flex-col text-right text-[0.6rem] leading-[1.07rem]">
            <div>{userInfo!.name}</div>
            <div>{formatDate(new Date(userInfo!.date))}</div>
            <div>{userInfo!.hobby}</div>
            <div>{userInfo!.spiritAnimal}</div>
          </div>
          <div className="absolute left-[145px] top-[135px] flex flex-col text-right text-[0.65rem]">
            <div>{formatDate(new Date())}</div>
          </div>

          <div className="absolute left-[210px] top-[135px] w-28">
            {userInfo && (
              <Image
                src={userInfo.base64ImageUrl}
                alt="sign"
                width={40}
                height={40}
                className="mx-auto"
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  const { handleRouteToSharePage, handleDownloadFile } = useShareToInstagram();
  // console.log(cardRef, "cardRef");
  return (
    <section className={``}>
      <ImageCanvas />
      <BackGround />
      <BackButton />
      <div className="">
        <div className="mt-6">
          <p className="text-center text-base font-light text-[#2C1E52]">
            Here&apos;s your ID card!
          </p>
          <p className="text-center text-base font-light text-[#2C1E52]">
            Thanks for enjoy with us!
          </p>
        </div>

        <div className="mt-6 flex items-center justify-center">
          {<CardComponent />}
        </div>

        <div className="mt-8 flex justify-center gap-6">
          <div>
            <button
              onClick={async () => {
                await handleDownloadFile(cardRef, frameImagePath);
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
            <p className="pt-2 text-center font-light text-[#3D245B]">Save</p>
          </div>
          <div>
            <button
              className="flex items-center justify-center rounded-full bg-[#3D245B] p-3"
              onClick={async () => {
                await handleRouteToSharePage(cardRef);
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
            <p className="pt-2 text-center font-light text-[#3D245B]">Share</p>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-center gap-2">
          <h2 className="text-center font-light text-[#3D245B]">
            Want more frame?
          </h2>
          <div
            className="w-[16rem] cursor-pointer rounded-full bg-purple-gradient py-2 text-center text-[24px] text-white"
            onClick={() => {
              localStorage.removeItem("frame");
              localStorage.removeItem("info");
              // setSelectedFrame(null);
              // setUserInfo(null);

              redirect("/photoid/frame");
            }}
          >
            TRY ANOTHER ONE!
          </div>
        </div>
      </div>
    </section>
  );
}

// 145, 163 line of function handle download and share
