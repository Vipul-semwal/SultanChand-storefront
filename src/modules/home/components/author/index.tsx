"use client";

import React from 'react';
import { Heading } from '@medusajs/ui';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { sdk } from "@lib/config";
import { useQueryData } from "@lib/hooks/useQueryData";
import LocalizedClientLink from '@modules/common/components/localized-client-link';
import { ArrowUpRightMini } from "@medusajs/icons"
type AuthorsResponse = {
  author: {
    id: string;
    name: string;
    description: string;
    image: string;
    subText: string;
  }[];
  count: number;
  limit: number;
  offset: number;
};

interface Props {}

function truncateText(htmlString: string, maxLength: number) {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlString;
  const textContent = tempDiv.textContent || tempDiv.innerText || "";

  if (textContent.length <= maxLength) return htmlString;
  return textContent.slice(0, maxLength) + "...";
}

const Authors: React.FC<Props> = () => {
  const { data, isFetching } = useQueryData<AuthorsResponse>(
    ["authors", 6, 0],
    () =>
      sdk.client.fetch(`/store/authors`, {
        query: { limit: 6, offset: 0 },
      }),
    true,
    {
      queryKey: [`author-home`],
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    }
  );

  console.log('dhindora ', data?.author);

  return (
    <div className="text-gray-600 dark:text-gray-300 py-16 my-7" id="reviews">
      <div className="content-container mx-auto px-6 md:px-12 xl:px-6">
        <div className="mb-6 relative space-y-4 px-2 md:px-0">
          <h2 className="text-center text-xl sm:text-2xl md:text-4xl font-bold text-gray-800 dark:text-white">
            Meet Our <span className="text-[#EA5900]">Authors</span>
          </h2>
        </div>

        <div className="md:hidden">
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            modules={[Pagination, Autoplay]}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="mySwiper"
          >
            {data?.author.map((i, index) => (
             <LocalizedClientLink href={`/authors/${i.id}`} key={index}>
               <SwiperSlide key={index}>
                <div className="p-4 border border-gray-200 rounded-xl bg-orange-50 dark:bg-gray-800 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className='flex justify-center'>
                    <img src={i.image} alt={i.name} />
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-blue-900 text-center dark:text-white">{i.name}</p>
                  </div>
                  <p
                    className="text-gray-600 text-sm sm:text-lg text-center dark:text-gray-300 italic mb-6"
                    dangerouslySetInnerHTML={{ __html: truncateText(i.description, 150) }}
                  />
                </div>
              </SwiperSlide>
             </LocalizedClientLink>
            ))}
          </Swiper>
        </div>

        <div className="hidden md:grid md:grid-cols-3 gap-4">
          {data?.author.map((i, index) => (
            <LocalizedClientLink href={`/authors/${i.id}`}  key={index}>
              <div
              key={index}
              className="p-6 border grid grid-cols-12 gap-2 border-gray-200 rounded-xl bg-orange-50 dark:bg-gray-800 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className='col-span-4 flex justify-center'>
                <img src={i.image} className="w-full max-w-[150px] rounded-md" alt={i.name} />
              </div>
              <div className='col-span-8 flex flex-col justify-center'>
                <p className="font-semibold text-blue-900 dark:text-white">{i.name}</p>
                <p
                  className="text-gray-600 dark:text-gray-300 text-sm sm:text-md"
                  dangerouslySetInnerHTML={{ __html: truncateText(i.description, 150) }}
                />
              </div>
            </div>
            </LocalizedClientLink>
          ))}
        </div>
      </div>

<div className='w-full py-4 flex items-center justify-center'>
  <LocalizedClientLink href={'/authors'}>
  <button style={{ fontFamily: 'Poppins, sans-serif' }} className="bg-[#EA5900] text-white px-4 py-2 rounded-lg font-semibold flex items-center text-xs sm:text-base md:text-lg lg:text-sm justify-center gap-1 hover:bg-[#EA5900] transition-all duration-300 border-none outline-none">
              View More
              <ArrowUpRightMini className="group-hover:rotate-45 ease-in-out duration-150" color="white" />
            </button>
  </LocalizedClientLink>
</div>
   
    </div>
  );
};

export default Authors;
