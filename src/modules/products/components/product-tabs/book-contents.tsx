import React, { useState } from 'react';
import { useQueryData } from '@lib/hooks/useQueryData';
import { sdk } from '@lib/config';
import { ProductResponse } from './type';

type Props = {
  product_id: string;
};

function BookContents({ product_id }: Props) {
  const [expanded, setExpanded] = useState(false);

  // Fetch Book Content
  const fetchBookContent = () => {
    return sdk.client.fetch<ProductResponse>(`/store/book-contents/${product_id}`, {
      method: 'GET',
    });
  };

  const { data, isFetching } = useQueryData<ProductResponse>(
    ['book_contents', product_id],
    fetchBookContent,
    true,
    {
      queryKey: ['book_contents', product_id],
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    }
  );

  // Extract Content (Ensure it exists)
  const content = data?.data[0]?.book_content?.content || '<p>No content available</p>';
  console.log('bhengibeta:', data?.data[0]);

  return (
    <div className="p-6 border rounded-lg shadow-md bg-white mt-4 w-full  mx-auto">
      <h2 className="text-2xl font-bold mb-4">Book Contents</h2>

      {isFetching ? (
        <p className="text-base">Loading...</p>
      ) : (
        <div className="prose max-w-full text-base relative">
          {/* Bullet Points Styling */}
          <style>
            {`
              .prose ul {
                list-style-type: disc;
                padding-left: 1.5rem;
                margin-top: 0.5rem;
              }
              .prose li {
                margin-bottom: 0.5rem;
              }
              .content-container {
                transition: max-height 0.3s ease-in-out;
                overflow: hidden;
              }
            `}
          </style>

          <div
            className={`content-container ${expanded ? 'max-h-full' : 'max-h-48'} overflow-hidden`}
            dangerouslySetInnerHTML={{ __html: content }}
          />

          {/* Read More / Read Less Button */}
          <div className="mt-3 text-right">
            <button
              className="text-blue-600 font-semibold hover:underline"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? 'Read Less' : 'Read More'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookContents;
