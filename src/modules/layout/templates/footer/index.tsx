import { listCategories } from "@lib/data/categories";
import { listCollections } from "@lib/data/collections";
import { Text, clx } from "@medusajs/ui";
import LocalizedClientLink from "@modules/common/components/localized-client-link";

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  });
  const productCategories = await listCategories();

  return (
    <>
    
     <section className="py-10 bg-gray-50 sm:pt-16 lg:pt-24 border-t-4 border-red-600">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-2 md:col-span-3 lg:grid-cols-6 gap-y-16 gap-x-12">
          <div className="col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8">
            <img
              className="w-auto h-12"
              src="/logo.png"
              alt="Sultan Chand Logo"
            />
            <p className="text-base leading-relaxed text-gray-600 mt-7">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
            </p>
            <ul className="flex items-center space-x-3 mt-9">
              {/* Add social media icons */}
              <li>
                <a
                  href="#"
                  title="Twitter"
                  className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-red-600 focus:bg-red-600"
                >
                  <svg
                    className="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    {/* Twitter Icon Path */}
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  title="Facebook"
                  className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-red-600 focus:bg-red-600"
                >
                  <svg
                    className="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    {/* Facebook Icon Path */}
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  title="Instagram"
                  className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-red-600 focus:bg-red-600"
                >
                  <svg
                    className="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    {/* Instagram Icon Path */}
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">Categories</p>
            <ul className="mt-6 space-y-4">
              {productCategories && productCategories.length > 0 && (
                productCategories?.slice(0, 6).map((category) => {
                  if (category.parent_category) return null;

                  const children = category.category_children?.map((child) => ({
                    name: child.name,
                    handle: child.handle,
                    id: child.id,
                  })) || null;

                  return (
                    <li key={category.id}>
                      <LocalizedClientLink
                        className="flex text-base text-black transition-all duration-200 hover:text-red-600 focus:text-red-600"
                        href={`/categories/${category.handle}`}
                      >
                        {category.name}
                      </LocalizedClientLink>
                      {children && (
                        <ul className="ml-3 mt-2 space-y-2">
                          {children.map((child) => (
                            <li key={child.id}>
                              <LocalizedClientLink
                                className="flex text-base text-black transition-all duration-200 hover:text-red-600 focus:text-red-600"
                                href={`/categories/${child.handle}`}
                              >
                                {child.name}
                              </LocalizedClientLink>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })
              )}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">Collections</p>
            <ul className="mt-6 space-y-4">
              {collections && collections.length > 0 && (
                collections?.slice(0, 6).map((collection) => (
                  <li key={collection.id}>
                    <LocalizedClientLink
                      className="flex text-base text-black transition-all duration-200 hover:text-red-600 focus:text-red-600"
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
                  className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-red-600 caret-red-600"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center px-6 py-4 mt-3 font-semibold text-white transition-all duration-200 bg-red-600 rounded-md hover:bg-red-700 focus:bg-red-700"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <hr className="mt-16 mb-10 border-gray-200" />

        <p className="text-sm text-center text-gray-600">
          © {new Date().getFullYear()}, All Rights Reserved by Sultan Chand
        </p>
      </div>
    </section>
    </>
   
  );
}
