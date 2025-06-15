import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import { join } from 'path'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias: {
        '@shared': join(__dirname, 'src/shared')
      }
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias: {
        '@shared': join(__dirname, 'src/shared')
      }
    }
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@shared': join(__dirname, 'src/shared'),
        '@common': join(__dirname, 'src/renderer/src/common'),
        '@assets': join(__dirname, 'src/renderer/src/assets'),
        '@routes': join(__dirname, 'src/renderer/src/routes'),
        '@layouts': join(__dirname, 'src/renderer/src/layouts')
      }
    },
    plugins: [react(), svgr()]
  }
})
