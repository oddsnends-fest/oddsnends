import LiffProvider from "@/providers/liff-provider";
import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import SocialMediaBar from "./components/SocialMediaBar/SocialMediaBar";

export const metadata: Metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <LiffProvider>
        <body className="relative mx-auto flex min-h-screen w-full max-w-md flex-col overflow-x-hidden overscroll-none">
          <div className="flex-grow">{children}</div>
          {/* Social media bar */}
          <SocialMediaBar />
        </body>
      </LiffProvider>
    </html>
  );
}
