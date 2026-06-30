import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [nickName, setNickName] = useState('');
  const [password, setPassword] = useState('');
  
  const [localError, setLocalError] = useState<string | null>(null);
  const [isBooting, setIsBooting] = useState(false);
  const [bootLogs, setBootLogs] = useState<string[]>([]);
  const [isBootComplete, setIsBootComplete] = useState(false);

  const { login, register, error, clearError } = useAuth();
  const navigate = useNavigate();
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isBooting) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const katakana = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1023456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const alphabet = katakana.split("");

    const fontSize = 14;
    const columns = canvas.width / fontSize;

    const rainDrops: number[] = [];
    for (let x = 0; x < columns; x++) {
      rainDrops[x] = Math.random() * -100;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'rgba(51, 255, 0, 0.45)'; 
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet[Math.floor(Math.random() * alphabet.length)];
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    let lastTime = 0;
    const fps = 30;
    const interval = 1000 / fps;

    const animate = (timestamp: number) => {
      if (!lastTime) lastTime = timestamp;
      const elapsed = timestamp - lastTime;

      if (elapsed > interval) {
        draw();
        lastTime = timestamp - (elapsed % interval);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isBooting]);

  useEffect(() => {
    if (!isBooting) return;

    let isMounted = true;
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const runBootSequence = async () => {
      setBootLogs([]);
      setIsBootComplete(false);
      const currentLogs: string[] = [];

      const addLog = (text: string) => {
        if (!isMounted) return;
        currentLogs.push(text);
        setBootLogs([...currentLogs]);
      };

      const updateLastLog = (text: string) => {
        if (!isMounted) return;
        currentLogs[currentLogs.length - 1] = text;
        setBootLogs([...currentLogs]);
      };

      const username = nickName.trim();

      const initialSteps = [
        `> unahur-antisocial-net@2.0.0 login`,
        `> npm run auth --user="${username}"`,
        ``,
        `npm WARN config global \`--global\`, \`--local\` are deprecated.`,
        `npm info using node@v20.11.0`,
        `npm sill idealTree:user_profile fetch GET 200 https://registry.uhn.edu.ar/users/${username} 45ms`,
      ];

      for (const step of initialSteps) {
        addLog(step);
        await delay(200);
      }

      addLog(`[                    ] 0% reify:user_context: timing reifyNode`);
      await delay(400);
      updateLastLog(`[=====               ] 25% reify:user_context: sill reify`);
      await delay(600);
      updateLastLog(`[==========          ] 50% reify:user_context: action:extract`);
      await delay(900);
      updateLastLog(`[==============      ] 72% reify:user_context: sill link`);
      await delay(300);
      updateLastLog(`[====================] 100% reify:user_context: finalize`);
      await delay(500);

      const finalSteps = [
        `npm WARN deprecated sleep@latest: developers do not need sleep.`,
        ``,
        `found 0 vulnerabilities`,
        `npm ok`,
        ``
      ];

      for (const step of finalSteps) {
        addLog(step);
        await delay(150);
      }

      if (isMounted) {
        setIsBootComplete(true);
        setTimeout(() => {
          navigate('/home');
        }, 1000);
      }
    };

    runBootSequence();

    return () => { isMounted = false; };
  }, [isBooting, nickName, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setLocalError(null);
    
    const username = nickName.trim();

    if (!username || (isLogin && !password)) {
      setLocalError("VALIDATION_FAILED: Required authentication fields are missing.");
      return;
    }
    
    const success = isLogin 
      ? await login(username, password) 
      : await register(username);

    if (success) {
      setBootLogs([]);
      setIsBooting(true);
    }
  };

  const asciiArt = `
  _   _ _   _   _   _   _   _ _____  
 | | | | \\ | | / \\ | | | | | |  __ \\ 
 | | | |  \\| |/ _ \\| |_| | | | |__) |
 | |_| | . \` / ___ \\  _  | |_|  _  / 
  \\___/|_|\\_/_/   \\_\\_| |_|\\___/_| \\_\\
    ANTI-SOCIAL_NET v2.0 [SYS_BOOT]
  `;

  return (
    <div className="min-h-screen bg-black text-[#33ff00] font-mono glow-text selection:bg-[#33ff00] selection:text-black overflow-x-hidden relative">
      
      {!isBooting && (
        <canvas 
          ref={canvasRef} 
          className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
        />
      )}

      {!isBooting && (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]"/>
      )}
      
      {isBooting ? (
        <div className="p-4 sm:p-6 flex flex-col items-start justify-start text-left w-full h-full relative z-20">
          {bootLogs.map((log, index) => (
            <div key={index} className={`whitespace-pre-wrap leading-relaxed w-full ${log.includes('WARN') ? 'text-yellow-500' : ''}`}>
              {log === "" ? <br /> : log}
            </div>
          ))}
          
          {!isBootComplete && <div className="blinking-cursor mt-1">_</div>}
          
          {isBootComplete && (
            <div className="mt-4 font-bold animate-pulse text-white">
              &gt; ROUTING TO HOME_MODULE...
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 relative z-20">
          <pre className="text-xs sm:text-sm md:text-base mb-8 text-[#33ff00] font-bold leading-tight whitespace-pre-wrap text-center drop-shadow-md">
            {asciiArt}
          </pre>

          <div className="w-full max-w-xl border-2 border-[#33ff00] p-6 sm:p-8 bg-black/90 shadow-[0_0_20px_rgba(51,255,0,0.2)] flex flex-col backdrop-blur-xs">
            <h1 className="text-xl sm:text-2xl font-bold mb-6 uppercase border-b-2 border-dashed border-[#33ff00] pb-3">
              {isLogin ? '> EXECUTE LOGIN' : '> CREATE USER_INSTANCE'}
            </h1>

            {(localError || error) && (
              <div className="mb-6 p-3 border border-red-500 bg-red-500/10 text-red-500 text-sm">
                [ERROR_LOG]: {localError || error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm sm:text-base uppercase tracking-wider text-[#33ff00]/70">Username</label>
                <div className="flex items-center bg-[#33ff00]/5 border-b-2 border-[#33ff00]/50 focus-within:border-[#33ff00] focus-within:bg-[#33ff00]/10 transition-all px-2 overflow-hidden">
                  <span className="mr-2 text-sm sm:text-base opacity-80 whitespace-nowrap">PS C:\\Users\\Urano&gt;</span>
                  <input
                    type="text"
                    autoComplete="off"
                    className="w-full bg-transparent py-2 text-lg sm:text-xl outline-none placeholder:text-[#33ff00]/30"
                    value={nickName}
                    onChange={(e) => setNickName(e.target.value)}
                  />
                </div>
              </div>

              {isLogin && (
                <div className="space-y-2">
                    <label className="block text-sm sm:text-base uppercase tracking-wider text-[#33ff00]/70">Password</label>
                    <div className="flex items-center bg-[#33ff00]/5 border-b-2 border-[#33ff00]/50 focus-within:border-[#33ff00] focus-within:bg-[#33ff00]/10 transition-all px-2 overflow-hidden">
                    <span className="mr-2 text-sm sm:text-base opacity-80 whitespace-nowrap">PS C:\\Users\\Urano&gt;</span>
                    <input
                      type="password"
                      className="w-full bg-transparent py-2 text-lg sm:text-xl outline-none placeholder:text-[#33ff00]/30"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
              )}
              
              <button type="submit" className="w-full bg-transparent border-2 border-[#33ff00] text-[#33ff00] font-bold text-lg sm:text-xl py-3 hover:bg-[#33ff00] hover:text-black transition-all uppercase mt-8 cursor-pointer">
                [ {isLogin ? 'CONNECT' : 'INITIALIZE'} ]
              </button>
            </form>

            <div className="mt-8 pt-6 border-t-2 border-dashed border-[#33ff00]/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
              <span className="opacity-70 text-sm sm:text-base">{isLogin ? 'No module found?' : 'Module exists?'}</span>
              <button 
                type="button"
                onClick={() => { setIsLogin(!isLogin); clearError(); setLocalError(null); }}
                className="hover:bg-[#33ff00] hover:text-black px-3 py-1 uppercase font-bold text-sm sm:text-base blinking-cursor transition-colors border border-transparent hover:border-[#33ff00] cursor-pointer"
              >
                {isLogin ? 'REGISTER.exe' : 'LOGIN.sh'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}