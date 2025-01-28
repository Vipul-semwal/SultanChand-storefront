'use client';

import React, { useEffect, useState } from "react";
import GlobalHero from "@modules/common/components/globalhero";
import { useQueryData } from "../../../../../lib/hooks/useQueryData"; 
import {  GetAllBlogs } from "../../../../../actions/cms/blog"; 
import { BlogListItem } from "@lib/types/blog";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { useSearchParams } from 'next/navigation'

function BlogPage() {
  const searchParams = useSearchParams();
   const sort = searchParams.get('sort') ?? "createdAt:asc";
   const page = parseInt(searchParams.get('page') || '1');
   console.log('page',page)
     // if(!url){
     //   return <div>loding url</div>
     // }
   
     const { data, isFetching, isError } = useQueryData<BlogListItem[]>(
       [`blogList`, sort,page], 
      async () => {
            const response = await GetAllBlogs({pageSize:10,page,sort});
            if (response.status === 200 && response.data) {
              return response.data;
            } else {
              throw new Error(response.message || "Error fetching blog data");
            }
          }, 
     );
  // if(!url){
  //   return <div>loding url</div>
  // }

  console.log('TataAudiobooksBlogH',data)


  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading blog posts. Please try again later.</div>;
  }

  const blogPosts: BlogListItem[] = Array.isArray(data) ? data : []; // Ensure data is an array
  if (Array.isArray(blogPosts) && blogPosts.length > 0) {
    console.log('datam,anjaaj', blogPosts[0]);
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <GlobalHero backgroundImage="/banner.jpg" title="Blogs" subtitle="Explore our latest blogs" />

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Right Column (Blog Post List) */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post: any) => (
            <div
              key={post.id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img
                 src={post.thumbnail ? `http://localhost:1337${post.thumbnail}` : "/default-thumbnail.jpg"}
                alt={post.title}
                className="w-full h-56 object-cover rounded-lg mb-4"
              />
              <h2 className="text-2xl font-semibold text-gray-800 hover:text-blue-500 transition-all duration-200">
                {post.title}
              </h2>
              <p className="text-gray-500 text-sm mt-1">{`Published: ${post.publishedAt}`}</p>
              <p className="text-gray-600 mt-4">{post.description}</p>
              <LocalizedClientLink href={`/blog/${post.slug}`}>
                Read more
              </LocalizedClientLink>
            </div>
          ))}
        </div>

        {/* Left Column (Recent Posts) */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold bg-gradient-to-r from-blue-500 to-teal-400 text-white p-3 rounded-md mb-6">
              Recent Posts
            </h3>
            {Array.isArray(blogPosts) && blogPosts.slice(0, 3).map((post: any) => (
              <div key={post.id} className="mb-8">
                <h4 className="text-xl font-semibold text-gray-800 hover:text-blue-500 transition-all duration-200">
                  {post.title}
                </h4>
                <p className="text-sm text-gray-500 mt-1">{post.publishedAt}</p>
                <p className="text-gray-600 mt-2">{post.description}</p>
                <button className="mt-2 text-blue-600 hover:underline font-semibold transition-all duration-200">
                  Read More
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPage;
