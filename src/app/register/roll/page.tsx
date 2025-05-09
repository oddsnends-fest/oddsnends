"use client";
import Image from "next/image"
import { useState } from "react";
const animals: string[] = [
    '/images/spirit-animals/BUTTERFLY.png',
    '/images/spirit-animals/CAT.png',
    '/images/spirit-animals/DOG.png',
    '/images/spirit-animals/DUCK.png',
    '/images/spirit-animals/FISH.png',
    '/images/spirit-animals/OTTER.png',
    '/images/spirit-animals/SQUIRREL.png',
    '/images/spirit-animals/SWAN.png',
    '/images/spirit-animals/WATER_MONITOR.png',
  ];

export default function Roll(){
    const [animalSrc, setAnimalSrc] = useState<string>('/images/spirit-animals/OTTER.png');

    const handleClick = () => {
    const random = animals[Math.floor(Math.random() * animals.length)]!;
    setAnimalSrc(random);
  };

    return (
        <div className="flex flex-col items-center justify-center">
            {/* Background */}
            <div className="absolute top-0 h-full w-full bg-[url('/images/background/registerbg.jpg')] bg-center bg-cover -z-10"></div>
            <div>
                <h1 className="text-5xl font-cooper text-center text-[#3D245B]">Ready to roll?</h1>
            </div>
            <div>
                <p className="text-[#1C1026]">Make it memorable at Odds & Ends!</p>
            </div>
            <div>
                <Image
                    onClick={handleClick}
                    src= {animalSrc}
                    width={300}
                    height={300}
                    alt="Picture of the author"
                />
            </div>
            <div>
                <a
                    href="/event-info"
                    className=" bg-gradient-to-b from-[#B56A95] to-[#553B82] rounded-3xl  p-3 text-white font-semibold tracking-widest"
                >
                    EVENT INFORMATION
                </a>
            </div>
        </div>  
    )
}