import Image from "next/image";

interface Contacts {
  icon: string;
  alt: string;
  text: string;
  href?: string;
}

interface ContactSectionProps {
  contacts: Contacts[];
  className?: string;
}

function ContactSection({ contacts, className = "" }: ContactSectionProps) {
  return (
    <div
      className={`h-auto w-[379px] items-center rounded-xl bg-custom-pink p-4 text-white ${className}`}
    >
      <div className="text-center font-cooper text-xl tracking-wider text-custom-yellow">
        Contact
      </div>
      <div className="mx-auto flex flex-wrap items-center justify-center gap-2">
        {contacts.map((contact, index) => (
          <a key={index} className="flex items-center" href={contact.href}>
            <Image
              src={contact.icon}
              alt={contact.alt}
              width={20}
              height={20}
            />
            <div className="ml-1">{contact.text}</div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default ContactSection;
