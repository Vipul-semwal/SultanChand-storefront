'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'next/navigation';
import LocalizedClientLink from '@modules/common/components/localized-client-link';
import { BsChevronDown, BsChevronRight } from 'react-icons/bs';
import { RxCross2 } from 'react-icons/rx';
import { transformProductCategory, ProductCategoryTypes as ProductCategory } from '@lib/util/transformProductCategory';
import { useCategories } from '@lib/hooks/useCategory';

interface MobileViewNavProps {
  isVisible: boolean;
  onClose?: () => void;
}

const MobileViewNav: React.FC<MobileViewNavProps> = ({ isVisible, onClose }) => {
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});
  const { countryCode } = useParams() as { countryCode: string };
  const { data: productCategories } = useCategories();

  const allCategories: ProductCategory[] = [
    {
      id: 'categories',
      name: 'Categories',
      path: '#',
      handle: 'categories',
      category_children:
        productCategories?.filter((data) => !data.parent_category_id).map(transformProductCategory) || [],
    },
    { id: 'home', name: 'Home', path: '/', handle: 'home' },
    { id: 'store', name: 'Store', path: '/store', handle: '/store' },
    { id: 'account', name: 'Account', path: '/account', handle: '/account' },
    { id: 'cart', name: 'Cart', path: '/cart', handle: '/cart' },
    { id: 'contact', name: 'Contact Us', path: '/contact-us', handle: '/contact-us' },
    { id: 'about', name: 'About', path: '/about-us', handle: '/about-us' },
    { id: 'faq', name: 'FAQ', path: '/faq', handle: '/faq' },
    { id: 'blog', name: 'Blog', path: '/blog', handle: '/blog' },
    { id: 'gallery', name: 'Gallery', path: '/gallery', handle: '/gallery' }
  ];

  const handleToggleSubmenu = useCallback((id: string) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  const RecursiveCategory = ({ category }: { category: ProductCategory }) => (
    <div className="w-full border-b last:border-b-0">
      <button
        onClick={() => category.category_children && handleToggleSubmenu(category.id)}
        className="flex justify-between items-center w-full px-6 py-4 hover:bg-gray-50 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <BsChevronRight className="text-orange-600 text-sm" />
         <LocalizedClientLink href={category.path} onClick={onClose}>
         <span className="font-medium text-gray-700">{category.name}</span>
         </LocalizedClientLink>
        </div>
        {category.category_children && (
          <BsChevronDown
            className={`text-gray-400 transform transition-transform duration-300 ${
              openSubmenus[category.id] ? 'rotate-180' : ''
            }`}
          />
        )}
      </button>

      {openSubmenus[category.id] && category.category_children && (
        <div className="w-full bg-gray-50 space-y-2 pb-4">
          {category.category_children.map((child) => (
            <div key={child.id}>
              {child.category_children ? (
                <RecursiveCategory category={child} />
              ) : (
                <LocalizedClientLink href={child.path} onClick={onClose}>
                  <button className="flex items-center w-full text-gray-600 py-3 px-8 hover:text-orange-600 hover:pl-10 transition-all duration-300 border-l-4 border-transparent hover:border-orange-600">
                    <BsChevronRight className="text-orange-600 text-sm mr-3" />
                    {child.name}
                  </button>
                </LocalizedClientLink>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div
      className={`fixed inset-0 bg-white z-50 transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-x-0' : '-translate-x-full'
      } lg:hidden`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-bold text-black">Menu</h2>
        <button onClick={onClose} className='bg-black'>
          <RxCross2 fontSize={28} />
        </button>
      </div>
      <div className="overflow-y-auto h-[calc(100vh-4rem)]">
        {allCategories.map((category) => (
          <RecursiveCategory key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default MobileViewNav;
