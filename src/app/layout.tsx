import LiffProvider from "@/providers/liff-provider";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import SocialMediaBar from "@/components/SocialMediaBar/SocialMediaBar";
import { env } from "@/env";
import HideLayout from "@/components/HideLayout/HideLayout";

export const metadata: Metadata = {
  title: "Odds & Ends Festival",
  description: "Odds & Ends Festival",
  icons: [{ rel: "icon", url: "/images/oddsnends-logo.png" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <LiffProvider>
        <body className="relative mx-auto flex min-h-screen w-full max-w-md flex-col overflow-x-hidden overscroll-none">
          <HideLayout>{children}</HideLayout>
          <SocialMediaBar />
          <GoogleAnalytics gaId={env.NEXT_PUBLIC_GA_ID} />
          <VercelAnalytics />
        </body>
      </LiffProvider>
    </html>
  );
}
