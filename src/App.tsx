import { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import TopNav from './components/TopNav';
import Pricing from './pages/Pricing';
import FAQ from './pages/FAQ';
import {
  XCircle,
  CheckCircle,
  ArrowUpRight,
} from 'lucide-react';

const navItems = [
  { id: 'section-1', label: '執行總覽' },
  { id: 'section-2', label: '媒體實績' },
  { id: 'section-5', label: '競爭優勢' },
  { id: 'section-3', label: '四階增長引擎' },
  { id: 'section-4', label: '戰情月報' },
  { id: 'section-6', label: '方案規劃' },
  { id: 'section-faq', label: '常見問題' },
  { id: 'section-contact', label: '立即諮詢' },
];

const stages = [
  {
    number: '01',
    name: '權威奠基模組',
    english: 'Global PR Trust Bait',
    detail:
      '部署全球 3,000+ 一線財經媒體發稿矩陣，以第三方公信力建立品牌權威基礎，為後續買家開發建立信任背書。',
  },
  {
    number: '02',
    name: '全球多源採購意圖數據',
    english: 'Global Purchasing Intent Ingestion',
    detail:
      '整合跨境海關提單數據庫，交叉比對篩選具有真實採購意圖的目標公司，並由團隊進一步確認採購決策者身份與聯絡方式。',
  },
  {
    number: '03',
    name: 'AI 目標帳號行銷矩陣',
    english: 'AI-Powered Account Intelligence',
    detail:
      '運用 AI 模型輔助多源資料交叉比對，鎖定關鍵決策者候選名單，補齊職稱與聯繫方式，交付客戶業務團隊即可直接展開的高精準溝通名單。',
  },
  {
    number: '04',
    name: '網站企業意圖解密系統',
    english: 'Corporate IP De-anonymization',
    detail:
      '追蹤造訪客戶網站的企業 IP 特徵，對點擊 PR 連結的匿名買家進行企業域名反向追蹤，定期彙整進戰情報告通知業務團隊，持續掌握潛在商機。',
  },
];

import { tiers } from './data/tiers';
import { faqs } from './data/faqs';

const mediaLogos = [
  { name: 'AP', zh: '美聯社', file: 'ap.png' },
  { name: 'Reuters', zh: '路透社', file: 'reuters.png' },
  { name: 'Yahoo', zh: '雅虎', file: 'yahoo.png' },
  { name: 'AFP', zh: '法新社', file: 'afp.png' },
  { name: 'Financial Times', zh: '金融時報', file: 'ft.png' },
  { name: 'Asahi Shimbun', zh: '朝日新聞', file: 'asahi.png' },
  { name: 'JIJI Press', zh: '時事通訊社', file: 'jiji.png' },
  { name: 'Sankei News', zh: '產經新聞', file: 'sankei.png' },
  { name: 'JoongAng Ilbo', zh: '中央日報', file: 'joongang.png' },
  { name: 'Chosun Ilbo', zh: '朝鮮日報', file: 'chosun.png' },
];

function MediaLogoMarquee() {
  const logos = [...mediaLogos, ...mediaLogos];
  return (
    <div className="mt-8 mb-4 overflow-hidden bg-white rounded-xl border border-gray-100 shadow-sm py-4">
      <div className="marquee-track flex items-start gap-10 w-max">
        {logos.map((logo, i) => (
          <div key={`${logo.name}-${i}`} className="flex flex-col items-center flex-shrink-0">
            <img
              src={`/logos/${logo.file}`}
              alt={logo.name}
              title={logo.name}
              className="h-6 md:h-8 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
            />
            <span className="mt-1.5 font-inter text-[10px] md:text-xs text-text-muted/70 whitespace-nowrap">
              {logo.zh}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnimatedCounter({ end, suffix = '', duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(end);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          setCount(0);
          let startTime: number;
          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return (
    <div ref={ref} className="counter-animate">
      <span className="font-playfair text-4xl md:text-5xl font-bold text-gold">
        {count.toLocaleString()}{suffix}
      </span>
    </div>
  );
}

function Sidebar({ activeSection }: { activeSection: string }) {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed left-0 top-0 h-screen w-56 bg-navy border-r border-gold/40 z-50 hidden lg:flex flex-col">
      <div className="p-6 border-b border-gold/20">
        <div className="font-playfair text-gold text-lg font-semibold">維訊國際數位</div>
        <div className="text-neon-blue/60 text-xs mt-1 tracking-wider">WESHARE DIGITAL</div>
      </div>
      <div className="flex-1 py-8 px-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
              activeSection === item.id
                ? 'bg-gold/20 text-gold border-l-2 border-gold gold-glow'
                : 'text-white/70 hover:text-gold hover:bg-white/5'
            }`}
          >
            <span className="font-inter text-sm">{item.label}</span>
          </button>
        ))}
        <div className="pt-3 mt-3 border-t border-gold/20 space-y-2">
          <Link
            to="/pricing"
            className="block px-4 py-3 rounded-lg font-inter text-sm text-white/70 hover:text-gold hover:bg-white/5 transition-all duration-300"
          >
            訂閱方案頁面 →
          </Link>
          <Link
            to="/faq"
            className="block px-4 py-3 rounded-lg font-inter text-sm text-white/70 hover:text-gold hover:bg-white/5 transition-all duration-300"
          >
            完整常見問題 →
          </Link>
        </div>
      </div>
      <div className="p-4 border-t border-gold/20">
        <div className="text-white/50 text-xs text-center">© 2026 維訊國際數位</div>
      </div>
    </nav>
  );
}

function SectionDivider() {
  return <div className="section-divider w-full" />;
}

function Particles() {
  return (
    <div className="diagonal-lines">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="diagonal-line"
          style={{
            top: `${i * 20}%`,
            left: '-50%',
            animationDelay: `${i * 2}s`,
          }}
        />
      ))}
    </div>
  );
}

function Section1() {
  const [lineExpanded, setLineExpanded] = useState(false);

  useEffect(() => {
    setLineExpanded(true);
  }, []);

  const scrollToSection3 = () => {
    const element = document.getElementById('section-3');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="section-1"
      className="min-h-screen w-full overflow-x-hidden geometric-bg relative flex flex-col items-center justify-center py-20 px-6 lg:pl-56"
    >
      <Particles />
      <div className="hero-glow relative z-10 max-w-4xl mx-auto text-center">
        {/* 品牌鎖定組合：logo 在左，右側三行（英文名／中文名／副標）寬度對齊；中文名為 6 個字 = 6em */}
        <div
          className="flex items-center justify-center gap-3 md:gap-6 mb-8 animate-fade-in"
          style={{ fontSize: 'clamp(1.8rem, calc((100vw - 60px) / 9.2), 4rem)', animationDelay: '0.3s' }}
        >
          {/* 沿用原本的 /logo.png；原檔四周有透明留白，這裡用 CSS 裁掉留白，讓圖案大小與右側三行文字對得上 */}
          <div
            className="relative shrink-0 overflow-hidden h-[2.4em]"
            style={{ aspectRatio: '292 / 249' }}
          >
            <img
              src="/logo.png"
              alt="Weshare Logo"
              className="absolute max-w-none"
              style={{ width: '171.2%', height: '200.8%', left: '-35.96%', top: '-49.4%' }}
            />
          </div>
          <div className="text-left" style={{ width: '6em', lineHeight: 1.1 }}>
            <p
              className="font-inter font-bold text-gold uppercase whitespace-nowrap"
              style={{
                fontSize: '0.312em',
                letterSpacing: '0.03em',
                textAlign: 'justify',
                textAlignLast: 'justify',
                marginBottom: '0.15em',
              }}
            >
              WESHARE INTERNATIONAL DIGITAL
            </p>
            <h1 className="font-playfair text-white font-bold break-keep" style={{ fontSize: '1em' }}>
              維訊國際數位
              <span
                className="block font-inter font-normal whitespace-nowrap"
                style={{
                  fontSize: '0.42em',
                  marginTop: '0.25em',
                  color: '#cfe4ff',
                  textAlign: 'justify',
                  textAlignLast: 'justify',
                  textJustify: 'inter-character',
                }}
              >
                國際新聞稿發佈與海外買家情報
              </span>
            </h1>
          </div>
        </div>

        <h2 className="font-playfair text-2xl md:text-3xl text-gold mb-8 animate-fade-in gold-glow" style={{ animationDelay: '0.6s' }}>
          全球媒體聲量 × AI 數據智能 = 可量化的商機與影響力
        </h2>

        <div className="flex justify-center mb-8 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <div
            className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent transition-all duration-1000"
            style={{ width: lineExpanded ? '200px' : '0px' }}
          />
        </div>

        <p className="font-inter text-white/75 text-lg md:text-xl max-w-2xl mx-auto mb-6 animate-fade-in leading-relaxed" style={{ animationDelay: '1s' }}>
          維訊核心服務：全球新聞稿發佈（涵蓋 AP、路透社等 3,000+ 媒體通訊社）、AI 海外買家與經銷商情報蒐集、競爭對手市場情報監控——為企業、政府機關與各類品牌提供國際曝光與市場拓展的情報訂閱服務
        </p>
        <div className="flex flex-wrap justify-center gap-2 mb-12 animate-fade-in" style={{ animationDelay: '1.1s' }}>
          {['製造外銷', '生技醫療', '政府機關', '品牌活動', '國際會議', '觀光推廣', '科技新創'].map((tag) => (
            <span key={tag} className="font-inter text-xs text-gold/80 border border-gold/30 rounded-full px-3 py-1">
              #{tag}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-12 animate-fade-in" style={{ animationDelay: '1.2s' }}>
          <div className="text-center py-4 sm:py-0">
            <AnimatedCounter end={3000} suffix="+" />
            <div className="font-inter text-white/70 text-sm mt-2">全球合作通訊社</div>
          </div>
          <div className="text-center py-4 sm:py-0">
            <AnimatedCounter end={100} suffix="%" />
            <div className="font-inter text-white/70 text-sm mt-2">免技術門檻</div>
          </div>
          <div className="text-center py-4 sm:py-0">
            <AnimatedCounter end={4} />
            <div className="font-inter text-white/70 text-sm mt-2">核心增長引擎</div>
          </div>
        </div>

        <button
          onClick={scrollToSection3}
          className="font-inter px-8 py-4 border-2 border-gold text-gold rounded-lg hover:bg-gold/10 transition-all duration-300 gold-box-glow animate-fade-in"
          style={{ animationDelay: '1.4s' }}
        >
          進入實戰展示
          <ArrowUpRight className="inline-block ml-2 w-5 h-5" />
        </button>

        <div className="mt-6 text-center font-inter text-gold/60 text-xs animate-fade-in" style={{ animationDelay: '1.6s' }}>
          Powered by Weshare AI Intelligence
        </div>
      </div>
    </section>
  );
}

function Section2() {
  return (
    <section id="section-2" className="min-h-screen w-full overflow-x-hidden bg-slate-light py-20 px-6 lg:pl-56">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-playfair text-navy font-bold mb-16 text-center leading-tight" style={{fontSize: "clamp(1.4rem, 4.5vw, 2rem)"}}>
          從品牌曝光到商機轉化
        </h2>

        <div className="bg-navy rounded-xl p-8 border-l-4 border-gold mb-12">
          <p className="font-inter text-gold text-lg leading-relaxed">
            維訊透過全球 3,000+ 精選通訊社網絡發稿，為企業、品牌與政府機關解決國際曝光難題，其中涵蓋 Yahoo 財經、美聯社、路透社等月活躍用戶上億的頂級媒體平台。每篇稿件發佈期間同步被 Google 等搜尋引擎收錄索引，強化曝光期間的國際能見度與搜尋觸及。
          </p>
        </div>

        <MediaLogoMarquee />

        {/* 媒體刊登實績 */}
        <div className="mt-12 mb-16">
          <h3 className="font-playfair text-2xl text-navy font-bold text-center mb-2">媒體刊登實績</h3>
          <p className="font-inter text-text-muted text-center text-sm mb-8">以下為維訊透過通訊社網絡發佈之新聞稿，於 AP News、Reuters 新聞稿專區刊登的實例</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl overflow-hidden border-2 border-navy/20 shadow-lg">
              <div className="bg-navy px-4 py-2 flex items-center gap-2">
                <span className="font-inter text-white font-bold text-sm">AP</span>
                <span className="font-inter text-white/90 text-xs">Associated Press · AP News</span>
              </div>
              <div className="h-64 md:h-72 overflow-hidden">
                <img src="/press-ap.jpg" alt="AP News 刊登截圖" className="w-full h-full object-cover object-top" />
              </div>
            </div>
            <div className="rounded-xl overflow-hidden border-2 border-navy/20 shadow-lg">
              <div className="bg-[#FF8000] px-4 py-2 flex items-center gap-2">
                <span className="font-inter text-white font-bold text-sm">Reuters</span>
                <span className="font-inter text-white/90 text-xs">路透社 · 全球最大通訊社</span>
              </div>
              <div className="h-64 md:h-72 overflow-hidden">
                <img src="/press-reuters.jpg" alt="Reuters 刊登截圖" className="w-full h-full object-cover object-top" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Section3() {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <section id="section-3" className="min-h-screen w-full overflow-x-hidden geometric-bg relative py-20 px-6 lg:pl-56">
      <Particles />
      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="font-playfair text-white font-bold mb-16 text-center" style={{fontSize: "clamp(1.1rem, 3.5vw, 2.2rem)"}}>
          維訊數據引擎：全路徑商機鎖定
        </h2>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {stages.map((stage, index) => (
            <button
              key={stage.number}
              onClick={() => setActiveStage(index)}
              className={`gradient-card rounded-xl p-6 text-center transition-all duration-300 card-hover cursor-pointer ${
                activeStage === index
                  ? 'border-2 border-gold gold-box-glow'
                  : 'border border-white/10 opacity-60 hover:opacity-100'
              }`}
            >
              <div className="font-playfair text-gold text-3xl font-bold mb-2">{stage.number}</div>
              <div className="font-inter text-white text-sm font-semibold mb-1">{stage.name}</div>
              <div className="font-inter text-white/50 text-xs">{stage.english}</div>
            </button>
          ))}
        </div>

        <div className="relative">
          {stages.map((stage, index) => (
            <div
              key={stage.number}
              className={`gradient-card rounded-xl p-8 border-l-4 border-gold ${
                activeStage === index ? 'block animate-fade-in' : 'hidden'
              }`}
            >
              <div className="flex items-center mb-4">
                <span className="font-playfair text-gold text-2xl font-bold mr-4">
                  {stage.number}
                </span>
                <div>
                  <h3 className="font-inter text-white text-lg font-semibold">
                    {stage.name}
                  </h3>
                  <p className="font-inter text-gold/70 text-sm">{stage.english}</p>
                </div>
              </div>
              <p className="font-inter text-white/80 leading-relaxed text-lg">
                {stage.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Section4() {
  return (
    <section id="section-4" className="min-h-screen w-full overflow-x-hidden bg-slate-light py-20 px-6 lg:pl-56">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-playfair text-navy font-bold mb-4 text-center" style={{fontSize: "clamp(1.5rem, 4vw, 2.2rem)"}}>
          維訊全球商務戰情報告
        </h2>
        <p className="font-inter text-text-muted text-center mb-4">
          以下為戰情報告版面示意，實際交付格式與內容依訂閱方案而定
        </p>
        <p className="font-inter text-text-muted/70 text-center text-xs mb-12">
          * 客戶資料依保密協議處理，圖表為示意數據
        </p>

        <picture>
          <source media="(min-width: 768px)" srcSet="/report-demo-desktop.png" />
          <img
            src="/report-demo-mobile.png"
            alt="維訊全球商務戰情報告示意：全球海關提單定期監控分析、企業訪客識別趨勢、匿名企業訪客意圖解密"
            className="w-full rounded-xl border border-gold/20"
            loading="lazy"
          />
        </picture>
      </div>
    </section>
  );
}

function Section5() {
  const rows = [
    {
      label: '買家身份識別',
      traditional: '無買家身份識別',
      saas: '不知道如何精準觸達海外客群',
      weshare: 'AI 買家意圖識別與追蹤',
    },
    {
      label: '全球媒體矩陣',
      traditional: '無全球媒體矩陣',
      saas: '無媒體發佈資源',
      weshare: '全球 3,000+ 通訊社矩陣',
    },
    {
      label: '執行方式',
      traditional: '依賴人工執行',
      saas: '無託管執行服務',
      weshare: '情報蒐集與產製全代辦',
    },
    {
      label: '技術/人力需求',
      traditional: '無目標客戶自動追蹤',
      saas: '需客戶自行操作，學習曲線陡峭',
      weshare: '零技術/數據人力需求',
    },
    {
      label: '成效報告',
      traditional: '品牌聲量難以量化轉換，缺乏歸因報告',
      saas: '數據分散難整合',
      weshare: '每月固定戰情報告',
    },
    {
      label: '國際拓展成本',
      traditional: '國際展會成本高漲，ROI 下滑',
      saas: null,
      weshare: '媒體 × 商機情報整合',
    },
  ];

  return (
    <section id="section-5" className="min-h-screen w-full overflow-x-hidden geometric-bg relative py-20 px-6 lg:pl-56">
      <Particles />
      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="font-playfair text-white font-bold mb-4 text-center" style={{fontSize: "clamp(1.5rem, 4vw, 2.2rem)"}}>
          維訊國際數位的優勢
        </h2>
        <p className="font-inter text-gold text-center mb-12">
          與傳統做法相比，維訊如何解決品牌國際曝光與商機轉化的痛點
        </p>

        <div className="overflow-x-auto mb-8 -mx-6 px-6 lg:mx-0 lg:px-0">
          <table className="w-full min-w-[640px] border-collapse rounded-xl overflow-hidden">
            <thead>
              <tr>
                <th className="text-left p-4 bg-transparent"></th>
                <th className="text-left p-4 bg-white/5 text-white/50 font-inter text-sm font-semibold border-b-2 border-gold/20">
                  傳統 PR 公關公司
                </th>
                <th className="text-left p-4 bg-white/5 text-white/50 font-inter text-sm font-semibold border-b-2 border-gold/20">
                  SaaS 軟體經銷商
                </th>
                <th className="text-left p-4 bg-gradient-to-br from-gold to-yellow-200 text-navy font-inter text-sm font-semibold border-b-2 border-gold/20">
                  維訊國際數位
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => {
                const stripe = i % 2 === 1;
                return (
                <tr key={i}>
                  <td className={`p-4 text-white font-inter text-sm font-semibold border-b border-white/20 whitespace-nowrap ${stripe ? 'bg-white/[0.05]' : 'bg-white/[0.02]'}`}>
                    {row.label}
                  </td>
                  <td className={`p-4 text-white/70 font-inter text-sm border-b border-white/20 ${stripe ? 'bg-white/[0.03]' : ''}`}>
                    <span className="inline-flex items-center">
                      <XCircle className="w-4 h-4 mr-2 text-red-400 flex-shrink-0" />
                      {row.traditional}
                    </span>
                  </td>
                  <td className={`p-4 text-white/70 font-inter text-sm border-b border-white/20 ${stripe ? 'bg-white/[0.03]' : ''}`}>
                    {row.saas ? (
                      <span className="inline-flex items-center">
                        <XCircle className="w-4 h-4 mr-2 text-red-400 flex-shrink-0" />
                        {row.saas}
                      </span>
                    ) : (
                      <span className="text-white/30">—</span>
                    )}
                  </td>
                  <td className={`p-4 text-white font-inter text-sm font-semibold border-b border-white/20 ${stripe ? 'bg-gold/[0.14]' : 'bg-gold/10'}`}>
                    <span className="inline-flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-gold flex-shrink-0" />
                      {row.weshare}
                    </span>
                  </td>
                </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="bg-navy rounded-xl p-8 border border-gold/40">
          <p className="font-inter text-gold text-lg text-center leading-relaxed">
            維訊團隊全程代為蒐集與產製情報，客戶無需企業內部建立技術團隊、無需追趕AI工具汰換浪潮，只需專注本業產品研發，接收並運用維訊持續為您掌握的商機情報，精準掌握市場動脈；業務決策與最終執行，仍由貴公司團隊主導。
          </p>
        </div>
      </div>
    </section>
  );
}

function Section6() {
  return (
    <section id="section-6" className="min-h-screen w-full overflow-x-hidden bg-slate-light py-20 px-6 lg:pl-56">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-playfair text-2xl md:text-3xl text-navy font-bold mb-4 text-center" style={{fontSize: "clamp(1.5rem, 4vw, 2.2rem)"}}>
          階梯式情報訂閱方案規劃
        </h2>
        <p className="font-inter text-text-muted text-center mb-12">
          依業務規模與目標市場量身規劃，由維訊團隊產製並定期交付戰情報告
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {tiers.map((tier, i) => (
            <div
              key={i}
              className={`rounded-xl p-8 transition-all duration-300 card-hover relative flex flex-col ${
                tier.highlighted
                  ? 'bg-navy border-2 border-gold gold-box-glow'
                  : 'bg-white border-2 border-navy/20'
              }`}
            >
              {tier.badge && (
                <div className="absolute top-4 right-4 bg-gold text-navy text-xs font-semibold px-3 py-1 rounded-full">
                  {tier.badge}
                </div>
              )}
              <div className="mb-6">
                <h3 className={`font-playfair text-2xl font-bold ${tier.highlighted ? 'text-gold' : 'text-navy'}`}>
                  {tier.title}
                </h3>
                <p className={`font-inter text-sm ${tier.highlighted ? 'text-white/70' : 'text-text-muted'}`}>
                  {tier.subtitle}
                </p>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((feature, j) => (
                  <li key={j} className={`flex items-start ${tier.highlighted ? 'text-white' : 'text-text-dark'}`}>
                    <CheckCircle className={`w-5 h-5 mr-3 flex-shrink-0 ${tier.highlighted ? 'text-gold' : 'text-navy'}`} />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => document.getElementById('section-contact')?.scrollIntoView({ behavior: 'smooth' })}
                className={`w-full py-3 rounded-lg font-inter font-semibold transition-all duration-300 ${
                  tier.highlighted
                    ? 'bg-gold text-navy hover:bg-gold/90 gold-box-glow'
                    : 'bg-navy text-white hover:bg-navy-light'
                }`}
              >
                洽詢專員規劃
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="section-faq" className="w-full overflow-x-hidden bg-slate-light py-20 px-6 lg:pl-56">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-playfair text-navy font-bold mb-4 text-center" style={{fontSize: "clamp(1.5rem, 4vw, 2.2rem)"}}>
          常見問題
        </h2>
        <p className="font-inter text-text-muted text-center mb-12">關於維訊服務的常見疑問</p>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-navy/20 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-4 text-left flex items-center justify-between bg-white hover:bg-navy/5 transition-colors"
              >
                <span className="font-inter font-semibold text-navy pr-4">{faq.q}</span>
                <span className="text-gold font-bold text-xl flex-shrink-0">{openIndex === i ? '−' : '+'}</span>
              </button>
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  openIndex === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-6 py-4 bg-navy/5 border-t border-navy/10">
                    <p className="font-inter text-text-muted leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [formData, setFormData] = useState({ name: '', company: '', service: '', contact: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (sending) return;
    if (!formData.name.trim() || !formData.company.trim() || !formData.contact.trim()) {
      setError('請填寫姓名、公司名稱與聯絡方式（標示 * 的欄位）。');
      return;
    }
    setError('');
    setSending(true);
    try {
      const response = await fetch('https://formspree.io/f/mojgvbdw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          姓名: formData.name,
          公司名稱: formData.company,
          服務需求: formData.service,
          聯絡方式: formData.contact,
        }),
      });
      if (response.ok) {
        setSubmitted(true);
      } else {
        setError('送出失敗，請稍後再試，或直接寄信至 weshareai168@gmail.com。');
      }
    } catch (err) {
      console.error('Form submission error:', err);
      setError('網路連線異常，送出失敗。請稍後再試，或直接寄信至 weshareai168@gmail.com。');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="section-contact" className="w-full overflow-x-hidden bg-slate-light py-20 px-6 lg:pl-56">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-playfair text-navy font-bold mb-4 text-center" style={{fontSize: "clamp(1.5rem, 4vw, 2.2rem)"}}>
          立即諮詢
        </h2>
        <p className="font-inter text-text-muted text-center mb-12">
          填寫以下資料，維訊專員將於 24 小時內與您聯繫
        </p>
        {submitted ? (
          <div className="bg-navy rounded-xl p-12 text-center border-2 border-gold gold-box-glow">
            <CheckCircle className="w-16 h-16 text-gold mx-auto mb-4" />
            <h3 className="font-playfair text-2xl text-gold font-bold mb-2">感謝您的諮詢！</h3>
            <p className="font-inter text-white/70">我們的專員將於 24 小時內與您聯繫。</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl p-8 border-2 border-navy/20 shadow-lg space-y-5">
            <div>
              <label className="font-inter text-sm text-navy font-semibold mb-2 block">姓名 *</label>
              <input
                type="text"
                placeholder="您的姓名"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border-2 border-navy/20 font-inter text-navy focus:outline-none focus:border-gold transition-colors"
              />
            </div>
            <div>
              <label className="font-inter text-sm text-navy font-semibold mb-2 block">公司名稱 *</label>
              <input
                type="text"
                placeholder="您的公司名稱"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border-2 border-navy/20 font-inter text-navy focus:outline-none focus:border-gold transition-colors"
              />
            </div>
            <div>
              <label className="font-inter text-sm text-navy font-semibold mb-2 block">服務需求</label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border-2 border-navy/20 font-inter text-navy focus:outline-none focus:border-gold transition-colors bg-white"
              >
                <option value="">請選擇方案</option>
                <option value="tier1">基礎版 — 全球媒體聲量方案</option>
                <option value="tier2">進階版 — 定向情報服務</option>
                <option value="tier3">專業版 — 匿名解密戰情室</option>
                <option value="tier4">旗艦版 — 國際擴張全方位夥伴</option>
                <option value="custom">客製化需求</option>
              </select>
            </div>
            <div>
              <label className="font-inter text-sm text-navy font-semibold mb-2 block">聯絡方式 *（Email 或電話）</label>
              <input
                type="text"
                placeholder="your@email.com 或 0912-345-678"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border-2 border-navy/20 font-inter text-navy focus:outline-none focus:border-gold transition-colors"
              />
            </div>
            {error && (
              <p role="alert" className="font-inter text-sm text-red-600 text-center">
                {error}
              </p>
            )}
            <button
              onClick={handleSubmit}
              disabled={sending}
              className="w-full py-4 bg-navy text-white font-inter font-semibold rounded-lg hover:bg-gold hover:text-navy transition-all duration-300 text-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {sending ? '送出中…' : '立即諮詢'}
            </button>
            <p className="font-inter text-text-muted text-sm text-center">
              或直接來電：<a href="tel:+886-4-36074568" className="text-navy font-semibold underline">04-36074568</a>
            </p>
            <p className="font-inter text-text-muted text-xs text-center">
              或直接寄信至：<a href="mailto:weshareai168@gmail.com" className="text-gold underline">weshareai168@gmail.com</a>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="w-full overflow-x-hidden geometric-bg relative py-12 px-6 lg:pl-56">
      <Particles />
      <div className="max-w-6xl mx-auto relative z-10 text-center">
        <p className="font-inter text-white/80 text-sm mb-4">
          聯絡電話：<a href="tel:+886-4-36074568" className="text-gold hover:underline">04-36074568</a>
          <span className="mx-2 text-white/30" aria-hidden="true">|</span>
          <a href="mailto:weshareai168@gmail.com" className="text-gold hover:underline">weshareai168@gmail.com</a>
        </p>
        <p className="font-inter text-white text-lg mb-2">© 2026 維訊國際數位有限公司</p>
        <p className="font-inter text-gold text-sm mb-4">
          版權所有 · All Rights Reserved
        </p>
        <p className="font-inter text-white/50 text-xs">
          Weshare International Digital Co., Ltd. · 未經授權，禁止轉載或複製本站任何內容
        </p>
      </div>
    </footer>
  );
}

export function HomePage() {
  const [activeSection, setActiveSection] = useState('section-1');
  const location = useLocation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  // 支援從其他頁面（如 /pricing、/faq）點擊「立即諮詢」後，帶著 #section-contact 錨點導回首頁時，自動捲動到該區塊
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }
  }, [location]);

  return (
    <div className="font-inter bg-navy min-h-screen">
      <div className="lg:hidden">
        <TopNav />
      </div>
      <Sidebar activeSection={activeSection} />
      <main className="w-full pt-14 lg:pt-0">
        <Section1 />
        <SectionDivider />
        <Section2 />
        <SectionDivider />
        <Section5 />
        <SectionDivider />
        <Section3 />
        <SectionDivider />
        <Section4 />
        <SectionDivider />
        <Section6 />
        <SectionDivider />
        <FAQSection />
        <SectionDivider />
        <ContactSection />
        <SectionDivider />
        <Footer />
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
