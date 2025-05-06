"use client"

import BackButton from '@/components/BackButton/BackButton';
import ImageCanvas from '@/components/BackgroundPhotoId/ImageCanvas'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const RegisterPage = () => {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [occupation, setOccupation] = useState<string>("");
  const [whatBringsHere, setWhatBringsHere] = useState<string>("");
  const [hearAboutUs, setHearAboutUs] = useState<string>("");

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
          <form className='mt-4 rounded-2xl shadow-xl py-5 px-4 flex flex-col w-[85%] text-[0.8rem] leading-[1.2rem] gap-4'>
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
            
            {/* age */}
            <div className='flex flex-col gap-2'>
              <label htmlFor='age'>Age <span className='ml-1 opacity-50'>อายุ</span></label>
              <div className='relative'>
                <select 
                  onChange={(e) => setAge(e.target.value)}
                  className={`w-full appearance-none px-4 py-2 rounded-xl ${age === "" ? "text-gray-400" : "text-black"}`}
                  required
                  defaultValue={""}
                >
                  <option value={""} disabled hidden className='text-gray-400'>
                    อายุ
                  </option>
                  <option value={"under18"}>ต่ำกว่า 18 / under 18</option>
                  <option value={"18-24"}>18-24</option>
                  <option value={"25-34"}>25-34</option>
                  <option value={"35-44"}>35-44</option>
                  <option value={"45plus"}>45 ขึ้นไป / 45+</option>
                </select>
                <Image 
                  src={"/images/register/drop-down.png"}
                  alt='dropdown'
                  width={10}
                  height={10}
                  className='absolute right-4 top-1/2 -translate-y-1/2'
                />
              </div>
            </div>

            {/* Occupation */}
            <div className='flex flex-col gap-2'>
              <label htmlFor='occupation'>Occupation <span className='ml-1 opacity-50'>อาชีพ</span></label>
              <div className='relative'>
                <select 
                  onChange={(e) => setOccupation(e.target.value)}
                  className={`w-full appearance-none px-4 py-2 rounded-xl ${occupation === "" ? "text-gray-400" : "text-black"}`}
                  required
                  defaultValue={""}
                >
                  <option value={""} disabled hidden className='text-gray-400'>
                    อาชีพ
                  </option>
                  <option value={"student"}>นักเรียน / student</option>
                  <option value={"uni-student"}>นักศึกษา / University Student</option>
                  <option value={"employee"}>พนักงานบริษัท / Employee</option>
                  <option value={"bussiness-owner"}>เจ้าของกิจการ / Business Owner</option>
                  <option value={"freelancer"}>ฟรีแลนซ์ / Freelancer</option>
                  <option value={"others"}>อื่นๆ / Others</option>
                </select>
                <Image 
                  src={"/images/register/drop-down.png"}
                  alt='dropdown'
                  width={10}
                  height={10}
                  className='absolute right-4 top-1/2 -translate-y-1/2'
                />
              </div>
            </div>

            {/* What Brings You */}
            <div className='flex flex-col gap-2'>
              <label htmlFor='whatBringsHere' className='tracking-tighter'>What brings you to this event?<span className='ml-1 opacity-50'>คุณมาทำอะไรในงานนี้</span></label>
              <div className='relative'>
                <select 
                  onChange={(e) => setWhatBringsHere(e.target.value)}
                  className={`w-full appearance-none px-4 py-2 rounded-xl ${whatBringsHere === "" ? "text-gray-400" : "text-black"}`}
                  required
                  defaultValue={""}
                >
                  <option value={""} disabled hidden className='text-gray-400'>
                    คุณมาทำอะไรในงานนี้
                  </option>
                  <option value={"exploring"}>มาเดินเล่น / Just exploring</option>
                  <option value={"workshop"}>มาทำเวิร์กชอป / Join workshops</option>
                  <option value={"music"}>มาฟังดนตรี / Listen to live music</option>
                  <option value={"friends"}>มาเจอเพื่อน / Meet friends</option>
                  <option value={"others"}>อื่น ๆ / Others</option>
                </select>
                <Image 
                  src={"/images/register/drop-down.png"}
                  alt='dropdown'
                  width={10}
                  height={10}
                  className='absolute right-4 top-1/2 -translate-y-1/2'
                />
              </div>
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor='hearAboutUs' className='tracking-tight'>How did you here about us?<span className='ml-1 opacity-50'>รู้จักงานนี้ได้อย่างไร</span></label>
              <div className='relative'>
                <select 
                  onChange={(e) => setHearAboutUs(e.target.value)}
                  className={`w-full appearance-none px-4 py-2 rounded-xl ${hearAboutUs === "" ? "text-gray-400" : "text-black"}`}
                  required
                  defaultValue={""}
                >
                  <option value={""} disabled hidden className='text-gray-400'>
                    รู้จักงานนี้ได้อย่างไร
                  </option>
                  <option value={"friends"}>เพื่อน / Friends</option>
                  <option value={"social-media"}>โซเชียลมีเดีย / Social Media</option>
                  <option value={"website"}>เว็บไซต์ / Website</option>
                  <option value={"influencer"}>อินฟลูเอนเซอร์ / KOL / Influencer</option>
                  <option value={"others"}>อื่น ๆ / Others</option>
                </select>
                <Image 
                  src={"/images/register/drop-down.png"}
                  alt='dropdown'
                  width={10}
                  height={10}
                  className='absolute right-4 top-1/2 -translate-y-1/2'
                />
              </div>
            </div>
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