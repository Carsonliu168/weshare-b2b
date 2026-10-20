// 自動化預渲染腳本
// 用 React 官方 SSR 功能，把各路由頁面算成靜態 HTML，各自輸出成獨立的 index.html
// 這樣爬蟲（Google、NotebookLM 等）不需要執行 JavaScript 就能讀到完整內容，
// 而且 /pricing、/faq 等網址直接訪問或重新整理時，伺服器也能直接找到對應的靜態頁面。
// 每次 `npm run build` 都會自動重新執行，永遠跟最新的網站內容同步，不會有過期問題

import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import React from 'react';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const root = resolve(__dirname, '..');

// 每個路由的路徑、對應的元件、以及各自的 SEO meta 資訊
const routes = [
  {
    path: '/',
    url: 'https://www.weshareai.tw/',
    componentKey: 'HomePage',
    outFile: 'dist/index.html',
    title: '國際新聞稿發佈｜AP、Reuters 發稿與海外買家情報｜維訊國際數位',
    description: '全球 3,000+ 通訊社媒體發稿，結合 AI 數據智能，為企業、品牌與政府機關提供國際媒體曝光與 B2B 買家情報訂閱服務。',
    ogDescription: '全球媒體聲量 × AI 數據智能 = 可量化的商機與影響力', // 首頁社群分享沿用原標語
  },
  {
    path: '/pricing',
    url: 'https://www.weshareai.tw/pricing',
    componentKey: 'Pricing',
    outFile: 'dist/pricing/index.html',
    title: '國際新聞稿發佈訂閱方案｜維訊國際數位',
    description: '四種買家情報訂閱方案，依業務規模與目標市場量身規劃。基礎版、進階版、專業版、旗艦版，先了解需求再配置合適方案。',
  },
  {
    path: '/faq',
    url: 'https://www.weshareai.tw/faq',
    componentKey: 'FAQ',
    outFile: 'dist/faq/index.html',
    title: '國際新聞稿與海外買家情報常見問題｜維訊國際數位',
    description: '關於維訊全球媒體發稿、AI 買家情報服務、戰情報告交付流程的常見問題整理。',
    faqSchema: true, // 同一組問答只標記一處（Google 規範），首頁不重複標記
  },
];

async function main() {
  const { HomePage, Pricing, FAQ, faqs } = await import(resolve(root, 'dist-ssr/ssr-entry.js'));
  const components = { HomePage, Pricing, FAQ };

  const indexPath = resolve(root, 'dist/index.html');
  const templateHtml = readFileSync(indexPath, 'utf-8');

  for (const route of routes) {
    const Component = components[route.componentKey];
    const appHtml = renderToString(
      React.createElement(
        StaticRouter,
        { location: route.path },
        React.createElement(Component)
      )
    );

    // 用函式當替換值，避免內容裡的 $ 符號被 String.replace 當成特殊語法
    let html = templateHtml
      .replace('<div id="root"></div>', () => `<div id="root">${appHtml}</div>`)
      .replace(/<title>.*?<\/title>/, () => `<title>${route.title}</title>`)
      .replace(
        /<meta name="description" content=".*?" \/>/,
        () => `<meta name="description" content="${route.description}" />`
      )
      .replace(
        /<link rel="canonical" href=".*?" \/>/,
        () => `<link rel="canonical" href="${route.url}" />`
      );

    // 社群分享標籤（LINE / Facebook / X）：每頁各自對應，不再一律顯示首頁資訊
    const esc = (v) => v.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
    const setMeta = (src, attr, key, value) =>
      src.replace(
        new RegExp(`<meta ${attr}="${key}" content=".*?" \\/>`),
        () => `<meta ${attr}="${key}" content="${esc(value)}" />`
      );
    const shareDesc = route.ogDescription ?? route.description;
    html = setMeta(html, 'property', 'og:title', route.title);
    html = setMeta(html, 'property', 'og:description', shareDesc);
    html = setMeta(html, 'property', 'og:url', route.url);
    html = setMeta(html, 'name', 'twitter:title', route.title);
    html = setMeta(html, 'name', 'twitter:description', shareDesc);

    // FAQPage 結構化資料：直接取自 src/data/faqs.ts，與頁面上顯示的問答永遠一致
    if (route.faqSchema) {
      const faqJson = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }).replace(/</g, '\\u003c');
      html = html.replace(
        '</head>',
        `<script type="application/ld+json">${faqJson}</script>\n  </head>`
      );
    }

    const outPath = resolve(root, route.outFile);
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, html, 'utf-8');
    console.log(`[prerender] ${route.path} 完成，注入內容長度: ${appHtml.length} 字元 → ${route.outFile}`);
  }
}

main().catch((err) => {
  console.error('[prerender] 失敗，改用原本的空殼 index.html（不影響網站正常運作，只是爬蟲抓不到內容）:', err.message);
  // 刻意不 process.exit(1)，避免預渲染失敗導致整個部署卡住
});
