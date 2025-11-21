import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // process.cwd() might be undefined in some environments, handle gracefully if needed,
  // but typically valid in Node context of Vite.
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      // Polyfill process.env object to avoid ReferenceError in browser
      'process.env': JSON.stringify(env),
    }
  };
});