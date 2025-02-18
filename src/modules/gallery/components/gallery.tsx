import React from 'react'
import { Button } from '@medusajs/ui'
import { GalleryListItem } from '@lib/types/gallery';
import { getStrapiMedia } from '@lib/util/strapi';
interface GalleryProps {
    onViewGridClick: (id:string) => void;
    galleryItems:GalleryListItem[]
}
const Gallery = ({ onViewGridClick, galleryItems}: GalleryProps) => {


    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">All Events</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {galleryItems.map((item) => (
                    <div key={item.id} className="group relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="aspect-w-16 aspect-h-9">
                            <img
                                src={getStrapiMedia(item.thumbnailUrl) ?? ""}
                                alt={item.title}
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-semibold">{item.title}</h3>
                                <span className="text-sm bg-black/30 px-2 py-1 rounded">
                                  {item.date}
                                </span>
                            </div>
                            <p className="text-sm opacity-90">{item.description}</p>
                            <div className="mt-12 text-center">
                                <Button
                                    variant="primary"
                                    size="large"
                                    onClick={()=>{
                                        onViewGridClick(item.documentId)
                                    }}
                                    className="hover:bg-ui-bg-interactive-hover transition-colors"
                                >
                                    View Full Image Gallery
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gallery;