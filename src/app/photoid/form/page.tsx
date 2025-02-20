"use client";
import { useState, FormEvent } from "react";
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
import Signature from "@/app/components/Signature";
import PhotoUpload from "@/app/components/PhotoUpload/PhotoUpload";
import useUploadImage from "@/hooks/useUploadImage";
export default function FormPage() {
  const [name, setName] = useState("");
  const [hobby, setHobby] = useState("");
  const [date, setDate] = useState<Date>();
  const [spiritAnimal, setSpiritAnimal] = useState("");

  const formatDateToDDMMYY = (date: Date) => {
    if (!date) return "";
    const day = String(date.getDate()).padStart(2, "0"); // Ensure 2 digits for day
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Ensure 2 digits for month
    const year = String(date.getFullYear()).slice(-2); // Get last 2 digits of the year
    return `${day}-${month}-${year}`;
  };

  // set formate date as well

  const {
    croppedImage,
    setCroppedImage,
    imageSignatureUrl,
    setImageSignatureUrl,
  } = useUploadImage(); // get cropped image to display the data
  // use function to setState the element
  // use custom hook and pass the props to child component (drill props)
  // as well as react canvas

  // if (croppedImage) {
  //   console.log(croppedImage.slice(0, 10), "form page");
  // }
  // if (imageSignatureUrl) {
  //   console.log(imageSignatureUrl.slice(0, 10), "form page");
  // } ==> success

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(croppedImage, "croppedImage from page form/page.tsx");
    //prevent null submitting

    if (
      !name ||
      !hobby ||
      !date ||
      !spiritAnimal ||
      !croppedImage ||
      !imageSignatureUrl
    ) {
      console.log("Please fill in all fields.");
      return;
    }
    // setFormattedDate(format(date, "dd-mm-yy"));
    // console.log(formattedDate, "formattedDate from page.tsx");
    let formattedDate = formatDateToDDMMYY(date);
    const formData = {
      name,
      hobby,
      date: formattedDate,
      spiritAnimal,
      croppedImage,
      imageSignatureUrl,
    };
    //submit data
    console.log("Form Data Submitted:", formData);
    try {
      const response = await fetch("/api/testupload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      console.log("Success:", data);
      setName("");
      setHobby("");
      setDate(new Date());
      setSpiritAnimal("");
    } catch (error) {
      console.error("Error:", error);
    }
    // add complete UI ==> not for sure skip it
    // Integration data to submit ==> correct
    // know the result to submit ==> yes

    // find the route to store the database ==> quite sure
    // fetch the data method post ==> in progress
  };

  return (
    <div className="">
      <div className="mt-5 flex justify-center text-center text-4xl font-extrabold">
        Fill in
      </div>

      {/* name */}
      <form
        onSubmit={handleSubmit}
        className="mt-10 flex flex-1 flex-col gap-4 p-6"
      >
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
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="flex h-10 w-12 items-center justify-center border-2 border-black p-0"
                  >
                    <CalendarIcon className="h-5 w-5" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(selectedDate) =>
                      selectedDate && setDate(selectedDate)
                    }
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
        {/* Signature section */}
        <Signature
          imageSignatureUrl={imageSignatureUrl}
          setImageSignatureUrl={setImageSignatureUrl}
        />

        <PhotoUpload setCroppedImage={setCroppedImage} />

        {/* send button */}
        <button
          type="submit"
          className="mx-auto w-3/4 rounded-2xl bg-custom-dark-gray p-2 text-xl text-white hover:bg-custom-light-gray"
        >
          Send
        </button>
      </form>
    </div>
  );
}

// url entry point are very important
