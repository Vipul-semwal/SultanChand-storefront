"use client";

import React, { useState } from 'react';
import GlobalHero from '@modules/common/components/globalhero';
import Gallery from '@modules/gallery/components/gallery';
import ImgGrid from '@modules/gallery/components/imgGrid';
import Modal from '@modules/common/components/modal';
import { GetAllGalleries } from 'actions/cms/gallery';
import { useSearchParams } from 'next/navigation';
import { useQueryData } from '@lib/hooks/useQueryData';
import { GalleryResponse,pagination,GalleryListItem } from '@lib/types/gallery';
import { Pagination as PaginationComponent } from '@modules/store/components/pagination';
import useToggleState from '@lib/hooks/use-toggle-state';


function Page() {
   const searchParams = useSearchParams();
    const sort = searchParams.get('sort') ?? "createdAt:asc";
    const page = parseInt(searchParams.get('page') || '1');
    const PRODUCT_LIMIT = 10

   const { data, isFetching, isError } = useQueryData<{data:GalleryListItem[],meta:pagination}>( 
      [`gallerylist`, page ?? 1], 
      async () => {
        const response = await GetAllGalleries({ pageSize: PRODUCT_LIMIT, page, sort });
        if (response.status === 200 && response.data) {
          console.log('lelele',response)
          return {data:response.data,meta:response.meta};
        } else {
          throw new Error(response.message || "Error fetching blog data");
        }
      },
      true,  // enabling the query
      { 
        queryKey: [`gallerylist`, page ?? 1],
        staleTime: 5 * 60 * 1000, 
        refetchOnWindowFocus: false,
        retry: 1,
      }
    );
    const count = data?.meta.total ?? 1
    const totalPages = Math.ceil(count / PRODUCT_LIMIT)
  
    if (isError) {
      return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Oops! Something went wrong.
          </h2>
          <p className="text-gray-700 mb-4">
            We couldn't load the gallery posts. Please try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-md transition"
          >
            Retry
          </button>
        </div>
      );
    }
    


  const { state, open, close: closeModal } = useToggleState(false)
  const [currentGallerySelectd,SetcurrentGallerySelectd] = useState<string | null>(null)

  const handleToggleGridModal = (id:string) => {
    open()
    SetcurrentGallerySelectd(id);

  };


  return (
    <>
      <GlobalHero 
        backgroundImage='/banner.jpg' 
        subtitle='Capturing the stories behind every book' 
        title='Gallery' 
      />

      <Gallery onViewGridClick={handleToggleGridModal} galleryItems={data?.data ?? []} />
      <PaginationComponent  page={page} totalPages={totalPages}/>
      
      <Modal 
        isOpen={state} 
        close={closeModal}
        size="large"
        takeFull={true}
      >
        <Modal.Title>Image Gallery</Modal.Title>
        <Modal.Body >
          <div className="p-4 ">
            <ImgGrid galleryId={currentGallerySelectd}/>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Page;