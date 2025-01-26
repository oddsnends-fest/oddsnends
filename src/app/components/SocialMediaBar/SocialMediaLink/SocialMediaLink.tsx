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
        <>
            {/* Open oddsnend social media in a new tab */}
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
            >
                <Image src={src} loading="lazy" alt={alt} title={title} width={24} height={24} />
                <span>{label}</span>
            </a>
        </>
    )
}

export default SocialMediaLink