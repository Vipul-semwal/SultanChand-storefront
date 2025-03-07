"use client";

import React, { useState } from 'react';
import GlobalHero from '@modules/common/components/globalhero';
import Modal from '@modules/common/components/modal';
import { useSearchParams } from 'next/navigation';
import { useQueryData } from '@lib/hooks/useQueryData';
import { Pagination as PaginationComponent } from '@modules/store/components/pagination';
import useToggleState from '@lib/hooks/use-toggle-state';
import { GetAllcatalogs } from 'actions/cms/catalog';
import { PdfSummary, Pagination as PaginationType } from '../../../../lib/types/catalogs';

const PRODUCT_LIMIT = 25;

function Page() {
  const searchParams = useSearchParams();
  const sort = searchParams.get('sort') ?? 'createdAt:asc';
  const page = parseInt(searchParams.get('page') || '1');

  const { data, isFetching, isError } = useQueryData<{ data: PdfSummary[], meta: PaginationType }>(
    ['catalogList', page ?? 1],
    async () => {
      const response = await GetAllcatalogs({ pageSize: PRODUCT_LIMIT, page, sort });
      if (response.status === 200 && response.data && response.meta) {
        return { data: response.data, meta: response.meta };
      } else {
        throw new Error(response.message || 'Error fetching catalog data');
      }
    },
    true,
    {
      queryKey: ['catalogList', page ?? 1],
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    }
  );

  const count = data?.meta?.total ?? 1;
  const totalPages = Math.ceil(count / PRODUCT_LIMIT);

  const { state, open, close: closeModal } = useToggleState(false);
  const [currentPdfUrl, setCurrentPdfUrl] = useState<string | null>(null);

  const handleOpenPdf = (url: string) => {
    setCurrentPdfUrl(url);
    open();
  };

  if (isError) {
    return <div className="text-red-600 text-center mt-10">Error loading catalogs. Please try again later.</div>;
  }

  return (
    <>
      <GlobalHero 
        backgroundImage='/banner.jpg' 
        subtitle='Explore Our Latest Catalogs' 
        title='Catalogs' 
      />

      <div className="max-w-4xl mx-auto p-6">
        {isFetching ? (
          <p className="text-center text-gray-600 animate-pulse">Loading catalogs...</p>
        ) : (
          <ul className="space-y-6">
            {data?.data?.map((pdf) => (
              <li key={pdf.id} className="group">
                <button
                  onClick={() => handleOpenPdf(pdf.url)}
                  className="text-xl font-semibold text-blue-600 hover:text-blue-800 transition duration-300 group-hover:shadow-lg group-hover:shadow-blue-400 group-hover:border group-hover:border-blue-300 p-3 rounded-lg"
                >
                  {pdf.title}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <PaginationComponent page={page} totalPages={totalPages} />

      <Modal isOpen={state} close={closeModal} size="large" takeFull={true}>
        <Modal.Title>Catalog Preview</Modal.Title>
        <Modal.Body>
          {currentPdfUrl ? (
            <iframe
              src={currentPdfUrl}
              className="w-full h-screen border-2 border-blue-400 rounded-lg shadow-xl"
              title="Catalog Preview"
            />
          ) : (
            <p className="text-center text-gray-600">No catalog to display.</p>   
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Page;
