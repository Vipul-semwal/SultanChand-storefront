import React from 'react'
import Input from '@modules/common/components/input'
import GlobalHero from '@modules/common/components/globalhero'

function ContactTemplates() {
  return (
    <>
    <GlobalHero title='Contact Us' backgroundImage='/banner.jpg' subtitle='see you soon' />
      

      <div className="text-gray-600 body-font relative contain-content">
        <div className="container px-5 py-10 mx-auto flex sm:flex-nowrap flex-wrap">
          <div className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
            <iframe 
              width="100%" 
              height="100%" 
              className="absolute inset-0" 
              title="map" 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.6024789393127!2d77.2432523!3d28.6416739!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfcd91c3e1505%3A0xaae7e588e71295e9!2sSultan%20Chand%20%26%20Sons%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1736718888044!5m2!1sen!2sin"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="bg-white relative flex flex-wrap py-6 rounded shadow-md">
              <div className="lg:w-1/2 px-6">
                <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">ADDRESS</h2>
                <p className="mt-1">Sultan Chand & Sons Pvt. Ltd.</p>
              </div>
              <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
                <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">EMAIL</h2>
                <a className="text-red-500 leading-relaxed">SultanChand@email.com</a>
                <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">PHONE</h2>
                <p className="leading-relaxed">123-456-7890</p>
              </div>
            </div>
          </div>

          <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
            <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">We will contact you soon!</h2>
            <p className="leading-relaxed mb-5 text-gray-600">Post-ironic Portland shabby chic echo park, banjo fashion axe</p>

            <div className="relative mb-4">
              <Input label="Name" name="name" />
            </div>
            <div className="relative mb-4">
              <Input label="Email" name="email" />
            </div>
            <div className="relative mb-4">
              <textarea
                id="message"
                name="message"
                className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                placeholder="Your message"
              ></textarea>
            </div>
            <button className="text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg">Button</button>
            <p className="text-xs text-gray-500 mt-3">Chicharrones blog helvetica normcore Iceland tousled brook viral artisan.</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ContactTemplates
