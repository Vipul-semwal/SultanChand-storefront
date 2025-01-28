'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  {
    id: 1,
    name: 'Leslie Alexander',
    role: 'Freelance React Developer',
    feedback:
      '“You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the change.”',
    avatar: 'https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-1.png',
  },
  {
    id: 2,
    name: 'John Doe',
    role: 'Software Engineer',
    feedback:
      '“This product has been a game-changer for my work! The quality and support are exceptional.”',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: 3,
    name: 'Jane Smith',
    role: 'Product Manager',
    feedback:
      '“Absolutely love it! The design is sleek, and it has simplified my workflow tremendously.”',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: 4,
    name: 'Chris Johnson',
    role: 'UI/UX Designer',
    feedback:
      '“A brilliant product! It has made my job easier and more enjoyable.”',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
  },
  {
    id: 5,
    name: 'Emily Davis',
    role: 'Marketing Specialist',
    feedback:
      '“Highly recommend it to anyone looking to boost their productivity.”',
    avatar: 'https://randomuser.me/api/portraits/women/50.jpg',
  },
];

function TestimonialSlider() {
  return (
    <section className="py-12  sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-lg font-medium text-gray-600">
            2,157 people have said how good Rareblocks
          </p>
          <h2 className="mt-4 text-3xl font-extrabold text-gray-900 sm:text-4xl xl:text-5xl">
            Our happy <span className='text-blue-900'>Customers</span> say about us
          </h2>
        </div>

        <div className="relative mt-10 lg:mt-16">
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-lg">
                  <blockquote>
                    <p className="text-lg text-gray-800 italic">"{testimonial.feedback}"</p>
                  </blockquote>
                  <div className="flex items-center mt-6">
                    <img
                      className="w-14 h-14 rounded-full border-2 border-gray-200"
                      src={testimonial.avatar}
                      alt={testimonial.name}
                    />
                    <div className="ml-4">
                      <p className="text-base font-bold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="mt-12 text-center">
            <a
              href="#"
              className="text-base font-bold text-gray-900 border-b-2 border-gray-900 hover:border-gray-600 hover:text-gray-600"
            >
              Check all 2,157 reviews
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialSlider;
