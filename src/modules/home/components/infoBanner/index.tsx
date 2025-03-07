import React from 'react';
import { Heading, Text } from '@medusajs/ui';
import LocalizedClientLink from '@modules/common/components/localized-client-link';
interface Props {}

const InfoBanner: React.FC<Props> = () => {
  return (
    <div className="my-5 flex justify-center bg-blue-950 bg-[url('/banner.jpg')] bg-cover bg-center relative font-poppins">
      <div className="absolute top-0 left-0 w-full h-full bg-blue-950 opacity-75 z-10"></div>

      <div className="container py-8 flex justify-center flex-col items-center relative z-20">
        <div className="center">
          <h2
            
            className="text-white text-sm sm:text-xl md:text-2xl font-semibold border-b-2 border-orange-500 pb-1"
          >
            Get Published
          </h2>
        </div>

        <div className="published-content my-4 text-white">
          <p className="text-center px-4 text-sm sm:text-base md:text-lg">
            We accept editorial submissions on varied subjects including art, design, <br /> photography, architecture, fiction, non-fiction, children's subjects, cuisine, etc.
          </p>
        </div>

        <div className="published-link">
          <LocalizedClientLink href='/publish-with-us'>
               <button className="p-2 sm:p-2 px-2 bg-[#EA5900] text-white mt-2 font-medium text-xs sm:text-base rounded-sm hover:bg-[#c8672a] transition-all duration-500 ease-in-out">
            Get Published
          </button>
          </LocalizedClientLink>
       
        </div>
      </div>
    </div>
  );
};

export default InfoBanner;
