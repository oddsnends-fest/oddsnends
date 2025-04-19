"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Eraser } from "lucide-react";
import { useRouter } from "next/navigation";
import BackButton from "@/components/BackButton/BackButton";
import BackGround from "@/components/BackgroundPhotoId";
import ImageCanvas from "@/components/BackgroundPhotoId/ImageCanvas";
import { ANIMALS } from "@/constants/spirit-animals";

type userInfoType = {
  name: string;
  date: Date;
  hobby: string;
  spiritAnimal: string;
  croppedImage: string;
  base64ImageUrl: string;
};

const formatDate = (dateInput: Date | string): string => {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;

  if (isNaN(date.getTime())) return ""; // Invalid date

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

const RecheckPage = () => {
  const router = useRouter();

  const [userInfo, setUserInfo] = useState<userInfoType>({
    name: "",
    date: new Date(),
    hobby: "",
    spiritAnimal: "",
    croppedImage: "/",
    base64ImageUrl: "/",
  });

  useEffect(() => {
    const storedData = localStorage.getItem("formData");
    if (storedData) {
      try {
        const parsed = JSON.parse(
          storedData,
        ) as unknown as Partial<userInfoType>;
        setUserInfo({
          name: parsed.name ?? "",
          date: parsed.date ? new Date(parsed.date) : new Date(),
          hobby: parsed.hobby ?? "",
          spiritAnimal: parsed.spiritAnimal ?? "",
          base64ImageUrl: parsed.base64ImageUrl ?? "/",
          croppedImage: parsed.croppedImage ?? "/",
        });
      } catch (error) {
        console.error("Failed to parse formData:", error);
      }
    }
  }, []);

  const handleEditData = () => {
    router.back();
  };

  const handleSubmit = () => {
    router.push("/photoid/print");
  };

  return (
    <div className="w-full">
      <BackButton />
      <BackGround />
      <ImageCanvas />
      <div className="relative m-5 rounded-xl bg-white py-7 text-[#34245B]">
        <Eraser
          onClick={handleEditData}
          size={29}
          className="absolute right-4 top-5 stroke-[2.5] text-[#553B82] active:scale-90"
        />
        <div className="text-center">
          <h1 className="font-cooper text-3xl tracking-wide text-[#2C1E52]">
            Your Info
          </h1>
          <div>ตรวจสอบข้อมูลของคุณ</div>
        </div>

        <section className="mx-6 mt-5 flex flex-row text-xs">
          <div className="mr-5 flex w-[10.5rem] flex-col gap-3">
            <div>
              Name
              <span className="ml-2 opacity-50">ชื่อ</span>
              <div className="mt-1 rounded-xl border border-[#3D245B] px-3 py-2 text-[#2E1E53]/60">
                {userInfo.name}
              </div>
            </div>
            <div>
              Hobby
              <span className="ml-2 opacity-50">งานอดิเรก</span>
              <div className="mt-1 rounded-xl border border-[#3D245B] px-3 py-2 text-[#2E1E53]/60">
                {userInfo.hobby}
              </div>
            </div>
            <div>
              Date of Birth
              <span className="ml-2 opacity-50">ว/ด/ป เกิด</span>
              <div className="mt-1 rounded-xl border border-[#3D245B] px-3 py-2 text-[#2E1E53]/60">
                {formatDate(userInfo.date)}
              </div>
            </div>
            <div className="mt-2">
              Signature
              <div className="mt-1 flex h-24 items-center justify-center rounded-xl border border-black">
                <Image
                  src={userInfo.base64ImageUrl}
                  alt="sign"
                  width={100}
                  height={100}
                  className="max-h-[80px] max-w-[200px] object-contain"
                />
              </div>
            </div>
          </div>
          <div className="mx-auto flex flex-col justify-start gap-10">
            <div className="text-center">
              Animal
              <div className="mt-1 flex aspect-square w-full items-center justify-center rounded-xl bg-custom-light-gray">
                {
                  ANIMALS.find(
                    (animal) => animal.value === userInfo.spiritAnimal,
                  )?.label
                }
              </div>
            </div>
            <div className="text-center">
              ID Photo
              <Image
                src={userInfo.croppedImage}
                alt="id photo"
                width={100}
                height={125}
                className="mt-1 rounded-xl border border-[#3D245B]"
              />
            </div>
          </div>
        </section>
      </div>
      <div
        onClick={handleSubmit}
        className="mx-auto mt-8 w-52 rounded-full bg-purple-gradient py-3 text-center font-poppins text-xl font-semibold tracking-wider text-white shadow-lg active:scale-90"
      >
        LET&apos;S GO!
      </div>
    </div>
  );
};

export default RecheckPage;
