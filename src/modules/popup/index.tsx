"use client"
import React from 'react'
import Modal from '@modules/common/components/modal'
import { useQueryData } from '@lib/hooks/useQueryData'
import { ApiResponse,pagination,DataItem } from '@lib/types/popup'
import { GetAllPopups } from 'actions/cms/popup'
import { getStrapiMedia } from '@lib/util/strapi';
import { useState } from 'react'
import { useToggleState } from '@medusajs/ui'
import Spinner from '@modules/common/icons/spinner'

function popUpBanner() {
     const { data, isFetching, isError } = useQueryData<{data:DataItem[],meta:pagination}>( 
          [`popUpBanner`],
          async () => {
            const response = await GetAllPopups({ pageSize: 1 });
            if (response.status === 200 && response.data) {
            //   console.log('dataaa',response)
              return {data:response.data,meta:response.meta as unknown as pagination};
            } else {
              throw new Error(response.message || "Error fetching blog data");
            }
          },
          true,  // enabling the query
          { 
            queryKey: [`popup`,],
            staleTime: 5 * 60 * 1000, 
            refetchOnWindowFocus: false,
            retry: 1,
          }
        );
        const [isPopupVisible, setIsPopupVisible] = useState(true);
        // console.log('henj??',data?.data[0].popuBanner.url)
        const popup = data?.data[0]
        const { state, open, close: closeModal } = useToggleState(true)
  return (
   <>
  {isFetching?<Spinner/>:(
      <Modal 
      isOpen={state} 
      close={closeModal}
      size="large"
      nrml={true}
    >
      <Modal.Body >
        <div className="p-0 flex justify-center items-start">
        <a href={popup?.link} target="_blank" rel="noopener noreferrer">
            {popup && (
              <img
                src={getStrapiMedia(getStrapiMedia(popup.popuBanner.url)) as string ?? undefined}
                alt="Popup Banner"
                className="w-full h-auto rounded-lg"
              />
            )}
          </a>
        </div>
      </Modal.Body>
    </Modal>
  )}
   </>
  )
}

export default popUpBanner