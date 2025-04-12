import Image from "next/image";

interface Sponsor {
  src: string;
  link: string;
  size: number;
  className?: string;
}

const sponsors: Sponsor[] = [
  {
    src: "/images/sponsors/SlowCombo.png",
    link: "https://www.instagram.com/slowcombo/?hl=en",
    size: 110,
  },
  {
    src: "/images/sponsors/Binance TH.png",
    link: "https://www.binance.th/en",
    size: 132,
  },
  {
    src: "/images/sponsors/IOIC.png",
    link: "https://www.instagram.com/ioic_chula/?hl=en",
    size: 95,
    className: "translate-y-2",
  },
];

const SponsorSection = () => {
  return (
    <section className="z-10 mb-7 bg-transparent">
      <ul className="flex flex-wrap items-center justify-center">
        {sponsors.map(({ src, link, size, className }, idx) => (
          <li key={idx}>
            <a href={link} target="_blank" rel="noopener noreferrer">
              <Image
                src={src}
                alt={`${idx + 1}`}
                width={size}
                height={size}
                className={className}
              />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SponsorSection;
