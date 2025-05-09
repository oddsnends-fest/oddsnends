import Image from "next/image"

export default function roll(){
    return (
        <div className="flex flex-col items-center justify-center h-screen ">
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
                    src="/images/spirit-animals/OTTER.png"
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