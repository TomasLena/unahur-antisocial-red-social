import { useEffect, useState } from 'react';

export default function ThemeToggle() {
    const [isCopper, setIsCopper] = useState(() => {
    return localStorage.getItem('theme') === 'copper';
});

    useEffect(() => {
    if (isCopper) {
        document.body.style.filter = 'hue-rotate(-75deg) contrast(1.1)';
        localStorage.setItem('theme', 'copper');
    } else {
        document.body.style.filter = 'none';
        localStorage.setItem('theme', 'green');
    }
    }, [isCopper]);

  const bulbOff = `  ..---..
 /       \\
|         |
:         ;
 \\  \\~/  /
  \`, Y ,'
   |_|_|
   |===|
   |===|
    \\_/`;

  const bulbOn = `            ..........
         .......::::::.......
      .......:::======:::.......
    .......::===========::........
   ......::===####@@####===::......
  ......::===####@@@@####===::......
  .....::===####@@@@@@####===::.....
  .....::===#####@@@@#####===::.....
   .....::===#####@@#####===::.....
    .....::====########====::.....
     .....::=====####=====::.....
      ....::============::....
        ...::==========::...
           ..::========::..
             |__________|
             <__________>
             <__________>
             <__________>
                 \\/boba`;

return (
    <button
        onClick={() => setIsCopper(!isCopper)}

        className="relative flex items-center justify-center w-16 h-16 cursor-pointer group bg-transparent transition-all outline-none"
        title="TOGGLE_PHOSPHOR_TUBE"
        >
        {isCopper ? (
        // Foco Prendido
        <pre 
            className="absolute top-1/2 left-1/2 font-mono font-bold text-[#33ff00] drop-shadow-[0_0_12px_#33ff00] transition-all"
            style={{ 
            transform: 'translate(-50%, -50%) scale(0.20)',
            lineHeight: '0.85',
            letterSpacing: '0px'
            }}
        >
            {bulbOn}
        </pre>
        ) : (
        // Foco Apagado
        <pre 
            className="absolute top-1/2 left-1/2 font-mono font-bold text-[#33ff00] opacity-50 group-hover:opacity-100 transition-all"
            style={{ 
            transform: 'translate(-50%, -50%) scale(0.30)',
            lineHeight: '1',
            letterSpacing: '0px'
            }}
        >
            {bulbOff}
        </pre>
        )}
    </button>
    );
}