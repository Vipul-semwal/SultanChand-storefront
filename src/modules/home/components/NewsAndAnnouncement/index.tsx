"use client";

import React, { CSSProperties } from "react";
import { GetAllAdvertisements } from "actions/cms/runningad";
import { useQueryData } from "@lib/hooks/useQueryData";
import { Advertisement, AdvertisementPagination } from "../../../../lib/types/runningad";
import { Megaphone } from "lucide-react";

const NewsAnnouncements: React.FC = () => {
  const { data, isFetching, isError } = useQueryData<{
    data: Advertisement[];
    meta: AdvertisementPagination;
  }>(
    ["runningadd"],
    async () => {
      const response = await GetAllAdvertisements({ pageSize: 5 });
      if (response.status === 200 && response.data) {
        return {
          data: response.data,
          meta: response.meta as unknown as AdvertisementPagination,
        };
      } else {
        throw new Error(response.message || "Error fetching advertisement data");
      }
    },
    true,
    {
      queryKey: ["runningadd"],
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    }
  );

  // Duplicate single item 5 times for a better marquee experience
  const items = data?.data.length === 1 ? Array(5).fill(data.data[0]) : data?.data || [];

  const marqueeSpeed = items.length * 7; // Dynamic speed based on the number of items

  const marqueeStyle: CSSProperties = {
    animation: `marquee ${marqueeSpeed}s linear infinite`,
    display: "flex",
  };

  return (
    <div className="relative overflow-hidden bg-blue-950">
      <div className="relative flex items-center w-full h-12 border-b border-blue-700">
        <div className="flex items-center px-4 text-white bg-blue-800 z-10">
          <Megaphone className="w-5 h-5 mr-2 animate-bounce" />
          <span className="text-sm font-bold uppercase">Announcements</span>
        </div>

        {items.length > 0 ? (
          <div
            className="animate-marquee whitespace-nowrap flex items-center"
            style={marqueeStyle}
          >
            {items.map((link, index) => (
              <a
                key={index}
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm md:text-base font-semibold text-white hover:text-gray-200 transition-all duration-200 px-4"
                onMouseEnter={(e) => {
                  const target = e.currentTarget.closest<HTMLDivElement>(".animate-marquee");
                  if (target) target.style.animationPlayState = "paused";
                }}
                onMouseLeave={(e) => {
                  const target = e.currentTarget.closest<HTMLDivElement>(".animate-marquee");
                  if (target) target.style.animationPlayState = "running";
                }}
              >
                {link.text}
              </a>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-full text-white text-sm opacity-70">
            No announcements available.
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
};

export default NewsAnnouncements;
