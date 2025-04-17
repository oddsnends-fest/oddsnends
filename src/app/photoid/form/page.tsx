"use client";
import { useState, FormEvent, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import SliderBox from "@/components/SliderBox/SliderBox";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function FormPage() {
  const [name, setName] = useState("");
  const [hobby, setHobby] = useState("");
  const [date, setDate] = useState<Date>();
  const [spiritAnimal, setSpiritAnimal] = useState("");
  const [openCalendar, setOpenCalendar] = useState(false);
  const [signatureURL, setSignatureURL] = useState("");
  const [croppedImage, setCroppedImage] = useState("");

  const router = useRouter();

  useEffect(() => {
    const storedData = localStorage.getItem("formData");
    if(storedData) {
      const parsed = JSON.parse(storedData);
      setName(parsed.name || "");
      setHobby(parsed.hobby || "");
      setDate(parsed.date ?? undefined);
      setSpiritAnimal(parsed.spiritAnimal || "");
      setSignatureURL(parsed.signatureURL || "");
      setCroppedImage(parsed.croppedImage || "");
    }
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //prevent null submitting
    if (!name || !hobby || !date || !spiritAnimal || !signatureURL || !croppedImage) {
      console.log("Please fill in all fields.");
      return;
    }
    const formData = {
      name,
      hobby,
      date,
      spiritAnimal,
      signatureURL,
      croppedImage,
    };

    //submit data
    console.log("Form Data Submitted: ", formData);
    localStorage.setItem("formData", JSON.stringify(formData));

    router.push("/photoid/recheck");
  };

  return (
    <div className="overflow-hidden">
      <div className="mt-5 flex justify-center text-center text-4xl font-extrabold">
        Fill in
      </div>

      {/* name */}
      <form onSubmit={handleSubmit} className="m-6 mt-20 grid gap-4">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <label htmlFor="name" className="mb-2 text-2xl font-medium">
              Name
            </label>
            <input
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-10 w-full rounded-lg border-2 border-black p-2 text-sm"
            />
          </div>

          {/* hobby */}
          <div>
            <label htmlFor="hobby" className="mb-2 text-2xl font-medium">
              Hobby
            </label>
            <select
              id="hobby"
              className={`h-10 w-full rounded-md border-2 border-black p-2 text-sm ${hobby == "" ? "text-gray-400" : "text-black"}`}
              value={hobby}
              onChange={(e) => setHobby(e.target.value)}
            >
              <option value="" disabled className="text-gray-400">
                Select. . .
              </option>
              {HOBBY.map(({ value, label }) => (
                <option key={value} value={value} className="text-black">
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* date of birth */}
          <div>
            <label htmlFor="date" className="mb-2 text-2xl font-medium">
              Date of birth
            </label>
            <div className="flex items-center gap-2">
              <div
                className={`h-10 w-full rounded-md border-2 border-black p-2 text-sm ${date ? "text-black" : "text-gray-400"}`}
              >
                {date ? format(date, "dd/MM/yyyy") : "DD/MM/YYYY"}
              </div>
              <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="flex h-10 w-12 items-center justify-center border-2 border-black p-0"
                    onClick={() => setOpenCalendar(true)}
                  >
                    <CalendarIcon className="h-5 w-5" />
                  </Button>
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

          {/* spirit animal */}
          <div>
            <label
              htmlFor="spirit-animal"
              className="mb-2 text-2xl font-medium"
            >
              Spirit Animal
            </label>
            <select
              id="spirit-animal"
              className={`h-10 w-full rounded-md border-2 border-black p-2 text-sm ${spiritAnimal == "" ? "text-gray-400" : "text-black"}`}
              value={spiritAnimal}
              onChange={(e) => setSpiritAnimal(e.target.value)}
            >
              <option value="" disabled className="text-gray-400">
                Select. . .
              </option>
              {ANIMALS.map(({ value, label }) => (
                <option key={value} value={value} className="text-black">
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Signature */}
        <Signature 
          signatureURL={signatureURL}
          setSignatureURL={setSignatureURL}
        />

        {/* Photo upload */}
        <div
          className="flex justify-center items-center"
        >
          {!croppedImage ? (
            <PhotoUpload
              setCroppedImage={setCroppedImage}
            />
          ) : (
            <Image
              src={croppedImage}
              alt="Cropped Photo"
              width={393}
              height={852}
              className="w-[40%] h-auto"
            />
          )}
        </div>

        {/* send button */}
        <button
          type="submit"
          className="mx-auto mt-10 w-3/4 rounded-2xl bg-custom-dark-gray p-2 text-xl text-white hover:bg-custom-light-gray"
        >
          Send
        </button>
      </form>
    </div>
  );
}
