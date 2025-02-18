import React from 'react';
import useToggleState from '@lib/hooks/use-toggle-state';
import Modal from '@modules/common/components/modal';
import { GetGalleryData } from 'actions/cms/gallery';
import { GalleryResponse, GalleryImage } from '@lib/types/gallery';
import Spinner from "@modules/common/icons/spinner"; 
import { useQueryData } from '@lib/hooks/useQueryData';
import { getStrapiMedia } from '@lib/util/strapi';

function ImgGrid({ galleryId }: { galleryId: string | null }) {
  const [isModalOpen, openModal, closeModal] = useToggleState(false);
  const [selectedImage, setSelectedImage] = React.useState('');

  if (!galleryId) {
    return null;
  }

  const { data, isPending, isError } = useQueryData<GalleryResponse>(
    ["galleryData", galleryId],
    async () => {
      const response = await GetGalleryData(galleryId);
      if (response.status === 200 && response.data) {
        return response.data;
      } else {
        throw new Error(response.message || "Error fetching gallery data");
      }
    },
    true
  );

  const images: GalleryImage[] = data?.data[0]?.galleryImages || [];

  const handleImageClick = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    openModal();
  };

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return <div className="text-center text-red-500">Error fetching the Images.</div>;
  }

  return (
    <>
      <div className="my-3">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image) => {
            const absoluteUrl = getStrapiMedia(image.url); // Convert relative URL to absolute
            return (
              <div key={image.id} className="grid gap-4">
                <img
                  className="h-auto max-w-full rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
                  src={absoluteUrl??""}
                  alt={image.alternativeText || 'Gallery Image'}
                  onClick={() => handleImageClick(absoluteUrl?? "")}
                />
              </div>
            );
          })}
        </div>
      </div>

      <Modal isOpen={isModalOpen} close={closeModal} size="large" takeFull={true}>
        <Modal.Title>Quick view</Modal.Title>
        <Modal.Body>
          <div className="p-4">
            <img
              className="max-w-full max-h-screen object-contain rounded-lg"
              src={selectedImage}
              alt="Selected"
            />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ImgGrid;
