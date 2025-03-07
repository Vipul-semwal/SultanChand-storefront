"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  {
    id: 1,
    name: 'Amit Sharma',
    role: 'Book Enthusiast',
    feedback:
      '“यह किताब मेरी समझ को एक नई दिशा में ले गई। भाषा सरल और स्पष्ट है, पढ़ने में आनंद आया।”',
    avatar: 'https://randomuser.me/api/portraits/men/31.jpg',
  },
  {
    id: 2,
    name: 'Priya Verma',
    role: 'College Student',
    feedback:
      '“बहुत ही बढ़िया पुस्तक! कठिन विषयों को भी बहुत आसानी से समझाया गया है।”',
    avatar: 'https://randomuser.me/api/portraits/women/36.jpg',
  },
  {
    id: 3,
    name: 'Rajesh Gupta',
    role: 'Teacher',
    feedback:
      '“इस किताब की सामग्री प्रैक्टिकल और रोजमर्रा की समस्याओं को हल करने में सहायक है।”',
    avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
  },
  {
    id: 4,
    name: 'Sneha Iyer',
    role: 'Research Scholar',
    feedback:
      '“पुस्तक का ज्ञानवर्धक दृष्टिकोण और सटीक उदाहरण इसे अद्वितीय बनाते हैं।”',
    avatar: 'https://randomuser.me/api/portraits/women/55.jpg',
  },
  {
    id: 5,
    name: 'Vikram Choudhary',
    role: 'Competitive Exam Aspirant',
    feedback:
      '“प्रतियोगी परीक्षाओं की तैयारी के लिए यह किताब बहुत उपयोगी है। मैंने इसे पढ़कर बहुत कुछ सीखा।”',
    avatar: 'https://randomuser.me/api/portraits/men/47.jpg',
  },
];

function TestimonialSlider() {
  return (
    <section className="py-12 sm:py-16 lg:py-6">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-medium text-gray-600">
            2,157 people have said how good Rareblocks
          </p>
          <h2 className="mt-4 text-lg sm:text-2xl lg:text-4xl font-extrabold text-gray-900">
            Our happy <span className="text-[#EA5900]">Customers</span>
          </h2>
        </div>

        <div className="relative mt-7 lg:mt-16">
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={false} // Hide pagination dots
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
                <div className="bg-[#FFF8EE] p-6 lg:p-8 rounded-2xl shadow-lg">
                  <blockquote>
                    <p className="text-sm sm:text-sm lg:text-lg text-gray-800 italic">"{testimonial.feedback}"</p>
                  </blockquote>
                  <div className="flex items-center mt-6">
                    <img
                      className="w-12 sm:w-14 h-12 sm:h-14 rounded-full border-2 border-gray-200"
                      src={testimonial.avatar}
                      alt={testimonial.name}
                    />
                    <div className="ml-4">
                      <p className="text-sm sm:text-base font-bold text-gray-900">{testimonial.name}</p>
                      <p className="text-xs sm:text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export default TestimonialSlider;
