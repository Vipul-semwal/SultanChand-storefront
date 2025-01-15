"use client"

import { Swiper, SwiperSlide  } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination,Autoplay,Parallax } from 'swiper/modules';
import Image from 'next/image';
import { Heading, Button } from '@medusajs/ui';


const Hero = () => {
  
  const data = [{url:"/krishna.jpg"},{url:"/bachan.jpg"},{url:"/krishna.jpg"}]
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
      {data.map((i,key) => (
          <SwiperSlide key={key} className="flex items-center justify-center">
            <div className="w-full flex flex-col items-center text-center space-y-4">
              <Image
                src={i.url}
                alt={`Slide ${key+1}`}  
                width={1200}
                height={600}
                className="w-full rounded-lg object-cover "
              />
             
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
   </div>
     
    
  );
}

export default Hero
