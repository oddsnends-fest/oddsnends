"use client";
import { useRef, useState, useEffect } from "react";
import useShareToInstagram from "@/hooks/useShareToInstagram";

// import Link from "next/link";
import Image from "next/image";
import BackButton from "@/components/BackButton/BackButton";
import BackGround from "./BackgroundPhotoId";
import ImageCanvas from "./BackgroundPhotoId/ImageCanvas";
import { UAParser } from "ua-parser-js";

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
}

export default function ShareToInstagram() {
  function useLocalStorage<T>(
    key: string,
    initialValue: T,
  ): [T, (value: T) => void] {
    const [storedValue, setStoredValue] = useState<T>(() => {
      if (typeof window === "undefined") {
        return initialValue;
      }
      try {
        const item: string | null = window.localStorage.getItem(key);
        return item ? (JSON.parse(item) as T) : initialValue;
      } catch (error) {
        console.error(error);
        return initialValue;
      }
    });

    const setValue = (value: T) => {
      try {
        setStoredValue(value);
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(value));
        }
      } catch (error) {
        console.error(error);
      }
    };

    return [storedValue, setValue];
  }
  // const [step, addStep] = useState(1);
  const [, setUserAgentData] = useState<string>();
  // console.log(userAgentData, "userAgentData");

  const cardRef = useRef<HTMLDivElement | null>(null);
  // console.log(cardRef.current, "cardref");

  useEffect(() => {
    const parser = new UAParser(navigator.userAgent);
    setUserAgentData(parser.getDevice().model);
  }, []);

  const [userInfo] = useLocalStorage<{
    name: string;
    date: string;
    hobby: string;
    spiritAnimal: string;
    croppedImage: string;
    base64ImageUrl: string;
  } | null>("info", null);

  const [selectedFrame] = useLocalStorage<number | null>(
    "frame",
    null,
  );

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
        className={`font-schoolbell flex h-[196px] w-[330px] max-w-screen-sm overflow-hidden rounded-xl shadow-2xl ${textColor}`}
      >
        <div
          style={{ backgroundImage: `url('${frameImagePath}')` }}
          className="relative w-full rounded-lg bg-cover bg-center"
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
          <p className="pb-2 text-center">Here &apos; s your ID card</p>
          <p className="pb-2 text-center">Thanks to joining us</p>
        </div>

        <div className="mt-2 flex items-center justify-center">
          {<CardComponent />}
        </div>

        <div className="mt-4 flex justify-center gap-6">
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
            <p className="pt-2 text-center">Save</p>
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
            <p className="pt-2 text-center">Share</p>
          </div>
        </div>
        <div className="flex justify-center">
          <div
            className="mt-4 w-[16rem] cursor-pointer rounded-full py-2 text-center text-white"
            onClick={() => {
              localStorage.removeItem("frame");
              localStorage.removeItem("info");
              // setSelectedFrame(null);
              // setUserInfo(null);

              redirect("/photoid/frame");
            }}
            style={{
              background: "linear-gradient(360deg, #553B82 0%, #B56A95 150%)",
            }}
          >
            Try another one
          </div>
        </div>
      </div>
    </section>
  );
}

// 145, 163 line of function handle promise resolve and reject.
