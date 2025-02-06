"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import BackButton from "@/app/components/BackButton/BackButton";
import Checkbox from "@/app/components/Checkbox/Checkbox";
import { cn } from "@/lib/utils";

function Frame() {
    const router = useRouter();
    // Dummy data
    const frameSrc = ["/images/instagram.png", "/images/oddsnend-logo.png", "/images/oddsnend-logo.png"];
    // Track user's selection
    const [selectedFrame, setSelectedFrame] = useState<number | null>(null);
    const [checked, setChecked] = useState(false);

    const handleClickCheckBox = (index: number) => {
        // Store user's selection
        setChecked(true);
        setSelectedFrame(index);

        // Wait 2 seconds before proceeding to photid form
        setTimeout(() => {
            router.push("/photoid/form");
        }, 2000);
    }

    return (
        <>
            <BackButton />
            <main className="mt-12 mb-6 flex flex-col justify-center items-center gap-8">
                <h1 className="text-center text-4xl font-extrabold leading-[1.25]">
                    Select Frame
                </h1>
                {/* Grid containing frame options */}
                <div
                    className="w-[80%] grid grid-cols-1 gap-6"
                >
                    {frameSrc.map((src, index) => {
                        return (
                            <div
                                key={index}
                                className={cn(
                                    "bg-white shadow-lg rounded-lg relative overflow-hidden hover:shadow-2xl",
                                    // blur if selected frame is not equal to this index
                                    selectedFrame !== null && selectedFrame !== index && "blur-sm",
                                )}
                            >
                                {/* Checkbox */}
                                <Checkbox
                                    onClick={() => handleClickCheckBox(index)}
                                    className="absolute top-2 left-2"
                                    color="blue"
                                    // disable all checkbox after the user has made a selection
                                    disabled={checked}
                                />
                                {/* Image as background */}
                                <div
                                    className="w-full h-64 bg-cover bg-center"
                                    style={{
                                        backgroundImage: `url(${src})`
                                    }}
                                />
                            </div>
                        )
                    })}

                </div>
            </main>
        </>
    )
}

export default Frame;