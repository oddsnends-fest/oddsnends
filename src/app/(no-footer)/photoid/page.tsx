"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import NavigationBar from "@/components/NavigationBar/NavigationBar"; 

export default function PhotoIDPage() {
  const router = useRouter();

  const navLinks = [
    { href: "/home", iconSrc: "/images/camera.png", alt: "Home" },
    { href: "/aboutus", iconSrc: "/images/camera.png", alt: "About Us" },
    { href: "/game", iconSrc: "/images/camera.png", alt: "Game" },
  ];

  return (
    <main className="mt-12 mb-16 flex flex-col justify-center items-center gap-8">
      <div 
        className="absolute inset-0 bg-cover bg-center z-[-1]" 
        style={{ backgroundImage: 'url("/images/.gif")'}}
      />
      <div className="absolute top-[576px] flex flex-col gap-32">
        <Button className="w-60 h-12 rounded-full bg-[#3d245b]" onClick={() => router.push("/photoid/frame")}>Try Now</Button>
        <NavigationBar links={navLinks} />
      </div>
    </main>
  );
}

