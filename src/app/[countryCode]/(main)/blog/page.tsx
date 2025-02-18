'use client';

import React, { Suspense } from "react";
import GlobalHero from "@modules/common/components/globalhero";
import { useQueryData } from "../../../../lib/hooks/useQueryData"; 
import { GetAllBlogs } from "../../../../actions/cms/blog"; 
import { BlogListItem,BlogPaginationTypes } from "@lib/types/blog";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { useSearchParams } from 'next/navigation';
import SideBlog from "@modules/blog/components/sideBlog";
import { formatDate } from "@lib/util/strapi";
import Spinner from "@modules/common/icons/spinner";
import { Pagination } from "@modules/store/components/pagination";

function BlogPage() {
  const searchParams = useSearchParams();
  const sort = searchParams.get('sort') ?? "createdAt:asc";
  const page = parseInt(searchParams.get('page') || '1');
  const PRODUCT_LIMIT = 10
  
  const { data, isFetching, isError } = useQueryData<{data:BlogListItem[],meta:BlogPaginationTypes}>( 
    [`blogList`, page ?? 1], 
    async () => {
      const response = await GetAllBlogs({ pageSize: PRODUCT_LIMIT, page, sort });
      if (response.status === 200 && response.data) {
        console.log('lelele',response)
        return {data:response.data,meta:response.meta};
      } else {
        throw new Error(response.message || "Error fetching blog data");
      }
    },
    true,  // enabling the query
    { 
      queryKey: [`blogList`, page ?? 1],
      staleTime: 5 * 60 * 1000, 
      refetchOnWindowFocus: false,
      retry: 1,
    }
  );

  const count = data?.meta.total ?? 1
  const totalPages = Math.ceil(count / PRODUCT_LIMIT)

  if (isError) {
    return <div>Error loading blog posts. Please try again later.</div>;
  }

  const blogPosts: BlogListItem[] = Array.isArray(data?.data) ? data.data : [];

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <GlobalHero backgroundImage="/banner.jpg" title="Blogs" subtitle="Explore our latest blogs" />

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-4 gap-10 relative">
        {/* Right Column (Blog Post List) */}
        <div className="lg:col-span-3">
          {/* Wrap the content inside Suspense for fallback */}
          <Suspense fallback={<Spinner size="32" color="currentColor" className="mx-auto mt-8" />}>
            {isFetching ? (
              <Spinner size="32" color="currentColor" className="mx-auto mt-8" />
            ) : (
              blogPosts.map((post: BlogListItem) => (
                <div key={post.id} className="flex flex-col mb-6 bg-white p-4 rounded-lg sm:flex-row gap-3 shadow-sm hover:shadow-md transition-all duration-300">
                  {/* Left Column: Thumbnail */}
                  <div className="flex-shrink-0 w-32 h-32 mr-6">
                    <img
                      src={post.thumbnail ? `http://localhost:1337${post.thumbnail}` : "/default-thumbnail.jpg"}
                      alt={post.title}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>

                  {/* Right Column: Content */}
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-800 hover:text-[#EA5900] transition-all duration-200">
                      {post.title}
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">{`Published: ${formatDate(post.createdAt)}`}</p>
                    <p className="text-gray-600 mt-2">{post.description}</p>
                    <LocalizedClientLink href={`/blog/${post.slug}`} className="text-zinc-600 text-sm bg--[#EA5900]500 p-1 rounded-md mt-8 hover:bg--[#EA5900]700 underline">
                      Read more
                    </LocalizedClientLink>
                  </div>
                </div>
              ))
            )}
              <Pagination page={page} totalPages={totalPages}/>
          </Suspense>
        </div>

        {/* Left Column (Recent Posts) */}
      <div className="lg:col-span-1 h-fit lg:sticky lg:top-24 lg:self-start">
      <SideBlog />
      </div>
      </div>
    </div>
  );
}

export default BlogPage;
