export const ASCII_AVATARS = [
  // 1. El Disquete (Clásico)
  `   .--------------.
  /|             /|
 / |  [====]    / |
*--+-----------*  |
|  |   UHN     |  |
|  +-----------+  |
*-----------------*`,

  // 2. El Monitor Retro
  `  .---------------.
 /                 \\
|   > SYSTEM OK_    |
|   > _             |
 \\                 /
  \`==============='
     _|_______|_
    [___________]`,

  // 3. El Microchip
  `     _  _  _  _  _
   | |  |  |  |  | |
 --+---------------+--
 --|    U N A      |--
 --|    H U R      |--
 --|  i9-SYSTEM    |--
 --+---------------+--
   |_|__|__|__|__|_|`,

  // 4. Café (Combustible Dev)
  `      (  )   (   )
       ) (    ) (
     .........    __
    |         |--'  |
    |   UHN   |-----'
    |  DEV    |
     \`-------'`,

  // 5. La Terminal BASH
  ` +-----------------------+
 | [_][+][x]    BASH     |
 +-----------------------+
 | root@uhn:~# cd /home  |
 | root@uhn:~# ls -la    |
 | root@uhn:~# _         |
 +-----------------------+`,

  // 6. El Server Rack
  `  ___________________
 |  [=] [o] [======] |
 |-------------------|
 |  [=] [o] [======] |
 |-------------------|
 |  [=] [o] [======] |
 |___________________|`,

  // 7. Consola Portátil
  ` .-----------.
 |  _______  |
 | | U H N | |
 | |_______| |
 |   _       |
 | _| |_  (B)|
 ||_ O _| (A)|
 |  |_|      |
 \`-----------'`,

  // 8. Ojo Cyberpunk
  `     ___-------___
  .-^   _---_   ^-.
 /     / o_o \\     \\
|     |  \\_/  |     |
 \\     \\_____/     /
  '-.___________.-'`,

  // 9. Usuario Anónimo
  `      /~~~~~\\
     /       \\
    |   ^ ^   |
    |  \\___/  |
    /   ---   \\
   /|         |\\
  / |  GUEST  | \\
 /__|_________|__\\`,

  // 10. Calavera ASCII
  `      .-----.
    .' -   - '.
   /  .-. .-.  \\
   |  | | | |  |
    \\ \\o/ \\o/ /
   _/\\ '--'  /\\_
  |   \\____/   |`
];


export const getAvatarForUser = (userId: string | number): string => {
  const idNum = typeof userId === 'number' ? userId : userId.length;
  
  const index = idNum % ASCII_AVATARS.length;
  
  return ASCII_AVATARS[index];
};