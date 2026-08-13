// 分卷定义（初版，按时间线粗分；最终版待书完善后确认）
// 修改这里即可调整卷的边界与名称，正文文件不需要动。
export interface Volume {
  name: string
  from: number
  to: number
}

export const volumes: Volume[] = [
  { name: '卷一 · 初中', from: 1, to: 6 },
  { name: '卷二 · 恋爱起点', from: 7, to: 11 },
  { name: '卷三 · 高二', from: 12, to: 26 },
  { name: '卷四 · 高三', from: 27, to: 38 },
  { name: '尾声', from: 39, to: 43 }
]

export function volumeOf(chapterNo: number): Volume | undefined {
  return volumes.find((v) => chapterNo >= v.from && chapterNo <= v.to)
}
