import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { createPost } from '../services/posts';
import { createPostImage } from '../services/postImages';

import { getTags } from '../services/tags';
import type { Tag } from '../types';

interface NewPostModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function NewPostModal({ onClose, onSuccess }: NewPostModalProps) {
  const { user } = useAuth();
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [selectedTagIds, setSelectedTagIds] = useState<Array<string | number>>([]);


  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tags = await getTags();
        setAvailableTags(tags);
      } catch (err) {
        console.error("Error fetching tags:", err);
      }
    };
    fetchTags();
  }, []);

  
  const toggleTag = (id: string | number) => {
    setSelectedTagIds(prev => 
      prev.includes(id) 
        ? prev.filter(tagId => tagId !== id)
        : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    if (!description.trim() || !user) return;
    
    setIsSubmitting(true);
    setError(null);

    try {
      const newPost = await createPost({
        description: description.trim(),
        userId: user.id,
        tagIds: selectedTagIds
      });
      
      if (imageUrl.trim()) {
        try {
          await createPostImage({
            url: imageUrl.trim(),
            postId: newPost.id 
          });
        } catch (imgError) {
          console.error("Error attaching image:", imgError);
        }
      }
      
      onSuccess(); 
      onClose();   
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'FATAL: Failed to write file.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-black border-2 border-[#33ff00] p-6 w-full max-w-lg shadow-[0_0_20px_rgba(51,255,0,0.2)] relative">
        
        <div className="flex justify-between items-center mb-6 border-b border-dashed border-[#33ff00]/50 pb-2">
          <h2 className="text-xl font-bold uppercase blinking-cursor">
            &gt; NEW_TRANSMISSION
          </h2>
          <button 
            onClick={onClose}
            className="text-red-500 hover:bg-red-500 hover:text-black px-2 border border-transparent hover:border-red-500 transition-colors font-bold"
          >
            [X]
          </button>
        </div>

        {error && (
          <div className="mb-4 p-2 bg-red-500/10 border border-red-500 text-red-500 text-sm">
            [ERROR]: {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm opacity-70 mb-1 uppercase">_DATA_PAYLOAD</label>
            <textarea
              className="w-full bg-black border border-[#33ff00]/50 p-3 text-[#33ff00] focus:outline-none focus:border-[#33ff00] focus:shadow-[0_0_10px_rgba(51,255,0,0.2)] font-mono transition-all resize-none h-32"
              placeholder="Enter text sequence here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isSubmitting}
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm opacity-70 mb-1 uppercase">_ATTACH_IMG_URL (OPTIONAL)</label>
            <input
              type="text"
              className="w-full bg-black border border-[#33ff00]/50 p-2 text-[#33ff00] focus:outline-none focus:border-[#33ff00] font-mono text-sm"
              placeholder="https://..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          {availableTags.length > 0 && (
            <div>
              <label className="block text-sm opacity-70 mb-2 uppercase">_SELECT_MODULE_TAGS</label>
              <div className="flex flex-wrap gap-2">
                {availableTags.map(tag => (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => toggleTag(tag.id)}
                    disabled={isSubmitting}
                    className={`text-xs px-2 py-1 uppercase font-bold border transition-colors cursor-pointer ${
                      selectedTagIds.includes(tag.id)
                        ? 'bg-[#33ff00] text-black border-[#33ff00] shadow-[0_0_5px_#33ff00]' 
                        : 'bg-transparent text-[#33ff00] border-[#33ff00]/50 hover:border-[#33ff00]'
                    }`}
                  >
                    #{tag.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-end gap-4">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="px-4 py-2 border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-black transition-colors uppercase font-bold text-sm"
          >
            CANCEL
          </button>
          
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !description.trim()}
            className="px-6 py-2 bg-[#33ff00]/10 border border-[#33ff00] hover:bg-[#33ff00] hover:text-black transition-all uppercase font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'UPLOADING...' : 'TRANSMIT'}
          </button>
        </div>
      </div>
    </div>
  );
}