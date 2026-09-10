import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// "base" tiene que matchear el nombre del repo en GitHub, porque las páginas
// de proyecto se sirven en usuario.github.io/nombre-repo/ y no en la raíz.
// Si le pusiste otro nombre al repo, cambiá el valor de acá.
export default defineConfig({
  base: '/salva-quest/',
  plugins: [react()],
});
