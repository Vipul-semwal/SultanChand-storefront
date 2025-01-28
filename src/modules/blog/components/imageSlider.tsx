"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import { getStrapiMedia } from "@lib/util/strapi";

interface ImageType {
  id: number;
  attributes: {
    alternativeText: string | null;
    caption: string | null;
    url: string;
  };
}

interface SlideshowProps {
  files: {
    data: ImageType[];
  };
}

export default function Slideshow({ data }: { data: SlideshowProps }) {
  if(!data.files){
    return null
  }
  return (
    <div className="w-full">
      loda
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className="rounded-lg"
      >
        {data.files.data.map((image) => {
          const imageUrl = getStrapiMedia(image.attributes.url)
          return (
            <SwiperSlide key={image.id} className="flex justify-center">
              <Image
                src={imageUrl || ""}
                alt={image.attributes.alternativeText || "Slide Image"}
                width={800}
                height={400}
                className="w-full h-96 object-cover rounded-lg"
                priority
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
