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
      size: 96,
    },
    {
      src: isPhotoIdRoute
        ? "/images/sponsors/Binance_purple.png"
        : "/images/sponsors/Binance_white.png",
      link: "https://www.binance.th/en",
      size: 132,
    },

    // {
    //   src: isPhotoIdRoute
    //     ? "/images/sponsors/IOIC_purple.png"
    //     : "/images/sponsors/IOIC_white.png",
    //   link: "https://www.instagram.com/ioic_chula/?hl=en",
    //   size: isPhotoIdRoute ? 45 : 85, // provide link please
    //   className: isPhotoIdRoute ? "" : "translate-y-2",
    // },
    {
      src: isPhotoIdRoute
        ? "/images/sponsors/CUNEX_purple.png"
        : "/images/sponsors/CUNEX_white.png",
      link: "https://www.instagram.com/cunex.review/",
      size: 48,
    },
    {
      src: isPhotoIdRoute
        ? "/images/sponsors/MajorCineplex_purple.png"
        : "/images/sponsors/MajorCineplex_white.png",
      // Major link
      link: "https://www.instagram.com/majorgroup/",
      size: 65,
    },

    //   { src: "/", link: "/"},
    //   { src: "/", link: "/"},
    //   { src: "/", link: "/"},
    //   { src: "/", link: "/"},
  ];

  return (
    <section className={"z-10 mb-9 bg-transparent"}>
      <ul className="flex items-center justify-center">
        {sponsors.map(({ src, link, size }, idx) => (
          <li key={idx}>
            <a href={link} target="_blank" rel="noopener noreferrer">
              <Image
                src={src}
                alt={`${idx + 1}`}
                width={size}
                height={size}
                // className={className}
              />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SponsorSection;
