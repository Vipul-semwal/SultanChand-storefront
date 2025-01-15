"use client"

import React from 'react';
import { Heading } from '@medusajs/ui';
import { Swiper, SwiperSlide  } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Props {}

const Reviews: React.FC<Props> = () => {
  return (
    <div className="text-gray-600  dark:text-gray-300 pt-8 my-20" id="reviews">
      <div className="max-w-7xl content-container mx-auto px-6 md:px-12 xl:px-6">
        <div className="mb-12 space-y-4 px-6 md:px-0">
          <Heading level="h2" className="text-center text-2xl font-bold text-gray-800 dark:text-white md:text-4xl">
            Famous <span className='text-[#D14B48]'>Authors</span>
          </Heading>
        </div>

        <div className="md:hidden">
          {/* Swiper for small screens */}
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="mySwiper"
          >
            {[{
              name: 'Fyodor Dostoevsky',
              role: 'Novelist',
              img: 'https://imageio.forbes.com/specials-images/imageserve/66ec412983c576047f2b8911/Black-and-white-photo-of-Fyodor-Dostoyevsky-/0x0.jpg?format=jpg&crop=1575,1050,x2,y156,safe&width=960',
              review: 'Author of Crime and Punishment, exploring deep psychological and philosophical themes.'
            }, {
              name: 'William Shakespeare',
              role: 'Playwright',
              img: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Shakespeare.jpg',
              review: 'Renowned for plays like Hamlet and Romeo and Juliet, shaping English literature.'
            }, {
              name: 'Leo Tolstoy',
              role: 'Novelist',
              img: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSXQ8JPcV-7uL7Tv9BxVfibTHMmsfCfSvbmAQJYYlhL0sGLmixYUSPHCzC4duiyMzIhFzl7bg3aXtTNuZy1-Hu8qg',
              review: 'Known for epic novels War and Peace and Anna Karenina.'
            }, {
              name: 'Jane Austen',
              role: 'Novelist',
              img: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTumFtyTl8aU7YueE9RG11lj1GDxJXf4BjLm-4Iznkm5-7hyQv3foGINzhUZkuDNrPSSwXTyHJNzmIWTjYFImKGuA',
              review: 'Famous for Pride and Prejudice, highlighting societal norms and romance.'
            }, {
              name: 'Mark Twain',
              role: 'Writer',
              img: 'https://cdn.britannica.com/83/136283-050-9C9D6ED8/Mark-Twain-1907.jpg',
              review: 'Celebrated for The Adventures of Tom Sawyer and Huckleberry Finn.'
            }, {
              name: 'Virginia Woolf',
              role: 'Author',
              img: 'https://cdn.britannica.com/82/138382-050-2E8FCB26/Virginia-Woolf.jpg',
              review: 'Pioneer of modernist literature, known for Mrs Dalloway and To the Lighthouse.'
            }].map((author, index) => (
              <SwiperSlide key={index}>
                <div className="aspect-auto p-8 border border-gray-100 rounded-3xl bg-white dark:bg-gray-800 dark:border-gray-700 shadow-2xl shadow-gray-600/10 hover:shadow-gray-700/20 dark:shadow-none">
                  <div className="flex gap-4">
                    <img
                      className="w-12 h-12 rounded-full"
                      src={author.img}
                      alt="author avatar"
                      width="200"
                      height="200"
                      loading="lazy"
                    />
                    <div>
                      <h6 className="text-lg font-medium text-gray-700 dark:text-white">
                        {author.name}
                      </h6>
                      <p className="text-sm text-gray-500 dark:text-gray-300">
                        {author.role}
                      </p>
                    </div>
                  </div>
                  <p className="mt-8">
                    {author.review}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 space-y-8">
          {/* Non-swiper grid for larger screens */}
          {[{
            name: 'Fyodor Dostoevsky',
            role: 'Novelist',
            img: 'https://imageio.forbes.com/specials-images/imageserve/66ec412983c576047f2b8911/Black-and-white-photo-of-Fyodor-Dostoyevsky-/0x0.jpg?format=jpg&crop=1575,1050,x2,y156,safe&width=960',
            review: 'Author of Crime and Punishment, exploring deep psychological and philosophical themes.'
          }, {
            name: 'William Shakespeare',
            role: 'Playwright',
            img: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Shakespeare.jpg',
            review: 'Renowned for plays like Hamlet and Romeo and Juliet, shaping English literature.'
          }, {
            name: 'Leo Tolstoy',
            role: 'Novelist',
            img: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSXQ8JPcV-7uL7Tv9BxVfibTHMmsfCfSvbmAQJYYlhL0sGLmixYUSPHCzC4duiyMzIhFzl7bg3aXtTNuZy1-Hu8qg',
            review: 'Known for epic novels War and Peace and Anna Karenina.'
          }, {
            name: 'Jane Austen',
            role: 'Novelist',
            img: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTumFtyTl8aU7YueE9RG11lj1GDxJXf4BjLm-4Iznkm5-7hyQv3foGINzhUZkuDNrPSSwXTyHJNzmIWTjYFImKGuA',
            review: 'Famous for Pride and Prejudice, highlighting societal norms and romance.'
          }, {
            name: 'Mark Twain',
            role: 'Writer',
            img: 'https://cdn.britannica.com/83/136283-050-9C9D6ED8/Mark-Twain-1907.jpg',
            review: 'Celebrated for The Adventures of Tom Sawyer and Huckleberry Finn.'
          }, {
            name: 'Virginia Woolf',
            role: 'Author',
            img: 'https://cdn.britannica.com/82/138382-050-2E8FCB26/Virginia-Woolf.jpg',
            review: 'Pioneer of modernist literature, known for Mrs Dalloway and To the Lighthouse.'
          }].map((author, index) => (
            <div
              key={index}
              className="aspect-auto p-8 border border-gray-100 rounded-3xl bg-white dark:bg-gray-800 dark:border-gray-700 shadow-2xl shadow-gray-600/10 hover:shadow-gray-700/20 dark:shadow-none">
              <div className="flex gap-4">
                <img
                  className="w-12 h-12 rounded-full"
                  src={author.img}
                  alt="author avatar"
                  width="200"
                  height="200"
                  loading="lazy"
                />
                <div>
                  <h6 className="text-lg font-medium text-gray-700 dark:text-white">
                    {author.name}
                  </h6>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    {author.role}
                  </p>
                </div>
              </div>
              <p className="mt-8">
                {author.review}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
