'use client';

import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import useToggleState from "@lib/hooks/use-toggle-state";
import { BsChevronDown, BsChevronRight } from "react-icons/bs";
import Modal from "@modules/common/components/modal";
import { FaCrown } from "react-icons/fa6";
import SearchBar from "@modules/common/components/search";
import { transformProductCategory, ProductCategoryTypes as ProductCategory,trasnformCollection } from "@lib/util/transformProductCategory";
import { useCategories } from "@lib/hooks/useCategory";
import MobileViewNav from "./mobile";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const closeMobile = () => {
    setIsMobileMenuOpen(false);
  };
  const [sticky, setSticky] = useState(false);
  const { countryCode } = useParams() as { countryCode: string };
  const [hovered, setHovered] = useState(false);
  const [openSubmenuId, setOpenSubmenuId] = useState<string | null>(null);
  const [collection,Setcollection] = useState<ProductCategory[]>([])

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const categoriesRef = useRef<HTMLButtonElement | null>(null);
  const { data: productCategories } = useCategories();
  // console.log('danda apki gand me', productCategories);
  // console.log('collectionbeticho:',collection);
  
  useEffect(()=>{
   ( async function fetchCollection(){
    const data = await trasnformCollection();
    console.log('collect kar bawa',data);
    Setcollection(data)
  })()
  },[])

  const allCategories: ProductCategory[] = [

    { id: "home", name: "Home", path: "/", handle: "home" },
    ...collection
    ,
    {
      id: "categories",
      name: "Categories",
      path: "#",
      handle: "categories",
      category_children: productCategories
        ?.filter((data) => !data.parent_category_id) // Sirf root categories lo
        .map(transformProductCategory) || [],
    },
    { id: "blog", name: "Blog", path: "/blog", handle: "blog" },

    { id: "Contact", name: "Contact Us", path: "/contact-us", handle: "About Us" },
    { id: "speciman-request", name: "Specimen Request", path: "/specimen-request", handle: "speciman-request" },
    { id: "online-library", name: "Online Library", path: "/categories/online-library ", handle: "online-library" },
    { id: "Catelog-List", name: "Catelog List", path: "/catalogs", handle: "catelog-list" },
  ];
  // console.log('danda apki gand me',allCategories);

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  const { open, toggle, close, state } = useToggleState();

  return (
    <nav
      className={`bg-[#EA5900] text-white transition-all duration-300 ${sticky ? "fixed top-0 left-0 w-full shadow-lg z-50" : ""}`}
    >
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <LocalizedClientLink href="/">
            <div className="text-sm md:text-lg font-bold flex items-center ml-4">
              <img src="/logowhite.png" width={"50px"} />

            </div>
          </LocalizedClientLink>
          <div className="hidden lg:flex items-center space-x-4 relative">
            {allCategories.map((category) => (
              <LocalizedClientLink key={category.id} href={category.path}>
                <button
                  ref={category.handle === "categories" ? categoriesRef : null}
                  className={`px-2 text-[14px] font-semibold relative group ${category.path === window.location.pathname ? "underline" : ""
                    } max-[1163px]:text-[12px]`}
                  onMouseEnter={category.handle === "categories" ? handleMouseEnter : undefined}
                  onMouseLeave={category.handle === "categories" ? handleMouseLeave : undefined}
                >
                  {category.name}
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all group-hover:w-full"></span>
                </button>
              </LocalizedClientLink>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <PiMagnifyingGlassBold
              fontSize={"18px"}
              onClick={open}
              className="cursor-pointer lg:text-[24px]"
            />
            <button className="lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <RxHamburgerMenu fontSize={"20px"} className="lg:text-[28px]" />
            </button>
          </div>
        </div>
      </div>

      <Modal isOpen={state} close={close} search={true} size="large" takeFull>
        <Modal.Title>Search</Modal.Title>
        <Modal.Body>
          <SearchBar />
        </Modal.Body>
      </Modal>

      <MobileViewNav isVisible={isMobileMenuOpen} onClose={closeMobile} />

      <div
        ref={dropdownRef}
        className={`absolute ${sticky ? "top-[50px]" : "top-[110px]"} left-1/2 -translate-x-1/2 text-sm w-full h-auto content-container bg-white shadow-lg p-8 grid grid-cols-7 gap-6 z-50 transition-all duration-300 hidden ease-in-out transform lg:grid ${hovered ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {allCategories
          .find((category) => category.handle === "categories")
          ?.category_children?.map((item) => (
            <div key={item.id} className="flex flex-col">
              <LocalizedClientLink href={item.path}>
                <span className="text-gray-700 hover:text-orange-600 text-lg cursor-pointer font-bold border-b-2 border-orange-600">
                  {item.name}
                </span>
              </LocalizedClientLink>
              {item.category_children &&
                item.category_children.map((data) => (
                  <div className="mt-4" key={data.id}>
                    <LocalizedClientLink href={data.path} key={data.id}>
                      <span className="text-gray-700 hover:text-orange-600 cursor-pointer">
                        {data.name}
                      </span>
                    </LocalizedClientLink>
                  </div>
                ))}
            </div>
          ))}
      </div>
    </nav>
  );
};

export default Navbar;