import * as React from 'react';
import GlobalHero from '@modules/common/components/globalhero';

export interface IAppProps {}

export default function AboutTamplet(props: IAppProps) {

  const publications= [
    {
      id: 1,
      image: '/1.jpeg',
      title: 'Master Amir Chand ji  ',
      description: "Freedom Fighter  (1869 – 1915)",
    },
    {
      id: 2,
      image: '/2.jpeg',
      title: 'Shri Sultan Chand ji  ',
      description: 'Founder of  M/s Sultan Chand & Sons  Educational Publishers (20.12.1896 – 01.02.1975) ',
    },
    {
      id: 3,
      image: '/3.jpeg',
      title: 'Shri Subhash Chand Aggarwal  ',
      description: '(01.11.1939 – 17.06.2017) ',
    },
    {
      id: 4,
      image: '/4.jpeg',
      title: 'Dr. (Miss) Usha Aggarwal ',
      description: '(10.04.1941 – 07.01.2021)',
    },
  ];
  return (
    <div>
      <div className="bg-gray-50">

        {/* Hero Section */}
        <GlobalHero
          backgroundImage="/banner.jpg"
          title="About Us"
          subtitle="Sultan Chand & Sons -  75 Years of Excellence in Publishing
Educational Books
"
        />

        {/* Legacy Section */}
        <section className="py-12 px-4 sm:py-16 sm:px-6 bg-orange-100">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <img
                src="/about.jpeg"
                alt="Legacy"
                className="rounded-lg shadow-lg w-full object-cover"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#EA5900] mb-4">Our <span className='text-gray-800'>Legacy</span></h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                In the ancient Indian knowledge system, the end goal of education was character building. Inspired by such lofty ideas, Sultan Chand & Sons has been serving the nation since 1950.
              </p>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                With over 1,300 publications and contributions from more than 300 scholars, our legacy continues to inspire generations of learners.
              </p>
            </div>
          </div>
        </section>

        {/* Vision and Mission Section */}
        <section className="py-12 px-4 sm:py-16 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8">Our <span className='text-[#EA5900]'>Vision</span> & <span className='text-[#EA5900]'>Mission</span></h2>
            <div className="grid grid-cols-1 items-center md:grid-cols-2 gap-8">
              <div className="flex flex-col items-center">
                <h3 className="text-lg sm:text-xl font-semibold text-[#EA5900] mb-4">Vision</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Upholding over seven decades of academic excellence and achieving the goals set by our founders and visionaries.
                </p>
              </div>
              <div className="flex items-center justify-center">
                <img src="/about1.jpg" alt="Vision" className="max-w-full h-auto" />
              </div>
            </div>
            <div className="grid grid-cols-1 items-center md:grid-cols-2 gap-8 mt-8">
              <div className="flex items-center justify-center">
                <img src="/about3.jpg" alt="Mission" className="max-w-full h-auto" />
              </div>
              <div className="flex flex-col items-center">
                <h3 className="text-lg sm:text-xl font-semibold text-[#EA5900] mb-4">Mission</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Committed to imparting high-quality education by creating reasonably priced, reader-friendly textbooks authored by Indian teachers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Publications Section */}
        <section className="py-12 px-4 sm:py-16 sm:px-6 bg-orange-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center">Our <span className='text-[#EA5900]'>Publications</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {publications.map((item,id) => (
                <div key={item.id} className="p-3 bg-white rounded-lg flex items-center flex-col justify-center shadow-lg">
                  <img
                    src={item.image}
                    alt={`Book ${item}`}
                    className="rounded-sm max-w-full max-h-full object-cover mb-4"
                  />
                  <h3 className="text-sm sm:text-sm text-center font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-sm text-center sm:text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gratitude Section */}
        <section className="py-12 px-4 sm:py-16 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Our <span className='text-[#EA5900]'>Gratitude</span></h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              We express our heartfelt gratitude to all our authors, associates, and well-wishers for their unwavering support. Your contributions have been instrumental in our success.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
