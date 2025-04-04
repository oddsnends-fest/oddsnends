import Image from "next/image";

const sponsors = [
  {
    src: "/images/sponsors/SlowCombo.png",
    link: "https://www.instagram.com/slowcombo/?hl=en",
    size: 110,
  },
  {
    src: "/images/sponsors/IOIC.png",
    link: "https://www.instagram.com/ioic_chula/?hl=en",
    size: 95,
  },
  //   { src: "/", link: "/"},
  //   { src: "/", link: "/"},
  //   { src: "/", link: "/"},
  //   { src: "/", link: "/"},
];

const SponsorSection = () => {
  return (
    <section className="z-10 mb-14 bg-transparent">
      <ul className="flex flex-wrap items-end justify-center">
        {sponsors.map(({ src, link, size }, idx) => (
          <li key={idx}>
            <a href={link} target="_blank" rel="noopener noreferrer">
              <Image
                src={src}
                alt={`${idx + 1}`}
                width={size}
                height={size}
                className=""
              />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SponsorSection;
