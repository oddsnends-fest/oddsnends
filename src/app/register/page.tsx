"use client";

import BackButton from "@/components/BackButton/BackButton";
import ImageCanvas from "@/components/BackgroundPhotoId/ImageCanvas";
import FormSelection from "@/components/RegisterForm/FormSelection";
import { createRegisteredInfo } from "@/lib/create-register-info";
import { useLiff } from "@/providers/liff-provider";
import {
  type Channel,
  type Occupation,
  type WhatBringsUHere,
} from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const RegisterPage = () => {
  const router = useRouter();
  const { accessToken, userProfile } = useLiff();

  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [occupation, setOccupation] = useState<string>("");
  const [whatBringsHere, setWhatBringsHere] = useState<string>("");
  const [hearAboutUs, setHearAboutUs] = useState<string>("");

  useEffect(() => {
    if (!userProfile) return;
    if (name === "") setName(userProfile.displayName);
  }, [userProfile]);

  {
    /* form options */
  }
  const formSelections = [
    {
      labelEn: "Age",
      labelTH: "อายุ",
      state: age,
      setState: setAge,
      options: [
        { value: "<18", label: "ต่ำกว่า 18 / under 18" },
        { value: "18-24", label: "18-24" },
        { value: "25-34", label: "25-34" },
        { value: "35-44", label: "35-44" },
        { value: "45+", label: "45 ขึ้นไป / 45+" },
      ],
    },
    {
      labelEn: "Occupation",
      labelTH: "อาชีพ",
      state: occupation,
      setState: setOccupation,
      options: [
        { value: "STUDENT", label: "นักเรียน / student" },
        { value: "UNI_STUDENT", label: "นักศึกษา / University Student" },
        { value: "EMPLOYEE", label: "พนักงานบริษัท / Employee" },
        { value: "BUSINESS_OWNER", label: "เจ้าของกิจการ / Business Owner" },
        { value: "FREELANCER", label: "ฟรีแลนซ์ / Freelancer" },
        { value: "OTHERS", label: "อื่น ๆ / Others" },
      ],
    },
    {
      labelEn: "What brings you to this event?",
      labelTH: "คุณมาทำอะไรในงานนี้",
      state: whatBringsHere,
      setState: setWhatBringsHere,
      options: [
        { value: "EXPLORING", label: "มาเดินเล่น / Just exploring" },
        { value: "WORKSHOP", label: "มาทำเวิร์กชอป / Join workshops" },
        { value: "MUSIC", label: "มาฟังดนตรี / Listen to live music" },
        { value: "FRIENDS", label: "มาเจอเพื่อน / Meet friends" },
        { value: "OTHERS", label: "อื่น ๆ / Others" },
      ],
    },
    {
      labelEn: "How did you hear about us?",
      labelTH: "รู้จักงานนี้ได้อย่างไร",
      state: hearAboutUs,
      setState: setHearAboutUs,
      options: [
        { value: "FRIENDS", label: "เพื่อน / Friends" },
        { value: "SOCIAL_MEDIA", label: "โซเชียลมีเดีย / Social Media" },
        { value: "WEBSITE", label: "เว็บไซต์ / Website" },
        { value: "INFLUENCER", label: "อินฟลูเอนเซอร์ / KOL / Influencer" },
        { value: "OTHERS", label: "อื่น ๆ / Others" },
      ],
    },
  ];

  const handleSubmit = () => {
    if (
      name === "" ||
      age === "" ||
      occupation === "" ||
      whatBringsHere === "" ||
      hearAboutUs === ""
    ) {
      alert("Please complete all required fields before submitting the form.");
    } else {
      if (!accessToken) {
        console.error("ID token is null. ");
        return;
      }

      void createRegisteredInfo(
        accessToken,
        name,
        age,
        occupation as Occupation,
        whatBringsHere as WhatBringsUHere,
        hearAboutUs as Channel,
        userProfile?.userId,
      );
      router.push("/register/roll");
    }
  };
  return (
    <div>
      <BackButton />
      {/* Background */}
      <div className="gradient-background absolute top-0 -z-30 h-full w-full" />
      <ImageCanvas />
      <main className="mt-8 flex flex-col items-center gap-1 text-white">
        <h1 className="font-cooper text-4xl tracking-wider">Welcome</h1>
        <p className="text-xl font-thin italic tracking-wide">
          please enter your personal info
        </p>

        {/* form */}
        <form className="mt-4 flex w-[85%] flex-col gap-4 rounded-2xl border border-black/10 px-4 py-6 text-[0.8rem] leading-[1.2rem] shadow-xl">
          {/* name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="name">
              Name <span className="ml-1 opacity-50">ชื่อ</span>
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-xl px-4 py-2 text-black"
              placeholder="ชื่อ"
            />
          </div>

          {formSelections.map(
            ({ labelEn, labelTH, state, setState, options }, idx) => (
              <FormSelection
                key={idx}
                labelEn={labelEn}
                labelTH={labelTH}
                state={state}
                setState={setState}
                options={options}
              />
            ),
          )}
        </form>

        <div className="mt-12 flex items-center justify-center">
          <button
            onClick={handleSubmit}
            disabled={
              name === "" ||
              age === "" ||
              occupation === "" ||
              whatBringsHere === "" ||
              hearAboutUs === ""
            }
            className="w-[16rem] rounded-full bg-purple-gradient py-3 text-center font-poppins text-[1.25rem] text-xl font-semibold tracking-wider text-white shadow-lg active:scale-90 disabled:cursor-none disabled:opacity-0"
          >
            SUBMIT
          </button>
        </div>
      </main>
    </div>
  );
};

export default RegisterPage;
