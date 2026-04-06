import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
      // 1. prevent vite from obscuring rust errors
      clearScreen: false,
      // 2. tauri expects a fixed port, fail if that port is not available
      server: {
        port: 3000,
        strictPort: true,
        host: '0.0.0.0',
      },
      // 3. to make use of `TAURI_DEBUG` and other env variables
      // https://tauri.app/v1/api/config#buildconfig.beforedevcommand
      envPrefix: ['VITE_', 'TAURI_'],
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
