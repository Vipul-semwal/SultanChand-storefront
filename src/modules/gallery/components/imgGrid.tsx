import React from 'react';
import useToggleState from '@lib/hooks/use-toggle-state';
import Modal from '@modules/common/components/modal';

function ImgGrid() {
  const [isModalOpen, openModal, closeModal] = useToggleState(false); // Using the custom hook
  const [selectedImage, setSelectedImage] = React.useState('');

  const handleImageClick = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    openModal(); // Open the modal when an image is clicked
  };

  return (
    <>
      <div className=" my-3">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="grid gap-4">
            <div>
              <img
                className="h-auto max-w-full rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
                src="https://cimg.acharyaprashant.org/images/img-b6f861b3-cdcb-449a-82e9-fd4ad4e9796d/40/image.jpg"
                alt="Image 1"
                onClick={() => handleImageClick('https://cimg.acharyaprashant.org/images/img-b6f861b3-cdcb-449a-82e9-fd4ad4e9796d/40/image.jpg')}
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg"
                alt="Image 2"
                onClick={() => handleImageClick('https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg')}
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg"
                alt="Image 3"
                onClick={() => handleImageClick('https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg')}
              />
            </div>
          </div>
          <div className="grid gap-4">
            <div>
              <img
                className="h-auto max-w-full rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg"
                alt="Image 4"
                onClick={() => handleImageClick('https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg')}
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg"
                alt="Image 5"
                onClick={() => handleImageClick('https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg')}
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg"
                alt="Image 6"
                onClick={() => handleImageClick('https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg')}
              />
            </div>
          </div>
          <div className="grid gap-4">
            <div>
              <img
                className="h-auto max-w-full rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg"
                alt="Image 7"
                onClick={() => handleImageClick('https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg')}
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg"
                alt="Image 8"
                onClick={() => handleImageClick('https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg')}
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg"
                alt="Image 9"
                onClick={() => handleImageClick('https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg')}
              />
            </div>
          </div>
          <div className="grid gap-4">
            <div>
              <img
                className="h-auto max-w-full rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg"
                alt="Image 10"
                onClick={() => handleImageClick('https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg')}
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg"
                alt="Image 11"
                onClick={() => handleImageClick('https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg')}
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg"
                alt="Image 12"
                onClick={() => handleImageClick('https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg')}
              />
            </div>
          </div>
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        close={closeModal}
        size="large"
        takeFull={true}
      >
        <Modal.Title>Quick view</Modal.Title>
        <Modal.Body >
          <div className="p-4 ">
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
