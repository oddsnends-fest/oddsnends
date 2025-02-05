import Image from "next/image";

function Header() {
    return (
        <header className="flex items-end justify-center w-full pt-12 pb-2 sticky top-0 bg-white text-black z-50">
            <Image
                src={"/images/oddsnend-logo.png"}
                loading="lazy"
                alt={"OddsnEnds Logo"}
                title={"OddsnEnds Logo"}
                width={24}
                height={24}
                className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
            />
        </header>
    );
}

export default Header;