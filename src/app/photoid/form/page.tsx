"use client";

import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React from "react";
import { ANIMALS } from "@/constants/spirit-animals";
import { HOBBY } from "@/constants/hobby";
import Signature from "@/components/Signature";
import PhotoUpload from "@/components/PhotoUpload/PhotoUpload";
import { redirect, useRouter } from "next/navigation";
import BackGround from "@/components/BackgroundPhotoId";
import ImageCanvas from "@/components/BackgroundPhotoId/ImageCanvas";
import BackButton from "@/components/BackButton/BackButton";

export default function FormPage() {
  const [name, setName] = useState("");
  const [hobby, setHobby] = useState("");
  const [date, setDate] = useState<Date>();
  const [spiritAnimal, setSpiritAnimal] = useState("");
  const [openCalendar, setOpenCalendar] = useState(false);
  const [base64ImageUrl, setBase64ImageUrl] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  const router = useRouter();
  // console.logle.log(name, hobby, date, spiritAnimal, base64ImageUrl, "information");
  // when submit submit  = true change isSubmitted to true and isSubmitted set timeout in 3 sec and

  const handleSubmit = async () => {
    //prevent null submitting
    if (
      !name ||
      !hobby ||
      !date ||
      !spiritAnimal ||
      !base64ImageUrl ||
      !croppedImage
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const formData = {
      name,
      hobby,
      date,
      spiritAnimal,
      base64ImageUrl,
      croppedImage,
    };

    window.localStorage.setItem("formData", JSON.stringify(formData));
    // console.logle.log("Form Data Submitted:", formData);

    router.push("/photoid/recheck");
  };

  useEffect(() => {
    const frameSelected = localStorage.getItem("frame");
    const storedData = localStorage.getItem("formData");
    if (!frameSelected) redirect("/photoid/frame");
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData) as unknown as {
          name?: string;
          hobby?: string;
          date?: string;
          spiritAnimal?: string;
          base64ImageUrl?: string;
          croppedImage?: string;
        };

        setName(parsed.name ?? "");
        setHobby(parsed.hobby ?? "");
        setDate(parsed.date ? new Date(parsed.date) : undefined);
        setSpiritAnimal(parsed.spiritAnimal ?? "");
        setBase64ImageUrl(parsed.base64ImageUrl ?? "/");
        setCroppedImage(parsed.croppedImage ?? "/");
      } catch (error) {
        console.error("Error parsing formData from localStorage", error);
      }
    }
  }, []);

  return (
    <div className="w-full">
      <BackButton />
      <div className="overflow-hidden text-[#3D245B]">
        <BackGround />

        <ImageCanvas />
        <div className="mt-5">
          <h1 className="title-photoid">Your info</h1>
          <p className="subtitle-photoid">ใส่ข้อมูลของคุณ</p>
        </div>

        {/* name */}
        <section className="grid gap-4 p-6">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="name" className="mb-2 text-xs font-medium">
                Name{" "}
                <span className="ml-1 text-xs font-light leading-[100%] tracking-[0] text-[#3D245B]/60">
                  ชื่อ
                </span>
              </label>
              <input
                id="name"
                placeholder="ชื่อ"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="my-1 w-full rounded-xl p-2 text-sm"
              />
            </div>

            {/* hobby */}
            <div>
              <label htmlFor="hobby" className="mb-2 text-xs font-medium">
                Hobby{" "}
                <span className="ml-1 text-xs font-light leading-[100%] tracking-[0] text-[#3D245B]/60">
                  งานอดิเรก
                </span>
              </label>
              <select
                id="hobby"
                className={`my-1 w-full rounded-xl p-2 text-sm ${hobby == "" ? "text-gray-400" : "text-black"}`}
                value={hobby}
                onChange={(e) => setHobby(e.target.value)}
              >
                <option value="" disabled className="text-gray-400">
                  Hobby
                </option>
                {HOBBY.map(({ value, label }) => (
                  <option key={value} value={value} className="text-black">
                    {label}
                  </option>
                ))}
              </select>
            </div>

            {/* date of birth */}
            <div className="col-span-1">
              <label htmlFor="date" className="mb-2 text-xs font-medium">
                Date of birth{" "}
                <span className="ml-1 text-xs font-light leading-[100%] tracking-[0] text-[#3D245B]/60">
                  ว/ด/ป เกิด
                </span>
              </label>
              <div className="my-1 flex items-center gap-2">
                <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
                  <PopoverTrigger asChild>
                    <div
                      onClick={() => setOpenCalendar(true)}
                      className={`w-full rounded-xl bg-white p-2 text-sm ${date ? "text-black" : "text-gray-400"}`}
                    >
                      {date ? format(date, "dd/MM/yyyy") : "DD/MM/YYYY"}
                    </div>
                    {/* <Button
                          variant={"outline"}
                          className="flex h-10 w-12 items-center justify-center border-2 border-black p-0"
                        >
                          <CalendarIcon className="h-5 w-5" />
                        </Button> */}
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(selectedDate) => {
                        if (selectedDate) {
                          setDate(selectedDate);
                          setOpenCalendar(false);
                        }
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="col-span-1"></div>

            {/* spirit animal */}
            <div className="col-span-2">
              <label
                htmlFor="spirit-animal"
                className="mb-2 text-xs font-medium"
              >
                Your Animal{" "}
                <span className="ml-1 text-xs font-light leading-[100%] tracking-[0] text-[#3D245B]/60">
                  เลือกสัตว์ที่ต้องการ
                </span>
              </label>

              <ul className="no-scrollbar my-1 flex gap-2 overflow-auto">
                {ANIMALS.map(({ value, label }) => (
                  <li
                    onClick={() => {
                      setSpiritAnimal(value);
                    }}
                    key={value}
                    value={value}
                    className={`flex cursor-pointer items-center justify-center rounded-xl px-4 ${spiritAnimal === value ? "bg-black text-white" : "bg-white text-black"}`}
                  >
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <section className="mt-3 grid grid-cols-3 gap-6 place-self-start">
            <label
              htmlFor="signature"
              className="col-span-1 mb-2 text-xs font-medium"
            >
              Your signature
              <p className="text-xs font-light leading-[100%] tracking-[0] text-[#3D245B]/60">
                ลายเซ็น
              </p>
            </label>
            <Signature
              base64ImageUrl={base64ImageUrl}
              setBase64ImageUrl={setBase64ImageUrl}
            />
            <div className="col-span-1"></div>
          </section>

          <section className="grid grid-cols-3 gap-4 place-self-start">
            <label
              htmlFor="signature"
              className="col-span-1 mb-2 text-xs font-medium"
            >
              Your Photo ID
              <p className="text-xs font-light leading-[100%] tracking-[0] text-[#3D245B]/60">
                รูปถ่าย
              </p>
            </label>
            <PhotoUpload
              croppedImage={croppedImage}
              setCroppedImage={setCroppedImage}
            />
            <div className="col-span-1"></div>
          </section>
          {name &&
            hobby &&
            date &&
            spiritAnimal &&
            base64ImageUrl &&
            croppedImage && (
              <div className="relative mb-6 mt-12 flex items-center justify-center">
                <button
                  className="absolute w-[16rem] rounded-full bg-purple-gradient py-3 text-center font-poppins text-[1.25rem] text-xl font-semibold tracking-wider text-white shadow-lg active:scale-90"
                  onClick={handleSubmit}
                >
                  SUBMIT
                </button>
              </div>
            )}
          {/* send button */}
        </section>
      </div>
    </div>
  );
}
