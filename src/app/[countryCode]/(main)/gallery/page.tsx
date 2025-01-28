// app/gallery/page.tsx
"use client";

import React, { useState } from 'react';
import GlobalHero from '@modules/common/components/globalhero';
import Gallery from '@modules/gallery/components/gallery';
import ImgGrid from '@modules/gallery/components/imgGrid';
import Modal from '@modules/common/components/modal';

function Page() {
  const [isGridModalOpen, setGridModalOpen] = useState(false);

  const handleToggleGridModal = () => {
    setGridModalOpen(!isGridModalOpen);
  };

  return (
    <>
      <GlobalHero 
        backgroundImage='/banner.jpg' 
        subtitle='There is all our gallery' 
        title='Gallery' 
      />

      <Gallery onViewGridClick={handleToggleGridModal} />
      
      <Modal 
        isOpen={isGridModalOpen} 
        close={handleToggleGridModal}
        size="large"
        takeFull={true}
      >
        <Modal.Title>Image Gallery</Modal.Title>
        <Modal.Body >
          <div className="p-4 ">
            <ImgGrid />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Page;