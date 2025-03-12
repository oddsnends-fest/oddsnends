"use client"
import React, { useState } from "react";
import QuestionBox from "../_QuestionBox/QuestionBox";
// import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface OneOutOfFourPickerProps {
    question: string;
    srcs: string[];
    selected: number[];
    onSelectionChange: (selectedIndex: number[]) => void;
}

export default function OneOutOfFourPicker({ question, srcs, selected, onSelectionChange }: OneOutOfFourPickerProps) {
    if (srcs.length !== 4) {
        throw new Error("OneOutOfFourPicker requires exactly 4 srcs");
    }

    const handleSelect = (index: number) => {
        if (selected.includes(index)) {
            onSelectionChange(selected.filter((i) => i !== index));
        } else if (selected.length < 1) {
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
                    className="grid grid-cols-2 gap-6 w-full bg-custom-light-gray rounded-xl px-12 py-6"
                >
                    {Object.entries(srcs).map(([index, option]) => (
                        <Image
                            key={index}
                            src={option}
                            alt={option}
                            onClick={() => handleSelect(Number(index))}
                            className={cn(
                                "w-full h-full aspect-square cursor-pointer",
                                Number(index) >= 2 ? "translate-x-6" : "-translate-x-6", // Images shifting
                                selected.includes(Number(index)) ? "border-black border-4" : "", // Border on selected
                                selected.length === 1 && !selected.includes(Number(index)) ? "blur-sm" : "", // Blur other Images
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