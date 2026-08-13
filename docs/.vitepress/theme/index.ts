import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import { useData } from 'vitepress'
import { volumeOf } from '../volumes'
import './custom.css'

// 自定义布局：在每章正文前显示所属卷的卷标
const Layout = {
  setup() {
    const { page } = useData()
    return () => {
      const m = page.value.relativePath.match(/^第(\d+)章_/)
      const vol = m ? volumeOf(Number(m[1])) : undefined
      return h(DefaultTheme.Layout, null, {
        'doc-before': () =>
          vol ? h('div', { class: 'volume-badge' }, vol.name) : null
      })
    }
  }
}

export default {
  ...DefaultTheme,
  Layout
}
