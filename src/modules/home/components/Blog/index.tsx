"use client";
import React, { Suspense } from "react";
import { Heading, Text } from "@medusajs/ui";
import { ArrowUpRightMini } from "@medusajs/icons";
import { useQueryData } from "@lib/hooks/useQueryData";
import { GetAllBlogs } from "actions/cms/blog";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { BlogListItem } from "@lib/types/blog";
import { getStrapiMedia } from "@lib/util/strapi";
import { formatDate } from "@lib/util/strapi";
import Spinner from "@modules/common/icons/spinner";

interface BlogPost {
  id: string;
  title: string;
  description: string;
  image: string;
  time: string;
}

const Blog: React.FC = () => {
  const { data, isFetching, isError } = useQueryData<BlogListItem[]>( 
    [`HomeBlogsPreview`], 
    async () => {
      const response = await GetAllBlogs({ pageSize: 3 });
      if (response.status === 200 && response.data) {
        return response.data;
      } else {
        throw new Error(response.message || "Error fetching blog data");
      }
    }
  );
  if (isError) {
    return <div>Error loading blog posts. Please try again later.</div>;
  }
  const BlogPost = data ? data.slice(0, 3) : [];

  return (
    <div className="content-container mx-auto p-5">
      <div className="mb-5 flex justify-between text-sm">
        <div className="text-[#EA5900] flex items-center pb-2 pr-2 border-b-2 border-[#EA5900] uppercase">
          <h2 className="font-semibold text-xs sm:text-sm inline-block">Latest Blogs</h2>
        </div>
        <LocalizedClientLink href={'/blog'} className="bg-[#EA5900] text-white px-3 py-2 rounded-sm flex items-center text-[15px] justify-center gap-2 hover:bg-[#EA5900] text-xs sm:text-sm transition-all duration-300 border-none outline-none">
          View More   
          <ArrowUpRightMini
            className="group-hover:rotate-45 ease-in-out duration-150"
            color="white"
          />
        </LocalizedClientLink>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-5">
        { BlogPost && BlogPost.map((post) => {
          const imgUrl = getStrapiMedia(post.thumbnail ?? "");
          return (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={imgUrl ?? ""}
                alt={post.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-sm sm:text-lg font-semibold">{post.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-2">{post.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <LocalizedClientLink href={`/blog/${post.slug}`} className="text-[#EA5900] text-sm cursor-pointer hover:underline">
                    Read More
                  </LocalizedClientLink>
                  <span className="text-sm text-gray-500">{formatDate(post.createdAt)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Wrapper with Suspense
const BlogWithSuspense: React.FC = () => (
  <Suspense fallback={<Spinner size="24" color="gray" />}>
    <Blog />
  </Suspense>
);

export default BlogWithSuspense;
