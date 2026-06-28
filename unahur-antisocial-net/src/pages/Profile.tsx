import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { getPostsByUser } from '../services/posts';
import type { Post } from '../types';
import ProfileFetch from '../components/ProfileFetch';
import PostImagePreview from '../components/PostImagePreview';
import ThemeToggle from '../components/ThemeToggle';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    const fetchPosts = async () => {
      if (!user) return;
      try {
        const data = await getPostsByUser(user.id);
        setPosts(data.reverse());
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Error fetching local logs.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [user]);

  //ATAJOS DE TECLADO
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // bloquear atajos al escribir un post
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      
      if (e.key === '1') {
        navigate('/home');
      } else if (e.key === '2') {
        navigate('/profile');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-black text-[#33ff00] font-mono glow-text p-4 sm:p-8 max-w-4xl mx-auto selection:bg-[#33ff00] selection:text-black">
      
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 border-b-2 border-dashed border-[#33ff00]/50 pb-4">
        <div className="font-bold text-lg terminal-cursor break-all">~/users/{user?.nickName}/profile</div>
        
        <div className="flex gap-4">
          <button 
            onClick={() => navigate('/home')}
            className="btn-glitch hover:bg-[#33ff00] hover:text-black px-3 py-1 uppercase font-bold transition-colors border border-transparent hover:border-[#33ff00] cursor-pointer"
          >
            [1] cd ../home
          </button>


          <ThemeToggle />

          <button 
            onClick={handleLogout}
            className="hover:bg-red-500 hover:text-black text-red-500 border border-red-500 px-3 py-1 uppercase transition-colors text-sm font-bold cursor-pointer"
          >
            [X] LOGOUT
          </button>
        </div>
      </div>

      <ProfileFetch />

      <div className="mt-10">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <span className="opacity-70">$</span> ls -la ./logged_entries
        </h2>

        {loading ? (
          <div className="animate-pulse opacity-70">[*] SCANNING DIRECTORY...</div>
        ) : error ? (
          <div className="text-red-500 bg-red-500/10 p-4 border border-red-500">
            [ERROR]: {error}
          </div>
        ) : posts.length === 0 ? (
          <div className="opacity-50 italic">
            total 0<br/>
            drwxr-xr-x 2 {user?.nickName} uhn_group 4096 Jun 23 06:10 .<br/>
            drwxr-xr-x 3 root root 4096 Jun 23 06:10 ..<br/>
            (Directory is empty. No logs recorded yet.)
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <div 
                key={post.id} 
                className="border border-[#33ff00]/30 p-4 bg-[#33ff00]/5 transition-colors hover:border-[#33ff00]/70"
              >
                <div className="text-xs sm:text-sm opacity-60 mb-3 flex items-center justify-between border-b border-[#33ff00]/20 pb-2">
                  <span>
                    <span className="text-[#33ff00] font-bold">~</span> $ cat entry_{post.id}.log
                  </span>
                  <span>ID: {post.id}</span>
                </div>
                
                <p className="whitespace-pre-wrap leading-relaxed">
                  {post.description}
                </p>

                <PostImagePreview postId={post.id} />
                
                {(post.tags?.length || post.Tags?.length) ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {(post.tags || post.Tags || []).map((tag: string | number | { id: string | number; name: string }, idx: number) => {
                      const tagId = typeof tag === 'object' ? tag.id : tag || idx;
                      const tagName = typeof tag === 'object' ? tag.name : tag;
                      return (
                        <span key={tagId} className="text-xs border border-[#33ff00]/50 px-2 py-0.5 opacity-80 uppercase">
                          #{tagName}
                        </span>
                      );
                    })}
                  </div>
                ) : null}

                <div className="mt-4 pt-4 border-t border-dashed border-[#33ff00]/30 flex flex-wrap justify-end gap-3">
                  <button 
                    onClick={() => navigate(`/post/${post.id}`)}
                    className="btn-glitch font-bold border border-[#33ff00] px-4 py-1 text-sm bg-transparent text-[#33ff00] hover:bg-[#33ff00] hover:text-black transition-colors cursor-pointer"
                  >
                    INSPECT_FILE
                  </button>
                </div>
                
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}