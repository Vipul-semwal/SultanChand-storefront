import { listCategories } from "@lib/data/categories";
import { listCollections } from "@lib/data/collections";
import { FaTwitter, FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn } from "react-icons/fa";
import LocalizedClientLink from "@modules/common/components/localized-client-link";

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  });
  const productCategories = await listCategories();

  return (
    <>
      <section className=" bg-gray-800 sm:pt-16 lg:pt-24 border-t-4 border-blue-800">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-2 md:col-span-3 lg:grid-cols-6 gap-y-16 gap-x-12">
            <div className="col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8">
              <img
                className="w-auto h-12"
                src="/logo.png"
                alt="Sultan Chand Logo"
              />
              <p className="text-base leading-relaxed text-white mt-7">
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint. Velit officia consequat duis enim velit mollit.
              </p>
              <ul className="flex items-center space-x-3 mt-9">
                {/* Twitter Icon */}
                <li>
                  <a
                    href="#"
                    title="Twitter"
                    className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-blue-800 focus:bg-blue-800"
                  >
                    <FaTwitter className="w-4 h-4" />
                  </a>
                </li>

                {/* Facebook Icon */}
                <li>
                  <a
                    href="#"
                    title="Facebook"
                    className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-blue-800 focus:bg-blue-800"
                  >
                    <FaFacebookF className="w-4 h-4" />
                  </a>
                </li>

                {/* Instagram Icon */}
                <li>
                  <a
                    href="#"
                    title="Instagram"
                    className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-blue-800 focus:bg-blue-800"
                  >
                    <FaInstagram className="w-4 h-4" />
                  </a>
                </li>

                {/* YouTube Icon */}
                <li>
                  <a
                    href="#"
                    title="YouTube"
                    className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-blue-800 focus:bg-blue-800"
                  >
                    <FaYoutube className="w-4 h-4" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    title="YouTube"
                    className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-blue-800 focus:bg-blue-800"
                  >
                    <FaLinkedinIn className="w-4 h-4" />
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold tracking-widest text-white uppercase">Collections</p>
              <ul className="mt-6 space-y-4">
                {collections && collections.length > 0 && (
                  collections?.slice(0, 6).map((collection) => (
                    <li key={collection.id}>
                      <LocalizedClientLink
                        className="flex text-base text-white transition-all duration-200 hover:text-blue-800 focus:text-blue-800"
                        href={`/collections/${collection.handle}`}
                      >
                        {collection.title}
                      </LocalizedClientLink>
                    </li>
                  ))
                )}
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1 lg:col-span-2 lg:pl-8">
              <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">Subscribe to newsletter</p>
              <form action="#" method="POST" className="mt-6">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    className="block w-full p-4 text-white placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-800 caret-blue-800"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center px-6 py-4 mt-3 font-semibold text-white transition-all duration-200 bg-blue-800 rounded-md hover:bg-blue-800 focus:bg-blue-700"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

      

          {/* <p className="text-sm text-center text-gray-600">
            © {new Date().getFullYear()}, All Rights Reserved by Sultan Chand
          </p> */}
        
        </div>
        <div className="bg-gray-800 text-white py-6 mt-2">
          <div className="w-full mx-auto text-center">
            <p>© 2025 Sultan Chand & Sons. All rights reserved.</p>
          </div>
        </div>
      </section>
    </>
  );
}
