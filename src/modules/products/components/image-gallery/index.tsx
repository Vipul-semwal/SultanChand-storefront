"use client"
import { HttpTypes } from "@medusajs/types"
import { Container } from "@medusajs/ui"
import Image from "next/image"
import { useState } from "react"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  // State to manage the current main image
  const [mainImage, setMainImage] = useState(images[0]?.url);

  return (
    <div className="flex flex-col items-center w-full">
    {/* Main Image */}
    <div className="relative w-full max-w-[600px] h-[500px] mb-4 bg-ui-bg-subtle p-4 rounded-lg shadow-lg">
      <img
        src={mainImage}
        alt="Main product image"
        className="w-full h-full object-contain rounded-lg transition-all duration-300 ease-in-out"
      />
    </div>

    {/* Thumbnail Images */}
    <div className="flex gap-x-4 py-2 flex-wrap ">
  {images.map((image, index) => (
    <div
      key={image.id}
      className="relative min-w-[80px] w-[80px] h-[80px] cursor-pointer transition-all duration-300 ease-in-out hover:scale-110"
      onMouseEnter={() => setMainImage(image.url)}
    >
      <img
        src={image.url}
        alt={`Product thumbnail ${index + 1}`}
        className="w-full h-full object-contain rounded-lg shadow-lg transition-all duration-300 ease-in-out"
      />
    </div>
  ))}
</div>

  </div>
  );
};

export default ImageGallery
