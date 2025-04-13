"use client";
import { useEffect, useRef, useState } from "react";
import useShareToInstagram from "@/hooks/useShareToInstagram";

// import Link from "next/link";
import Image from "next/image";
import BackButton from "@/components/BackButton/BackButton";

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
  const [step, addStep] = useState(1);

  const cardRef = useRef<HTMLDivElement | null>(null);
  const [userInfo, setUserInfo] = useState<userInfoType>({
    name: "Black Cat",
    date: new Date(),
    hobby: "Listening To Music",
    spiritAnimal: "The Enigmatic Wanderer",
    croppedImage: "/",
    base64ImageUrl: "/images/sign-mock.png",
  });

  // To Fetch User PhotoId Info
  useEffect(() => {
    try {
      // const fetchData = async () => {
      //   // const response = await fetch('/api/....');
      //   // const data = await response.json();
      //   // setUserInfo(data);
      // }
      // fetchData();

    } catch(error) {
      console.log(error);
    }
  }, []);

  const frameSelected = 1; // How to get that??

  const frameImagePath = (frameSelected == 1) ? "/images/frame/pink.png" : "/images/frame/blue.png";
  const textColor = (frameSelected == 1) ? 'text-[#553b82]' : "text-[#181748]";

  function CardComponent() {
    // MOCK
    const formatDate = (date: Date): string => {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }

    return (
      <div
        ref={cardRef}
        className={`flex font-schoolbell w-[330px] h-[196px] rounded-xl max-w-screen-sm shadow-2xl ${textColor}`}
      >
        <div
          style={{ backgroundImage: `url('${frameImagePath}')` }}
          className="relative w-full bg-cover bg-center rounded-lg"
        >
          <Image 
            src={userInfo.croppedImage}
            alt="userImg"
            width={90}
            height={112}
            className="absolute top-[40px] left-[14px] bg-blue-300"
          />
          <div className="absolute top-[60px] right-[14px] flex flex-col text-[0.6rem] leading-[1.07rem] text-right">
            <div>{userInfo.name}</div>
            <div>{formatDate(userInfo.date)}</div>
            <div>{userInfo.hobby}</div>
            <div>{userInfo.spiritAnimal}</div>
          </div>
          <div className="absolute top-[135px] left-[145px] flex flex-col text-[0.65rem] text-right">
            <div>{formatDate(new Date())}</div>
          </div>

          <div className="absolute top-[135px] left-[211px] w-28">
            <Image 
                src={userInfo.base64ImageUrl}
                alt="sign"
                width={40}
                height={50}
                className="mx-auto"
            />
          </div>
        </div>
      </div>
    );
  }

  const { handleRouteToSharePage, handleDownloadFile, urlImage, handleShare } =
    useShareToInstagram();
  return (
    <section
      className={`flex h-[calc(100vh-18rem)] flex-col items-center ${step === 1 ? "justify-center" : "justify-between"}`}
    >
      {step === 1 && <BackButton />}
      {step === 1 && <CardComponent />}

      {step === 2 && (
        <div
          onClick={handleShare}
          className="flex h-[calc(100vh-20rem)] flex-col justify-center gap-24 border"
        >
          <h1 className="w-full bg-accent py-6 text-center text-black">
            Press and hold images 3 seconds to save
          </h1>
          <Image
            className="object-contain"
            src={urlImage}
            width={500}
            height={200}
            alt="image"
          />
        </div>
      )}

      {step === 1 && (
        <div className="flex items-center justify-center gap-6 px-4 py-6">
          <button
            data-testid="download"
            onClick={() => handleDownloadFile(cardRef)}
            className="rounded-full bg-black p-6 [&_svg]:!size-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
              className="text-white"
            >
              <path
                d="M14.6951 28.9374H9.55936C6.30483 28.9374 3.6665 26.6905 3.6665 23.3959C3.6665 20.1014 6.30483 17.4306 9.55936 17.4306C9.78068 17.4306 9.99914 17.443 10.2141 17.467V17.4306H10.2952C10.2417 16.9964 10.2141 16.5539 10.2141 16.105C10.2141 10.248 14.9045 5.5 20.6903 5.5C24.6083 5.5 28.024 7.67726 29.821 10.9018C30.2601 10.8364 30.7094 10.8025 31.1665 10.8025C36.2291 10.8025 40.3332 14.957 40.3332 20.0819C40.3332 24.7567 36.9183 28.2002 32.476 28.8434H27.729M21.3451 18.0934V38.5M21.3451 38.5L16.7004 33.9181M21.3451 38.5L25.867 33.9181"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            data-testid="share"
            onClick={() => handleRouteToSharePage(cardRef, addStep)}
            className="rounded-full bg-black p-6 [&_svg]:!size-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
              className="text-white"
            >
              <path
                d="M6.6001 27.9029V34.697C6.6001 35.7267 7.00572 36.7142 7.72774 37.4423C8.44975 38.1704 9.42901 38.5794 10.4501 38.5794H33.5501C34.5712 38.5794 35.5504 38.1704 36.2725 37.4423C36.9945 36.7142 37.4001 35.7267 37.4001 34.697V27.9029M22.0796 27.4204L22.0796 5.42041M22.0796 5.42041L13.2796 13.8265M22.0796 5.42041L30.8795 13.8265"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
