import React from 'react';
import { Heading } from '@medusajs/ui';

interface Props {
  
}

const Author : React.FC<Props> = () => {
  return (
    <div className='mt-5 flex justify-center'>
      <Heading level='h2' >Meet our Author</Heading>
    </div>
  );
};

export default Author ;
