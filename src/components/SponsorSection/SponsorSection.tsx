"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";

const SponsorSection = () => {
  const pathName = usePathname();
  // console.log(pathName, "pathName");
  const isPhotoIdRoute = pathName.split("/").includes("photoid");

  const sponsors = [
    {
      src: isPhotoIdRoute
        ? "/images/sponsors/SlowCombo_purple.png"
        : "/images/sponsors/SlowCombo_white.png",
      link: "https://www.instagram.com/slowcombo/?hl=en",
      size: 80,
    },
    {
      src: isPhotoIdRoute
        ? "/images/sponsors/IOIC_purple.png"
        : "/images/sponsors/IOIC_white.png",
      link: "https://www.instagram.com/ioic_chula/?hl=en",
      size: 95,
    },

    {
      src: isPhotoIdRoute
        ? "/images/sponsors/Binance_purple.png"
        : "/images/sponsors/Binance_white.png",
      link: "https://www.instagram.com/binance/?hl=en",
      size: 120, // provide link please
    },

    //   { src: "/", link: "/"},
    //   { src: "/", link: "/"},
    //   { src: "/", link: "/"},
    //   { src: "/", link: "/"},
  ];

  return (
    <section
      className={
        isPhotoIdRoute
          ? "absolute bottom-0 left-1/2 z-0 mb-14 -translate-x-1/2 bg-transparent"
          : "z-10 mb-14 bg-transparent"
      }
    >
      <ul className="flex items-center justify-center">
        {sponsors.map(({ src, link, size }, idx) => (
          <li key={idx}>
            <a href={link} target="_blank" rel="noopener noreferrer">
              <Image src={src} alt={`${idx + 1}`} width={size} height={size} />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SponsorSection;
