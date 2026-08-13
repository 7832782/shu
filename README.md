# 答案 · 四十三章

回忆录在线阅读站，基于 VitePress 构建，由 GitHub Actions 自动部署到 GitHub Pages。

## 结构

- `docs/`：网站内容。章节 md 与 `D:\desktop\答案\正文` 一一对应
- `docs/.vitepress/`：站点配置与主题样式
- `.github/workflows/deploy.yml`：push 到 main 后自动构建部署

## 更新

改完章节后运行 `D:\desktop\答案\上线.bat`（自动同步正文 → 仓库 → push），
2~3 分钟后 GitHub Actions 构建完成，网站自动更新。

## 本地预览

```bash
npm install
npm run docs:dev
```
