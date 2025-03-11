"use client"
import React, { useState } from "react";
import QuestionBox from "../_QuestionBox/QuestionBox";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ThreeOutOfNinePickerProps {
    question: string;
    options: string[];
}

export default function ThreeOutOfNinePicker({ question, options }: ThreeOutOfNinePickerProps) {
    if (options.length !== 9) {
        throw new Error("ThreeOutOfNinePicker requires exactly 9 options");
    }

    const [selected, setSelected] = useState<number[]>([]);

    const handleSelect = (index: number) => {
        if (selected.includes(index)) {
            setSelected(selected.filter((i) => i !== index));
        } else if (selected.length < 3) {
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
                    className="grid grid-cols-3 gap-6 w-full bg-custom-light-gray rounded-xl p-6"
                >
                    {Object.entries(options).map(([index, option]) => (
                        <Button
                            className={cn(
                                "w-full h-full aspect-square", 
                                selected.includes(Number(index)) ? "border-black border-4" : "", // Border on selected
                                selected.length === 3 && !selected.includes(Number(index)) ? "blur-sm" : "", // Blur other options
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