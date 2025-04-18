import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { ANIMALS } from "@/constants/spirit-animals";

type Props = {
  onSelectAnimal: (value: string) => void;
};

function AnimalSelection({ onSelectAnimal }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null);

  const handleSelect = (value: string) => {
    onSelectAnimal(value);
    setSelectedAnimal(value);
  };

  return (
    <div className="flex w-full flex-col items-center overflow-hidden">
      <Swiper
        spaceBetween={12}
        slidesPerView={3.5}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="w-full"
      >
        {ANIMALS.map(({ value, label }, idx) => (
          <SwiperSlide key={idx}>
            <button type="button" onClick={() => handleSelect(value)}>
              <div
                className={`flex h-[94px] w-[94px] items-center justify-center rounded-xl ${selectedAnimal == value ? "bg-custom-light-gray" : "bg-white"}`}
              >
                {label}
              </div>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default AnimalSelection;
