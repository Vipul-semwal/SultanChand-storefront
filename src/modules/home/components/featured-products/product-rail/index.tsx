"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { listProducts } from "@lib/data/products";
import { HttpTypes } from "@medusajs/types";
import InteractiveLink from "@modules/common/components/interactive-link";
import ProductPreview from "@modules/products/components/product-preview";
import { ArrowUpRightMini } from "@medusajs/icons";
import { useQueryData } from "@lib/hooks/useQueryData";``
import Spinner from "@modules/common/icons/spinner";

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

  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center h-48 text-gray-600">
        <Spinner className="w-6 h-6 animate-spin mb-2" />
        <p className="text-sm">Loading product preview...</p>
      </div>
    );
  }
  // if (isError || !pricedProducts?.length) return <p>No products found.</p>;

  return (
    <div className="content-container pb-9 small:pb-9 relative">
      <div className="flex justify-between mb-4">
        <h2 className="font-bold text-[#EA5900] border-b-2 border-[#EA5900] text-sm sm:text-lg md:text-xl lg:text-2xl">
          {collection.title}
        </h2>

        <InteractiveLink href={`/collections/${collection.handle}`}>
          <button
            style={{ fontFamily: "Poppins, sans-serif" }}
            className="bg-[#EA5900] text-white px-2 py-2 rounded-sm font-medium flex items-center text-xs sm:text-base md:text-lg lg:text-sm justify-center gap-1 hover:bg-[#EA5900] transition-all duration-300 border-none outline-none"
          >
            View More
            <ArrowUpRightMini className="group-hover:rotate-45 ease-in-out duration-150" color="white" />
          </button>
        </InteractiveLink>
      </div>

      {/* Left and Right Arrows */}
      <div className="absolute top-1/2 -left-0 sm:-left-4 z-10 transform -translate-y-1/2">
        <button
          ref={prevRef}
          className=" text-blue-950 p-2 text-6xl  sm:text-7xl "
        >
        &#8249;
        </button>
      </div>
      <div className="absolute top-1/2 -right-0 sm:-right-4 z-10 transform -translate-y-1/2">
        <button
          ref={nextRef}
          className=" text-blue-950 p-2 text-6xl  sm:text-7xl"
        >
          &#8250;
        </button>
      </div>

      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        slidesPerGroup={1}
        observer={true}
        observeParents={true}
        onBeforeInit={(swiper) => {
          if (prevRef.current && nextRef.current) {
            if (swiper.params.navigation && typeof swiper.params.navigation === "object") {
              swiper.params.navigation.prevEl = prevRef.current;
            }
            if (swiper.params.navigation && typeof swiper.params.navigation === "object") {
              swiper.params.navigation.nextEl = nextRef.current;
            }
            swiper.navigation.init();
            swiper.navigation.update();
          }
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[ Autoplay, Navigation]}
        breakpoints={{
          318: { slidesPerView: 2, slidesPerGroup: 1 },
          470: { slidesPerView: 3, slidesPerGroup: 1 },
          590: { slidesPerView: 4, slidesPerGroup: 1 },
          1024: { slidesPerView: 6, slidesPerGroup: 1 },
        }}
        className="mySwiper"
      >
        {pricedProducts?.map((product) => (
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
