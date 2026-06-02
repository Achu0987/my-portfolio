import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression';

const fixPaths = () => {
  return {
    name: 'fix-paths',
    enforce: 'pre',
    transform(code, id) {
      if (id.includes('/src/') || id.endsWith('.scss') || id.endsWith('.css')) {
        return {
          code: code.replace(/(['"])\/(textures|images|sounds|cursors)\//g, "$1/my-portfolio/$2/"),
          map: null
        };
      }
    }
  };
};

// https://vite.dev/config/
export default defineConfig({
  base: '/my-portfolio/',
  plugins: [react(), viteCompression(), fixPaths()],
})
