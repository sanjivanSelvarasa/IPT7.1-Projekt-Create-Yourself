import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

const apiProxyTarget = process.env.API_PROXY_TARGET || 'http://127.0.0.1:3000'
const apiPrefixes = [
  '/users',
  '/token',
  '/account',
  '/portfolio',
  '/portfolios',
  '/templates',
  '/p',
  '/uploads',
]

const proxyEntries = Object.fromEntries(
  apiPrefixes.map((prefix) => [
    prefix,
    {
      target: apiProxyTarget,
      changeOrigin: true,
    },
  ]),
)

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [
    vue(),
    command === 'serve' ? vueDevTools() : null,
    tailwindcss(),
  ],

  server: {
    host: '0.0.0.0',
    allowedHosts: [
      'create-yourself.gian.ink',
    ],
    proxy: proxyEntries,
  },


  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
}))
