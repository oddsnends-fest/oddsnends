import Image from "next/image";
import SlidingBox from "@/components/SlidingBox/SlidingBox";

export default function HomePage() {
    return (
        <>
            {/* Background */}
            <div className="absolute top-0 h-full w-full bg-center bg-cover -z-10"
                style={{ backgroundImage: "url('images/background/home.png')" }}
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
                <div
                    className="flex flex-col justify-center items-center w-full px-7 gap-5 drop-shadow-[0_0_70px_rgba(218,188,144,1)]"
                >
                    <div
                        className="relative flex"
                    >
                        <a
                            href="https://docs.google.com/forms/d/e/1FAIpQLSf4D5FsEwahLVOFbzvXlhWLgtYcEkh2agDVUhxqDVTa8cAdNQ/viewform?usp=dialog"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="-translate-x-8 py-4 px-4 rounded-full bg-purple-gradient text-white text-lg font-semibold tracking-wider drop-shadow-[0_5px_3px_rgba(0,0,0,0.3)] z-10"
                        >
                            CALL FOR <span className="text-[#FFDF58]">CONTRIBUTORS</span>

                        </a>
                        <Image
                            src="/images/IDCard.png"
                            alt="oddie.png"
                            width={108}
                            height={108}
                            className="absolute right-0 top-1/2 -translate-y-[60px] translate-x-12 drop-shadow-[0_5px_3px_rgba(0,0,0,0.3)]"
                        />
                    </div>
                    <div
                        className="relative flex"
                    >
                        <a
                            href="/photoid/form"
                            className="py-4 px-4 translate-x-12 rounded-full bg-purple-gradient text-white text-lg font-semibold tracking-wider drop-shadow-[0_5px_3px_rgba(0,0,0,0.3)] relative z-10"
                        >
                            GET YOUR <span className="text-[#FFDF58]">ID CARD!</span>
                        </a>
                        <Image
                            src="/images/Otto.png"
                            alt="oddie.png"
                            width={95}
                            height={95}
                            className="z-20 absolute left-0 -translate-y-10 -translate-x-12 drop-shadow-[0_5px_3px_rgba(0,0,0,0.3)]"
                        />
                    </div>
                </div>
            </main>

            <div className="absolute bottom-0 h-96 w-full bg-black -z-20" />
        </>
    );
}
