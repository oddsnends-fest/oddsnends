import Image from "next/image"

const sponsors = [
  { src: "/images/sponsors/SlowCombo.png", link: "https://www.instagram.com/slowcombo/?hl=en"},
  { src: "/images/sponsors/IOIC.png", link: "https://www.instagram.com/ioic_chula/?hl=en"},
//   { src: "/", link: "/"},
//   { src: "/", link: "/"},
//   { src: "/", link: "/"},
//   { src: "/", link: "/"},
]

const SponsorSection = () => {
  return (
    <section className="p-3 bg-transparent z-10">
        <ul className="flex flex-wrap justify-center items-end gap-2">
            {sponsors.map(({ src, link }, idx) => (
                <li key={idx}>
                    <a 
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image 
                            src={src} 
                            alt={`${idx + 1}`} 
                            width={120} 
                            height={120}
                        />
                    </a>
                </li>
            ))}
        </ul>
  </section>
  )
}

export default SponsorSection