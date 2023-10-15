import { navbar } from 'vuepress-theme-hope'

export const zhNavbar = navbar([
  '/',
  '/beginning/',
  {
    text: '基本语法',
    icon: 'lightbulb',
    prefix: '/basic/',
    children: [
      {
        text: '字形',
        icon: 'lightbulb',
        link: '01-font',
      },
    ],
  },
])
