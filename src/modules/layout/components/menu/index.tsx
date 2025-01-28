"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Modal from "@modules/common/components/modal";
import Input from "@modules/common/components/input";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { HttpTypes } from "@medusajs/types";
import { useQueryData } from "@lib/hooks/useQueryData";

interface SubCategory {
  id: number;
  name: string;
  subcategories?: SubCategory[];
}

interface Category {
  id: number;
  name: string;
  subcategories?: SubCategory[];
}

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<Record<number, boolean>>({});
  const [sticky, setSticky] = useState(false);
  const router = useRouter();
  const { countryCode } = useParams();

  const categories: Category[] = [
    { id: 1, name: "Home" },
    { id: 2, name: "Contact Us", subcategories: [{ id: 21, name: "J.K. Rowling" }] },
    { id: 4, name: "Online Library", subcategories: [{ id: 41, name: "J.K. Rowling" }] },
    { id: 5, name: "Publish With Us", subcategories: [{ id: 51, name: "J.K. Rowling" }] },
    { id: 6, name: "Blog", subcategories: [{ id: 61, name: "J.K. Rowling" }] },
    { id: 7, name: "About Us", subcategories: [{ id: 71, name: "J.K. Rowling" }] },
  ];

  const { data, isFetching, isError } = useQueryData<HttpTypes.StoreProductCategory[]>(
    ["categories"],
    () =>
      fetch(`/api/categories`).then((res) => {
        if (!res.ok) throw new Error("Failed to fetch categories");
        return res.json();
      })
  );

  const toggleDropdown = (id: number) => {
    setOpenDropdowns((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    const formattedQuery = searchQuery.trim().replace(/\s+/g, "%20");
    if (formattedQuery) {
      router.push(`/${countryCode}/store?q=${formattedQuery}`);
      setIsModalOpen(false);
      setSearchQuery("");
    }
  };

  const currentPath = router.pathname; // Get the current route

  const renderCategories = (categories: Category[] | SubCategory[]) => {
    return categories.map((category) => (
      <div key={category.id}>
        <button
          className={`w-full text-sm sm:text-base md:text-lg text-left px-4 py-2 hover:bg-gray-600 rounded-md flex justify-between items-center ${
            category.name === "Home" && currentPath === "/" ? "bg-gray-600 text-white" : ""
          }`}
          onClick={() => toggleDropdown(category.id)}
        >
          {category.name}
          {category.subcategories && (
            <svg
              className={`w-4 h-4 transform ${
                openDropdowns[category.id] ? "rotate-180" : ""
              } transition-transform`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          )}
        </button>
        {category.subcategories && openDropdowns[category.id] && (
          <div className="pl-4 mt-2 space-y-1">{renderCategories(category.subcategories)}</div>
        )}
      </div>
    ));
  };

  return (
    <nav
      className={`bg-blue-800 text-white ${
        sticky ? "fixed top-0 left-0 w-full z-50 shadow-lg" : ""
      }`}
    >
      <div className="content-container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="text-lg md:text-xl font-bold">
            SultanChand<span className="text-blue-100">&</span>Sons
          </div>

          <div className="hidden lg:flex items-center space-x-8">
            {categories.map((category) => (
              <Dropdown
                key={category.id}
                category={category}
                currentPath={currentPath}
              />
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button onClick={toggleModal} className="hover:text-gray-300">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M18.5 10.5a8 8 0 11-16 0 8 8 0 0116 0z"
                />
              </svg>
            </button>
            <button
              className="text-gray-400 hover:text-white focus:outline-none lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16m-7 6h7"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
        <Modal isOpen={isModalOpen} close={toggleModal} search={true}>
          <Modal.Title>Search</Modal.Title>
          <Modal.Description>
            <Input
              name="search"
              label="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Modal.Description>
          <Modal.Footer>
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-blue-800 text-white rounded-md"
            >
              Search
            </button>
          </Modal.Footer>
        </Modal>

        {isMobileMenuOpen && (
          <div className="lg:hidden mt-2">
            <div className="bg-gray-700 p-4 rounded-md space-y-2">
              {renderCategories(categories)}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const Dropdown: React.FC<{ category: Category; currentPath: string }> = ({
  category,
  currentPath,
}) => {
  const hasSubcategories = category.subcategories?.length || 0 > 0;

  return (
    <div className="group relative z-10">
      <button
        className={`text-sm sm:text-base flex items-center relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 group-hover:after:w-full focus:outline-none ${
          category.name === "Home" && currentPath === "/" ? "text-blue-100 font-semibold" : ""
        }`}
      >
        {category.name}
      </button>
      {hasSubcategories && (
        <div className="absolute left-0 top-full mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transform translate-y-2 transition-all duration-200">
          <ul className="py-2">
            {category.subcategories?.map((sub) => (
              <li key={sub.id}>
                <button className="w-full text-sm md:text-base px-4 py-2 text-left hover:bg-gray-100">
                  {sub.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
