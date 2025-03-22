import { listCategories } from "@lib/data/categories";
import { listCollections } from "@lib/data/collections";
import { FaTwitter, FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn } from "react-icons/fa";
import LocalizedClientLink from "@modules/common/components/localized-client-link";


export default async function Footer() {
  const { collections } = await listCollections({ fields: "*products" });
  const productCategories = await listCategories();

  return (
    <>
     

      <section className="pt-10 sm:pt-16 lg:pt-16 border-t-4 bg-blue-950 bg-cover bg-center">
        <div className="px-4 mx-auto pb-10 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            {/* Collections */}
            {/* <div>
              <p className="text-sm sm:text-sm font-semibold tracking-widest text-white uppercase underline underline-offset-8 decoration-[#EA5900]">Collections</p>
              <ul className="mt-6 space-y-4">
                {collections && collections.length > 0 && collections.slice(0, 6).map((collection) => (
                  <li key={collection.id}>
                    <LocalizedClientLink
                      className="flex text-sm sm:text-sm text-gray-100 transition-all duration-200 hover:text-[#EA5900] focus:text-[#EA5900]"
                      href={`/collections/${collection.handle}`}
                    >
                      {collection.title}
                    </LocalizedClientLink>
                  </li>
                ))}
              </ul>
            </div> */}

            {/* Useful Links */}
            <div>
              <p className="text-sm sm:text-sm font-bold tracking-widest text-white uppercase underline underline-offset-8 decoration-[#EA5900]">Useful LINKS</p>
              <ul className="mt-6 space-y-4">
                {["Policy", "FAQ","contact-us","about"].map((item, index) => (
                  <li key={index}>
                    <LocalizedClientLink
                      className="flex text-sm sm:text-sm text-gray-100 transition-all duration-200 hover:text-[#EA5900] focus:text-[#EA5900]"
                      href={`/${item}`}
                    >
                      {item}
                    </LocalizedClientLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Policies */}
            <div>
              <p className="text-sm sm:text-sm font-semibold tracking-widest text-white uppercase underline underline-offset-8 decoration-[#EA5900]">Policies</p>
              <ul className="mt-6 space-y-4">
                {["Privacy Policy", "Secure Shopping", "Payments Policy", "Shipping Policy", "Cancellation Policy"].map((item, index) => (
                  <li key={index}>
                    <LocalizedClientLink
                      className="flex text-sm sm:text-sm text-white transition-all duration-200 hover:text-[#EA5900] focus:text-[#EA5900]"
                      href="/Policy"
                    >
                      {item}
                    </LocalizedClientLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Location */}
            <div>
              <p className="text-sm sm:text-sm font-semibold tracking-widest text-white uppercase underline underline-offset-8 decoration-[#EA5900]">Location</p>
              <address className="mt-6 text-sm sm:text-sm text-gray-100 not-italic">
                23, Daryaganj, Ansari Road<br />
                New Delhi-110002<br />
               <span className="text-orange-500">
                 (+91 / 011) 23266105 , 23247051<br />
                (+91 / 011) 23243183 , 23266357<br />
                (+91 / 011) 23277843, 23281876</span>
              </address>
            </div>

            {/* Connect with us */}
            <div>
              <p className="text-xs sm:text-sm font-semibold tracking-widest text-white uppercase underline underline-offset-8 decoration-[#EA5900]">Connect with us</p>
              
              <ul className="flex items-center flex-wrap overflow-hidden space-x-3 mt-4">
                {[FaTwitter, FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn].map((Icon, idx) => (
                  <li key={idx}>
                    <a
                      href="#"
                      title={Icon.name.replace('Fa', '')}
                      className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-[#EA5900] focus:bg-[#EA5900]"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  </li>
                ))}
              </ul> <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d218.8459781203116!2d77.244018!3d28.643676!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd824a0907ef%3A0x440f63f912791aa8!2sSultan%20Chand%20%26%20Sons%2C%20Since%201950!5e0!3m2!1sen!2sin!4v1741198254136!5m2!1sen!2sin"
        height="200"
        style={{ border: 0, width: "100%" ,marginTop: "20px"}}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
            </div>
          </div>
        </div>

        <div className="bg-blue-950 border-t-2 border-t-orange-500 text-white mt-2">
          <div className="w-full mx-auto text-center">
            <div className="flex justify-center space-x-4 py-4">
              {["https://logowik.com/content/uploads/images/219_visa.jpg", "https://i.pinimg.com/736x/56/fd/48/56fd486a48ff235156b8773c238f8da9.jpg", "https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg","https://upload.wikimedia.org/wikipedia/commons/f/fa/UPI-Logo.png"].map((src, idx) => (
                <div key={idx} style={{ width: "40px", height: "30px" }}>
                  <img src={src} alt="Payment Method" className="w-full h-full" />
                </div>
              ))}
            </div>
            <p className="text-sm sm:text-sm pb-2">© 2025 Sultan Chand & Sons. All rights reserved.</p>
          </div>
        </div>
      </section>
    </>
  );
}
