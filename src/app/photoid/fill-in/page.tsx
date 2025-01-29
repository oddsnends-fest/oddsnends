"use client"
import { useState, FormEvent } from "react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import React from "react";

export default function FormPage() {
  const [name, setName] = useState("");
  const [hobby, setHobby] = useState("");
  const [date, setDate] = React.useState<Date>()
  const [spiritAnimal, setSpiritAnimal] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      name,
      hobby,
      date,
      spiritAnimal,
    };
    console.log("Form Data Submitted:", formData);
  };

  return (
    <>
    <div className="text-6xl font-bold text-center m-6">Fill in</div>
        <form onSubmit={handleSubmit} className="grid gap-4 m-4">
          <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-md font-medium mb-2">
              Name
            </label>
            <input
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 block h-10 w-full rounded-md border-2 border-black sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="hobby" className="block text-md font-medium mb-2">
              Hobby
            </label>
            <select
              id="hobby"
              className={`p-2 h-10 block w-full rounded-md border-2 border-black sm:text-sm ${hobby=="" ? "text-gray-400" : "text-black"}`}
              value={hobby}
              onChange={(e) => setHobby(e.target.value)}
              
            >
              <option value="" disabled className="text-gray-400">Select. . .</option>
              <option value="a" className="text-black">A</option>
              <option value="b" className="text-black">B</option>
              <option value="c" className="text-black">C</option>
            </select>
          </div>

          <div>
  <label htmlFor="dob" className="block text-md font-medium mb-2">
    Date of birth
  </label>
    <div className="flex items-center gap-2">
    <div
      className={`p-2 block w-full rounded-md border-2 border-black sm:text-sm 
        ${date ? "text-black" : "text-gray-400"}`}
    >
      {date ? format(date, "dd/MM/yyyy") : "DD/MM/YYYY"}
    </div>
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className="w-10 h-10 p-0 flex items-center justify-center border-2 border-black"
        >
          <CalendarIcon className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(selectedDate) => selectedDate && setDate(selectedDate)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
    
  </div>
</div>


          <div>
            <label htmlFor="spirit-animal" className="block text-md font-medium mb-2">
              Spirit Animal
            </label>
            <select
              id="spirit-animal"
              className={`h-10 p-2 block w-full rounded-md border-2 border-black sm:text-sm ${spiritAnimal=="" ? "text-gray-400" : "text-black"}`}
              value={spiritAnimal}
              onChange={(e) => setSpiritAnimal(e.target.value)}
            >
              <option value="" disabled className="text-gray-400">Select. . .</option>
              <option value="d" className="text-black">D</option>
              <option value="e" className="text-black">E</option>
              <option value="f" className="text-black">F</option>
            </select>
          </div>
          </div>

          <Button
            type="submit"
            className="bg-black text-white py-2 rounded-xl hover:bg-gray-500"
          >
            Submit
          </Button>
        </form>
    </>
   
  );
}