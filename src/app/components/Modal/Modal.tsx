"use client"
import React from "react";
import { useEffect } from "react";

interface ModalProps {
    children: React.ReactNode;
    onClick?: () => void; // Make onClick optional
    allowScrolling?: boolean;
    className?: string;
}

function Modal({ children, onClick, allowScrolling = false, className }: ModalProps) {
    useEffect(() => {
        // Disable scrolling when the modal is open
        if (!allowScrolling) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto"; // Restore scroll when closed
        }

        // Clean up the effect when the component is unmounted or modal is closed
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [allowScrolling]); // Runs whenever `isOpen` changes

    // const handleClick = () => {
    //     if (onClick) {
    //         onClick();
    //     }
    // }

    return (
        <div
            onClick={onClick}
            className={`absolute inset-0 bg-black bg-opacity-20 backdrop-blur-md ${className ?? ""}`}
        >
            {children}
        </div>
    );
}

export default Modal;