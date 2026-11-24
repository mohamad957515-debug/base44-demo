import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const previewHosts = []
if (process.env.BASE44_PREVIEW_MODE === '1') {
  if (process.env.BASE44_SANDBOX_HOST_DOMAIN) previewHosts.push(`.${process.env.BASE44_SANDBOX_HOST_DOMAIN}`)
  if (process.env.BASE44_PUBLIC_HOST_SUFFIX) previewHosts.push(`3000-${process.env.BASE44_PUBLIC_HOST_SUFFIX}`)
}

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    allowedHosts: previewHosts.length ? previewHosts : undefined,
    watch: { usePolling: process.env.BASE44_PREVIEW_MODE === '1' },
  },
})
