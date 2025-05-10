"use client";

import BackButton from "@/components/BackButton/BackButton";
import ImageCanvas from "@/components/BackgroundPhotoId/ImageCanvas";
import ContactSection from "@/components/ContactSection/ContactSection";
import { icons } from "lucide-react";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';



const SlowComboPage = () => {
  const contactList = [
    {
      icon: "/images/social-media/facebook-white.png",
      alt: "facebook",
      text: "Slowcombo",
      href: "https://www.facebook.com/slowcombo126",
    },
    {
      icon: "/images/social-media/instagram-white.png",
      alt: "instagram",
      text: "@slowcombo",
      href: "https://www.instagram.com/slowcombo",
    },
    {
        icon: "/images/social-media/tiktok-white.png",
        alt: "tiktok",
        text: "@slowcombo.samyan",
        href: "https://www.tiktok.com/@slowcombo.samyan",
    },
    {
        icon: "/images/social-media/line-white.png",
        alt: "line",
        text: "Line OA: @slowcombo",
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
          src={"/images/sponsors/Slowcombo-white.png"}
          alt="SlowCombo"
          width={241}
          height={141}
        />
        <div className="w-full px-4">
          <div className="text-custom-yellow font-cooper text-xl tracking-wider">
            About Slowcombo
          </div>
          <div className="mt-4 text-start">
          Slowcombo is a hidden gem tucked away near Samyan — a mindful community center that invites you to slow down, 
          reconnect, and explore new ways of living mindfully. Rooted in the concept of a Mindfulness Playground, 
          it offers a peaceful escape from the city’s fast pace, where wellness, creativity, and conscious living intertwine.
            Now Slowcombo is a beloved destination for wellness seekers, spiritual explorers, and creatives in Bangkok, 
            Slowcombo curates a rich tapestry of events, activities, and services centered on health, self-discovery, and artistic expression.
          </div>
        </div>

        <div className="mt-8 w-full px-4">
          <div className="text-custom-yellow font-cooper text-xl tracking-wider">
            Company Service
          </div>
          <div className="mt-4 text-center">
            <div>
            At Slowcombo, each floor is designed to nurture different aspects of personal well-being
            The 3 pillars of <span className="font-bold">“Mindfulness playground”</span>  
            </div>
            <div className="mt-4">
                <div className="text-lg tracking-wider">
                Floor 1
                </div>
                <div className="font-cooper text-lg tracking-wider">
                ‘Eat Wisely’
                </div>
              <div className="list-inside list-disc">
              Conscious Nourishment - We believe that food is not just about sustenance but also a key element of mindful living. 
              Floor 1 is dedicated to Slow Food—a movement that encourages eating with awareness and respect for where ingredients come from. 
              This space features alternative menus designed to promote health and well-being without sacrificing flavor.
              </div>
            </div>

            <div className="mt-4">
                <div className="text-lg tracking-wider">
                Floor 2
                </div>
                <div className="font-cooper text-lg tracking-wider">
                ‘Live Soulfully’
                </div>
              <div className="list-inside list-disc">
              A Sanctuary for Self-Care - Floor 2 is a space where visitors can find balance and rest. 
              It encourages slowing down in a world that constantly demands speed. Designed to foster self-care and self-love, 
              this floor houses wellness-driven shops and spaces 
              </div>
            </div>

            <div className="mt-4">
                <div className="text-lg tracking-wider">
                Floor 3
                </div>
                <div className="font-cooper text-lg tracking-wider">
                ‘Move Creatively’
                </div>
              <div className="list-inside list-disc">
              <span className="font-bold">The Creative Canvas</span> - Creativity is the lifeblood of Slowcombo, and Floor 3 is where that energy comes alive. 
              This 150-square-meter Creative Space serves as a blank canvas for artistic expression, hosting a variety of workshops, 
              exhibitions, performances, and creative events. It is a hub for those seeking to exchange energy and ideas while nurturing their artistic potential. 
              Whether you are an artist or an enthusiast, this floor provides the perfect environment to move creatively and explore new ways to express yourself.
              </div>
            </div>
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
          <div className="mt-4 w-[300px] h-[200px] rounded-[20px] overflow-hidden">
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            grabCursor={true}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="w-[300px] h-[200px] rounded-[20px] overflow-hidden"
            >
            <SwiperSlide>
                <Image
                src="/images/slowcombo_collab1.jpeg"
                alt="Slowcombo Collab 1"
                width={300}
                height={200}
                unoptimized
                className="rounded-[20px]"
                />
            </SwiperSlide>
            <SwiperSlide>
                <Image
                src="/images/slowcombo_collab2.jpeg"
                alt="Slowcombo Collab 2"
                width={300}
                height={200}
                unoptimized
                className="rounded-[20px]"
                />
            </SwiperSlide>
            <SwiperSlide>
                <Image
                src="/images/slowcombo_collab3.jpeg"
                alt="Slowcombo Collab 3"
                width={300}
                height={200}
                unoptimized
                className="rounded-[20px]"
                />
            </SwiperSlide>
            </Swiper>
            <style jsx global>{`
              .swiper-button-prev,
              .swiper-button-next {
                color: white !important;
                transform: scale(0.6);
              }
              .swiper-pagination-bullet {
                background: white !important;
                opacity: 0.5;
                width: 8px;
                height: 8px;
              }
              .swiper-pagination-bullet-active {
                background: white !important;
                opacity: 1;
              }
            `}</style>


        </div>

          <div className="mt-4 font-cooper text-lg tracking-wider">
          DIY Cookie Workshop
          </div>
          <div className="mt-4 text-start">
          We’re proud to have Slowcombo as one of our key sponsors. With a shared vision and mission, 
          our partnership is a perfect match. While Slowcombo offers a Mindfulness Playground for urban dwellers, 
          providing a retreat for relaxation and wellness, Odds & Ends creates a sandbox environment for students 
          to develop their skills in arts, entrepreneurship, and music. Together, we aim to cultivate spaces that inspire creativity, 
          personal growth, and rejuvenation, benefiting both the student community and the wider Bangkok audience
          During March 26-28, Odds & Ends partnered with Slowcombo to host a DIY Cookie Workshop, 
          offering a unique opportunity to unwind and get creative in a cozy, urban setting. 
        </div>
        </div>

        <ContactSection className="mt-8" contacts={contactList} />
        <div className="mt-8">
          <div className="text-center font-semibold italic text-custom-purple">
            ที่ตั้งร้านกับ slogan
          </div>
        </div>
      </main>
    </div>
  );
};

export default SlowComboPage;
