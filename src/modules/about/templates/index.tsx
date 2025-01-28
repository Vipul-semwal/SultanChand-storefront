import * as React from 'react';
import GlobalHero from '@modules/common/components/globalhero';
export interface IAppProps {}

export default function AboutTamplet(props: IAppProps) {
  return (
    <div>
      <div className="bg-gray-50">

        {/* Hero Section */}
        <GlobalHero
          backgroundImage="/banner.jpg"
          title="About Us"
          subtitle="Sultan Chand and Sons - A Legacy of Excellence in Education."
        />

        {/* Legacy Section */}
        <section className="py-16 px-6 bg-blue-50">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1518373714866-3f1478910cc0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Legacy"
                className="rounded-lg shadow-lg w-full object-cover"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our <span className='text-blue-800'>Legacy</span></h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                In the ancient Indian knowledge system, the end goal of education was character building. Inspired by such lofty ideas, Sultan Chand & Sons has been serving the nation since 1950. Upholding a legacy of academic excellence, we strive to make high-quality education accessible through reader-friendly textbooks authored by Indian teachers.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our books bridge the gap between teachers and students, providing a foundation of trust and confidence in the learning process. With over 1,300 publications and contributions from more than 300 scholars, our legacy continues to inspire.
              </p>
            </div>
          </div>
        </section>

        {/* Vision and Mission Section */}
        <section className="py-16 px-6">
  <div className="max-w-4xl mx-auto text-center">
    <h2 className="text-3xl font-bold text-gray-800 mb-6">Our <span className='text-blue-800'>Vision</span> & <span className='text-blue-800'>Mission</span></h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="flex flex-col items-center justify-center">
        <h3 className="text-xl font-semibold text-blue-800 mb-4">Vision</h3>
        <p className="text-gray-600 leading-relaxed mb-4">
          Upholding more than seven decades of academic excellence and achieving the goals set by our founders and visionaries.
        </p>
      </div>
      <div className="flex items-center justify-center">
        <img src="https://images.unsplash.com/photo-1507415492521-917f60c93bfe?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Vision" className="max-w-full h-auto" />
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
      <div className="flex items-center justify-center">
        <img src="https://plus.unsplash.com/premium_photo-1661964153042-56211a8e2d0b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Mission" className="max-w-full h-auto" />
      </div>
      <div className="flex flex-col items-center justify-center">
        <h3 className="text-xl font-semibold text-blue-800 mb-4">Mission</h3>
        <p className="text-gray-600 leading-relaxed">
          Committed to imparting high-quality education by creating reasonably priced, reader-friendly textbooks authored by Indian teachers.
        </p>
      </div>
    </div>
  </div>
</section>



        {/* Our Publications Section */}
        <section className="py-16 px-6 bg-gray-100">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">Our <span className='text-blue-800'>Publications</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-6 bg-white rounded-lg shadow-lg">
                <img
                  src="https://m.media-amazon.com/images/I/715smRhK8JL._SY466_.jpg"
                  alt="Book 1"
                  className="rounded-lg w-full h-50% object-cover mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800">Title 1</h3>
                <p className="text-gray-600">A brief description of the book and its significance.</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-lg">
              <img
                  src="https://m.media-amazon.com/images/I/715smRhK8JL._SY466_.jpg"
                  alt="Book 1"
                  className="rounded-lg w-full h-50% object-cover mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800">Title 2</h3>
                <p className="text-gray-600">A brief description of the book and its significance.</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-lg">
              <img
                  src="https://m.media-amazon.com/images/I/715smRhK8JL._SY466_.jpg"
                  alt="Book 1"
                  className="rounded-lg w-full h-50% object-cover mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800">Title 3</h3>
                <p className="text-gray-600">A brief description of the book and its significance.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Gratitude Section */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our <span className='text-blue-800'>Gratitude</span></h2>
            <p className="text-gray-600 leading-relaxed">
              We express our heartfelt gratitude to all our authors, associates, and well-wishers for their unwavering support. Your contributions have been instrumental in our success.
            </p>
          </div>
        </section>

        {/* Footer */}
       
      </div>
    </div>
  );
}
