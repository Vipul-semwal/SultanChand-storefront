"use client";
import React, { Suspense } from "react";
import { useQueryData } from "../../../lib/hooks/useQueryData";
import { GetBlogData } from "actions/cms/blog";
import { BlogResponse } from "../../../lib/types/blog";
import Post from "./post";
import Spinner from "@modules/common/icons/spinner"; 
import { Article } from "../../../lib/types/blog";

const BlogPost = ({ slug }: { slug: string }) => {
  console.log('arrr slug',slug)
  const { data, isPending, isError } = useQueryData<BlogResponse>(
    ["blog", slug],
    async () => {
      const response = await GetBlogData(slug);
      if (response.status === 200 && response.data) {
        console.log('yatiare hai:',response.data)
        return response.data;
      } else {
        throw new Error(response.message || "Error fetching blog data");
      }
    },
  );
  console.log('lets sgogogo',data?.data[0])

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner /> {/* Shows a spinner while data is being fetched */}
      </div>
    );
  }

  if (isError) {
    return <div className="text-center text-red-500">Error fetching the blog post.</div>;
  }

  const article:Article = data?.data[0] as unknown as Article;

  if (!article) {
    return <div className="text-center text-red-500">Error: Blog post data is missing.</div>;
  }

  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          <Spinner />
        </div>
      }
    >
      <Post data={article} />
    </Suspense>
  );
};

export default BlogPost;
