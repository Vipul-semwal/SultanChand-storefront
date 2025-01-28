import React from 'react'
import BlogPost from '@modules/blog/templates/Blog'
import { GetAllBlogs } from 'actions/cms/blog'
import { GetBlogData } from 'actions/cms/blog'
import { Article } from '@lib/types/blog'
import { getStrapiMedia } from '@lib/util/strapi'

export async function generateStaticParams() {
  const response = await GetAllBlogs({pageSize:1000});
  if (response.status !== 200 || !response.data) {
    return [];
  }

  return response.data.map((blog: { slug: string }) => ({
    slug: blog.slug,
  }));
}

// Dynamic Metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const response = await GetBlogData(params.slug);
  if (response.status !== 200 || !response.data) {
    return {
      title: "Blog Not Found",
      description: "The requested blog could not be found.",
    };
  }

  const article = (response.data as unknown as Article[])[0];
  const imgurl = getStrapiMedia(article.cover?.formats.thumbnail?.url ?? null)
  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      images: [
        {
          url:imgurl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
  };
}

async function Blog(props: {
  params: Promise<{ slug: string }> 
}) {
  const params = await props.params
  const {slug} = params
    // console.log('id',id)
  return (
    <BlogPost slug={params.slug}/>
  )
}

export default Blog