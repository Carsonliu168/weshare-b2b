// 自動化預渲染腳本
// 用 React 官方 SSR 功能，把 App 元件算成靜態 HTML，塞進 build 完的 index.html 裡
// 這樣爬蟲（NotebookLM、部分搜尋引擎）不需要執行 JavaScript 就能讀到完整內容
// 每次 `npm run build` 都會自動重新執行，永遠跟最新的網站內容同步，不會有過期問題

import { renderToString } from 'react-dom/server';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import React from 'react';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const root = resolve(__dirname, '..');

async function main() {
  // 讀取 SSR 打包好的 App 元件
  const { default: App } = await import(resolve(root, 'dist-ssr/App.js'));

  // 渲染成靜態 HTML 字串
  const appHtml = renderToString(React.createElement(App));

  // 讀取 build 完的 index.html
  const indexPath = resolve(root, 'dist/index.html');
  let html = readFileSync(indexPath, 'utf-8');

  // 把 <div id="root"></div> 換成含有完整內容的版本
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`
  );

  writeFileSync(indexPath, html, 'utf-8');
  console.log(`[prerender] 完成，注入內容長度: ${appHtml.length} 字元`);
}

main().catch((err) => {
  console.error('[prerender] 失敗，改用原本的空殼 index.html（不影響網站正常運作，只是爬蟲抓不到內容）:', err.message);
  // 刻意不 process.exit(1)，避免預渲染失敗導致整個部署卡住
});
