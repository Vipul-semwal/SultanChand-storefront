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
import { FiFileText, FiDownload, FiCalendar } from 'react-icons/fi';

const PRODUCT_LIMIT = 12; // Better for grid layouts

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
  const [currentPdf, setCurrentPdf] = useState<{ url: string; title: string } | null>(null);

  const handleOpenPdf = (url: string, title: string) => {
    setCurrentPdf({ url, title });
    open();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isError) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-red-700 mb-4">Oops! Something went wrong</h3>
          <p className="text-gray-600 mb-6">
            We're having trouble loading the catalogs. Please try again later.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <GlobalHero 
        backgroundImage='/banner.jpg' 
        subtitle='Explore Our Latest Collections' 
        title='Product Catalogs' 
      />

      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Catalog Grid */}
        {isFetching ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 animate-pulse">
                <div className="bg-gray-200 h-48 w-full" />
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {data?.data?.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {data.data.map((pdf) => (
                  <div 
                    key={pdf.id} 
                    className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="relative">
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 h-48 flex items-center justify-center">
                        <div className="bg-white p-4 rounded-full shadow-lg">
                          <FiFileText className="h-16 w-16 text-blue-500" />
                        </div>
                      </div>
                      {/* <div className="absolute top-4 right-4 bg-white rounded-lg shadow-sm px-3 py-1 text-sm font-medium text-gray-700 flex items-center">
                        <FiCalendar className="mr-1" />
                        {formatDate(pdf.createdAt)}
                      </div> */}
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{pdf.title}</h3>
                      
                      <div className="flex justify-between items-center mt-8">
                        <button
                          onClick={() => handleOpenPdf(pdf.url, pdf.title)}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 flex items-center"
                        >
                          <FiFileText className="mr-2" />
                          Preview
                        </button>
                        
                        <a 
                          href={pdf.url} 
                          download
                          className="text-gray-600 hover:text-blue-600 font-medium py-2 px-3 rounded-lg transition duration-300 flex items-center"
                        >
                          <FiDownload className="mr-1" />
                          Download
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="mx-auto bg-gray-100 p-6 rounded-full w-24 h-24 flex items-center justify-center mb-6">
                  <FiFileText className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No Catalogs Available</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  We don't have any catalogs at the moment. Please check back later.
                </p>
              </div>
            )}
          </>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-16 flex justify-center">
            <PaginationComponent page={page} totalPages={totalPages} />
          </div>
        )}
      </div>

      {/* PDF Preview Modal */}
      <Modal 
  isOpen={state} 
  close={closeModal} 
  size="large"
  takeFull={true}
  // className="bg-white rounded-none shadow-none fixed inset-0"
>
  <div className="flex flex-col h-screen">
    {/* Modal Header */}
    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
      <Modal.Title >
        {currentPdf?.title}
      </Modal.Title>
      <div className="flex space-x-3">
        <a 
          href={currentPdf?.url || '#'} 
          download
          className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none transition-colors"
        >
          <FiDownload className="mr-2" />
          Download
        </a>
        <button
          onClick={closeModal}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
    
    {/* Modal Body - Takes full remaining height */}
    <Modal.Body >
      {currentPdf?.url ? (
        <div className="w-full h-full flex">
          <iframe
            src={currentPdf.url}
            className="w-full h-full"
            title="Catalog Preview"
            style={{ minHeight: 'calc(100vh - 64px)' }}
          />
        </div>
      ) : (
        <div className="h-full flex flex-col items-center justify-center py-16">
          <div className="bg-gray-100 p-6 rounded-full w-24 h-24 flex items-center justify-center mb-6">
            <FiFileText className="h-12 w-12 text-gray-400" />
          </div>
          <h4 className="text-xl font-medium text-gray-900 mb-2">Catalog Not Available</h4>
          <p className="text-gray-600 max-w-md text-center">
            The catalog you're trying to view is currently unavailable.
          </p>
        </div>  
      )}
    </Modal.Body>
  </div>
</Modal>
    </>
  );
}

export default Page;