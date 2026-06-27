import { useAuth } from '../hooks/useAuth';
import { getAvatarForUser } from '../utils/avatars';

export default function ProfileFetch() {
  const { user } = useAuth();
  
  const username = user?.nickName.toLowerCase() || 'guest_user';
  const hostname = 'unahur-antisocial';

  const userId = user?.id || 0;
  
  const asciiArt = getAvatarForUser(userId);

  return (
    <div className="w-full border border-[#33ff00]/40 bg-[#33ff00]/5 p-4 sm:p-6 mb-8 font-mono flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start shadow-[0_0_15px_rgba(51,255,0,0.05)] transition-all hover:border-[#33ff00]/80">
      
      <pre className="text-xs sm:text-sm font-bold leading-tight text-[#33ff00] drop-shadow-[0_0_8px_rgba(51,255,0,0.6)] flex-none text-left">
        {asciiArt}
      </pre>

      <div className="flex-1 w-full text-sm sm:text-base">
        
        <div className="text-[#33ff00] font-bold text-lg">
          {username}<span className="opacity-70">@</span>{hostname}
        </div>
        
        <div className="opacity-50 mb-2">
          {'-'.repeat(username.length + hostname.length + 1)}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mt-3">
          
          <div className="flex items-center">
            <span className="font-bold w-24 opacity-90 text-[#33ff00]">OS:</span>
            <span className="opacity-80">Anti-Social_Net v1.0</span>
          </div>
          
          <div className="flex items-center">
            <span className="font-bold w-24 opacity-90 text-[#33ff00]">Host:</span>
            <span className="opacity-80">UHN_LOCAL_NODE</span>
          </div>
          
          <div className="flex items-center">
            <span className="font-bold w-24 opacity-90 text-[#33ff00]">Uptime:</span>
            <span className="opacity-80 flex items-center gap-2">
              14 days 
              <span className="text-[10px] opacity-40 uppercase border border-[#33ff00]/30 px-1">Reputación</span>
            </span>
          </div>
          
          <div className="flex items-center">
            <span className="font-bold w-24 opacity-90 text-[#33ff00]">Shell:</span>
            <span className="opacity-80 flex items-center gap-2">
              Zsh 
              <span className="text-[10px] opacity-40 uppercase border border-[#33ff00]/30 px-1">Lenguaje Fav</span>
            </span>
          </div>
          
          <div className="flex items-center">
            <span className="font-bold w-24 opacity-90 text-[#33ff00]">Entries:</span>
            <span className="opacity-80 flex items-center gap-2">
              45 
              <span className="text-[10px] opacity-40 uppercase border border-[#33ff00]/30 px-1">Posts</span>
            </span>
          </div>
          
          <div className="flex items-center">
            <span className="font-bold w-24 opacity-90 text-[#33ff00]">Conn:</span>
            <span className="opacity-80 flex items-center gap-2">
              1.2k 
              <span className="text-[10px] opacity-40 uppercase border border-[#33ff00]/30 px-1">Seguidores</span>
            </span>
          </div>
        </div>

        <div className="mt-5 flex gap-1">
          <div className="w-5 h-5 bg-black border border-[#33ff00]/50"></div>
          <div className="w-5 h-5 bg-[#115500]"></div>
          <div className="w-5 h-5 bg-[#22aa00]"></div>
          <div className="w-5 h-5 bg-[#33ff00]"></div>
          <div className="w-5 h-5 bg-[#88ff66]"></div>
          <div className="w-5 h-5 bg-white"></div>
        </div>
        
      </div>
    </div>
  );
}