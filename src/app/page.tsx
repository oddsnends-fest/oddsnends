import Link from "next/link";
import Image from "next/image";
import SponsorSection from "@/components/SponsorSection";

export default function HomePage() {
  return (
    <div className="flex flex-col h-screen">
      <main className="flex flex-col mt-14 flex-grow">
        <Image src="/" alt="LogoImg" width={60} height={60} 
          className="border mx-auto"
          />

        <div className="flex flex-col justify-center items-center gap-8 pt-5">
          <h1 className="text-center text-4xl font-extrabold leading-[1.25]">
            <div>The First</div>
            <div>Sandbox Festival</div>
          </h1>

          <section className="flex flex-col justify-center items-center">
          <Image src="/" alt="Sliding Box" 
            width={225} height={225} 
            className="border"
            />
          <div> . . . </div>
          </section>

          <div className="flex flex-col items-center gap-8">
            <Link href="/">
              <button type="button" className="p-3 w-72 text-lg bg-custom-dark-gray text-white rounded-2xl transform hover:scale-105 transition-all duration-75"> 
                <div>Interactive Game</div>
              </button>
            </Link>

            <Link href="/">
              <button type="button" className="p-3 w-72 text-lg bg-custom-dark-gray text-white rounded-2xl transform hover:scale-105 transition-all duration-75"> 
                <div>ID Card</div>
              </button>
            </Link>
          </div>

          <div className="mt-8"><SponsorSection /></div>
        </div>
      </main>
      <footer className="p-3 text-center bg-custom-light-gray">footer</footer>
    </div>
  );
}
