import React from "react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface CheckboxProps {
    className?: string,
    onClick?: () => void;
    onChange?: () => void;
    color?: string;
    disabled?: boolean;
}

function Checkbox({ className, onClick, onChange, color = "blue", disabled = false }: CheckboxProps) {
    const [isChecked, setIsChecked] = useState(false);

    // Track the checked status for dynamic styling
    const handleChecked = () => {
        setIsChecked((prev) => !prev);

        if (onChange) {
            onChange();
        }
    }

    return (
        <>
            <div
                // className="inline-flex items-center"
                className={cn(
                    "inline-flex items-center",
                    className
                )}
            >
                <label
                    className="flex items-center cursor-pointer relative"
                >
                    {/* The actual checkbox */}
                    <input
                        type="checkbox"
                        onClick={onClick}
                        onChange={handleChecked}
                        className={`peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300`}
                        // for dynamic color input
                        style={{
                            backgroundColor: isChecked ? `${color}` : "",
                            borderColor: isChecked ? `${color}` : "",
                        }}
                        disabled={disabled}
                    />
                    {/* The checkmark */}
                    <span
                        className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="1"
                        >
                            <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </span>
                </label>
            </div>
        </>
    )
}

export default Checkbox;