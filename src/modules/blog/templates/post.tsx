import Image from 'next/image';
import { useQueryData } from '../../../lib/hooks/useQueryData';
import { GetBlogData } from 'actions/cms/blog';
import { getStrapiMedia } from '@lib/util/strapi';
import { formatDate } from '@lib/util/strapi';
import { BlogResponse } from '@lib/types/blog';
import { Article } from '@lib/types/blog';
import { postRenderer } from './postRenderer';
import SideBlog from '../components/sideBlog';

export default function Post({ data }: { data: Article }) {
    const { title, description, publishedAt, cover, author: authorsBio } = data;
    const author = authorsBio;
    const imageUrl = getStrapiMedia(cover?.url || "");

    return (
        <article className="space-y-8 dark:bg-black dark:text-gray-50">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Blog Content (8 Columns) */}
                <div className="lg:col-span-8 space-y-6 px-3">
                {imageUrl && (
                <Image
                    src={imageUrl}
                    alt="article cover image"
                    width={400}
                    height={400}
                    className="w-full h-96 object-cover "
                    unoptimized
                    priority
                />
            )}
                    <h1 className="leading-tight text-2xl mt-7 text-center sm:text-2xl md:text-5xl font-bold">
                        {title}
                    </h1>
                    <div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center dark:text-gray-400">
                        <div className="flex items-center justify-center m-auto ">
                            <p className="text-sm flex items-center justify-center sm:text-base md:text-sm dark:text-violet-400">
                                {author && author.name} • {formatDate(publishedAt)}
                            </p>
                        </div>
                    </div>

                    <div className="dark:text-gray-100 text-center">
                        <p className="text-sm sm:text-base md:text-lg">{description}</p>

                        <div className="px-10">
                            {data.blocks && data.blocks.map((section: any, index: number) => postRenderer(section, index))}
                        </div>
                    </div>
                </div>

                {/* SideBlog (4 Columns) */}
                <div className="lg:col-span-4">
                    <SideBlog  /> {/* Pass actual blog posts as needed */}
                </div>
            </div>
        </article>
    );
}
