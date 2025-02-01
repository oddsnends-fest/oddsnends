"use client"
import React from "react";
import { useState, useEffect } from "react";

interface ModalProps {
    children: React.ReactNode;
    onClick?: () => void; // Make onClick optional
}

function Modal({ children, onClick }: ModalProps) {
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        // Disable scrolling when the modal is open
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto"; // Restore scroll when closed
        }

        // Clean up the effect when the component is unmounted or modal is closed
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]); // Runs whenever `isOpen` changes

    const handleClick = () => {
        setIsOpen(false);
        if (onClick) {
            onClick();
        }
    }

    return (
        <div
            onClick={handleClick}
            className="absolute inset-0 bg-black bg-opacity-20 backdrop-blur-md flex items-center justify-center max-h-screen"
        >
            {children}
        </div>
    );
}

export default Modal;