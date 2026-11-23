import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Dev server must listen on 0.0.0.0:3000 for the sandbox preview.
// `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS` (set by the platform) is appended
// by Vite to `server.allowedHosts`, so the proxied preview host is accepted.
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    watch: {
      usePolling: true,
      interval: 250,
    },
  },
})
