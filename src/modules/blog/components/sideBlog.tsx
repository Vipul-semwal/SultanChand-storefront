import { BlogListItem } from "@lib/types/blog";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { GetAllBlogs } from "actions/cms/blog";
import { useQueryData } from "@lib/hooks/useQueryData";
import { formatDate } from "@lib/util/strapi";
import { getStrapiMedia } from "@lib/util/strapi";



const SideBlog = () => {
     const { data, isFetching, isError } = useQueryData<BlogListItem[]>( 
        [`side blogs`], 
        async () => {
          const response = await GetAllBlogs({ pageSize: 5 });
          if (response.status === 200 && response.data) {
            return response.data;
          } else {
            throw new Error(response.message || "Error fetching blog data");
          }
        },
        true,
        { 
          queryKey: [`side blogs`],
          staleTime: 5 * 60 * 1000, 
          refetchOnWindowFocus: false,
          retry: 1,
        }
      );
    
      if (isFetching) {
        return <div>Loading...</div>;
      }
    
      if (isError) {
        return <div>Error loading blog posts. Please try again later.</div>;
      }

  return (
    <div className="lg:col-span-1">
      <div className="bg-white p-3 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 border-b-2 border-blue-950 pb-3 mb-6">
          Recent Posts
        </h3>
        {Array.isArray(data) && data.length > 0 ? (
          data.map((post) => (
          <LocalizedClientLink href={`/blog/${post.slug}`} key={post.slug}>
              <div key={post.id} className="mb-6 group">
              <div className="flex items-center gap-4 border-l-4 border-transparent group-hover:border-orange-500  transition-all">
                {/* Image */}
                <div className="flex-shrink-0 w-16 h-16">
                  <img
                    src={post.thumbnail ? getStrapiMedia(post.thumbnail) || "https://placehold.co/600x400" : "https://placehold.co/600x400"}
                    alt={post.title}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>

                {/* Post Text */}
                <div className="flex-1">
                  <h4 className="text-sm sm:text-base font-medium text-gray-800 leading-snug">
                    {post.title.split('\n').map((line, index) => (
                      <span key={index} className="block">{line}</span>
                    ))}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-500 mt-2">
                    {formatDate(post.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </LocalizedClientLink>
          ))
        ) : (
          <p className="text-gray-500">No recent posts available.</p>
        )}
      </div>
    </div>
  );
};

export default SideBlog;
