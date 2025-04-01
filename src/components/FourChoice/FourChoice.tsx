"use client";

import { Checkbox } from "@/components/ui/checkbox";


export default function FourChoice({ questions, selected, setSelected } : { questions:Array<string>, selected:number, setSelected: (selected: number) => void}) {
  return (
    <div className="bg-slate-200 p-6 rounded-lg w-64 mx-auto">
      {questions.map((question, index) => (
        <div key={index} className="flex items-center space-x-2 p-2">
          <Checkbox
            id={`question-${index}`}
            checked={selected === index}
            onCheckedChange={(checked) => setSelected(checked ? index : selected)}
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
