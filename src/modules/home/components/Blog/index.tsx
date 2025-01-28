"use client"
import React from "react";
import { useEffect,useState } from "react";
import { Heading, Text } from "@medusajs/ui";
import { ArrowUpRightMini } from "@medusajs/icons";
import { useQueryData } from "@lib/hooks/useQueryData";
import { GetAllBlogs } from "actions/cms/blog";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { BlogListItem } from "@lib/types/blog";
import { getStrapiMedia } from "@lib/util/strapi";
import { formatDate } from "@lib/util/strapi";
import { useSearchParams } from 'next/navigation'

interface BlogPost {
  id: string;
  title: string;
  description: string;
  image: string;
  time: string;
}

// const blogPosts: BlogPost[] = [
//   {
//     id: "1",
//     title: "Book Title 1",
//     description: "A short description of the book with some details.",
//     image: "https://cdn.penguin.co.in/wp-content/uploads/2024/11/TataAudiobooksBlogH.png",
//     time: "2 mins ago",
//   },
//   {
//     id: "2",
//     title: "Book Title 2",
//     description: "A short description of the book with some details.",
//     image: "https://cdn.penguin.co.in/wp-content/uploads/2024/11/LiberalHeartsBlogH.png",
//     time: "5 mins ago",
//   },
//   {
//     id: "3",
//     title: "Book Title 3",
//     description: "A short description of the book with some details.",
//     image: "https://cdn.penguin.co.in/wp-content/uploads/2024/11/DecKidsBlogH.png",
//     time: "10 mins ago",
//   },
// ];

const Blog: React.FC = () => {
  const searchParams = useSearchParams();
  const sort = searchParams.get('sort') ?? "createdAt:asc";
  const page = parseInt(searchParams.get('page') || '1');
    // if(!url){
    //   return <div>loding url</div>
    // }
  
    const { data, isFetching, isError } = useQueryData<BlogListItem[]>(
      [`blogList`, sort,page], 
     async () => {
           const response = await GetAllBlogs({pageSize:3});
           if (response.status === 200 && response.data) {
             return response.data;
           } else {
             throw new Error(response.message || "Error fetching blog data");
           }
         }, 
    );
    const BlogPost =data? data?.slice(0,3):[] 
    console.log('helelele',BlogPost)
  
    if (isFetching) {
      return <div>Loading...</div>;
    }
  
    if (isError) {
      return <div>Error loading blog posts. Please try again later.</div>;
    }
  return (
    <div className="content-container mx-auto p-5 sm:p-10 md:p-16">
      <div className="mb-5 flex justify-between text-sm">
        <div className="text-blue-800 flex items-center pb-2 pr-2 border-b-2 border-[#EC0000] uppercase">
          <Text className="font-semibold inline-block">Latest Blogs</Text>
        </div>
        <LocalizedClientLink href={'/blog/list'} className="bg-blue-800 text-white px-3 py-2 rounded-lg flex items-center text-[15px] justify-center gap-2 hover:bg-blue-800 transition-all duration-300 border-none outline-none">
        View More
          <ArrowUpRightMini
            className="group-hover:rotate-45 ease-in-out duration-150"
            color="white"
          />
        </LocalizedClientLink>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        { BlogPost && BlogPost.map((post) => {
          console.log(post.thumbnail)
          const imgUrl = getStrapiMedia(post.thumbnail?? "");
          return(
            <div
            key={post.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={imgUrl??""}
              alt={post.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{post.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <LocalizedClientLink href={`/blog/${post.slug}`} className="text-blue-800 cursor-pointer hover:underline">
                  Read More
                </LocalizedClientLink>
                <span className="text-sm text-gray-500">{formatDate(post.createdAt)}</span>
              </div>
            </div>
          </div>
          )
        })}
      </div>
    </div>
  );
};

export default Blog;
