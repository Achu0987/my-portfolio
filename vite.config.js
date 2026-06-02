import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression';

const fixPaths = (basePath) => {
  return {
    name: 'fix-paths',
    enforce: 'pre',
    transform(code, id) {
      if (basePath === '/') return; // Don't replace paths in dev
      if (id.includes('/src/') || id.endsWith('.scss') || id.endsWith('.css')) {
        return {
          code: code.replace(/(['"])\/(textures|images|sounds|cursors)\//g, `$1${basePath}$2/`),
          map: null
        };
      }
    }
  };
};

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const basePath = '/';

  return {
    base: basePath,
    plugins: [react(), viteCompression(), fixPaths(basePath)],
  }
})
