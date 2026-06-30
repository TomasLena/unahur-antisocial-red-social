import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { getPostById } from '../services/posts';
import { getCommentsByPostId, createComment } from '../services/comments';
// Importación corregida para que coincida con tu archivo:
import { getImagesByPostId } from '../services/postImages';
import type { Post, Comment, PostImage } from '../types';

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [images, setImages] = useState<PostImage[]>([]);
  
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPostData = useCallback(async () => {
    if (!id) return;
    try {
      const [fetchedPost, fetchedComments, fetchedImages] = await Promise.all([
        getPostById(id),
        getCommentsByPostId(id),
        getImagesByPostId(id) 
      ]);
      setPost(fetchedPost);
      setComments(fetchedComments);
      setImages(fetchedImages);
    } catch (err) {
      console.error("Error reading log file:", err);
      setError("FILE_NOT_FOUND: Unable to retrieve the specified log.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    const initFetch = async () => {
      await fetchPostData();
    };
    initFetch();
  }, [fetchPostData]);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user || !id) return;

    setIsSubmitting(true);
    try {
      await createComment({
        content: newComment.trim(),
        userId: user.id,
        postId: id
      });
      setNewComment('');
      await fetchPostData();
    } catch (err) {
      console.error("Error writing comment:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-[#33ff00] font-mono flex items-center justify-center">
        <div className="animate-pulse">[*] DECRYPTING FILE_{id}...</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-black text-[#33ff00] font-mono flex flex-col items-center justify-center gap-4">
        <div className="bg-red-500/20 text-red-500 border border-red-500 p-4">
          [!] {error || 'CRITICAL_ERROR: Post object is null'}
        </div>
        <button onClick={() => navigate('/home')} className="border border-[#33ff00] px-4 py-2 hover:bg-[#33ff00] hover:text-black">
          RETURN TO HOME
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-[#33ff00] font-mono glow-text p-4 sm:p-8 max-w-4xl mx-auto selection:bg-[#33ff00] selection:text-black">
      
      <div className="flex items-center justify-between mb-8 border-b-2 border-dashed border-[#33ff00]/50 pb-4">
        <div className="font-bold text-lg">&gt; cat logs/entry_{post.id}.txt</div>
        <button 
          onClick={() => navigate('/home')}
          className="hover:bg-[#33ff00] hover:text-black px-3 py-1 uppercase font-bold blinking-cursor transition-colors border border-transparent hover:border-[#33ff00] cursor-pointer"
        >
          cd ..
        </button>
      </div>

      {/* Contenido del Post */}
      <article className="border-2 border-[#33ff00] bg-[#33ff00]/5 p-6 mb-10 shadow-[0_0_15px_rgba(51,255,0,0.1)]">
        <div className="flex items-center justify-between border-b border-[#33ff00]/30 pb-4 mb-6">
          <span className="font-bold text-xl uppercase">
            AUTHOR: @{post.User?.nickName || post.userId || post.UserId || 'unknown'}
          </span>
        </div>
        
        <pre className="text-lg whitespace-pre-wrap leading-relaxed font-mono mb-8">
          {post.description}
        </pre>

        {/*SECCIÓN DE IMÁGENES*/}
        {images.length > 0 && (
          <div className="mb-8 space-y-4">
            <div className="text-xs opacity-60 uppercase mb-2">// [ATTACHED_VISUAL_DATA]:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {images.map((img) => (
                <div key={img.id} className="border border-[#33ff00] p-2 bg-black relative group">
                  <div className="absolute top-0 right-0 bg-[#33ff00] text-black text-[10px] px-1 font-bold uppercase">
                    IMG_REF_{img.id}
                  </div>
                  <img 
                    src={img.url} 
                    alt="Transmission attachment" 
                    className="w-full h-auto object-cover border border-[#33ff00]/30 filter grayscale sepia hue-rotate-90 saturate-[3] brightness-[0.8] contrast-[1.2]" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://via.placeholder.com/300x200.png?text=RENDER_ERROR";
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/*Etiquetas*/}
        {(post.tags?.length || post.Tags?.length) ? (
          <div className="flex flex-wrap gap-3">
            {(post.tags || post.Tags || []).map((tag: string | number | { id: string | number; name: string }) => {
              const tagId = typeof tag === 'object' ? tag.id : tag;
              const tagName = typeof tag === 'object' ? tag.name : tag;
              return (
                <span key={tagId} className="text-sm uppercase border border-[#33ff00] px-2 py-1 bg-black opacity-80">
                  #{tagName}
                </span>
              );
            })}
          </div>
        ) : null}
      </article>

      {/* Sección de Comentarios */}
      <section>
        <h2 className="text-xl font-bold mb-6 border-l-4 border-[#33ff00] pl-3">
          --- ATTACHED_COMMENTS [{comments.length}] ---
        </h2>

        {/* Lista de Comentarios */}
        <div className="space-y-4 mb-8">
          {comments.length === 0 ? (
            <div className="opacity-50 italic">No responses found for this entry.</div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="border border-[#33ff00]/30 p-4 hover:border-[#33ff00]/60 transition-colors">
                <div className="text-sm opacity-70 mb-2 font-bold flex justify-between">
                  <span>&gt; @{comment.User?.nickName || comment.userId || comment.UserId || 'anon_user'} replied:</span>
                  <span>[ID:{comment.id}]</span>
                </div>
                <p className="whitespace-pre-wrap">{comment.content}</p>
              </div>
            ))
          )}
        </div>

        <form onSubmit={handleAddComment} className="border-2 border-dashed border-[#33ff00]/50 p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-end">
          <div className="flex-1 w-full">
            <label className="block text-sm uppercase opacity-70 mb-2">&gt; APPEND_DATA (*):</label>
            <textarea 
              required
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              disabled={isSubmitting}
              className="w-full bg-transparent border-b-2 border-[#33ff00]/50 focus:border-[#33ff00] outline-none text-[#33ff00] p-2 resize-none h-12 placeholder:text-[#33ff00]/20"
              placeholder="Type your required response..."
            />
          </div>
          <button 
            type="submit" 
            disabled={isSubmitting || !newComment.trim()}
            className="border border-[#33ff00] px-6 py-2 uppercase font-bold hover:bg-[#33ff00] hover:text-black transition-colors cursor-pointer disabled:opacity-50 w-full sm:w-auto"
          >
            {isSubmitting ? 'SENDING...' : 'EXECUTE'}
          </button>
        </form>
      </section>

    </div>
  );
}