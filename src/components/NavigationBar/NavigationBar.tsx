import Link from "next/link";

interface NavLink {
  href: string;
  iconSrc: string;
  alt: string;
}

interface NavigationBarProps {
  links: NavLink[];
}

export default function NavigationBar({ links }: NavigationBarProps) {
  return (
    <div className="flex flex-row gap-12">
      {links.map((link, index) => (
        <Link key={index} href={link.href} className="w-14 h-14 flex justify-center items-center">
          <img src={link.iconSrc} alt={link.alt} className="w-14 h-14" />
        </Link>
      ))}
    </div>
  );
}
