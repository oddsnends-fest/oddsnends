import Link from "next/link";
import Image from "next/image";
import SlidingBox from "@/components/SlidingBox/SlidingBox";

export default function HomePage() {
  return (
        <main className="mt-12 mb-16 flex flex-col justify-center items-center gap-6">
            {/* Title */}
            <h1 className="text-center text-4xl font-extrabold leading-[1.25]">
                <div>The First</div>
                <div>Sandbox Festival</div>
            </h1>

            {/* Sliding Box */}
            <SlidingBox />

            {/* Buttons */}
            <div className="flex flex-col items-center gap-8">
                <Link href="#">
                    <button type="button" className="p-3 w-80 text-xl bg-custom-dark-gray text-white rounded-2xl transform active:scale-95 transition-all duration-75"> 
                        <div>Interactive Game</div>
                    </button>
                </Link>

                <Link href="#">
                    <button type="button" className="p-3 w-80 text-xl bg-custom-dark-gray text-white rounded-2xl transform active:scale-95 transition-all duration-75"> 
                        <div>ID Card</div>
                    </button>
                </Link>

                <Link href="#">
                    <button type="button" className="p-3 w-80 text-xl bg-custom-dark-gray text-white rounded-2xl transform active:scale-95 transition-all duration-75"> 
                        <div>New Button</div>
                    </button>
                </Link>
            </div>
        </main>
  );
}
