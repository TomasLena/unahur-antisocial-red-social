import { useState, useEffect, useCallback} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { getPosts } from '../services/posts';
import { getAllUsers } from '../services/users';
import type { Post } from '../types';
import NewPostModal from '../components/NewPostModal';
import PostImagePreview from '../components/PostImagePreview';
import TerminalAlert from '../components/TerminalAlert';
import AuthorsTerminal from '../components/AuthorsTerminal';
import ThemeToggle from '../components/ThemeToggle';
import ConfirmModal from '../components/ConfirmModal'; 
import { useSound } from '../hooks/useSound';

export default function Home() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { playBip } = useSound();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  
  const [activeTab] = useState('home');
  const [posts, setPosts] = useState<Post[]>([]);
  const [usersMap, setUsersMap] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isAuthorsOpen, setIsAuthorsOpen] = useState(false);
  
  const [alert, setAlert] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
  const [isWidgetHovered, setIsWidgetHovered] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchFeed = useCallback(async () => {
    try {
      const [fetchedPosts, fetchedUsers] = await Promise.all([
        getPosts(),
        getAllUsers()
      ]);

      const map: Record<string, string> = {};
      fetchedUsers.forEach(u => {
        map[String(u.id)] = u.nickName;
      });
      setUsersMap(map);

      const randomPosts = [...fetchedPosts];
      for (let i = randomPosts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [randomPosts[i], randomPosts[j]] = [randomPosts[j], randomPosts[i]];
      }

      setPosts(randomPosts);
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

  const handleLogoutConfirm = () => {
    playBip(); 
    logout();
    navigate('/login');
    setIsLogoutModalOpen(false);
  };

  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 3);
      setLoadingMore(false);
    }, 2500);
  };

  return (
    <div className="flex flex-col min-h-screen glow-text bg-black text-[#33ff00] selection:bg-[#33ff00] selection:text-black font-mono relative">
      
      <ConfirmModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogoutConfirm}
        title=" > ERROR [LOG]: ¿END_TRANSMISSION?"
      />

      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%)] bg-size-[100%_4px]"/>

      <div className="relative z-20 flex flex-col min-h-screen w-full">
        
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
            <ThemeToggle />
            <button 
              onClick={() => setIsLogoutModalOpen(true)}
              className="hover:bg-red-500 hover:text-black text-red-500 border border-red-500 px-3 py-1 uppercase transition-colors text-sm font-bold cursor-pointer"
            >
              [X] LOGOUT
            </button>
          </div>
        </nav>

        <div className="bg-[#33ff00]/10 border-b border-[#33ff00]/50 p-2 px-6 text-sm uppercase flex items-center gap-2 backdrop-blur-xs">
            <span className="opacity-70">PS C:\\UHN_NET\\</span>
            <span className="blinking-cursor font-bold text-[#33ff00]">home.exe</span>
        </div>

        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
          <div className="border-2 border-dashed border-[#33ff00] p-6 mb-10 bg-black/90 shadow-[0_0_10px_rgba(51,255,0,0.05)] backdrop-blur-xs">
            <h1 className="text-xl sm:text-2xl font-bold uppercase mb-2">&gt; READ_FEED.sh</h1>
            <p className="opacity-70 text-sm sm:text-base">
              Fetching global logs... <br/>
              Establishing secure connection... <span className="text-white font-bold">DONE.</span>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            <div className="flex flex-col gap-8 lg:col-span-2 order-2 lg:order-1">
              {loading ? (
                <div className="animate-pulse opacity-70 border border-[#33ff00]/30 p-6 text-center bg-black/80">
                  [*] DOWNLOADING GLOBAL REGISTRY...
                </div>
              ) : posts.length === 0 ? (
                <div className="opacity-50 italic border border-[#33ff00]/30 p-6 text-center bg-black/80">
                  (Empty directory. No logs found in the server.)
                </div>
              ) : (
                <>
                  {posts.slice(0, visibleCount).map((post) => (
                    <article key={post.id} className="border-2 border-[#33ff00] bg-black/95 hover:bg-[#33ff00]/5 transition-colors relative group backdrop-blur-xs shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
                      <div className="absolute -top-3 left-4 bg-black px-2 text-xs opacity-70 border border-dashed border-[#33ff00]/30 text-[#33ff00]">
                        +---+ FILE_REF_{post.id} +---+
                      </div>

                      <div className="p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 border-b border-dashed border-[#33ff00]/50 pb-3 gap-2">
                          <span className="font-bold uppercase tracking-wide text-lg">
                            &gt; USER: @{(
                              post.User?.nickName || 
                              usersMap[String(post.userId)] || 
                              usersMap[String(post.UserId)] || 
                              'unknown_node'
                            ).toUpperCase()}
                          </span>
                          
                          <span className="text-sm opacity-70">
                            [SYS_DATE_UNDEFINED]
                          </span>
                        </div>

                        <pre className="text-base whitespace-pre-wrap leading-relaxed font-mono mb-6 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,1)]">
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
                            className="font-bold border-2 border-[#33ff00] px-4 py-2 bg-black text-[#33ff00] hover:bg-[#33ff00] hover:text-black transition-colors cursor-pointer"
                          >
                            READ_MORE
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}

                  {posts.length > visibleCount && (
                    <button
                      onClick={handleLoadMore}
                      disabled={loadingMore}
                      className="w-full text-center border-2 border-dashed border-[#33ff00] bg-black text-[#33ff00] hover:bg-[#33ff00] hover:text-black py-4 font-bold transition-all uppercase tracking-widest cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(51,255,0,0.05)] text-sm sm:text-base outline-none"
                    >
                      {loadingMore ? (
                        <span className="animate-pulse">
                          [&gt;&gt;&gt;] EXECUTING: LOAD_MORE_DATA.bat ... FETCHING_NODES
                        </span>
                      ) : (
                        <span>
                          &gt;&gt;&gt; RUN: LOAD_MORE_DATA.bat (FETCH NEXT REGISTRIES)
                        </span>
                      )}
                    </button>
                  )}
                </>
              )}
            </div>

            <aside className="lg:sticky top-24 flex flex-col gap-6 order-1 lg:order-2">
              <div 
                onMouseEnter={() => setIsWidgetHovered(true)}
                onMouseLeave={() => setIsWidgetHovered(false)}
                className={`border-2 border-[#33ff00] bg-black/95 p-5 relative backdrop-blur-xs shadow-[0_4px_20px_rgba(0,0,0,0.8)] transition-all duration-300 ${
                  isWidgetHovered ? 'opacity-100' : 'animate-[pulse_2s_infinite]'
                }`}
                style={{ 
                  boxShadow: isWidgetHovered ? '0 0 35px rgba(51, 255, 0, 0.45)' : '0 0 25px rgba(51, 255, 0, 0.3)' 
                }}
              >
              
                <div className="absolute -top-3 left-4 bg-black px-2 text-xs border border-dashed border-[#33ff00]/50 text-[#33ff00] font-bold">
                  :: FEATURED_NODE ::
                </div>

                <div className="border-b border-dashed border-[#33ff00]/40 pb-2 mb-4 flex justify-between text-xs opacity-70">
                  <span>STATUS: TARGET_ACQUIRED</span>
                  
                  <span className="animate-pulse text-red-500 font-black tracking-widest uppercase drop-shadow-[0_0_10px_#ff0000]">
                    [¡ALERT_RECOMMENDED!]
                  </span>
                </div>

                {loading ? (
                  <div className="animate-pulse text-xs opacity-50 font-mono py-4">
                    [*] SCANNING FOR NODES...
                  </div>
                ) : posts.length === 0 ? (
                  <div className="text-xs opacity-50 italic font-mono py-4">
                    [NO_DATA_AVAILABLE]
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-sm font-bold uppercase text-white tracking-wide">
                      &gt; BROADCAST BY: @{(
                        posts[0].User?.nickName || 
                        usersMap[String(posts[0].userId)] || 
                        usersMap[String(posts[0].UserId)] || 
                        'unknown_node'
                      ).toUpperCase()}
                    </div>
                    
                    <p 
                      className={`text-sm leading-relaxed text-[#33ff00] font-mono bg-[#33ff00]/10 p-3 border-l-4 border-[#33ff00] max-h-48 overflow-y-auto whitespace-pre-wrap ${
                        isWidgetHovered ? 'opacity-100' : 'animate-[pulse_2.5s_infinite]'
                      }`}
                      style={{ textShadow: '0 0 6px rgba(51,255,0,0.8)' }}
                    >
                      {posts[0].description}
                    </p>

                    <div className="max-w-xs mx-auto border border-dashed border-[#33ff00]/30 p-1 bg-black">
                      <PostImagePreview postId={posts[0].id} />
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-dashed border-[#33ff00]/40 text-xs uppercase">
                      <span className="opacity-50">
                        NODE: #{posts[0].id}
                      </span>
                      <button 
                        onClick={() => navigate(`/post/${posts[0].id}`)} 
                        className="text-[11px] font-bold border-2 border-[#33ff00] bg-[#33ff00] text-black px-3 py-1 hover:bg-black hover:text-[#33ff00] transition-all cursor-pointer shadow-[0_0_15px_rgba(51,255,0,0.5)] uppercase tracking-wider"
                      >
                        INSPECT_NODE
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </aside>

          </div>
        </main>

        <footer className="border-t-2 border-[#33ff00] bg-[#33ff00] text-black font-bold p-2 px-6 flex justify-between text-xs sm:text-sm uppercase mt-auto z-40">
          <span>STATUS: ONLINE</span>
          <span className="hidden sm:inline">TERM: VT100</span>
          <span>MEM: OK</span>
        </footer>

      </div>
    </div>
  );
}