"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
const animals: string[] = [
  "/images/spirit-animals/BUTTERFLY.png",
  "/images/spirit-animals/CAT.png",
  "/images/spirit-animals/DOG.png",
  "/images/spirit-animals/DUCK.png",
  "/images/spirit-animals/FISH.png",
  "/images/spirit-animals/OTTER.png",
  "/images/spirit-animals/SQUIRREL.png",
  "/images/spirit-animals/SWAN.png",
  "/images/spirit-animals/WATER_MONITOR.png",
];

export default function Roll() {
  const [animalSrc, setAnimalSrc] = useState<string>(
    "/images/spirit-animals/OTTER.png",
  );
  const [isRolling, setIsRolling] = useState(true);

  const handleClick = () => {
    setIsRolling(!isRolling);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isRolling) return;
      const newIndex = Math.floor(Math.random() * animals.length);
      const newAnimal =
        animals[newIndex] !== animalSrc
          ? animals[newIndex]
          : animals[(newIndex + 1) % animals.length];
      setAnimalSrc(newAnimal!);
    }, 500);

    return () => clearInterval(interval);
  });

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Background */}
      <div className="absolute top-0 -z-10 h-full w-full bg-[url('/images/background/registerbg.jpg')] bg-cover bg-center"></div>
      <div>
        <h1 className="mt-6 text-center font-cooper text-5xl text-[#3D245B]">
          Ready to roll?
        </h1>
      </div>
      <div>
        <p className="text-[#1C1026]">Make it memorable at Odds & Ends!</p>
      </div>
      <div>
        <Image
          onClick={handleClick}
          src={animalSrc}
          width={300}
          height={300}
          alt="Picture of the author"
        />
      </div>
      <div className="mt-4">
        <a
          href="/event-info"
          className="rounded-3xl bg-gradient-to-b from-[#B56A95] to-[#553B82] p-3 font-semibold tracking-widest text-white"
        >
          EVENT INFORMATION
        </a>
      </div>
    </div>
  );
}
