import React from 'react'
import Input from '@modules/common/components/input'
import GlobalHero from '@modules/common/components/globalhero'
import ContactForm from '../components/form'

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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.5353094435595!2d77.24409639999999!3d28.6436862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd309eebed77%3A0xb9459b44ca12196!2sAonebooks!5e0!3m2!1sen!2sin!4v1737402899701!5m2!1sen!2sin"
                  style={{ border: 0 }}
                  allowFullScreen
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
                <a className="text-[#EA5900] leading-relaxed">SultanChand@email.com</a>
                <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">PHONE</h2>
                <p className="leading-relaxed">123-456-7890</p>
              </div>
            </div>
          </div>

         <ContactForm/>
        </div>
      </div>
    </>
  )
}

export default ContactTemplates
