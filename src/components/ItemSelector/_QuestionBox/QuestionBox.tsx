"use client"
import React from "react";

interface QuestionBoxProps {
    question: string;
}

export default function QuestionBox({ question }: QuestionBoxProps) {
    return (
        <>
            <div
                className="w-full bg-custom-light-gray rounded-xl py-8 px-4 text-center"
            >
                {question}
            </div>
        </>
    )
}