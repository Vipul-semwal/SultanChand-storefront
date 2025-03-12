"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { listProducts } from "@lib/data/products";
import { HttpTypes } from "@medusajs/types";
import InteractiveLink from "@modules/common/components/interactive-link";
import ProductPreview from "@modules/products/components/product-preview";
import { ArrowUpRightMini } from "@medusajs/icons";
import { useQueryData } from "@lib/hooks/useQueryData";

export default function ProductRail({
  collection,
  region,
}: {
  collection: HttpTypes.StoreCollection;
  region: HttpTypes.StoreRegion;
}) {
  const fetchProducts = async () => {
    const {
      response: { products },
    } = await listProducts({
      regionId: region.id,
      queryParams: {
        collection_id: collection.id,
        fields: "*variants.calculated_price",
      },
    });
    return products;
  };

  const { data: pricedProducts, isPending, isError } = useQueryData(
    ["products", collection.id, region.id],
    fetchProducts
  );

  if (isPending) return <p>Loading products...</p>;
  if (isError || !pricedProducts?.length) return <p>No products found.</p>;

  return (
    <div className="content-container pb-9 small:pb-9">
      <div className="flex justify-between mb-4">
        <h2 className="font-bold text-[#EA5900] border-b-2 border-[#EA5900] text-sm sm:text-lg md:text-xl lg:text-2xl">
          {collection.title}
        </h2>

        <InteractiveLink href={`/collections/${collection.handle}`}>
          <button
            style={{ fontFamily: 'Poppins, sans-serif' }}
            className="bg-[#EA5900] text-white px-2 py-2 rounded-sm font-medium flex items-center text-xs sm:text-base md:text-lg lg:text-sm justify-center gap-1 hover:bg-[#EA5900] transition-all duration-300 border-none outline-none"
          >
            View More
            <ArrowUpRightMini className="group-hover:rotate-45 ease-in-out duration-150" color="white" />
          </button>
        </InteractiveLink>
      </div>

      <Swiper
  spaceBetween={30}
  slidesPerView={1}
  pagination={{
    clickable: true,
    el: ".custom-pagination", // Custom pagination element
  }}
  autoplay={{ delay: 3000, disableOnInteraction: false }}
  modules={[Pagination, Autoplay]}
  breakpoints={{
    318: { slidesPerView: 2 },
    470: { slidesPerView: 3 },
    590: { slidesPerView: 4 },
    1024: { slidesPerView: 6 },

  }}
  className="mySwiper"
>
  {pricedProducts.map((product) => (
    <SwiperSlide key={product.id}>
      <div className="max-w-[200px] mx-auto">
        <ProductPreview product={product} region={region} isFeatured />
      </div>
    </SwiperSlide>
  ))}
</Swiper>
    </div>
  );
}
