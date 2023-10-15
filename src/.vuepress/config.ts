import { defineUserConfig } from 'vuepress'
import theme from './theme.js'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { getDirname, path } from '@vuepress/utils'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  base: '/',
  port: 1005,
  theme,

  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'Wikitext 宝典',
      description: 'Oh My Wikitext!',
    },
  },

  // Enable it with pwa
  // shouldPrefetch: false,

  plugins: [
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components'),
    }),
  ],

  bundler: viteBundler({
    viteOptions: {
      server: {
        proxy: {
          '/api.php': {
            target: 'https://zh.moegirl.org.cn/api.php',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api.php/, ''),
          },
        },
      },
    },
  }),
})
