"use client"
import React from "react";
import QuestionBox from "../_QuestionBox/QuestionBox";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ThreeOutOfNinePickerProps {
    question: string;
    srcs: string[];
    selected: number[];
    onSelectionChange: (selectedIndex: number[]) => void;
}

export default function ThreeOutOfNinePicker({ question, srcs, selected, onSelectionChange }: ThreeOutOfNinePickerProps) {
    if (srcs.length !== 9) {
        throw new Error("ThreeOutOfNinePicker requires exactly 9 srcs");
    }

    const handleSelect = (index: number) => {
        if (selected.includes(index)) {
            onSelectionChange(selected.filter((i) => i !== index));
        } else if (selected.length < 3) {
            onSelectionChange([...selected, index]);
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
                    {Object.entries(srcs).map(([index, option]) => (
                        <Image
                            key={index}
                            src={option}
                            alt={option}
                            onClick={() => handleSelect(Number(index))}
                            className={cn(
                                "w-full h-full aspect-square cursor-pointer",
                                selected.includes(Number(index)) ? "border-black border-4" : "", // Border on selected
                                selected.length === 3 && !selected.includes(Number(index)) ? "blur-sm" : "", // Blur other Images
                            )}
                            width={200}
                            height={200}
                        />
                    ))}
                </div>
            </div>
        </>
    )
};