import Image from 'next/image';
import { useQueryData } from '../../../lib/hooks/useQueryData';
import { GetBlogData } from 'actions/cms/blog';
import { getStrapiMedia } from '@lib/util/strapi';
import { formatDate } from '@lib/util/strapi';
import { BlogResponse } from '@lib/types/blog';
import { Article } from '@lib/types/blog';
import { postRenderer } from './postRenderer';

export default function Post({ data }: { data: Article }) {
    // wip find author image url
    const { title, description, publishedAt, cover, author:authorsBio} = data;
    const author = authorsBio;
    const imageUrl = getStrapiMedia(cover?.url || "");
    console.log('snsnsnss',imageUrl)
    // const authorImgUrl = getStrapiMedia(authorsBio.data?.attributes.avatar.data.attributes.url);

    return (
        <article className="space-y-8 dark:bg-black dark:text-gray-50">
            {imageUrl && (
                <Image
                    src={imageUrl}
                    alt="article cover image"
                    width={400}
                    height={400}
                    className="w-full h-96 object-cover rounded-lg"
                    unoptimized
                    priority
                />
            )}
            <div className="space-y-6 px-3">
                <h1 className="leading-tight text-5xl font-bold ">{title}</h1>
                <div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center dark:text-gray-400">
                    <div className="flex items-center md:space-x-2">
                        {/* {authorImgUrl && (
                            <Image
                                src={authorImgUrl}
                                alt="article cover image"
                                width={400}
                                height={400}
                                className="w-14 h-14 border rounded-full dark:bg-gray-500 dark:border-gray-700"
                            />
                        )} */}
                        <p className="text-md dark:text-violet-400">
                            {author && author.name} • {formatDate(publishedAt)}
                        </p>
                    </div>
                </div>
            </div>

            <div className="dark:text-gray-100 text-center ">
                <p>{description} </p>


              <div className="px-10">
              {data.blocks && data.blocks.map((section: any, index: number) => postRenderer(section, index))}
              </div>
            </div>
        </article>
    );
}