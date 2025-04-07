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
                <h1 className="text-[1.8rem] tracking-[0.1em] font-cooper">Sandbox Space</h1>
                <div className="font-semibold text-[0.9rem] px-2 tracking-wide">FOR ARTISTS, ENTREPRENEURS, AND BEYOND</div>
            </div>
            
            
            {/* Sliding Box */}
            <SlidingBox />

            {/* Buttons */}
            <div className="relative mb-16 flex flex-col justify-center items-center drop-shadow-[0_0_70px_rgba(218,188,144,1)]">
                <Image 
                    src="/images/oddie-2.png"
                    alt="oddie.png"
                    width={90}
                    height={90}
                    className="z-10 drop-shadow-[0_5px_3px_rgba(0,0,0,0.3)]"
                />
                <button 
                    type="button"
                    className="absolute top-[75px] py-4 w-64 rounded-full bg-purple-gradient text-white text-xl font-semibold tracking-wider drop-shadow-[0_5px_3px_rgba(0,0,0,0.3)]"
                >
                    <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLSdVmKSrSb4eHuxhudDcDosVWejYXvboW3Perl6z3a0zD-HPDA/viewform"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        JOIN OUR <span className="text-[#FFDF58]">WORKSHOP!</span>
                    </a>
                </button>
            </div>
        </main>

        <div className="absolute bottom-0 h-96 w-full bg-black -z-20" />
    </>
  );
}
