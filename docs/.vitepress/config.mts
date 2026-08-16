import { defineConfig } from 'vitepress'
import { readdirSync, readFileSync } from 'node:fs'
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

// 统计正文字数：剥离 markdown 标记后，去空白统计字符数（题记引用保留）
function countChars(content: string): number {
  let text = content
    .replace(/```[\s\S]*?```/g, '') // 代码块
    .replace(/^\s*#{1,6}\s+.*$/gm, '') // 标题行
    .replace(/^\s*>\s?/gm, '') // 引用标记（保留引用文字）
    .replace(/^---+\s*$/gm, '') // 分隔线
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1') // 图片
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // 链接
    .replace(/\*\*([^*]+)\*\*/g, '$1') // 粗体
    .replace(/\*([^*]+)\*/g, '$1') // 斜体
    .replace(/`([^`]+)`/g, '$1') // 行内代码
  return text.replace(/\s/g, '').length
}

// 按卷分组生成侧边栏，卷组标题显示该卷总字数
const volumeTotals = volumes.map((v) => ({
  name: v.name,
  from: v.from,
  to: v.to,
  total: chapters
    .filter((f) => chapterNo(f) >= v.from && chapterNo(f) <= v.to)
    .reduce(
      (sum, f) => sum + countChars(readFileSync('docs/' + f, 'utf-8')),
      0
    )
}))

const sidebar = volumes
  .map((v) => ({
    text:
      v.name +
      '\n' +
      volumeTotals.find((t) => t.from === v.from)!.total +
      '字',
    collapsed: false,
    items: chapters
      .filter((f) => chapterNo(f) >= v.from && chapterNo(f) <= v.to)
      .map((f) => {
        const content = readFileSync('docs/' + f, 'utf-8')
        return {
          text: itemText(f) + ' · ' + countChars(content) + '字',
          link: '/' + f.replace(/\.md$/, '')
        }
      })
  }))
  .filter((g) => g.items.length > 0)

export default defineConfig({
  lang: 'zh-CN',
  title: '答案',
  description: '四十三章回忆录',
  base: '/shu/',
  cleanUrls: true,
  head: [['link', { rel: 'icon', href: '/shu/favicon.svg' }]],
  themeConfig: {
    nav: [{ text: '目录', link: '/' }],
    sidebar,
    docFooter: { prev: '上一章', next: '下一章' },
    outline: false,
    search: { provider: 'local' },
    darkModeSwitchLabel: '外观',
    sidebarMenuLabel: '目录',
    returnToTopLabel: '回到顶部',
    lastUpdated: false,
    volumesWithTotal: volumeTotals
  } as any
})
