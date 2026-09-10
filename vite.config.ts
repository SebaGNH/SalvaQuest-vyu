import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// "base" tiene que matchear el nombre del repo en GitHub, porque las páginas
// de proyecto se sirven en usuario.github.io/nombre-repo/ y no en la raíz.
// Repo actual: SalvaQuest-vyu. Si en algún momento renombrás el repo, hay que
// actualizar este valor y volver a pushear.
export default defineConfig({
  base: '/SalvaQuest-vyu/',
  plugins: [react()],
});
