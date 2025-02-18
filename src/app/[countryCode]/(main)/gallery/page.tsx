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
      return <div>Error loading blog posts. Please try again later.</div>;
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
        subtitle='There is all our gallery' 
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