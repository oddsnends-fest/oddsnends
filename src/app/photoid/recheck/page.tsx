'use client'

import { useEffect, useState } from "react"
import Image from "next/image"
import { Eraser } from "lucide-react"
import { useRouter } from "next/navigation"
import BackButton from "@/components/BackButton/BackButton"
import BackGround from "@/components/BackgroundPhotoId"
import ImageCanvas from "@/components/BackgroundPhotoId/ImageCanvas"
import { ANIMALS } from "@/constants/spirit-animals"
import { SpiritAnimal } from "@prisma/client"

type userInfoType = {
    name: string;
    date: Date;
    hobby: string;
    spiritAnimal: string;
    croppedImage: string;
    base64ImageUrl: string;
}

const formatDate = (dateInput: Date | string): string => {
    const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  
    if (isNaN(date.getTime())) return ""; // Invalid date
  
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  };
  

const RecheckPage = () => {
    const router = useRouter();

    const [userInfo, setUserInfo] = useState<userInfoType>({
        name: "",
        date: new Date(),
        hobby: "",
        spiritAnimal: "",
        croppedImage: "/",
        base64ImageUrl: "/",
    });

    useEffect(() => {
        const storedData = localStorage.getItem("formData");
        if (storedData) {
          try {
            const parsed = JSON.parse(storedData) as unknown as Partial<userInfoType>;
            setUserInfo({
              name: parsed.name ?? "",
              date: parsed.date ? new Date(parsed.date) : new Date(),
              hobby: parsed.hobby ?? "",
              spiritAnimal: parsed.spiritAnimal ?? "",
              base64ImageUrl: parsed.base64ImageUrl ?? "/",
              croppedImage: parsed.croppedImage ?? "/",
            });
          } catch (error) {
            console.error("Failed to parse formData:", error);
          }
        }
      }, []);
      

    const handleEditData = () => {
        router.back();
    };

    const handleSubmit = () => {
        router.push("/photoid/print");
    };


    return (
        <div className="w-full">
            <BackButton />
            <BackGround />
            <ImageCanvas />
            <div className='relative m-5 rounded-xl py-7 bg-white text-[#34245B]'>
                <Eraser
                    onClick={handleEditData} 
                    size={29}
                    className="absolute top-5 right-4 stroke-[2.5] text-[#553B82] active:scale-90"
                />
                <div className='text-center'>
                    <h1 className='font-cooper tracking-wide text-3xl text-[#2C1E52]'>
                        Your Info
                    </h1>
                    <div>ตรวจสอบข้อมูลของคุณ</div>
                </div>

                <section className='mt-5 mx-6 flex flex-row text-xs'>
                    <div className='w-[10.5rem] mr-5 flex flex-col gap-3'>
                        <div>
                            Name 
                            <span className='ml-2 opacity-50'>ชื่อ</span>
                            <div className='mt-1 border border-[#3D245B] rounded-xl py-2 px-3 text-[#2E1E53]/60'>{userInfo.name}</div>
                        </div>
                        <div>
                            Hobby 
                            <span className='ml-2 opacity-50'>งานอดิเรก</span>
                            <div className='mt-1 border border-[#3D245B] rounded-xl py-2 px-3 text-[#2E1E53]/60'>{userInfo.hobby}</div>
                        </div>
                        <div>
                            Date of Birth 
                            <span className='ml-2 opacity-50'>ว/ด/ป เกิด</span>
                            <div className='mt-1 border border-[#3D245B] rounded-xl py-2 px-3 text-[#2E1E53]/60'>{formatDate(userInfo.date)}</div>
                        </div>
                        <div className="mt-2">
                            Signature
                            <div className='flex justify-center items-center mt-1 border border-black rounded-xl h-24'>
                                <Image 
                                    src={userInfo.base64ImageUrl}
                                    alt="sign"
                                    width={100}
                                    height={100}
                                    className="object-contain max-w-[200px] max-h-[80px]"
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col justify-start gap-10 mx-auto'>
                        <div className="text-center">
                            Animal
                            <div className="mt-1">
                                {ANIMALS.find(animal => animal.value === userInfo.spiritAnimal)?.label}
                            </div>
                        </div>
                        <div className="text-center">
                            ID Photo
                            <Image 
                                src={userInfo.croppedImage}
                                alt="id photo"
                                width={100}
                                height={125}
                                className="mt-1 border border-[#3D245B] rounded-xl"
                            />
                        </div>
                    </div>
                </section>
            </div>
            <div 
                onClick={handleSubmit}
                className="mx-auto mt-8 py-3 w-52 text-center text-xl text-white font-poppins font-semibold bg-purple-gradient rounded-full tracking-wider shadow-lg active:scale-90"
            >
                LET&apos;S GO!
            </div>
        </div>
    )
}

export default RecheckPage