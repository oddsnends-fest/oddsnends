import Image from "next/image";

interface SocialMediaLinkProps {
  href: string;
  src: string;
  alt: string;
  title: string;
  label: string;
}

function SocialMediaLink({ href, src, alt, title, label }: SocialMediaLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1"
    >
      <Image
        src={src}
        loading="lazy"
        alt={alt}
        title={title}
        width={64}
        height={64}
        className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
      />
      <span className="text-sm sm:text-base md:text-lg lg:text-xl">{label}</span>
    </a>
  );
}

export default SocialMediaLink;