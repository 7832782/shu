import { defineConfig } from 'vitepress'
import { readdirSync } from 'node:fs'

// 自动扫描 docs 下的章节文件，按章号排序生成目录
const chapters = readdirSync('docs')
  .filter((f) => /^第\d+章_.+\.md$/.test(f))
  .sort(
    (a, b) =>
      Number(a.match(/^第(\d+)章/)?.[1] ?? 0) -
      Number(b.match(/^第(\d+)章/)?.[1] ?? 0)
  )

const chapterItems = chapters.map((f) => ({
  text: f.replace(/^第(\d+)章_(.+)\.md$/, '$1 $2'),
  link: '/' + f.replace(/\.md$/, '')
}))

export default defineConfig({
  lang: 'zh-CN',
  title: '答案',
  description: '四十三章回忆录',
  cleanUrls: true,
  head: [['link', { rel: 'icon', href: '/favicon.svg' }]],
  themeConfig: {
    nav: [{ text: '目录', link: '/' }],
    sidebar: [{ text: '章节', collapsed: false, items: chapterItems }],
    docFooter: { prev: '上一章', next: '下一章' },
    outline: false,
    search: { provider: 'local' },
    darkModeSwitchLabel: '外观',
    sidebarMenuLabel: '目录',
    returnToTopLabel: '回到顶部',
    lastUpdated: false
  }
})
