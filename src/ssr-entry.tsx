// 專供預渲染腳本（scripts/prerender.mjs）使用的 SSR 進入點
// 把所有需要預渲染的頁面元件集中匯出成一個 SSR bundle，
// 避免每個路由檔案都要各自跑一次 `vite build --ssr`

export { HomePage } from './App';
export { default as Pricing } from './pages/Pricing';
export { default as FAQ } from './pages/FAQ';
export { faqs } from './data/faqs';
