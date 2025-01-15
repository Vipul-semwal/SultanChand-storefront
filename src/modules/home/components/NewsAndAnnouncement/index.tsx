import React from 'react';
import { Heading } from '@medusajs/ui';

interface Props {
  title: string;
}

const NewsAnnouncements: React.FC<Props> = ({ title }) => {
  return (
    <div className='mt-5 content-container flex justify-center'>
      <div id="block-5" className="widget widget_block widget_media_image">
        <figure className="wp-block-image rounded-lg  size-large">
          <img
            decoding="async"
            src="/AudiobooksWeb.jpg"
            
            className="wp-image-25970 rounded-lg "
          />
        </figure>
      </div>
    </div>
  );
};

export default NewsAnnouncements;
