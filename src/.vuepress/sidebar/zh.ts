import { sidebar } from 'vuepress-theme-hope'

export const zhSidebar = sidebar({
  '/': [
    '',
    'beginning',
    {
      text: '基本语法',
      icon: 'laptop-code',
      prefix: 'basic/',
      link: 'basic/',
      children: 'structure',
    },
    'slides',
  ],
})
