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
    {
      text: '使用模板',
      icon: 'laptop-code',
      prefix: 'template/',
      link: 'template/',
      children: 'structure',
    },
    {
      text: '进阶语法',
      icon: 'laptop-code',
      prefix: 'advanced/',
      link: 'advanced/',
      children: 'structure',
    },
    'slides',
  ],
})
