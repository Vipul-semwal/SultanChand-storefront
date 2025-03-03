import React from 'react';
import { useQueryData } from '@lib/hooks/useQueryData';
import { sdk } from '@lib/config';
import { ProductResponse } from './type';

type Props = {
  product_id: string;
};

function BookContents({ product_id }: Props) {
  // Fetch Book Content
  const fetchBookContent = () => {
    return sdk.client.fetch<ProductResponse>(`/store/book-contents/${product_id}`, {
      method: 'GET',
    });
  };

  const { data, isFetching } = useQueryData<ProductResponse>(['book_contents', product_id], fetchBookContent,true,{ 
    queryKey: ['book_contents', product_id],
    staleTime: 5 * 60 * 1000, 
    refetchOnWindowFocus: false,
    retry: 1,
  });

  // Extract Content (Ensure it exists)
  const content = data?.data[0]?.book_content?.content || '<p>No content available</p>';
  console.log('bhengibeta:',data?.data[0]  )

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white mt-4">
      <h2 className="text-xl font-bold mb-4">Book Contents</h2>

      {isFetching ? (
        <p>Loading...</p>
      ) : (
        <div className="prose max-w-full" dangerouslySetInnerHTML={{ __html: content }} />
      )}
    </div>
  );
}

export default BookContents;
