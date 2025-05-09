"use client";

import Image from "next/image";
import SlidingBox from "@/components/SlidingBox/SlidingBox";

export default function HomePage() {
  return (
    <>
      {/* Background */}
      <div className="absolute top-0 -z-10 h-full w-full bg-[url('/images/background/home.png')] bg-cover bg-center" />

      {/* content */}
      <main className="mt-5 flex flex-col items-center justify-center gap-8">
        {/* Title */}
        <div className="text-center leading-[1.75] text-white drop-shadow-[0px_2px_1px_rgba(0,0,0,0.3)]">
          <h1 className="font-cooper text-[1.8rem] tracking-[0.1em]">
            Sandbox Space
          </h1>
          <div className="px-2 text-[0.9rem] font-semibold tracking-wide">
            FOR ARTISTS, ENTREPRENEURS, AND BEYOND
          </div>
        </div>

        {/* Sliding Box */}
        <SlidingBox />

        {/* Buttons */}
        <div className="mt-6 flex w-full flex-col items-center justify-center gap-5 px-7 drop-shadow-[0_0_70px_rgba(218,188,144,1)]">
          <div className="relative flex">
            <a
              href="/photoid/frame"
              className="relative z-10 rounded-full bg-purple-gradient px-4 py-4 text-lg font-semibold tracking-wider text-white drop-shadow-[0_5px_3px_rgba(0,0,0,0.3)]"
            >
              GET YOUR <span className="text-[#FFDF58]">ID CARD!</span>
            </a>
            <Image
              src="/images/spirit-animals/all.png"
              alt="oddie.png"
              width={184 * 2}
              height={103 * 2}
              className="absolute left-0 z-0 h-[103px] w-[184px] -translate-y-[77px] translate-x-[17px] drop-shadow-[0_5px_3px_rgba(0,0,0,0.3)]"
            />
          </div>
          <div className="relative flex">
            <a
              href="/register"
              className="relative z-10 rounded-full bg-purple-gradient px-8 py-4 text-lg font-semibold tracking-wider text-white drop-shadow-[0_5px_3px_rgba(0,0,0,0.3)]"
            >
              EVENT REGISTRATION
            </a>
          </div>
        </div>
      </main>

      <div className="absolute bottom-0 -z-20 h-96 w-full bg-black" />
    </>
  );
}
