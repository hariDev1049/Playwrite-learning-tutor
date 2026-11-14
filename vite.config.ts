import react from '@vitejs/plugin-react'
import type { Plugin } from 'vite'
import { defineConfig } from 'vite'

/** Tiny JSON endpoint so the "Load a tip" button works without a separate server. */
function tipApi(): Plugin {
  return {
    name: 'tip-api',
    configureServer(server) {
      server.middlewares.use('/api/tip', (_req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.end(
          JSON.stringify({
            text: 'Locators re-query the page on every action.',
          }),
        )
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tipApi()],
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
  },
})
