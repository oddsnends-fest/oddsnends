import Image from "next/image"

const sponsers: string[] = [
  "/",
  "/",
  "/",
  "/",
  "/",
  "/",
]

const SponsorSection = () => {
  return (
    <div className="mb-6 flex flex-row justify-center items-center gap-5">
      {/* Map through Sponsers image's src */}
      {sponsers.map((src, idx) => (
        <div key={idx}>
          <Image src={src} alt={`${idx+1}`} width={35} height={35} className="border"/>
        </div>
      ))}
    </div>
  )
}

export default SponsorSection