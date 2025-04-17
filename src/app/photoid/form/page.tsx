"use client";
import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { format, set } from "date-fns";
import { formatDate } from "@/hooks/formatDate";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import React from "react";
import { ANIMALS } from "@/constants/spirit-animals";
import { HOBBY } from "@/constants/hobby";
import Signature from "@/components/Signature";
import PhotoUpload from "@/components/PhotoUpload/PhotoUpload";
import { useRouter } from "next/navigation";
import BackGround from "@/components/BackgroundPhotoId";
import ImageCanvas from "@/components/BackgroundPhotoId/ImageCanvas";
// import SliderBox from "@/components/SliderBox/SliderBox";
// import StarCanvas from "@/image/Frame 13879.png";
import BackButton from "@/components/BackButton/BackButton";

// import SponsorSection from "@/components/SponsorSection/SponsorSection";
// import useLocalStorage from "@/hooks/useLocalStorage";
// import SocialMediaBar from "@/components/SocialMediaBar/SocialMediaBar";
export default function FormPage() {
  const [name, setName] = useState("");
  const [hobby, setHobby] = useState("");
  const [date, setDate] = useState<Date>();
  const [spiritAnimal, setSpiritAnimal] = useState("");
  const [openCalendar, setOpenCalendar] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false); // set to false later
  // const [isEditData, setIsEditData] = useState(false);

  const [base64ImageUrl, setBase64ImageUrl] = useState<string | null>(null);

  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  const [isChecking, setIsChecking] = useState(false);

  // const [stepForm, setStepForm] = useState(1);

  const [gotoResultPage, setGotoResultPage] = useState(false);

  // when isModalOpen = true

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

    // question is how to get the data the other info that I mocked
    // const formData = {
    //   user_id: "1", // if don't fill either user_id or email response status 500
    //   // email: "emailuser@gmail.com",
    //   display_name: "nameUser",
    //   full_name: name, // full_name is required
    //   email: "emailUser@gmail.com", // must follow this format
    //   // the other one is optional so recommended to have but don't need to

    //   hobby,
    //   dob: date,
    //   age: 23, // age is required
    //   occupation: "occupation",
    //   channel: "INSTAGRAM",
    //   // line_profile_pic, phone, gender, photo,
    //   spirit_animal: spiritAnimal,
    //   photoid_name: "photoid_name",
    //   // signature optional hobby
    // };
    window.localStorage.setItem("info", JSON.stringify(formData));
    //submit data
    // console.logle.log("Form Data Submitted:", formData);
    // localStorage should set here

    setIsSubmitted(true);
    setIsChecking(false);

    setName("");
    setHobby("");
    setDate(new Date());
    setSpiritAnimal("");
    setBase64ImageUrl(null);
    setCroppedImage(null);
  };

  useEffect(() => {
    if (isSubmitted && !isChecking) {
      const timeId = setInterval(() => {
        setIsSubmitted(false);

        setGotoResultPage(true);
      }, 3000); // custom time appropiate with video

      return () => clearInterval(timeId); // Proper cleanup
    }
    if (!isSubmitted && !isChecking && gotoResultPage) {
      router.push("/photoid/result");
    }
  }, [isSubmitted, isChecking, gotoResultPage]); // uncomment for design

  // const isFilledAllData =
  //   name && hobby && date && spiritAnimal && base64ImageUrl && croppedImage;

  return (
    // when isSubmit is false ==> show form and fill in
    // when status of gotoresultpage is true
    // isSubmitted is false
    // cannot show fill in
    <div className="overflow-hidden text-[#3D245B]">
      <button
        className="absolute left-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#3D245B]"
        onClick={() => {
          router.back();
        }}
      >
        ←
      </button>
      <BackGround />

      <ImageCanvas />
      {!isSubmitted && !gotoResultPage && !isChecking && (
        <div className="mt-5">
          <h1 className="title-photoid">Your info</h1>
          <p className="subtitle-photoid">ใส่ข้อมูลของคุณ</p>
        </div>
      )}

      {/* name */}
      {!isSubmitted && !gotoResultPage && !isChecking && (
        <section className="grid gap-4 p-6">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label htmlFor="name" className="mb-2 text-xs font-medium">
                Name{" "}
                <span className="font-poppins text-xs font-light leading-[100%] tracking-[0] text-[#3D245B]">
                  ชื่อ
                </span>
              </label>
              <input
                id="name"
                placeholder="ชื่อ"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-10 w-full rounded-lg p-2 text-sm"
              />
            </div>

            {/* hobby */}
            <div>
              <label htmlFor="hobby" className="mb-2 text-xs font-medium">
                Hobby{" "}
                <span className="font-poppins text-xs font-light leading-[100%] tracking-[0] text-[#3D245B]">
                  งานอดิเรก
                </span>
              </label>
              <select
                id="hobby"
                className={`h-10 w-full rounded-md p-2 text-sm ${hobby == "" ? "text-gray-400" : "text-black"}`}
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
                <span className="font-poppins text-xs font-light leading-[100%] tracking-[0] text-[#3D245B]">
                  ว/ด/ป เกิด
                </span>
              </label>
              <div className="flex items-center gap-2">
                <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
                  <PopoverTrigger asChild>
                    <div
                      onClick={() => setOpenCalendar(true)}
                      className={`w-full rounded-md bg-white p-2 text-sm ${date ? "text-black" : "text-gray-400"}`}
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
                <span className="text-xs font-light leading-[100%] tracking-[0] text-[#3D245B]">
                  เลือกสัตว์ที่ต้องการ
                </span>
              </label>

              <ul className="no-scrollbar flex gap-4 overflow-auto">
                {ANIMALS.map(({ value, label }) => (
                  <li
                    onClick={() => {
                      setSpiritAnimal(value);
                    }}
                    key={value}
                    value={value}
                    className={`flex cursor-pointer items-center justify-center px-2 ${spiritAnimal === value ? "bg-black text-white" : "bg-white text-black"}`}
                  >
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <section className="grid grid-cols-3 gap-6 place-self-start">
            <label
              htmlFor="signature"
              className="col-span-1 mb-2 text-xs font-medium"
            >
              Your signature
              <p className="text-xs font-light leading-[100%] tracking-[0] text-[#3D245B]">
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
              <p className="text-xs font-light leading-[100%] tracking-[0] text-[#3D245B]">
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
              <div className="relative mt-6 flex items-center justify-center">
                <button
                  className="absolute w-[16rem] rounded-full bg-purple-gradient py-2 text-[1.25rem] text-white"
                  onClick={() => {
                    setIsChecking(true);
                  }}
                >
                  SUBMIT
                </button>
              </div>
            )}

          {/* send button */}
        </section>
      )}

      {!isSubmitted && !gotoResultPage && isChecking && (
        <>
          <div className="relative m-6 bg-white py-2">
            <button
              className="absolute right-2 top-2 z-20"
              onClick={() => {
                setIsChecking(false);
              }}
            >
              <Image
                src={"/photoid/eraser.svg"}
                alt="eraser"
                width={20}
                height={20}
              />
            </button>
            <div>
              <h2 className="text-center font-cooper text-[2.25rem]">
                Your Info
              </h2>
              <p className="text-center">ตรวจสอบข้อมูลของคุณ</p>
            </div>

            <div className="grid grid-cols-3 p-4">
              <div className="col-span-2 p-3">
                <div className="mb-2">
                  <span>Name</span>
                  <p className="w-full rounded-sm border border-black px-3 py-1">
                    {name}
                  </p>
                </div>
                <div className="mb-2">
                  <span>Hobby</span>
                  <p className="w-full rounded-sm border border-black px-3 py-1">
                    {hobby}
                  </p>
                </div>
                <div className="mb-2">
                  <span>Date</span>
                  <p className="w-full rounded-sm border border-black px-3 py-1">
                    {date && formatDate(new Date(date.toISOString()))}
                  </p>
                </div>
                <div className="mb-2">
                  <span>Signature</span>
                  <div className="relative h-16 w-full rounded-sm border border-black">
                    {base64ImageUrl && (
                      <Image
                        src={base64ImageUrl}
                        className="object-contain"
                        fill={true}
                        alt="signature"
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="relative col-span-1 p-3">
                <div>
                  <span>Animal</span>
                  <p>{spiritAnimal}</p>
                </div>
                <div>
                  <span>ID Photo</span>
                  <div className="relative h-24 w-24 rounded-sm border border-black">
                    {croppedImage && (
                      <Image
                        className="rounded-sm"
                        src={croppedImage}
                        fill={true}
                        alt=""
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* <span>Checking page</span>
          <button
            onClick={() => {
              setIsChecking(false);
            }}
          >
            Cancel (rubber)
          </button>
          <button onClick={handleSubmit}>Go to result</button> */}
          </div>
          <div className="flex w-full justify-center">
            <button
              onClick={handleSubmit}
              className="w-[16rem] rounded-full bg-purple-gradient py-2 text-[1.25rem] text-white"
            >
              LET&#39;S GO!
            </button>
          </div>
        </>
      )}
      {/* Printing Page */}
      {((isSubmitted && !isChecking) ||
        (!isSubmitted && !isChecking && gotoResultPage)) && (
        <section className="">
          <div>
            <BackButton />
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-x-[calc(50%)] -translate-y-[calc(50%+4rem)]">
            <div className="flex flex-col items-center justify-center gap-6">
              <h1 className="text-3xl">Printing...</h1>
              <Image
                src="/photoid/photo_prints.png"
                alt="oddie.png"
                width={90}
                height={90}
              />
              <div className="flex justify-center gap-2">
                <div className="h-4 w-4 rounded-full bg-[#3D245B]"></div>
                <div className="h-4 w-4 rounded-full bg-[#3D245B]"></div>
                <div className="h-4 w-4 rounded-full bg-[#3D245B]"></div>
              </div>
              <h2 className="text-2xl">Almost Done!</h2>
            </div>
          </div>
          {/* <div className="absolute bottom-0">
            <SponsorSection />
          </div> */}
        </section>
      )}
    </div>
  );
}
