"use client"
import React, { useState } from "react";
import Modal from "@/components/Modal/Modal";
import { Eraser } from 'lucide-react';

interface ConfirmFormProps {
    name?: string;
    hobby?: string;
    dob?: Date;
    animal?: string;
    photo?: string;
    signature?: string;
}

interface UseConfirmFormReturn {
    showConfirm: (props: ConfirmFormProps) => void;
    hideConfirm: () => void;
    ConfirmForm: React.FC;
}

interface LabelBoxProps {
    labelEng?: string;
    labelThai?: string;
    value?: string;
}

const useConfirmForm = (): UseConfirmFormReturn => {
    const [show, setShow] = useState(false);

    const LabelBox: React.FC<LabelBoxProps> = ({ labelEng = 'EN', labelThai = 'TH', value = 'value' }) => {
        return (
            <div
                className="flex flex-col w-full"
            >
                <span>{labelEng} <span className="text-custom-light-gray">{labelThai}</span></span>
                <div
                    className="flex items-center p-2 border-[1px] border-custom-purple rounded-xl"
                >
                    {value}
                </div>
            </div>
        );
    };

    const showConfirm = ({ name, hobby, dob, animal, photo, signature }: ConfirmFormProps) => {
        setShow(true);
    };

    const hideConfirm = () => {
        setShow(false);
    };

    const ConfirmForm: React.FC = () => {
        if (!show) {
            return null;
        }

        return (
            <Modal
                className="flex items-center justify-center h-full z-20 backdrop-blur-sm p-4"
            >
                <div
                    className="relative flex flex-col justify-center items-center gap-8 px-4 py-8 bg-white rounded-xl text-custom-purple w-full h-auto"
                >
                    <Eraser
                        className="absolute top-4 right-4"
                    />
                    <div
                        className="flex flex-col items-center"
                    >
                        <h1
                            className="text-center text-4xl font-extrabold font-cooper"
                        >
                            Your info
                        </h1>
                        <span>ตรวจสอบข้อมูลของคุณ</span>
                    </div>

                    {/* Grid */}
                    <div
                        className="grid grid-cols-2 gap-4 w-full text-sm"
                    >
                        <LabelBox
                            labelEng="Name"
                            labelThai="ชื่อ"
                            value="ชื่อ"
                        />
                        <LabelBox
                            labelEng="Hobby"
                            labelThai="งานอดิเรก"
                            value="งานอดิเรก"
                        />
                        <LabelBox
                            labelEng="Date of birth"
                            labelThai="ว/ด/ป เกิด"
                            value="dd/mm/yyy"
                        />
                    </div>
                </div>
            </Modal>
        );
    };

    return {
        showConfirm,
        hideConfirm,
        ConfirmForm
    };
};

export default useConfirmForm;