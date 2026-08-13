import { defineConfig } from 'vitepress'
import { readdirSync } from 'node:fs'
import { volumes } from './volumes'

// 自动扫描 docs 下的章节文件，按章号排序
const chapters = readdirSync('docs')
  .filter((f) => /^第\d+章_.+\.md$/.test(f))
  .sort(
    (a, b) =>
      Number(a.match(/^第(\d+)章/)?.[1] ?? 0) -
      Number(b.match(/^第(\d+)章/)?.[1] ?? 0)
  )

const chapterNo = (f: string) => Number(f.match(/^第(\d+)章/)?.[1] ?? 0)
const itemText = (f: string) => f.replace(/^第(\d+)章_(.+)\.md$/, '$1 $2')

// 按卷分组生成侧边栏
const sidebar = volumes
  .map((v) => ({
    text: v.name,
    collapsed: false,
    items: chapters
      .filter((f) => chapterNo(f) >= v.from && chapterNo(f) <= v.to)
      .map((f) => ({ text: itemText(f), link: '/' + f.replace(/\.md$/, '') }))
  }))
  .filter((g) => g.items.length > 0)

export default defineConfig({
  lang: 'zh-CN',
  title: '答案',
  description: '四十三章回忆录',
  cleanUrls: true,
  head: [['link', { rel: 'icon', href: '/favicon.svg' }]],
  themeConfig: {
    nav: [{ text: '目录', link: '/' }],
    sidebar,
    docFooter: { prev: '上一章', next: '下一章' },
    outline: false,
    search: { provider: 'local' },
    darkModeSwitchLabel: '外观',
    sidebarMenuLabel: '目录',
    returnToTopLabel: '回到顶部',
    lastUpdated: false
  }
})
