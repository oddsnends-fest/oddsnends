"use client";

import BackButton from "@/components/BackButton/BackButton";
import ImageCanvas from "@/components/BackgroundPhotoId/ImageCanvas";
import ContactSection from "@/components/ContactSection/ContactSection";
import { icons } from "lucide-react";
import Image from "next/image";

const BinancePage = () => {
  const contactList = [
    {
      icon: "/images/social-media/internet-white.png",
      alt: "internet",
      text: "www.binance.th",
      href: "https://www.binance.com/en",
    },
    {
      icon: "/images/social-media/youtube-white.png",
      alt: "youtube",
      text: "Binance TH",
      href: "https://www.youtube.com/@Binance_TH_Official",
    },
    {
      icon: "/images/social-media/facebook-white.png",
      alt: "facebook",
      text: "Binance TH",
      href: "https://www.facebook.com/profile.php?id=61555044811579",
    },
    {
      icon: "/images/social-media/tiktok-white.png",
      alt: "tiktok",
      text: "@binanceth",
      href: "https://www.tiktok.com/@binance",
    },
    {
      icon: "/images/social-media/x-white.png",
      alt: "X",
      text: "Binance_TH_",
      href: "https://x.com/binance_th_",
    },
    {
      icon: "/images/social-media/telegram-white.png",
      alt: "Telegram",
      text: "BinanceTHOfficial",
      href: "https://t.me/BinanceTHOfficial",
    },
  ];
  return (
    <div>
      <BackButton />
      {/* Background */}
      <div className="gradient-background absolute top-0 -z-30 h-full w-full" />
      <ImageCanvas />

      <main className="text-shadow mt-8 flex flex-col items-center gap-1 text-base text-white">
        <h1 className="font-cooper text-4xl tracking-wider">Our Supporter</h1>
        <Image
          src={"/images/sponsors/Binance_white.png"}
          alt="Binance"
          width={307}
          height={307}
        />
        <div className="w-full px-4">
          <div className="text-custom-yellow font-cooper text-xl tracking-wider">
            About Binance TH
          </div>
          <div className="mt-4 text-start">
            Binance TH is a digital asset exchange and brokerage platform
            operated by Gulf Binance Co., Ltd. Our platform is the result of a
            joint venture between Gulf Edge Co., Ltd., an affiliate of Gulf
            Development Public Company Limited, and Binance Capital Management
            Co., Ltd., an affiliate of the Binance group. We are fully licensed
            by the Ministry of Finance of Thailand and operate under the
            supervision of the Securities and Exchange Commission.
          </div>
        </div>

        <div className="mt-8 w-full px-4">
          <div className="text-custom-yellow font-cooper text-xl tracking-wider">
            Company Service
          </div>
          <div className="mt-4 text-start">
            At Binance TH, user protection is at the core of everything we do.
            We prioritize the implementation of cutting-edge security measures
            and maintain a strong commitment to adhering to the highest
            standards of regulatory compliance. This dedication ensures our
            sustainable growth and supports the continued development of the
            digital asset and blockchain industry.
          </div>
        </div>

        <div className="mt-8 flex w-full flex-col items-center justify-center px-4">
          <Image
            src={"/images/handshake.png"}
            alt="Hand shake"
            width={46}
            height={46}
          />
          <div className="text-custom-yellow font-cooper text-3xl tracking-wider">
            Our Collaboration
          </div>
          <Image
            src={"/images/binance_collab.png"}
            alt="Binance Collab"
            width={300}
            height={200}
            className="mt-4"
          />
          <div className="mt-4 font-cooper text-lg tracking-wider">
            Odds & Opportunities
          </div>
          <div className="mt-4 text-start">
            The relationship between our students and Binance TH has been
            <span className="font-bold"> strong and meaningful</span> since our
            involvement with IOIC. We have successfully partnered with Binance
            TH and Binance TH Academy to host the{" "}
            <span className="font-bold"> Case 101 </span> event, a two-day,
            hands-on workshop focused on case-cracking fundamentals, which
            attracted over 300 participants nationwide.
          </div>
          <div className="mt-4 text-start">
            Next up, our{" "}
            <span className="font-bold">
              {" "}
              Transis x Binance: Fundamentals of Trading & Risk Management for
              Cryptocurrency Portfolios{" "}
            </span>{" "}
            event, which drew more than 100 participants, was tailored to
            provide essential insights into crypto trading.
          </div>
          <div className="mt-4 text-start">
            Finally, our upcoming{" "}
            <span className="font-bold"> Odds & Opportunity </span> event will
            guide Chulalongkorn University students through the world of
            blockchain, crypto, digital payments, and the future of e-commerce
            and investment.
          </div>
        </div>

        <ContactSection className="mt-8" contacts={contactList} />
        <div className="mt-8">
          <div className="text-center font-semibold italic text-custom-purple">
            Cryptocurrency and digital token involve high risks; investors may
            lose all investment money and should study information carefully and
            make investments according to own risk profile
          </div>
        </div>
      </main>
    </div>
  );
};

export default BinancePage;
