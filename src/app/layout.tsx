import LiffProvider from "@/providers/liff-provider";
import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import SocialMediaBar from "@/components/SocialMediaBar/SocialMediaBar";
import Header from "@/components/Header/Header";

export const metadata: Metadata = {
  title: "Odds & Ends Festival",
  description: "Odds & Ends Festival",
  icons: [{ rel: "icon", url: "/images/circle.png" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <LiffProvider>
        <body className="relative mx-auto flex min-h-screen w-full max-w-md flex-col overflow-x-hidden overscroll-none">
          <Header />
          <div className="flex-grow">{children}</div>
          {/* Social media bar */}
          <SocialMediaBar />
        </body>
      </LiffProvider>
    </html>
  );
}
