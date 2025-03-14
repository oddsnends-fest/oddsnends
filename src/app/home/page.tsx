import Link from "next/link";
import Image from "next/image";
import SlidingBox from "@/components/SlidingBox/SlidingBox";

const links = [
    { href: "/", label: "LAUNCH EVENT", imgSrc: "/images/ticket.png"},
    { href: "/", label: "DIY COOKIE", imgSrc: "/images/oddie.png"},
]


export default function HomePage() {
  return (
    <div className="absolute top-0 h-[100dvh] w-full bg-[url('public/images/background/bg-home.png')] bg-center bg-cover">
        <main className="mt-48 mb-16 flex flex-col justify-center items-center gap-8">
            {/* Sliding Box */}
            <SlidingBox />

            {/* Buttons */}
            <div className="flex flex-col items-center gap-5">
                {links.map(({href, label, imgSrc}, idx) => (
                    <Link
                        key={idx}
                        href={href}
                        className="text-white font-semibold text-xl tracking-wider "
                    >
                        {idx % 2 === 0 ? ( 
                        <div className="flex justify-center items-center gap-1">
                            <button 
                                type="button"
                                className="p-4 w-64 rounded-full bg-purple-gradient transition-all active:scale-95 duration-75"
                            >
                                {label}
                            </button>
                            <Image 
                                src={imgSrc}
                                alt="eventImg"
                                width={120}
                                height={120}
                                className=""
                            />
                        </div>
                        ) : (
                        <div className="flex justify-center items-center gap-1">
                            <Image 
                                src={imgSrc}
                                alt="eventImg"
                                width={120}
                                height={120}
                                className=""
                            />
                            <button 
                                type="button"
                                className="p-4 w-64 rounded-full bg-purple-gradient transition-all active:scale-95 duration-75"
                            >
                                {label}
                            </button>
                        </div>
                        )}
                    </Link>
                ))}
            </div>
        </main>
    </div>
  );
}
