import React from 'react';
import { Heading } from '@medusajs/ui';

interface Props {
  title: string;
}

const NewsAnnouncements : React.FC<Props> = ({ title }) => {
  return (
    <div className='mt-5 flex justify-center'>
      <Heading level='h2'>News & Announcement</Heading>
    </div>
  );
};

export default NewsAnnouncements ;
