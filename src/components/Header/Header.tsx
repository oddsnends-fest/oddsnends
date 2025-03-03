import Image from "next/image";

function Header() {
  return (
    <header className="top-0 z-20 flex w-full items-end justify-center bg-white pt-7 text-black">
      <Image
        src={"/images/oddsnends-logo.png"}
        loading="lazy"
        alt={"OddsnEnds Logo"}
        title={"OddsnEnds Logo"}
        width={64}
        height={64}
        className="sm:h-8 sm:w-8 md:h-10 md:w-10"
      />
    </header>
  );
}

export default Header;
