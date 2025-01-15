import React from 'react';
import { Heading,Text } from '@medusajs/ui';
import { ArrowUpRightMini } from "@medusajs/icons"

interface Props {}

const Blog: React.FC<Props> = () => {
  return (
    <>
      <div className="content-container mx-auto p-5 sm:p-10 md:p-16">
        <div className=" mb-5 flex justify-between text-sm">
          <div className="text-[#EC0000] flex items-center pb-2 pr-2 border-b-2 border-[#EC0000] uppercase">
            
            <Text  className="font-semibold inline-block">Book Blog</Text>
          </div>
          <button className="bg-[#EC0000] text-white px-3 py-2 rounded-lg flex items-center text-[15px] justify-center gap-2 hover:bg-[#EC0000] transition-all duration-300 border-none outline-none">
              View More
              <ArrowUpRightMini
                className="group-hover:rotate-45 ease-in-out duration-150"
                color="white"
              />
            </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src="https://cdn.penguin.co.in/wp-content/uploads/2024/11/TataAudiobooksBlogH.png" alt="book 1" className="w-full h-56 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">Book Title 1</h3>
              <p className="text-sm text-gray-600 mt-2">A short description of the book with some details.</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-red-600">Read More</span>
                <span className="text-sm text-gray-500">2 mins ago</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src="https://cdn.penguin.co.in/wp-content/uploads/2024/11/LiberalHeartsBlogH.png" alt="book 2" className="w-full h-56 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">Book Title 2</h3>
              <p className="text-sm text-gray-600 mt-2">A short description of the book with some details.</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-red-600">Read More</span>
                <span className="text-sm text-gray-500">5 mins ago</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src="https://cdn.penguin.co.in/wp-content/uploads/2024/11/DecKidsBlogH.png" alt="book 3" className="w-full h-56 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">Book Title 3</h3>
              <p className="text-sm text-gray-600 mt-2">A short description of the book with some details.</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-red-600">Read More</span>
                <span className="text-sm text-gray-500">10 mins ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
