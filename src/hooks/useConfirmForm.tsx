"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import { Eraser } from 'lucide-react';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { dateFormat } from "@/lib/utils";

interface ConfirmFormProps {
    name: string;
    hobby: string;
    dob: Date;
    animal: string;
    photo: string;
    signature: string;
    redirect: string;
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
    const router = useRouter();
    const [formData, setFormData] = useState<ConfirmFormProps>({
        name: '',
        hobby: '',
        dob: new Date(),
        animal: '',
        photo: '',
        signature: '',
        redirect: '',
    });
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

    const showConfirm = ({ name, hobby, dob, animal, photo, signature, redirect }: ConfirmFormProps) => {
        setFormData({ name, hobby, dob, animal, photo, signature, redirect });
        setShow(true);
    };

    const hideConfirm = () => {
        setFormData({
            name: "",
            hobby: "",
            dob: new Date(),
            animal: "",
            photo: "",
            signature: "",
            redirect: ""
        });
        setShow(false);
    };

    const ConfirmForm: React.FC = () => {
        if (!show) {
            return null;
        }

        return (
            <Modal
                allowScrolling={true}
                className="flex flex-col items-center justify-center gap-8 h-full z-20 backdrop-blur-sm p-4"
            >
                {/* Form */}
                <div
                    className="relative flex flex-col justify-center items-center gap-8 px-4 py-8 bg-white rounded-xl text-custom-purple w-full h-auto"
                >
                    <Eraser
                        className="absolute top-4 right-4 cursor-pointer"
                        onClick={hideConfirm}
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

                    {/* Grid - Name, Hobby, Dob */}
                    <div
                        className="grid grid-cols-2 gap-4 w-full text-sm"
                    >
                        <LabelBox
                            labelEng="Name"
                            labelThai="ชื่อ"
                            value={formData.name}
                        />
                        <LabelBox
                            labelEng="Hobby"
                            labelThai="งานอดิเรก"
                            value={formData.hobby}
                        />
                        <LabelBox
                            labelEng="Date of birth"
                            labelThai="ว/ด/ป เกิด"
                            value={formData.dob ? dateFormat(formData.dob) : ''}
                        />
                    </div>

                    {/* Animal and Photo id */}
                    <div
                        className="flex justify-around items-center w-full gap-8 px-8"
                    >
                        <div
                            className="flex flex-col items-center gap-2"
                        >
                            <span>Animal</span>
                            <div
                                className="flex rounded-lg border-[1px] border-custom-purple h-[144px] w-[144px]"
                            >
                                <Image
                                    src={formData.animal}
                                    alt={'animal'}
                                    width={393}
                                    height={852}
                                    className="object-contain"
                                />
                            </div>
                        </div>
                        <div
                            className="flex flex-col items-center gap-2"
                        >
                            <span>Photo id</span>
                            <div
                                className="flex rounded-lg border-[1px] border-custom-purple h-[144px] w-[144px]"
                            >
                                <Image
                                    src={formData.photo}
                                    alt={'photo'}
                                    width={393}
                                    height={852}
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Signature */}
                    <div
                        className="flex flex-col items-center gap-2 w-full px-8"
                    >
                        <span>Signature</span>
                        <div
                            className="flex rounded-lg border-[1px] border-custom-purple h-[144px]"
                        >
                            <Image
                                src={formData.signature}
                                alt={'signature'}
                                width={393}
                                height={852}
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>

                {/* Let's go button */}
                <div
                    className="flex justify-center w-full"
                >
                    <Button
                        className="py-6 px-16 bg-white text-custom-purple rounded-3xl hover:bg-custom-purple hover:text-white"
                        onClick={() => router.push(formData.redirect)}
                    >
                        <div
                            className="flex items-center text-center text-2xl font-extrabold font-cooper"
                        >
                            {"Let's go"}
                        </div>
                    </Button>
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