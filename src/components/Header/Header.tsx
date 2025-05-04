import Image from "next/image";

function Header() {
  return (
    <header className="top-0 z-20 mt-10 flex w-full items-end justify-center bg-transparent text-black">
      <Image
        src={"/images/oddsnends-logo.png"}
        loading="lazy"
        alt={"OddsnEnds Logo"}
        title={"OddsnEnds Logo"}
        width={86}
        height={86}
        className="drop-shadow-[0_4px_2px_rgba(0,0,0,0.15)]"
      />
    </header>
  );
}

export default Header;
