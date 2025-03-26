"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

const questions = ["Choice 1", "Choice 2", "Choice 3", "Choice 4"];

export default function FourChoice() {
  const [selected, setSelected] = useState(0);

  return (
    <div className="bg-slate-200 p-6 rounded-lg w-64 mx-auto">
      {questions.map((question, index) => (
        <div key={index} className="flex items-center space-x-2 p-2">
          <Checkbox
            id={`question-${index}`}
            checked={selected === index}
            onCheckedChange={() => setSelected(index)}
          />
          <label
            htmlFor={`question-${index}`}
            className="text-sm font-medium cursor-pointer"
          >
            {question}
          </label>
        </div>
      ))}
    </div>
  );
}
