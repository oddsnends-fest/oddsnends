"use client"
import React, { useState } from "react";

interface ConfirmFormProps {
    name: string;
    hobby: string;
    dob: Date;
    animal: string;
    photo: string;
    signature: string;
}

interface UseConfirmFormReturn {
    showConfirm: (props: ConfirmFormProps) => void;
    hideConfirm: () => void;
    confirmForm: React.FC;
}

const useConfirmForm = (): UseConfirmFormReturn => {
    const [show, setShow] = useState(false);

    const showConfirm = ({ name, hobby, dob, animal, photo, signature } : ConfirmFormProps) => {
        setShow(true);
    };

    const hideConfirm = () => {
        setShow(false);
    }

    const confirmForm: React.FC = () => {
        if (!show) {
            return null;
        }

        return (
            <div>

            </div>
        );
    };

    return {
        showConfirm,
        hideConfirm,
        confirmForm
    }
};

export default useConfirmForm;