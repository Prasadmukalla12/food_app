import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { createAuthHandler } from './server/auth.mjs'

function localAuth() {
  function install(server) {
    const { handle, close } = createAuthHandler()
    server.middlewares.use('/api/auth', handle)
    server.httpServer?.once('close', close)
  }

  return { name: 'local-auth', configureServer: install, configurePreviewServer: install }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    localAuth(),
  ],
})
