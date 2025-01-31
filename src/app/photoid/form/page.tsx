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
import Image from "next/image";

export default function FormPage() {
  const [name, setName] = useState("");
  const [hobby, setHobby] = useState("");
  const [date, setDate] = React.useState<Date>();
  const [spiritAnimal, setSpiritAnimal] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //prevent null submitting
    if (!name || !hobby || !date || !spiritAnimal) {
      console.log("Please fill in all fields.");
      return;
    }
    const formData = {
      name,
      hobby,
      date,
      spiritAnimal,
    };
    //submit data
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="h-screen overflow-hidden">
      {/* logo */}
      <Image
        src="/"
        alt="LogoImage"
        width={60}
        height={60}
        className="mx-auto mt-14 border"
      />
      <div className="mt-5 flex justify-center text-center text-4xl font-bold">
        Fill in
      </div>

      {/* name */}
      <form onSubmit={handleSubmit} className="m-6 mt-20 grid gap-4">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <label htmlFor="name" className="mb-2 text-xl font-medium">
              Name
            </label>
            <input
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-8 w-full rounded-lg border-2 border-black p-2 text-xs"
            />
          </div>

          {/* hobby */}
          <div>
            <label htmlFor="hobby" className="mb-2 text-xl font-medium">
              Hobby
            </label>
            <select
              id="hobby"
              className={`h-8 w-full rounded-md border-2 border-black p-2 text-xs ${hobby == "" ? "text-gray-400" : "text-black"}`}
              value={hobby}
              onChange={(e) => setHobby(e.target.value)}
            >
              <option value="" disabled className="text-gray-400">
                Select. . .
              </option>
              <option value="a" className="text-black">
                A
              </option>
              <option value="b" className="text-black">
                B
              </option>
              <option value="c" className="text-black">
                C
              </option>
            </select>
          </div>

          {/* date of birth */}
          <div>
            <label htmlFor="date" className="mb-2 text-xl font-medium">
              Date of birth
            </label>
            <div className="flex items-center gap-2">
              <div
                className={`h-8 w-full rounded-md border-2 border-black p-2 text-xs ${date ? "text-black" : "text-gray-400"}`}
              >
                {date ? format(date, "dd/MM/yyyy") : "DD/MM/YYYY"}
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="flex h-8 w-10 items-center justify-center border-2 border-black p-0"
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
            <label htmlFor="spirit-animal" className="mb-2 text-xl font-medium">
              Spirit Animal
            </label>
            <select
              id="spirit-animal"
              className={`h-8 w-full rounded-md border-2 border-black p-2 text-xs ${spiritAnimal == "" ? "text-gray-400" : "text-black"}`}
              value={spiritAnimal}
              onChange={(e) => setSpiritAnimal(e.target.value)}
            >
              <option value="" disabled className="text-gray-400">
                Select. . .
              </option>
              <option value="d" className="text-black">
                D
              </option>
              <option value="e" className="text-black">
                E
              </option>
              <option value="f" className="text-black">
                F
              </option>
            </select>
          </div>
        </div>

        {/* send button */}
        <button
          type="submit"
          className="mx-auto mt-60 w-3/4 rounded-2xl bg-[#353535] p-2 text-white hover:bg-gray-500"
        >
          Send
        </button>
      </form>
    </div>
  );
}
