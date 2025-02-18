'use client';

import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { BsChevronDown, BsChevronRight } from "react-icons/bs";
import useToggleState from "@lib/hooks/use-toggle-state";
import Modal from "@modules/common/components/modal";
import SearchBar from "@modules/common/components/search";
import { transformProductCategory, ProductCategoryTypes as ProductCategory } from "@lib/util/transformProductCategory";
import { useCategories } from "@lib/hooks/useCategory";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const { countryCode } = useParams() as { countryCode: string };
  const [openSubmenuId, setOpenSubmenuId] = useState<string | null>(null);

  const { data: productCategories } = useCategories();

  const allCategories: ProductCategory[] = [
    {
      id: "categories",
      name: "Categories",
      path: "#",
      handle: "categories",
      category_children: productCategories
        ?.filter((data) => !data.parent_category_id)
        .map(transformProductCategory) || []
    },
    { id: "home", name: "Home", path: "/", handle: "home" },
    { id: "contact", name: "Contact Us", path: "/contact", handle: "contact" },
    { id: "blog", name: "Blog", path: "/blog", handle: "blog" },
    { id: "about", name: "About", path: "/about", handle: "about" },
    { id: "gallery", name: "Gallery", path: "/gallery", handle: "gallery" }
  ];

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { open, toggle, close, state } = useToggleState();

  return (
    <nav className={`bg-[#EA5900] text-white ${sticky ? "sticky top-0 shadow-lg z-50" : ""}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-lg md:text-xl font-bold">SultanChand & Sons</div>
          <div className="hidden lg:flex items-center space-x-8 relative">
            {allCategories.map((category) => (
              <LocalizedClientLink key={category.id} href={category.path}>
                <button className="px-3 py-2 text-sm font-medium hover:text-blue-950">
                  {category.name}
                </button>
              </LocalizedClientLink>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <PiMagnifyingGlassBold fontSize={"24px"} onClick={open} className="cursor-pointer" />
            <button className="lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <RxHamburgerMenu fontSize={"28px"} />
            </button>
          </div>
        </div>
      </div>

      <Modal isOpen={state} close={close} search={true} size="large">
        <Modal.Body>
          <SearchBar />
        </Modal.Body>
      </Modal>

      {/* Enhanced Mobile Menu */}
      <div className={`lg:hidden fixed inset-0 bg-white ${isMobileMenuOpen ? 'block' : 'hidden'} z-50`}>
        <div className="flex justify-between items-center p-4 border-b">
          <span className="text-gray-700 font-medium text-lg">Menu</span>
          <button 
            onClick={() => {
              setIsMobileMenuOpen(false);
              setOpenSubmenuId(null);
            }}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <RxCross2 fontSize={"24px"} className="text-gray-500 hover:text-orange-600" />
          </button>
        </div>
        
        <div className="flex flex-col h-[calc(100vh-80px)] overflow-y-auto pb-8">
          {allCategories.map((category) => (
            <div key={category.id} className="w-full border-b last:border-b-0">
              {category.category_children ? (
                <>
                  <button
                    onClick={() => setOpenSubmenuId(openSubmenuId === category.id ? null : category.id)}
                    className="flex justify-between items-center w-full px-6 py-4
                      hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <BsChevronRight className="text-orange-600 text-sm" />
                      <span className="font-medium text-gray-700">{category.name}</span>
                    </div>
                    <BsChevronDown className={`text-gray-400 transform transition-transform duration-300 
                      ${openSubmenuId === category.id ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {openSubmenuId === category.id && (
                    <div className="w-full bg-gray-50 space-y-2 pb-4">
                      {category.category_children.map((child) => (
                        <div key={child.id} className="relative group">
                          <LocalizedClientLink 
                            href={child.path} 
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setOpenSubmenuId(null);
                            }}
                          >
                            <button className="flex items-center w-full text-gray-600 py-3 px-8 
                              hover:text-orange-600 hover:pl-10 transition-all duration-300
                              border-l-4 border-transparent hover:border-orange-600">
                              <BsChevronRight className="text-orange-600 text-sm mr-3" />
                              {child.name}
                              {child.category_children && (
                                <BsChevronDown className="ml-auto text-gray-400 text-sm" />
                              )}
                            </button>
                          </LocalizedClientLink>

                          {child.category_children && (
                            <div className="pl-8 space-y-2">
                              {child.category_children.map((subChild) => (
                                <LocalizedClientLink key={subChild.id} href={subChild.path}>
                                  <button className="flex items-center w-full text-gray-500 py-2 px-8 
                                    hover:text-orange-600 hover:pl-12 transition-all duration-300
                                    border-l-4 border-transparent hover:border-orange-400">
                                    <BsChevronRight className="text-orange-400 text-xs mr-3" />
                                    {subChild.name}
                                  </button>
                                </LocalizedClientLink>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <LocalizedClientLink href={category.path} onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="flex items-center w-full px-6 py-4
                    hover:bg-gray-50 transition-colors text-left">
                    <BsChevronRight className="text-orange-600 text-sm mr-3" />
                    <span className="font-medium text-gray-700">{category.name}</span>
                  </button>
                </LocalizedClientLink>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;