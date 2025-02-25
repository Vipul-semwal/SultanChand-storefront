"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay, Parallax } from 'swiper/modules';
import Image from 'next/image';
import { Heading, Button } from '@medusajs/ui';
import { useQueryData } from '../../../../lib/hooks/useQueryData';
import { fetchBannerImages } from '../../../../actions/cms/homepage';

const Hero = () => {
  // Custom hook to fetch data
  const { data: images, isPending, isError } = useQueryData<string[]>(
    ['bannerImages'],
    fetchBannerImages,
    true ,
    { 
      queryKey: [`bannerImages`],
      staleTime: 5 * 60 * 1000, 
      refetchOnWindowFocus: false,
      retry: 1,
    }
  );
   const strepiurl =process.env.NEXT_PUBLIC_STRAPI_API_URL

  const fallbackData = [
    { url: "/krishna.jpg" },
    { url: "/bachan.jpg" },
    { url: "/krishna.jpg" }
  ];
  
 const data = images?.map((url) => ({ url: `${strepiurl}${url}` })) || fallbackData;
  return (
    <div>
     

      <Swiper
        modules={[Navigation, Pagination, Autoplay, Parallax]}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        autoplay={{
          delay: 2000, // Delay between slides
          disableOnInteraction: false, // Keep autoplay running after interaction
        }}
        speed={2000}
        className="max-w-10xl mx-auto"
      >
        {data.map((i, key) => {
          console.log('halala', i.url,);
          return (
            <SwiperSlide key={key} className="flex items-center justify-center">
              <div className="w-full flex flex-col items-center text-center space-y-4">
                <Image
                  src={i.url}
                  alt={`Slide ${key + 1}`}
                  width={1200}
                  height={600}
                  className="w-full  object-cover"
                  unoptimized
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Hero;