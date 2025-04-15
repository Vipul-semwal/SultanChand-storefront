"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { FiFilter, FiX } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa";
import CategoryFilter from "../CategoryFilter";
import SortProducts, { SortOptions } from "./sort-products";
import AuthorFilter from "../authorFilter";

type RefinementListProps = {
  sortBy: SortOptions;
  search?: boolean;
  "data-testid"?: string;
  handle?: string;
};

const Accounting = [
  "Cost Accounting", "Cost Management and Accounting", "Financial Accounting", "Management Accounting",
];
const CommerceManagement = ["Commerce", "Economics", "Management"];

const ComputerIT = ["Computer", "Computer & Information Technology"];

const LawCategories = [
  "Law", "Banking Law", "Business Law", "Corporate Law", "Industrial Law", "Company Law"
];

const MathCategories = [
  "Mathematical Science", "Mathematical Sciences", "Mathematics", "Statistics"
];

const RefinementList = ({ sortBy, "data-testid": dataTestId, handle }: RefinementListProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const setQueryParams = (name: string, value: string) => {
    const query = createQueryString(name, value);
    router.push(`${pathname}?${query}`);
  };

  return (
    <div className="relative ">
      <button
        className=" flex items-center gap-2 text-white bg-orange-600 px-4 py-2 rounded-md "
        onClick={() => setIsFilterOpen(true)}
      >
        <FiFilter size={14} />
        <span className="text-xs">Filters</span>
      </button>

      {isFilterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white w-11/12 max-w-md p-6 rounded-lg shadow-lg relative">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              onClick={() => setIsFilterOpen(false)}
            >
              <FiX size={24} />
            </button>

            <h2 className="text-lg font-semibold mb-4">Filter Options</h2>

            {handle ? (
              <CategoryFilter
                handle={handle}
                child={<SortProducts sortBy={sortBy} setQueryParams={setQueryParams} data-testid={dataTestId} />}
              />
            ) : (
              <SortProducts sortBy={sortBy} setQueryParams={setQueryParams} data-testid={dataTestId} />
            )}

            <div className="mt-4">
              <AuthorFilter />
            </div>
          </div>
        </div>
      )}

       {/* Filter Button for Mobile */}
      {/* <div className="mb-4 hidden sm:block">
        <AuthorFilter />
      </div> */}
    </div>
  );
};

export default RefinementList;
