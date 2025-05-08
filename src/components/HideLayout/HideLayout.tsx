"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header/Header";
import SponsorSection from "@/components/SponsorSection/SponsorSection";

export default function HideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideLayout = pathname.startsWith("/about");

  return (
    <>
      {!hideLayout && <Header />}
      <div className={`flex-grow font-auto ${hideLayout ? "mb-24 mt-10" : ""}`}>
        {children}
      </div>
      {!hideLayout && <SponsorSection />}
    </>
  );
}
