import React from 'react';
import { Heading } from '@medusajs/ui';

interface Props {
}

const InfoBanner : React.FC<Props> = () => {
  return (
    <div className='mt-5 flex justify-center'>
      <Heading level='h2'>infoBanner</Heading>
    </div>
  );
};

export default InfoBanner ;
