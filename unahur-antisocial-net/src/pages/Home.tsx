import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { getPosts } from '../services/posts';
import { getAllUsers } from '../services/users';
import type { Post } from '../types';
import NewPostModal from '../components/NewPostModal';
import PostImagePreview from '../components/PostImagePreview';
import TerminalAlert from '../components/TerminalAlert';
import AuthorsTerminal from '../components/AuthorsTerminal';

export default function Home() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab] = useState('home');

  const [posts, setPosts] = useState<Post[]>([]);
  const [usersMap, setUsersMap] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isAuthorsOpen, setIsAuthorsOpen] = useState(false);
  
  const [alert, setAlert] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

  const fetchFeed = useCallback(async () => {
    try {
      const [fetchedPosts, fetchedUsers] = await Promise.all([
        getPosts(),
        getAllUsers()
      ]);

      const map: Record<string, string> = {};
      fetchedUsers.forEach(u => {
        map[u.id] = u.nickName;
      });
      setUsersMap(map);
      setPosts(fetchedPosts.reverse());
    } catch (error) {
      console.error("Error fetching logs:", error);
      setAlert({ message: 'FAILED TO FETCH GLOBAL REGISTRY', type: 'error' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const initFetch = async () => {
      await fetchFeed();
    };
    initFetch();
  }, [fetchFeed]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === '1') {
        navigate('/home');
      } else if (e.key === '2') {
        navigate('/profile');
      } else if (e.key === '3') {
        setIsPostModalOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex flex-col min-h-screen glow-text bg-black text-[#33ff00] selection:bg-[#33ff00] selection:text-black font-mono relative">
      
      {alert && (
        <TerminalAlert 
          message={alert.message} 
          type={alert.type} 
          onClose={() => setAlert(null)} 
        />
      )}

      {isPostModalOpen && (
        <NewPostModal 
          onClose={() => setIsPostModalOpen(false)} 
          onSuccess={() => {
            fetchFeed();
            setAlert({ message: 'TRANSMISSION COMPLETE.', type: 'success' });
          }} 
        />
      )}

      {isAuthorsOpen && (
        <AuthorsTerminal onClose={() => setIsAuthorsOpen(false)} />
      )}

      <nav className="border-b-2 border-[#33ff00] bg-black p-3 flex flex-col md:flex-row justify-between items-center gap-4 sticky top-0 z-40 shadow-[0_4px_15px_rgba(51,255,0,0.15)]">
        <div className="flex flex-wrap items-center gap-3">
          
          <button 
            onClick={() => setIsAuthorsOpen(true)}
            className="font-bold text-lg mr-4 bg-[#33ff00] hover:bg-white text-black px-3 py-1 uppercase tracking-widest transition-colors cursor-pointer outline-none"
            title="SYS_CREDITS"
          >
            UHN_OS
          </button>

          <button 
            onClick={() => navigate('/home')}
            className={`px-4 py-1 uppercase text-sm font-bold border transition-all cursor-pointer ${activeTab === 'home' ? 'bg-[#33ff00] text-black border-[#33ff00]' : 'border-transparent hover:border-dashed hover:border-[#33ff00]'}`}
          >
            [1] Feed
          </button>
          <button 
            onClick={() => navigate('/profile')}
            className="px-4 py-1 uppercase text-sm font-bold border border-transparent hover:border-dashed hover:border-[#33ff00] transition-all cursor-pointer"
          >
            [2] Profile
          </button>
          
          <button 
            onClick={() => setIsPostModalOpen(true)}
            className="px-4 py-1 uppercase text-sm font-bold border border-[#33ff00] hover:bg-[#33ff00] hover:text-black transition-all ml-2 cursor-pointer"
          >
            [3] Post
          </button>
        </div>

        <div className="flex items-center gap-4 border-l-2 border-dashed border-[#33ff00] pl-4">
          <span className="hidden sm:inline uppercase text-sm">
            USER: @{user?.nickName || 'guest'}
          </span>
          <button 
            onClick={handleLogout}
            className="hover:bg-red-500 hover:text-black text-red-500 border border-red-500 px-3 py-1 uppercase transition-colors text-sm font-bold cursor-pointer"
          >
            [X] LOGOUT
          </button>
        </div>
      </nav>

      <div className="bg-[#33ff00]/10 border-b border-[#33ff00]/50 p-2 px-6 text-sm uppercase flex items-center gap-2">
          <span className="opacity-70">PS C:\\UHN_NET\\</span>
          <span className="blinking-cursor font-bold text-[#33ff00]">home.exe</span>
      </div>

      <main className="flex-1 p-4 md:p-8 max-w-4xl mx-auto w-full">
        <div className="border-2 border-dashed border-[#33ff00] p-6 mb-10 bg-black shadow-[0_0_10px_rgba(51,255,0,0.05)]">
          <h1 className="text-xl sm:text-2xl font-bold uppercase mb-2">&gt; READ_FEED.sh</h1>
          <p className="opacity-70 text-sm sm:text-base">
            Fetching global logs... <br/>
            Establishing secure connection... <span className="text-white font-bold">DONE.</span>
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {loading ? (
            <div className="animate-pulse opacity-70 border border-[#33ff00]/30 p-6 text-center">
              [*] DOWNLOADING GLOBAL REGISTRY...
            </div>
          ) : posts.length === 0 ? (
            <div className="opacity-50 italic border border-[#33ff00]/30 p-6 text-center">
              (Empty directory. No logs found in the server.)
            </div>
          ) : (
            posts.map((post) => (
              <article key={post.id} className="border-2 border-[#33ff00] bg-black hover:bg-[#33ff00]/5 transition-colors relative group">
                <div className="absolute -top-3 left-4 bg-black px-2 text-xs opacity-70">
                  +---+ FILE_REF_{post.id} +---+
                </div>

                <div className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 border-b border-dashed border-[#33ff00]/50 pb-3 gap-2">
                    <span className="font-bold uppercase tracking-wide text-lg">
                      &gt; USER: @{usersMap[post.userId] || 'unknown_node'}
                    </span>
                    <span className="text-sm opacity-70">
                      [SYS_DATE_UNDEFINED]
                    </span>
                  </div>

                  <pre className="text-base whitespace-pre-wrap leading-relaxed font-mono mb-6">
                    {post.description}
                  </pre>

                  <PostImagePreview postId={post.id} /> 

                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-3 mb-6">
                      {post.tags.map((tag: string | number) => (
                        <span key={tag} className="text-sm uppercase border border-[#33ff00] px-2 py-1 text-[#33ff00] bg-[#33ff00]/10">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-dashed border-[#33ff00]/50 text-sm uppercase">
                    <span className="opacity-80">
                      [ NODE_ID: {post.id} ]
                    </span>
                    <button 
                      onClick={() => navigate(`/post/${post.id}`)} 
                      className="font-bold border-2 border-[#33ff00] px-4 py-2 bg-transparent text-[#33ff00] hover:bg-[#33ff00] hover:text-black transition-colors cursor-pointer"
                    >
                      READ_MORE
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </main>

      <footer className="border-t-2 border-[#33ff00] bg-[#33ff00] text-black font-bold p-2 px-6 flex justify-between text-xs sm:text-sm uppercase mt-auto">
        <span>STATUS: ONLINE</span>
        <span className="hidden sm:inline">TERM: VT100</span>
        <span>MEM: OK</span>
      </footer>
      
    </div>
  );
}