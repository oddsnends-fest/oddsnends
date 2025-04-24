import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { ANIMALS } from "@/constants/spirit-animals";
import Image from "next/image";

type Props = {
  onSelectAnimal: ({ value, name }: { value: string; name: string }) => void;
};

function AnimalSelection({ onSelectAnimal }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null);

  const handleSelect = ({ value, name }: { value: string; name: string }) => {
    onSelectAnimal({ value, name });
    setSelectedAnimal(value);
  };

  return (
    <div className="mt-1 flex w-full flex-col items-center overflow-hidden">
      <Swiper
        spaceBetween={12}
        slidesPerView={3.5}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="w-full"
      >
        {ANIMALS.map(({ value, label, name }, idx) => (
          <SwiperSlide key={idx}>
            <button type="button" onClick={() => handleSelect({ value, name })}>
              <div
                className={`flex h-[94px] w-[94px] items-center justify-center rounded-xl ${selectedAnimal == value ? "bg-custom-light-gray" : "bg-white"}`}
              >
                <Image
                  src={`/images/spirit-animals/${value}.png`}
                  alt={label}
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default AnimalSelection;
