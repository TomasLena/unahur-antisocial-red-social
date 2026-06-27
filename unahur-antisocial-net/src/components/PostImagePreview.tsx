import { useState, useEffect } from 'react';
import { getImagesByPostId } from '../services/postImages';
import type { PostImage } from '../types';

interface Props {
  postId: string | number;
}

export default function PostImagePreview({ postId }: Props) {
  const [images, setImages] = useState<PostImage[]>([]);

  useEffect(() => {
    let isMounted = true; 
    
    const fetchImages = async () => {
      try {
        const data = await getImagesByPostId(postId);
        if (isMounted) setImages(data);
      } catch (error) {
        console.error(`Error scanning images for node ${postId}:`, error);
      }
    };

    fetchImages();

    return () => {
      isMounted = false;
    };
  }, [postId]);

  if (images.length === 0) return null;

  return (
    <div className="mt-4 mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {images.map((img) => (
        <div key={img.id} className="border border-[#33ff00]/50 p-1 bg-black relative group">
          <div className="absolute top-0 right-0 bg-[#33ff00]/80 text-black text-[9px] uppercase px-1 font-bold z-10">
            IMG_REF_{img.id}
          </div>
          <img 
            src={img.url} 
            alt="Attached visual data" 
            className="w-full h-48 object-cover filter grayscale sepia hue-rotate-90 saturate-[3] brightness-[0.8] contrast-[1.2] opacity-80 group-hover:opacity-100 transition-opacity"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://via.placeholder.com/300x150.png?text=RENDER_ERROR";
            }}
          />
        </div>
      ))}
    </div>
  );
}