import { useAuth } from '../hooks/useAuth';

export default function ProfileFetch() {
  const { user } = useAuth();
  
  const username = user?.nickName.toLowerCase() || 'guest_user';
  const hostname = 'unahur-antisocial';

  const profileImageUrl = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1ba9a23c-fbb4-4dff-8c67-3f0dbbb12f77/dbbjptx-6e952f9e-4151-4b97-90e6-71487948a81e.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiIvZi8xYmE5YTIzYy1mYmI0LTRkZmYtOGM2Ny0zZjBkYmJiMTJmNzcvZGJianB0eC02ZTk1MmY5ZS00MTUxLTRiOTctOTBlNi03MTQ4Nzk0OGE4MWUuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.ogMnby2QfRwL_YF3CLqAYTmkTnTotV-5MWg-3mUT094"; 

  return (
    <div className="w-full border border-[#33ff00]/40 bg-[#33ff00]/5 p-4 sm:p-6 mb-8 font-mono flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start shadow-[0_0_15px_rgba(51,255,0,0.05)] transition-all hover:border-[#33ff00]/80">
      
      <div className="flex-none w-32 h-32 sm:w-40 sm:h-40 relative group border border-[#33ff00]/30 p-1">
        
        <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#33ff00] z-10" />
        <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[#33ff00] z-10" />
        <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-[#33ff00] z-10" />
        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#33ff00] z-10" />
        
        <img 
          src={profileImageUrl}
          alt="Profile Avatar"

          className="w-full h-full object-cover opacity-90 transition-opacity group-hover:opacity-100 mix-blend-screen"
        />
        
        <div 
          className="absolute inset-0 bg-[linear-gradient(rgba(51,255,0,0)_0%,rgba(51,255,0,0.15)_50%,rgba(51,255,0,0)_100%)] opacity-20 pointer-events-none" 
        />
      </div>

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

        {/* cambiarlo en proxima update   */}
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