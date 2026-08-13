import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import { useData } from 'vitepress'
import { volumeOf } from '../volumes'
import './custom.css'

// 自定义布局：在每章正文前显示所属卷的卷标（卷号一行，卷名一行）
const Layout = {
  setup() {
    const { page } = useData()
    return () => {
      const m = page.value.relativePath.match(/^第(\d+)章_/)
      const vol = m ? volumeOf(Number(m[1])) : undefined
      const parts = vol ? vol.name.split(' · ') : []
      const volNo = parts[0] ?? ''
      const volTitle = parts.slice(1).join(' · ') || null
      return h(DefaultTheme.Layout, null, {
        'doc-before': () =>
          vol
            ? h('div', { class: 'volume-badge' }, [
                h('div', { class: 'volume-no' }, volNo),
                volTitle ? h('div', { class: 'volume-title' }, volTitle) : null
              ])
            : null
      })
    }
  }
}

export default {
  ...DefaultTheme,
  Layout
}
