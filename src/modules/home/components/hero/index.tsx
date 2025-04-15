"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay, Parallax } from "swiper/modules";
import Image from "next/image";
import { useQueryData } from "../../../../lib/hooks/useQueryData";
import { fetchBannerImages } from "../../../../actions/cms/homepage";

const Hero = () => {
  // Custom hook to fetch data
  const { data: images } = useQueryData<string[]>(
    ["bannerImages"],
    fetchBannerImages,
    true,
    {
      queryKey: ["bannerImages"],
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    }
  );

  const fallbackData = [
    { url: "/banner.jpg" },
    { url: "/bachan.jpg" },
    { url: "/banner.jpg" },
  ];

  const data = images?.map((url) => ({ url })) || fallbackData;

  return (
    <div className="flex justify-center">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, Parallax]}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        speed={2000}
        className="w-full max-w-10xl  h-[80%]"
      >
        {data.map((i, key) => (
          <SwiperSlide key={key} className="flex items-center justify-center">
            <div className="w-full aspect-[16/4] md:aspect-[16/4] relative">
              <Image
                src={i.url || ""}
                alt={`Slide ${key + 1}`}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
