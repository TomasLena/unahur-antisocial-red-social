import { useEffect } from 'react';

interface AuthorsTerminalProps {
  onClose: () => void;
}

export default function AuthorsTerminal({ onClose }: AuthorsTerminalProps) {
  // Atajo para cerrar con la tecla Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Integrante 1: Tomás
  const tomasNameAscii = `
 |''||''|                                      '||'                               
    ||      ...   .. .. ..    ....    ....      ||        ....   .. ...    ....   
    ||    .|  '|.  || || ||  '' .||  ||. '      ||      .|...||  ||  ||  '' .||  
    ||    ||   ||  || || ||  .|' ||  . '|..     ||      ||       ||  ||  .|' ||  
   .||.    '|..|' .|| || ||. '|..'|' |'..|'    .||.....|  '|...' .||. ||. '|..'|'`;

const tomasAvatarAscii = `@@@@@@@@@@@@@@@@@@@@@**^^""~~~"^@@^*@*@@**@@@@@@@@@
@@@@@@@@@@@@@*^^'"~   , - ' '; ,@@b. '  -e@@@@@@@@@
@@@@@@@@*^"~      . '     . ' ,@@@@(  e@*@@@@@@@@@@
@@@@@^~         .       .   ' @@@@@@, ~^@@@@@@@@@@@
@@@~ ,e**@@*e,  ,e**e, .    ' '@@@@@@e,  "*@@@@@'^@
@',e@@@@@@@@@@ e@@@@@@       ' '*@@@@@@    @@@'   0
@@@@@@@@@@@@@@@@@@@@@',e,     ;  ~^*^'    ;^~   ' 0
@@@@@@@@@@@@@@@^""^@@e@@@   .'           ,'   .'  @
@@@@@@@@@@@@@@'    '@@@@@ '         ,  ,e'  .    ;@
@@@@@@@@@@@@@' ,&&,  ^@*'     ,  .  i^"@e, ,e@e  @@
@@@@@@@@@@@@' ,@@@@,         ;  ,& !,,@@@e@@@@ e@@
@@@@@,~*@@*' ,@@@@@@e,  ',   e^~^@,   ~'@@@@@@,@@@
@@@@@@, ~" ,e@@@@@@@@@*e*@*  ,@e  @@""@e,,@@@@@@@@@
@@@@@@@@ee@@@@@@@@@@@@@@@" ,e@' ,e@' e@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@" ,@" ,e@@e,,@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@~ ,@@@,,0@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@,,@@@@@@@@@@@@@@@@@@@@@@@@@
"""""""""""""""""""""""""""""""""""""""""""""""""""`;
// integrante 2
const julianNameAscii = `                                                                                           
   ▄▄▄         ▀▀█      ▀                         ▄▄▄▄▄  ▀▀█                               
     █  ▄   ▄    █    ▄▄▄     ▄▄▄   ▄ ▄▄          █    █   █     ▄▄▄   ▄ ▄▄    ▄▄▄    ▄▄▄  
     █  █   █    █      █    ▀   █  █▀  █         █▄▄▄▄▀   █    ▀   █  █▀  █  █▀  ▀  █▀ ▀█ 
     █  █   █    █      █    ▄▀▀▀█  █   █         █    █   █    ▄▀▀▀█  █   █  █      █   █ 
 ▀▄▄▄▀  ▀▄▄▀█    ▀▄▄  ▄▄█▄▄  ▀▄▄▀█  █   █         █▄▄▄▄▀   ▀▄▄  ▀▄▄▀█  █   █  ▀█▄▄▀  ▀█▄█▀ 
                                                                                           
                                                                                           `;

  //integrante 2
  const julianAvatarAscii = `⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣴⠟⠋⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣶⣶⣤⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣾⠋⢁⡠⠄⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣶⣿⣿⣿⣿⣿⣁⣉⣀⠀⣀⣀⣀⣀⣀⡀⠀⠀⣴⠟⣁⠴⠟⠋⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⣿⡿⠛⠉⠛⠻⣿⣿⡿⣿⣿⣿⣿⣿⣿⣿⣿⣷⠶⠾⠧⣄⡀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⣿⣿⠁⢠⣶⣶⣀⡾⢀⣴⣾⣿⣿⣿⣿⣿⣿⣿⠁⠀⠀⠀⠀⠙⡆⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣀⣀⣀⣀⣤⣤⣾⣿⣿⣿⣄⣸⣿⣟⡍⢐⣋⣻⣿⣿⣿⣿⣿⣿⣿⣿⣆⠀⠀⠀⢀⡼⠃⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⠟⠛⠛⠷⣄⡀⠀⠀⣹⣿⣿⣿⣿⣭⣾⣛⣹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠖⠚⠉⠀⢀⣴⡆⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⠀⠀⠀⠀⠀⠉⠛⠛⢻⣿⣿⣿⣿⣿⣷⣾⣿⣿⣿⣿⣿⣿⣿⣿⣟⣵⣿⣿⣿⣿⠃⠀⠀⠀⢀⡟⡼⠁⢀⡤⣤
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢧⡀⠀⠀⠀⠀⠀⠀⢼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⠁⠀⣀⣀⣀⡾⠸⡡⢞⡡⠖⠋
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠶⢄⣀⣀⢀⣀⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣻⡟⢻⡟⠛⠋⠁⠀⠀⠀⠀⠙⢦⡽⠃⠀⠀⠛⣒⣉⠷
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠉⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣝⡿⠿⠏⡇⠀⠀⠀⠀⠀⠀⠀⢀⣾⡇⠀⣀⠔⠋⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣶⣾⣶⣦⣤⣤⣀⣀⣀⣤⣾⣿⣷⠟⠁⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢐⣺⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠛⣿⣿⣵⣿⣿⣻⣿⣿⢛⣛⣹⣿⣿⣿⡏⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⣿⣻⡟⣿⣸⢯⣴⣿⡶⣿⣿⢿⣎⣭⣿⣿⣿⣿⡿⠃⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣽⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣮⣿⣿⣧⣽⣿⣾⣿⣿⣷⣾⣿⣷⣿⣿⡿⠿⠛⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⣻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡏⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⠳⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠶⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣽⣿⣿⣿⣿⣷⣿⢷⣻⣿⣿⠟⠋⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣲⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣼⣿⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⣺⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠿⢿⣽⢿⣿⣿⣿⣿⣟⣿⣿⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣆⢀⡀⡟⣧⣹⣿⣷⡽⣿⢻⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢘⣽⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡄⣇⣻⢸⣿⣿⣽⣷⣿⡜⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⣸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⣿⣿⣧⣨⣿⣾⣿⣿⣿⣿⣿⣿⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢽⣿⣿⣟⣿⣿⡜⣿⢿⣿⣿⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡼⣿⣿⣿⣿⣿⣇⠹⣿⣿⣿⣍⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⣿⣿⢸⣿⣿⣧⣷⣸⣯⣿⣿⣿⢸⣏⠿⣿⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢿⣿⣿⣿⣿⣿⣿⣿⢻⣿⣞⣿⣿⣧⣿⣻⡾⣿⣿⣿⢿⣿⣧⢻⣶⡘⣿⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⣿⣿⣿⣿⣿⣿⣿⣶⣿⣟⢿⣿⣿⣿⣿⣿⣸⣧⢹⣮⣿⣿⣮⣿⡿⣿⠷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣠⡤⣿⣿⣿⣿⣿⣿⣿⣷⣿⣿⡌⣿⣏⣿⣿⣿⣿⣿⣮⣿⣿⣿⣿⣿⣿⣾⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢀⣀⣀⡤⠤⠴⣶⣚⣛⣯⡭⠴⠶⠞⢻⣿⣿⣿⣿⣿⣿⣿⣇⣸⣧⣿⣹⣿⣿⣿⣿⣿⣿⣿⣻⣿⣿⣿⣿⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢀⣴⣶⡯⠽⠶⠒⠛⠋⠉⠉⠉⠀⠀⠀⠀⠀⠀⠀⠙⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠟⠛⢯⣳⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢻⣿⣄⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠻⣿⡿⠿⢿⣿⠛⢿⣿⡟⠉⠁⠀⠀⠉⠉⠉⠉⠛⠓⠒⠚⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠈⠙⠛⠛⠛⠷⠖⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⠦⢤⣽⠧⠤⠿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀`;

  const stormtrooperAscii = `                           ,ooo888888888888888oooo,
                          o8888YYYYYY77iiiiooo8888888o
                         8888YYYY77iiYY8888888888888888
                        [88YYY77iiY88888888888888888888]
                        88YY7iYY888888888888888888888888
                       [88YYi 88888888888888888888888888]
                       i88Yo8888888888888888888888888888i
                       i]        ^^^88888888^^^     o  [i
                      oi8  i            o8o          i  8io
                    ,77788o ^^  ,oooo8888888ooo,   ^ o88777,
                    7777788888888888888888888888888888877777
                     77777888888888888888888888888888877777
                      77777788888888^7777777^8888888777777
       ,oooo888 ooo   88888778888^7777ooooo7777^8887788888        ,o88^^^^888oo
    o8888777788[];78 88888888888888888888888888888888888887 7;8^ 888888888oo^88
   o888888iii788 ]; o 78888887788788888^;;^888878877888887 o7;[]88888888888888o
   88888877 ii78[]8;7o 7888878^ ^8788^;;;;;;^878^ ^878877 o7;8 ]878888888888888
  [88888888887888 87;7oo 777888o8888^;ii;;ii;^888o87777 oo7;7[]8778888888888888
  88888888888888[]87;777oooooooooooooo888888oooooooooooo77;78]88877i78888888888
 o88888888888888 877;7877788777iiiiiii;;;;;iiiiiiiii77877i;78] 88877i;788888888
 88^;iiii^88888 o87;78888888888888888888888888888888888887;778] 88877ii;7788888
;;;iiiii7iiii^  87;;888888888888888888888888888888888888887;778] 888777ii;78888
;iiiii7iiiii7iiii77;i88888888888888888888i7888888888888888877;77i 888877777ii78
iiiiiiiiiii7iiii7iii;;;i7778888888888888ii7788888888888777i;;;;iiii 88888888888
i;iiiiiiiiiiii7iiiiiiiiiiiiiiiiiiiiiiiiii8877iiiiiiiiiiiiiiiiiii877   88888
ii;;iiiiiiiiiiiiii;;;ii^^^;;;ii77777788888888888887777iii;;  77777         78
77iii;;iiiiiiiiii;;;ii;;;;;;;;;^^^^8888888888888888888777ii;;  ii7         ;i78
^ii;8iiiiiiii ';;;;ii;;;;;;;;;;;;;;;;;;^^oo ooooo^^^88888888;;i7          7;788
o ^;;^^88888^     'i;;;;;;;;;;;;;;;;;;;;;;;;;;;^^^88oo^^^^888ii7         7;i788
88ooooooooo         ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;; 788oo^;;          7;i888
887ii8788888      ;;;;;;;ii;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;^87           7;788
887i8788888^     ;;;;;;;ii;;;;;;;oo;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;,,,      ;;888
87787888888     ;;;;;;;ii;;;;;;;888888oo;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;,,;i788
87i8788888^       ';;;ii;;;;;;;8888878777ii8ooo;;;;;;;;;;;;;;;;;;;;;;;;;;i788 7
77i8788888           ioo;;;;;;oo^^ooooo ^7i88^ooooo;;;;;;;;;;;;;;;;;;;;i7888 78
7i87788888o         7;ii788887i7;7;788888ooooo7888888ooo;;;;;;;;;;;;;;oo ^^^ 78
i; 7888888^      8888^o;ii778877;7;7888887;;7;7788878;878;;    ;;;;;;;i78888o ^
i8 788888        [88888^^ ooo ^^^^^;;77888^^^^;;7787^^^^ ^^;;;;  iiii;i78888888
^8 7888^         [87888 87 ^877i;i8ooooooo8778oooooo888877ii; iiiiiiii788888888
  ^^^          [7i888 87;; ^8i;;i7888888888888888887888888   i7iiiiiii88888^^
               87;88 o87;;;;o 87i;;;78888788888888888888^^ o 8ii7iiiiii;;
               87;i8 877;77888o ^877;;;i7888888888888^^ 7888 78iii7iii7iiii
               ^87; 877;778888887o 877;;88888888888^ 7ii7888 788oiiiiiiiii
                 ^ 877;7 7888888887 877i;;8888887ii 87i78888 7888888888
                 [87;;7 78888888887 87i;;888887i  87ii78888 7888888888]
                 877;7 77888888888887 887i;887i^  87ii788888 78888888888
                 87;i8 788888888888887 887ii;;^ 87ii7888888 78888888888
                [87;i8 7888888888888887 ^^^^   87ii77888888 78888888888
                87;;78 7888888888888887ii      87i78888888 778888888888
                87;788 7888888888888887i]      87i78888888 788888888888
               [87;88 778888888888888887       7ii78888888 788888888888
               87;;88 78888888888888887]       ii778888888 78888888888]
               7;;788 7888888888888888]        i7888888888 78888888888'
               7;;788 7888888888888888         'i788888888 78888888888
               7;i788 788888888888888]          788888888 77888888888]
               '7;788 778888888888888]         [788888888 78888888888'
               ';77888 78888888888888          8888888888 7888888888]
                778888 78888888888888          8888888888 7888888888]
                 78888 7888888888888]         [8888888888 7888888888
                  7888 7888888888888]          88888888888 788888888]
                   778 78888888888]            ]888888888 778888888]
                   oooooo ^88888^               ^88888^^^^^^^^8888]
                  87;78888ooooooo8o             ,oooooo oo888oooooo
                  [877;i77888888888]           [;78887i8888878i7888;
                   ^877;;ii7888ii788           ;i777;7788887787;778;
                     ^87777;;;iiii777          ;77^^^^^^^^^^^^^^^^;;
                        ^^^^^^^^^ii7]             ^ o88888888877iiioo
                           77777o                [88777777iiiiii;;778
                            77777iii             8877iiiii;;;77888888]
                            77iiii;8           [77ii;778 788888888888
                            7iii;;88           iii;78888 778888888888
                           77i;78888]          ;;;;i88888 78888888888
                          ,7;78888888          [;;i788888 7888888888]
                          i;788888888           ;i7888888 7888888888
                          ;788888888]           i77888888 788888888]
                          ';88888888'           [77888888 788888888]
                           [[8ooo88]             78888888 788888888
                            [88888]              78888888 788888888
                              ^^^                [7888888 77888888]
                                                  88888888 7888887
                                                  77888888 7888887
                                                   ;i88888 788888i
                                                  ,;;78888 788877i7
                                                 ,7;;i;777777i7i;;7
                                                 87778^^^ ^^^^87778
                                                  ^^^^ o777777o ^^^
                                                  o77777iiiiii7777o
                                                 7777iiii88888iii777
                                                ;;;i7778888888877ii;;
                 Imperial Stormtrooper         [i77888888^^^^8888877i]
                (Standard Shock Trooper)       77888^oooo8888oooo^8887]
                                              [788888888888888888888888]
                                              88888888888888888888888888
                                              ]8888888^iiiiiiiii^888888]
                       Bob VanderClay           iiiiiiiiiiiiiiiiiiiiii
                                                    ^^^^^^^^^^^^^`;

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col font-mono text-[#33ff00] overflow-y-auto selection:bg-[#33ff00] selection:text-black">
      
      <div className="sticky top-0 bg-black/90 backdrop-blur-sm border-b-2 border-dashed border-[#33ff00]/50 p-4 md:p-6 flex justify-between items-center z-10 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
        <div className="font-bold text-lg flex items-center gap-2">
          <span className="opacity-70">$</span> ./show_creators.sh
        </div>
        <button 
          onClick={onClose} 
          className="border border-[#33ff00] px-4 py-1 hover:bg-[#33ff00] hover:text-black font-bold uppercase transition-colors"
        >
          [ESC] RETURN
        </button>
      </div>
      
      <div className="flex-1 flex flex-col items-center py-12 px-4 space-y-32">
        
        <div className="flex flex-col items-center space-y-8 mt-4">
          
          <img 
            src="https://i.gifer.com/origin/ec/ec1d72344f7cf031510d01c5404592b5_w200.webp"
            alt="Spinning Planet"
            className="w-56 h-56 sm:w-72 sm:h-72 object-contain opacity-90 mix-blend-screen"
          />

          <div className="text-center opacity-80 animate-pulse font-bold">
            <p>&gt; DECRYPTING CORE ARCHITECTS DATA...</p>
            <p>&gt; ACCESS GRANTED.</p>
          </div>
        </div>

        {/* integrante 1: Tomás */}
        <div className="flex flex-col items-center w-full max-w-4xl">
          {/* DRAGÓN GIGANTE */}
          <div className="w-full overflow-x-auto flex justify-center mb-6">
            <pre className="text-left font-bold text-[10px] sm:text-xs leading-tight text-[#33ff00] opacity-90 whitespace-pre">
              {tomasAvatarAscii}
            </pre>
          </div>
          
          <div className="w-full overflow-x-auto flex justify-center mb-6">
            <pre className="font-bold text-xs sm:text-sm md:text-base leading-tight text-[#33ff00]">
              {tomasNameAscii}
            </pre>
          </div>
          
          <div className="text-center space-y-4">
            <p className="opacity-70 uppercase tracking-widest border-b border-[#33ff00]/30 pb-2">
              [ PROGRAMMING TECHNICIAN & INTERFACE ARCHITECT ]
            </p>
            <a 
              href="https://github.com/tu-usuario" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-block mt-4 border-2 border-[#33ff00] px-8 py-2 hover:bg-[#33ff00] hover:text-black transition-colors font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(51,255,0,0.1)] hover:shadow-[0_0_20px_rgba(51,255,0,0.5)]"
            >
              INIT_GITHUB_CONNECTION
            </a>
          </div>
        </div>

        {/* integrante 2: */}
        <div className="flex flex-col items-center w-full max-w-4xl">
          <div className="w-full overflow-x-auto flex justify-center mb-6">
            <pre className="text-left font-bold text-[8px] sm:text-[10px] md:text-xs leading-none text-[#33ff00] opacity-90 whitespace-pre">
              {julianAvatarAscii}
            </pre>
          </div>
          
          <div className="w-full overflow-x-auto flex justify-center mb-6">
            <pre className="font-bold text-xs sm:text-sm md:text-base leading-tight text-[#33ff00]">
              {julianNameAscii}
            </pre>
          </div>
          
          <div className="text-center space-y-4">
            <p className="opacity-70 uppercase tracking-widest border-b border-[#33ff00]/30 pb-2">
              [ BACKEND & LOGIC_ENGINEER ]
            </p>
            <a 
              href="https://github.com/tu-compañero" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-block mt-4 border-2 border-[#33ff00] px-8 py-2 hover:bg-[#33ff00] hover:text-black transition-colors font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(51,255,0,0.1)] hover:shadow-[0_0_20px_rgba(51,255,0,0.5)]"
            >
              INIT_GITHUB_CONNECTION
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center w-full max-w-4xl pt-12 pb-24">
          
          <div className="w-full overflow-x-auto flex justify-center mb-12">
            <pre className="text-left font-bold text-[8px] sm:text-[10px] md:text-xs leading-tight text-[#33ff00] opacity-70 whitespace-pre">
              {stormtrooperAscii}
            </pre>
          </div>

          <div className="text-center opacity-40 text-sm font-bold">
            --- END OF FILE --- <br/>
            <span className="animate-pulse">_</span>
          </div>
          
        </div>

      </div>
    </div>
  );
}