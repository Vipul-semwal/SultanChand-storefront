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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center">Our <span className='text-[#EA5900]'>Legacy</span></h2>
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
          <section className="px-6 md:px-12 lg:px-24 py-16 bg-white text-gray-800">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* Vision */}
        <div>
          <h2 className="text-3xl font-bold text-indigo-700 mb-4">Our Vision</h2>
          <p className="text-lg leading-relaxed">
            Upholding more than seven decades of academic excellence and achieving goals set by our founders and visionaries.
          </p>
        </div>

        {/* Mission */}
        <div>
          <h2 className="text-3xl font-bold text-indigo-700 mb-4">Our Mission</h2>
          <p className="text-lg leading-relaxed">
            Sultan Chand & Sons is committed to imparting high-quality education by making reasonably priced but more valuable, reader-friendly textbooks authored by Indian teachers.
          </p>
        </div>

        {/* About Us */}
        <div>
          <h2 className="text-3xl font-bold text-indigo-700 mb-4">About Us</h2>
          <p className="text-lg leading-relaxed mb-4">
            In the ancient Indian knowledge system, the end of education was the building of character. Inspired by such ideals, Sultan Chand & Sons has been serving the nation since its establishment in 1950. We strive to uphold a legacy of academic excellence, guided by the goals set by our founders and visionaries.
          </p>
          <p className="text-lg leading-relaxed mb-4">
            In today’s educational scenario, where the teacher-student ratio has widened, textbooks play a pivotal role. They act as a bridge: while teachers spark curiosity, textbooks build confidence and clarity in the subject. Our books offer extensive reading material, solved illustrations, case studies, MCQs, and exercises with answers, presented in a clear and engaging style.
          </p>
          <p className="text-lg leading-relaxed mb-4">
            Our authors, from reputed Indian universities, understand the needs of both students and teachers. Some of our publications have a legacy of over seventy years, consistently updated to align with the evolving educational landscape.
          </p>
          <p className="text-lg leading-relaxed mb-4">
            With over 1,300 publications and 300 visionary authors, our catalog spans subjects like Accountancy, Taxation, Economics, Management, Law, English, Political Science, Mathematics, Physics, Chemistry, Environmental Science, IT, and Self-Development. We cater to programs like M.Com., MBA, B.Com., BBA, CA, CS, CMA, and various UG/PG diplomas.
          </p>
          <ul className="list-disc list-inside text-lg space-y-2">
            <li>Revised Editions according to Latest syllabus of various Universities (CBCS) and Exam Pattern and as per New Education Policy 2020 (NEP 2020) and Tamil Nadu Council for Higher Education (TANSCHE) Syllabus</li>
            <li>Solved illustrations and case studies</li>
            <li>MCQs and exercises with answers</li>
            <li>Excellent text presentation</li>
            <li>Reasonably priced books</li>
          </ul>
        </div>

        {/* Gratitude */}
        <div>
          <p className="text-lg leading-relaxed italic text-gray-600">
            We express our heartfelt gratitude to all our associates and well-wishers for their continued support.
          </p>
        </div>

      </div>
    </section>
    {/* bussines partners */}
<div className="bg-gray-900 text-white py-10 px-4">
  <h2 className="text-xl font-semibold underline mb-6 text-center">Our Business Partners</h2>

  {/* Cards */}
  <div className="space-y-6 max-w-3xl mx-auto">
    {/* Northern Book Centre Card */}
    <div className="flex flex-col md:flex-row items-center md:items-start bg-green-50 text-black rounded-lg shadow-md overflow-hidden md:p-4">
      <img
        src="/northern.jpg"
        alt="Northern Book Centre"
        className="w-28 md:w-36 object-contain p-4"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-orange-700">NORTHERN BOOK CENTRE</h3>
        <p>Publishers of Scholarly Reference Books & Booksellers</p>
        <p className="italic mt-2">
          <strong>E-mail:</strong> books.nbc1@gmail.com<br />
          <strong>Website:</strong> www.northernbook.in
        </p>
      </div>
    </div>

    {/* Paragon Books Card */}
    <div className="flex flex-col md:flex-row items-center md:items-start bg-yellow-100 text-black rounded-lg shadow-md overflow-hidden md:p-4">
      <div className="p-4">
        <h3 className="text-xl font-bold text-orange-700">PARAGON BOOKS</h3>
        <p className="italic">Publishers & Distributors</p>
        <p className="italic mt-2">
          <strong>E-mail:</strong> info@paragonbooks.in;<br />
          books.paragon@gmail.com<br />
          <strong>Website:</strong> www.paragonbooks.in
        </p>
      </div>
      <img
        src="/paragon.jpg"
        alt="Paragon Books"
        className="w-28 md:w-36 object-contain p-4"
      />
    </div>
  </div>

  {/* Address */}
  <div className="mt-8 text-center text-sm">
    <p>4221/1 Daryaganj, Ansari Road, New Delhi 110002</p>
    <p>Phones: 23264519, 23271626, 23280295; 9810622267, 9312089080</p>
  </div>
</div>

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
