import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { createServer } from './server/app.js'

function localAccountApi() {
  async function install(server) {
    const { mode, envDir } = server.config
    const { app, close } = await createServer(loadEnv(mode, envDir, 'MONGODB_'))
    server.middlewares.use(app)
    server.httpServer?.once('close', () => {
      close().catch(() => console.error('Could not close the MongoDB connection.'))
    })
  }

  return {
    name: 'local-account-api',
    configureServer: install,
    configurePreviewServer: install,
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), localAccountApi()],
})
