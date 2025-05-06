"use client"

import BackButton from '@/components/BackButton/BackButton';
import ImageCanvas from '@/components/BackgroundPhotoId/ImageCanvas'
import FormSelection from '@/components/RegisterForm/FormSelection';
import formSelection from '@/components/RegisterForm/FormSelection';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const RegisterPage = () => {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [occupation, setOccupation] = useState<string>("");
  const [whatBringsHere, setWhatBringsHere] = useState<string>("");
  const [hearAboutUs, setHearAboutUs] = useState<string>("");


  {/* form options */}
  const formSelections = [
    {
      labelEn: "Age",
      labelTH: "อายุ",
      state: age,
      setState: setAge,
      options: [
        { value: "under18", label: "ต่ำกว่า 18 / under 18" },
        { value: "18-24", label: "18-24" },
        { value: "25-34", label: "25-34" },
        { value: "35-44", label: "35-44" },
        { value: "45plus", label: "45 ขึ้นไป / 45+" },
      ],
    },
    {
      labelEn: "Occupation",
      labelTH: "อาชีพ",
      state: occupation,
      setState: setOccupation,
      options: [
        { value: "student", label: "นักเรียน / student" },
        { value: "uni-student", label: "นักศึกษา / University Student" },
        { value: "employee", label: "พนักงานบริษัท / Employee" },
        { value: "bussiness-owner", label: "เจ้าของกิจการ / Business Owner" },
        { value: "freelancer", label: "ฟรีแลนซ์ / Freelancer" },
        { value: "others", label: "อื่น ๆ / Others" },
      ],
    },
    {
      labelEn: "What brings you to this event?",
      labelTH: "คุณมาทำอะไรในงานนี้",
      state: whatBringsHere,
      setState: setWhatBringsHere,
      options: [
        { value: "exploring", label: "มาเดินเล่น / Just exploring" },
        { value: "workshop", label: "มาทำเวิร์กชอป / Join workshops" },
        { value: "music", label: "มาฟังดนตรี / Listen to live music" },
        { value: "friends", label: "มาเจอเพื่อน / Meet friends" },
        { value: "others", label: "อื่น ๆ / Others" },
      ],
    },
    {
      labelEn: "How did you hear about us?",
      labelTH: "รู้จักงานนี้ได้อย่างไร",
      state: hearAboutUs,
      setState: setHearAboutUs,
      options: [
        { value: "friends", label: "เพื่อน / Friends" },
        { value: "social-media", label: "โซเชียลมีเดีย / Social Media" },
        { value: "website", label: "เว็บไซต์ / Website" },
        { value: "influencer", label: "อินฟลูเอนเซอร์ / KOL / Influencer" },
        { value: "others", label: "อื่น ๆ / Others" },
      ],
    },
  ];
  

  const handleSubmit = () => {
    if(name === "" || age === "" || occupation === "" || whatBringsHere === "" || hearAboutUs === "") {
      alert("Please complete all required fields before submitting the form.");
    } else {
      // router.push("/");
      // POST somewhere ??
    }
  }
  return (
    <div>
        <BackButton />
        {/* Background */}
        <div className='absolute top-0 w-full h-full gradient-background -z-30'/>
        <ImageCanvas />

        <main className='mt-8 flex flex-col items-center text-white gap-1'>
          <h1 className='text-4xl tracking-wider font-cooper'>Welcome</h1>
          <p className='font-thin tracking-wide text-xl italic'>please enter your personal info</p>

          {/* form */}
          <form className='border border-black/10 mt-4 rounded-2xl shadow-xl py-6 px-4 flex flex-col w-[85%] text-[0.8rem] leading-[1.2rem] gap-4'>
            {/* name */}
            <div className='flex flex-col gap-2'>
              <label htmlFor='name'>Name <span className='ml-1 opacity-50'>ชื่อ</span></label>
              <input 
                value={name}
                onChange={(e)=>setName(e.target.value)}
                className='px-4 py-2 rounded-xl text-black'
                placeholder='ชื่อ'
              />
            </div>

            {
              formSelections.map(({labelEn, labelTH, state, setState, options}, idx) => (
                <FormSelection 
                  key={idx}
                  labelEn={labelEn}
                  labelTH={labelTH}
                  state={state}
                  setState={setState}
                  options={options}
                />
              ))
            }
          </form>

          <div className="mt-12 flex items-center justify-center">
            <button
              className="absolute w-[16rem] rounded-full bg-purple-gradient py-3 text-center font-poppins text-[1.25rem] text-xl font-semibold tracking-wider text-white shadow-lg active:scale-90"
              onClick={handleSubmit}
            >
              SUBMIT
            </button>
          </div>
        </main>
    </div>
  )
}

export default RegisterPage