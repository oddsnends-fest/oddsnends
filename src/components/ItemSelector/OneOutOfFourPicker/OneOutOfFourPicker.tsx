"use client"
import React, { useState } from "react";
import QuestionBox from "../_QuestionBox/QuestionBox";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface OneOutOfFourPickerProps {
    question: string;
    options: string[];
}

export default function OneOutOfFourPicker({ question, options }: OneOutOfFourPickerProps) {
    if (options.length !== 4) {
        throw new Error("OneOutOfFourPicker requires exactly 4 options");
    }

    const [selected, setSelected] = useState<number[]>([]);

    const handleSelect = (index: number) => {
        if (selected.includes(index)) {
            setSelected(selected.filter((i) => i !== index));
        } else if (selected.length < 1) {
            setSelected([...selected, index]);
        }
    };

    return (
        <>
            <div
                className="flex flex-col gap-4"
            >
                <QuestionBox question={question} />
                <div
                    className="grid grid-cols-2 gap-6 w-full bg-custom-light-gray rounded-xl px-12 py-6"
                >
                    {Object.entries(options).map(([index, option]) => (
                        <Button
                            className={cn(
                                "w-full h-full aspect-square",
                                Number(index) >= 2 ? "translate-x-6" : "-translate-x-6", // Options shifting
                                selected.includes(Number(index)) ? "border-black border-4" : "", // Border on selected
                                selected.length === 1 && !selected.includes(Number(index)) ? "blur-sm" : "", // Blur other options
                            )}
                            variant={"outline"}
                            onClick={() => handleSelect(Number(index))}
                            key={index}
                        >
                            {option}
                        </Button>
                    ))}
                </div>
            </div>
        </>
    )
};