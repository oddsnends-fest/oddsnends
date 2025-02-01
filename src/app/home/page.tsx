import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
        <main className="mt-12 mb-16 flex flex-col justify-center items-center gap-8">
            
            {/* Title */}
            <h1 className="text-center text-4xl font-extrabold leading-[1.25]">
                <div>The First</div>
                <div>Sandbox Festival</div>
            </h1>

            {/* Sliding Box */}
            <section className="pt-2 flex flex-col justify-center items-center">
                <Image 
                src="/" 
                alt="Sliding Box" 
                width={250} 
                height={250} 
                className="border"
                />
                <div> . . . </div>
            </section>

            {/* Buttons */}
            <div className="mt-6 flex flex-col items-center gap-10">
                <Link href="/">
                    <button type="button" className="p-3 w-80 text-xl bg-custom-dark-gray text-white rounded-2xl transform hover:scale-105 transition-all duration-75"> 
                        <div>Interactive Game</div>
                    </button>
                </Link>

                <Link href="/">
                    <button type="button" className="p-3 w-80 text-xl bg-custom-dark-gray text-white rounded-2xl transform hover:scale-105 transition-all duration-75"> 
                        <div>ID Card</div>
                    </button>
                </Link>
            </div>
        </main>
  );
}
