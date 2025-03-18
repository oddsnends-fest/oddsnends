import Image from "next/image";
import SlidingBox from "@/components/SlidingBox/SlidingBox";

export default function HomePage() {
  return (
    <>  
        {/* Background */}
        <div className="absolute top-0 h-full w-full bg-center bg-cover -z-10"
            style={{ backgroundImage: "url('images/background/home.png')"}}
        />
        
        {/* content */}
        <main className="mt-5 flex flex-col justify-center items-center gap-8">
            {/* Title */}
            <div className="text-center text-white drop-shadow-[0px_2px_1px_rgba(0,0,0,0.3)] leading-[1.75]">
                <h1 className="text-[2rem] tracking-[0.1em] font-cooper">Sandbox Space</h1>
                <div className="font-semibold px-4">FOR ARTISTS, ENTREPRENEURS, AND BEYOND</div>
            </div>
            
            
            {/* Sliding Box */}
            <SlidingBox />

            {/* Buttons */}
            <div className="relative mb-20 flex flex-col justify-center items-center drop-shadow-[0_0_75px_rgba(218,188,144,0.75)]">
                <Image 
                    src="/images/oddie.png"
                    alt="oddie.png"
                    width={100}
                    height={100}
                    className="z-10 drop-shadow-[0_5px_3px_rgba(0,0,0,0.3)]"
                />
                <button 
                    type="button"
                    className="absolute top-[83px] py-4 w-72 rounded-full bg-purple-gradient text-white text-2xl font-semibold tracking-wider drop-shadow-[0_5px_3px_rgba(0,0,0,0.3)]"
                >
                    <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLScpRDeY39gJaVQ1WHkfvKt-1vo8xnPYnuBazcNZsO7pV799EA/viewform"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        DIY COOKIE
                    </a>
                </button>
            </div>
        </main>

        <div className="absolute bottom-0 h-96 w-full bg-black -z-20" />
    </>
  );
}
