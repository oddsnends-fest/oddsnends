"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// src for event's image
const imgSrc = [
  {
    src: "/images/events/Thumbnail_Festival.png",
    link: "",
  },
  {
    src: "/images/events/Thumbnail_Workshop.png",
    link: "https://docs.google.com/forms/d/e/1FAIpQLSdVmKSrSb4eHuxhudDcDosVWejYXvboW3Perl6z3a0zD-HPDA/viewform",
  },
  { src: "/images/events/Thumbnail_Web.png", link: "" },
  {
    src: "/images/events/Thumbnail_DIYCookie.png",
    link: "https://docs.google.com/forms/d/e/1FAIpQLScpRDeY39gJaVQ1WHkfvKt-1vo8xnPYnuBazcNZsO7pV799EA/viewform",
  },
  // {src: "/", link: "https://www.tiktok.com/@oddsnends.fest"},
  // {src: "/", link: "https://www.tiktok.com/@oddsnends.fest"},
];

const autoPlayDelay = 3000; // in ms
const autoPlaySwipeSpeed = 500; // in ms

const SlidingBox = () => {
  // State of the focused Box
  const [activeIndex, setActiveIndex] = useState(0);

  // State of whether we're focusing the first box
  const [isFirstSlide, setIsFirstSlide] = useState(true);

  // isFirstSlide = true; when the activeIndex state changes to 0
  useEffect(() => {
    setIsFirstSlide(activeIndex === 0 ? true : false);
    // // console.log(activeIndex)
  }, [activeIndex]);

  return (
    <>
      <div className="flex w-full flex-col items-center overflow-hidden">
        <Swiper
          spaceBetween={20} // boxes gap
          slidesPerView={1.6} // box per screen
          centeredSlides={true}
          pagination={{ clickable: true, el: ".custom-pagination" }} // Use the custom pagination
          loop={imgSrc.length >= 4} // SwiperJs doesn't support loop mode for less than 4 events
          autoplay={{
            delay: autoPlayDelay, // Time between slides (in ms)
          }}
          speed={autoPlaySwipeSpeed}
          modules={[Pagination, Autoplay]} // modules used
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)} // set the focused index to our state
          className="w-full drop-shadow-[0_4px_2px_rgba(0,0,0,0.25)]"
        >
          {/* Map through the image src links*/}
          {imgSrc.map(({ src, link }, idx) => (
            <SwiperSlide key={idx}>
              <div
                className={
                  // define transition to ensure smooth animation between box changing
                  `flex justify-center transition-all duration-500 ${idx === activeIndex ? "opacity-100" : "opacity-50" /* Unfocused boxes(the beside one) is faded */} ${isFirstSlide && idx !== 0 && imgSrc.length < 4 ? "translate-x-20" : "" /* For loop mode disabled, when focusing the first box, all the boxes are being moved to the right*/} ${isFirstSlide && idx !== 0 && imgSrc.length >= 4 && idx < imgSrc.length / 2 ? "translate-x-20" : "" /* For loop mode, when focusing the first box, all the first half boxes are being moved to the right*/} ${isFirstSlide && idx !== 0 && imgSrc.length >= 4 && idx > imgSrc.length / 2 ? "-translate-x-20" : "" /* On the other hand, all the second half boxes are being move to the left*/} `
                }
              >
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${link.length === 0 && "pointer-events-none"}`}
                >
                  <Image
                    src={src}
                    alt={`Event ${idx + 1}`}
                    width={260}
                    height={260}
                    className="rounded-3xl bg-white text-black"
                  />
                </a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Use custom pagination, the default one stays in the box*/}
        <div className="custom-pagination mt-4 text-center"></div>

        {/* CSS for the custom-pagination */}
        <style jsx global>
          {`
            .custom-pagination .swiper-pagination-bullet {
              margin: 0 4px !important;
              width: 9px;
              height: 9px;
              background-color: #ffffff;
              opacity: 1;
              transition: background-color 0.3s ease;
            }

            .custom-pagination .swiper-pagination-bullet-active {
              background-color: #553b82 !important;
            }
          `}
        </style>
      </div>
    </>
  );
};

export default SlidingBox;
