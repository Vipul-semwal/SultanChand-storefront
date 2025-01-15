import * as React from 'react';
import hero from '../components/hero';
import GlobalHero from '@modules/common/components/globalhero';
export interface IAppProps {
}

export default function AboutTamplet(props: IAppProps) {
  return (
    <div>
      <div className="bg-gray-50">

        {/* Hero Section */}
        <GlobalHero
          backgroundImage="/banner.jpg"
          title="About Us"
          subtitle="Sultan Chand and Sons - A Legacy of Excellence in Education."/>
      




        {/* About Us Section */}
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-10">
            {/* Image Section */}
            <div className="md:w-1/3 w-full">
              <img
                src="/test.jpg"
                alt="Sultan Chand and Sons"
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
            </div>

            {/* Story Content */}
            <div className="md:w-2/3 w-full">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 relative inline-block">
                Our <span className='text-red-400'>Story</span>

              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Shri Sultan Chand ji, founder of M/s S. Chand & Company (1917) and of M/s Sultan Chand & Sons (1950), was a pioneer in the field of publishing school and college-level texts by Indian teachers.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                He inherited the spirit of nationalism and lofty ideals from his noble father, Master Amir Chand ji, a dedicated teacher, social reformer, great patriot, and revolutionary. Master Amir Chand ji was awarded the death sentence in 1915 for his involvement in the Hardinge Bomb Case.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Shri Sultan Chand ji pursued his goal of providing high-quality texts by Indian teachers to Indian students at affordable prices with unparalleled commitment and effort. His legacy is upheld today by M/s Sultan Chand & Sons as a name synonymous with faith and reliability in the education sector.
              </p>
            </div>

          </div>
        </section>







        {/* Our Mission Section */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our <span className='text-red-400'>Mission</span></h2>
            <p className="text-gray-600 leading-relaxed">
              At Sultan Chand & Sons, our mission is to provide high-quality
              educational resources that empower students and educators alike.
              Upholding the rich heritage of Shri Sultan Chand ji, we aim to make
              education accessible, affordable, and impactful for generations to
              come.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-6">
          <div className="max-w-5xl mx-auto text-center">
            <p>© 2025 Sultan Chand & Sons. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
