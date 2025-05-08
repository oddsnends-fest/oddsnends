"use client";

import BackButton from "@/components/BackButton/BackButton";
import ImageCanvas from "@/components/BackgroundPhotoId/ImageCanvas";
import ContactSection from "@/components/ContactSection/ContactSection";
import Image from "next/image";

const MajorGroupPage = () => {
  const contactList = [
    {
      icon: "/images/social-media/facebook-white.png",
      alt: "facebook",
      text: "Major Group",
      href: "https://www.facebook.com/MajorGroup",
    },
    {
      icon: "/images/social-media/youtube-white.png",
      alt: "youtube",
      text: "Major Group",
      href: "https://www.youtube.com/@MajorGroup",
    },
    {
      icon: "/images/social-media/tiktok-white.png",
      alt: "tiktok",
      text: "@majorgroup",
      href: "https://www.tiktok.com/@majorgroup",
    },
    {
      icon: "/images/social-media/line-white.png",
      alt: "line",
      text: "Line OA: Major Group",
    },
  ];
  return (
    <div>
      <BackButton />
      {/* Background */}
      <div className="gradient-background absolute top-0 -z-30 h-full w-full" />
      <ImageCanvas />

      <main className="mt-8 flex flex-col items-center gap-1 text-base text-white">
        <h1 className="font-cooper text-4xl tracking-wider">Our Supporter</h1>
        <Image
          src={"/images/sponsors/MajorCineplex_white.png"}
          alt="Major Cineplex"
          width={153}
          height={153}
        />
        <div className="w-full px-4">
          <div className="text-custom-yellow font-cooper text-xl tracking-wider">
            About Major Group
          </div>
          <div className="mt-4 text-center">
            <div>
              {" "}
              &ldquo;Thailand&apos;s Leading Entertainment Powerhouse.&rdquo;
            </div>
            <div className="mt-4">
              Major Group is Thailand&apos;s premier entertainment and lifestyle
              company, established in 1995. Publicly listed (SET: MAJOR), we
              operate a nationwide network of innovative cinemas (Major
              Cineplex, EGV, Mega Cineplex), offer impactful media and
              advertising solutions (Major CineAd), and provide engaging bowling
              and karaoke experiences. We also manage commercial spaces and
              contribute to the Thai film industry through production and
              distribution. Our focus is on delivering exceptional entertainment
              and enriching lifestyles through quality and innovation.
            </div>
          </div>
        </div>

        <div className="mt-8 w-full px-4">
          <div className="text-custom-yellow font-cooper text-xl tracking-wider">
            Company Service
          </div>
          <div className="mt-4 text-center">
            <div>
              Major Group delivers a wide range of entertainment and lifestyle
              services:
            </div>
            <div className="mt-4">
              <div className="font-cooper text-lg tracking-wider">
                For Audience
              </div>
              <ul className="list-inside list-disc">
                <li>
                  Cutting-Edge Cinema: Enjoy movies in various formats (2D, 3D,
                  IMAX, 4DX) with comfortable seating and premium options.
                </li>
                <li>
                  Recreational Activities: Have fun with bowling and karaoke at
                  our entertainment centers.
                </li>
                <li>
                  Easy Ticketing: Conveniently book movie tickets online, via
                  the app, or at our locations.
                </li>
              </ul>
            </div>

            <div className="mt-4">
              <div className="font-cooper text-lg tracking-wider">
                For Bussinesses
              </div>
              <ul className="list-inside list-disc">
                <li>
                  Effective Advertising: Reach a large and engaged audience
                  through cinema and in-venue advertising.
                </li>
                <li>
                  Strategic Space Rental: Lease prime commercial spaces within
                  our high-traffic complexes.
                </li>
              </ul>
            </div>

            <div className="mt-4">
              <div className="font-cooper text-lg tracking-wider">
                For the Film Industry
              </div>
              <div>
                Film Production & Distribution: Supporting and bringing diverse
                films to Thai audiences.
              </div>
            </div>
          </div>
        </div>
        <ContactSection className="mt-8" contacts={contactList} />
        <div className="mt-8">
          <div className="text-xl font-medium text-custom-purple">
            ที่ตั้งร้าน
          </div>
        </div>
      </main>
    </div>
  );
};

export default MajorGroupPage;
