import Image from "next/image"
import Link from "next/link"

const sponsors = [
  { src: "/", link: "/"},
  { src: "/", link: "/"},
  { src: "/", link: "/"},
  { src: "/", link: "/"},
  { src: "/", link: "/"},
  { src: "/", link: "/"},
]

const SponsorSection = () => {
  return (
    <section className="p-6 bg-white">
        <ul className="flex flex-wrap justify-evenly items-center gap-2">
            {sponsors.map(({ src, link }, idx) => (
                <li key={idx}>
                    <Link href={link}>
                        <Image 
                            src={src} 
                            alt={`${idx + 1}`} 
                            width={40} 
                            height={40} 
                            className="border"
                        />
                    </Link>
                </li>
            ))}
        </ul>
  </section>
  )
}

export default SponsorSection