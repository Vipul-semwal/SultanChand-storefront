import React from 'react';
import { Heading, Text } from '@medusajs/ui';

interface Props {}

const InfoBanner: React.FC<Props> = () => {
  return (
    <div className="my-5 flex justify-center bg-blue-800 bg-[url('/Banner-patti-obi-scaled.jpg')] bg-cover bg-center relative">
      <div className="absolute top-0 left-0 w-full h-full bg-blue-800 opacity-75 z-10"></div>

      <div className="container py-8 flex justify-center flex-col items-center relative z-20">
        <div className="center">
          <Heading level="h1" className="text-white text-[29px] font-bold border-b-2 border-white pb-1">
            Get Published
          </Heading>
        </div>

        <div className="published-content my-4 text-white">
          <Text className="text-center text-[18px]">
            We accept editorial submissions on varied subjects including, art, design, <br /> photography, architecture, fiction, non-fiction, children's subjects, cuisine etc.
          </Text>
        </div>

        <div className="published-link">
          <button className="get-published p-[10px] px-[25px] bg-white text-blue-800 mt-2 font-bold text-[16px] rounded-[20px] hover:bg-gray-200 transition-all duration-500 ease-in-out">
            Get Published
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoBanner;
