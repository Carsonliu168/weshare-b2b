import { useEffect, useRef, useState } from 'react';
import {
  TrendingDown,
  Search,
  DollarSign,
  User,
  Building2,
  Settings,
  XCircle,
  CheckCircle,
  Eye,
  Target,
  Zap,
  Globe,
  BarChart3,
  Users,
  Shield,
  Brain,
  Award,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Area } from 'recharts';

const abmData = [
  { month: 'Jan', value: 1.2 },
  { month: 'Feb', value: 1.8 },
  { month: 'Mar', value: 2.4 },
  { month: 'Apr', value: 3.1 },
  { month: 'May', value: 3.5 },
  { month: 'Jun', value: 3.8 },
];

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
      '整合跨境海關提單數據庫與全球展會參展商情報，交叉比對篩選具有真實採購意圖的目標公司，並由團隊進一步確認採購決策者身份與聯絡方式。',
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

const competitorData = [
  { competitor: 'Competitor Alpha', region: 'EU-7 採購集團', volume: '1,240 CBM', change: -12 },
  { competitor: 'Competitor Beta', region: '北美供應鏈中心', volume: '980 CBM', change: 8 },
  { competitor: 'Competitor Gamma', region: '東南亞經銷商', volume: '670 CBM', change: -5 },
];

const visitors = [
  { country: '🇩🇪', company: 'Würth Group（德國）', page: '產品認證規格頁', time: '4 分 32 秒', triggered: false },
  { country: '🇺🇸', company: 'Home Depot HQ（美國）', page: 'OEM 代工規格頁', time: '3 分 08 秒', triggered: false },
  { country: '🇯🇵', company: 'Misumi Corporation（日本）', page: '合作夥伴頁', time: '2 分 17 秒', triggered: false },
  { country: '🇬🇧', company: 'Travis Perkins（英國）', page: '詢價聯絡頁', time: '6 分 54 秒', triggered: true },
];

const tiers = [
  {
    title: '基礎版',
    subtitle: '全球媒體聲量方案',
    highlighted: false,
    features: [
      '全球 3,000+ 通訊社媒體發稿',
      '涵蓋 Yahoo 財經、美聯社、路透社等月活躍用戶上億的頂級媒體平台',
      '刊登期間同步被 Google 等搜尋引擎收錄索引',
      '彈性選擇：單次專案 / 季度方案 / 年約方案',
      '適合各行各業：製造外銷、生技醫療、政府機關、品牌活動、國際會議',
      '標準媒體刊登成效報告（PDF）',
      '維訊精選每日晨間情報：全球經濟事件與產業新聞精選（2分鐘掌握市場動態）',
    ],
  },
  {
    title: '進階版',
    subtitle: '定向情報服務',
    highlighted: false,
    features: [
      '含基礎版全部內容',
      'AI 精準買手名單與採購意圖情報交付',
      '目標市場採購決策者資料庫',
      'ABI 買家意圖追蹤報告',
      '競爭對手媒體動態監控（新聞事件追蹤彙整）',
      '全球 3,000+ 媒體發稿（進階版）',
      '晨間情報進階版：加入維訊精選買家動態提醒',
    ],
  },
  {
    title: '專業版',
    subtitle: '匿名解密戰情室',
    highlighted: true,
    badge: '主力推薦',
    features: [
      '含進階版全部內容',
      '企業訪客 IP 反向解密系統',
      '定期戰情報告交付',
      '固定格式月度策略洞察報告',
      '全球展會通路夥伴與競爭情報彙整',
      '訪客動態自動通知與戰情彙整',
    ],
  },
  {
    title: '旗艦版',
    subtitle: '國際擴張全方位夥伴',
    highlighted: false,
    features: [
      '含專業版全部內容',
      '頂級全球權威媒體 PR 發稿',
      'GEO 生成式搜索引擎優化',
      'AI 品牌影音內容製作',
      '專案負責人一對一直接對接',
      '優先體驗維訊新推出情報功能與工具',
    ],
  },
];

const mediaLogos = [
  { name: 'AP', zh: '美聯社', file: 'ap.png' },
  { name: 'Reuters', zh: '路透社', file: 'reuters.png' },
  { name: 'Yahoo', zh: '雅虎', file: 'yahoo.png' },
  { name: 'AFP', zh: '法新社', file: 'afp.png' },
  { name: 'Financial Times', zh: '金融時報', file: 'ft.png' },
  { name: 'Digital Journal', zh: '加拿大數位', file: 'digitaljournal-v2.png' },
  { name: 'Asahi Shimbun', zh: '朝日新聞', file: 'asahi.png' },
  { name: 'JIJI Press', zh: '時事通訊社', file: 'jiji.png' },
  { name: 'Sankei News', zh: '產經新聞', file: 'sankei.png' },
  { name: 'The Globe and Mail', zh: '環球郵報', file: 'globeandmail.png' },
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
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

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
      </div>
      <div className="p-4 border-t border-gold/20">
        <div className="text-white/50 text-xs text-center">© 2025 維訊國際數位</div>
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
      className="min-h-screen w-full overflow-x-hidden geometric-bg relative flex flex-col items-center justify-center py-20 px-6"
    >
      <Particles />
      <div className="hero-glow relative z-10 max-w-4xl mx-auto text-center">
        <div className="mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <span className="font-inter text-gold text-xs tracking-[0.3em] uppercase">
            WESHARE INTERNATIONAL DIGITAL
          </span>
        </div>

        <div className="flex items-center justify-center gap-2 mb-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <img src="/logo.png" alt="Weshare Logo" className="w-14 h-14 md:w-20 md:h-20 object-contain" />
          <h1
            className="font-playfair text-white font-bold break-keep"
            style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)' }}
          >
            維訊國際數位
          </h1>
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
          維訊核心服務：全球新聞稿發布（涵蓋 AP、路透社等 3,000+ 媒體通訊社）、AI 海外買家與經銷商開發、競爭對手市場情報監控——為企業、政府機關與各類品牌提供國際曝光與市場拓展的代操解決方案
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
            <div className="font-inter text-white/70 text-sm mt-2">代為執行</div>
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
            維訊透過全球 3,000+ 精選通訊社網絡發稿，為企業、品牌與政府機關解決國際曝光難題，其中涵蓋 Yahoo 財經、美聯社、路透社等月活躍用戶上億的頂級媒體平台。每篇稿件發布期間同步被 Google 等搜尋引擎收錄索引，強化曝光期間的國際能見度與搜尋觸及。
          </p>
        </div>

        <MediaLogoMarquee />

        {/* 媒體刊登實績 */}
        <div className="mt-12 mb-16">
          <h3 className="font-playfair text-2xl text-navy font-bold text-center mb-2">媒體刊登實績</h3>
          <p className="font-inter text-text-muted text-center text-sm mb-8">以下為維訊實際協助客戶登上國際權威媒體之真實案例</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl overflow-hidden border-2 border-navy/20 shadow-lg">
              <div className="bg-navy px-4 py-2 flex items-center gap-2">
                <span className="font-inter text-white font-bold text-sm">AP</span>
                <span className="font-inter text-white/70 text-xs">Associated Press · AP News</span>
              </div>
              <img src="/press-ap.jpg" alt="AP News 刊登截圖" className="w-full object-cover" />
            </div>
            <div className="rounded-xl overflow-hidden border-2 border-navy/20 shadow-lg">
              <div className="bg-[#FF8000] px-4 py-2 flex items-center gap-2">
                <span className="font-inter text-white font-bold text-sm">Reuters</span>
                <span className="font-inter text-white/70 text-xs">路透社 · 全球最大通訊社</span>
              </div>
              <img src="/press-reuters.jpg" alt="Reuters 刊登截圖" className="w-full object-cover" />
            </div>
          </div>
          <p className="font-inter text-text-muted text-center text-xs mt-4">* 客戶資料依保密協議處理，媒體刊登內容均為真實案例</p>
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

        <div
          key={activeStage}
          className="gradient-card rounded-xl p-8 border-l-4 border-gold animate-fade-in"
        >
          <div className="flex items-center mb-4">
            <span className="font-playfair text-gold text-2xl font-bold mr-4">
              {stages[activeStage].number}
            </span>
            <div>
              <h3 className="font-inter text-white text-lg font-semibold">
                {stages[activeStage].name}
              </h3>
              <p className="font-inter text-gold/70 text-sm">{stages[activeStage].english}</p>
            </div>
          </div>
          <p className="font-inter text-white/80 leading-relaxed text-lg">
            {stages[activeStage].detail}
          </p>
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
          維訊全球商務戰情月報 Live Demo
        </h2>
        <p className="font-inter text-text-muted text-center mb-12">
          以下為維訊內部監控台示意（客戶實際收到的是定期彙整的戰情報告）
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="gradient-card rounded-xl border-t-2 border-gold p-6">
            <h3 className="font-inter text-gold text-lg font-semibold mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              全球海關提單月度監控分析
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-white/50 border-b border-white/10">
                    <th className="text-left py-2 font-normal">競爭對手代號</th>
                    <th className="text-left py-2 font-normal">主要買家區域</th>
                    <th className="text-left py-2 font-normal">本月貨量</th>
                    <th className="text-right py-2 font-normal">月比變化</th>
                  </tr>
                </thead>
                <tbody>
                  {competitorData.map((row, i) => (
                    <tr key={i} className="border-b border-white/5">
                      <td className="py-3 text-white">{row.competitor}</td>
                      <td className="py-3 text-white/70">{row.region}</td>
                      <td className="py-3 text-white">{row.volume}</td>
                      <td className="py-3 text-right">
                        <span
                          className={`flex items-center justify-end ${
                            row.change > 0 ? 'text-green-400' : 'text-red-400'
                          }`}
                        >
                          {row.change > 0 ? (
                            <ArrowUpRight className="w-4 h-4 mr-1" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4 mr-1" />
                          )}
                          {row.change > 0 ? '+' : ''}{row.change}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="gradient-card rounded-xl border-t-2 border-gold p-6">
            <h3 className="font-inter text-gold text-lg font-semibold mb-4 flex items-center">
              <TrendingDown className="w-5 h-5 mr-2" />
              ABI 流量與媒體來源分析圖表
            </h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={abmData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis
                    dataKey="month"
                    stroke="#ffffff50"
                    tick={{ fill: '#ffffff80', fontSize: 12 }}
                    axisLine={{ stroke: '#ffffff20' }}
                  />
                  <YAxis
                    stroke="#ffffff50"
                    tick={{ fill: '#ffffff80', fontSize: 12 }}
                    axisLine={{ stroke: '#ffffff20' }}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <defs>
                    <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F3C623" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#F3C623" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="none"
                    fill="url(#goldGradient)"
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#F3C623"
                    strokeWidth={3}
                    dot={{ fill: '#F3C623', strokeWidth: 2, r: 4 }}
                    activeDot={{ fill: '#F3C623', r: 6, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="font-inter text-white/50 text-xs text-center mt-2">
              Y軸：ABI 觸達識別率 %
            </p>
            <p className="font-inter text-gold/70 text-xs text-center mt-1">
              隨訂閱期間持續累積，趨勢洞察將越發完整——這正是長期合作的核心價值
            </p>
          </div>
        </div>

        <div className="gradient-card rounded-xl border-t-2 border-gold p-6">
          <h3 className="font-inter text-gold text-lg font-semibold mb-4 flex items-center">
            <Eye className="w-5 h-5 mr-2" />
            匿名企業訪客意圖解密
          </h3>
          <div className="space-y-3">
            {visitors.map((visitor, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-white/10 last:border-0">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-gold rounded-full mr-4" />
                  <span className="text-white mr-3">{visitor.country}</span>
                  <span className="text-white font-semibold">{visitor.company}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-white/70 text-sm">造訪「{visitor.page}」</span>
                  <span className="text-white/50 text-sm">停留 {visitor.time}</span>
                  {visitor.triggered && (
                    <span className="blink-badge bg-red-500/20 text-red-400 text-xs px-3 py-1 rounded-full font-semibold whitespace-nowrap">
                      🔴 已標記為高優先商機
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Section5() {
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

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="font-inter text-white/50 text-lg font-semibold mb-4">
              傳統 PR 公關公司
            </h3>
            <ul className="space-y-3">
              {['品牌聲量難以量化轉換', '無買家身份識別', '無 ABM 自動化', '依賴人工執行，缺乏歸因報告', '國際展會成本高漲，ROI 下滑', '無全球媒體矩陣'].map((item, i) => (
                <li key={i} className="flex items-center text-white/70">
                  <XCircle className="w-5 h-5 mr-3 text-red-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="font-inter text-white/50 text-lg font-semibold mb-4">
              SaaS 軟體經銷商
            </h3>
            <ul className="space-y-3">
              {['需客戶自行操作', '學習曲線陡峭', '無託管執行服務', '不知道如何精準觸達海外客群', '數據分散難整合', '無媒體發佈資源'].map((item, i) => (
                <li key={i} className="flex items-center text-white/70">
                  <XCircle className="w-5 h-5 mr-3 text-red-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="gradient-card rounded-xl p-6 border-2 border-gold relative gold-box-glow">
            <div className="absolute top-4 right-4 bg-gold text-navy text-xs font-semibold px-3 py-1 rounded-full">
              最佳選擇
            </div>
            <h3 className="font-inter text-gold text-lg font-semibold mb-4">
              維訊國際數位
            </h3>
            <ul className="space-y-3">
              {['全程代為執行（Done-For-You）', 'AI 買家意圖識別與追蹤', '媒體 × 商機情報整合', '全球 3,000+ 通訊社矩陣', '零技術/數據人力需求', '每月固定戰情報告'].map((item, i) => (
                <li key={i} className="flex items-center text-white">
                  <CheckCircle className="w-5 h-5 mr-3 text-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-navy rounded-xl p-8 border border-gold/40">
          <p className="font-inter text-gold text-lg text-center leading-relaxed">
            維訊全程代為執行，客戶無需企業內部建立技術團隊，專注於接收與運用商機情報。
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
          階梯式代操方案規劃
        </h2>
        <p className="font-inter text-text-muted text-center mb-12">
          依業務規模與目標市場量身規劃，所有方案均由維訊全程代為執行
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

  const faqs = [
    {
      q: '維訊的新聞稿發出去之後，會出現在哪些媒體？能保證上 AP、Reuters 嗎？',
      a: '維訊透過全球 3,000+ 授權通訊社網絡發稿，涵蓋 AP News、Reuters 等頂級國際媒體。原則上可刊登於這些平台，但需符合各通訊社的編輯標準，內容須真實合法、可查證。維訊團隊會在發稿前協助審核內容，確保符合標準，最大化刊登成功率。'
    },
    {
      q: '維訊的服務適合哪些產業或組織？',
      a: '維訊的全球媒體發稿與 AI 數據服務適用於各類型組織，包括製造與外銷業、生技與醫療業、政府與公部門、科技與新創、品牌與消費品、教育與學術機構。只要有國際曝光需求，維訊均可提供對應的代操服務。'
    },
    {
      q: '維訊的服務需要客戶自己操作嗎？流程是什麼？',
      a: '維訊全程代為執行，客戶無需具備任何技術能力。流程為：諮詢規劃 → 內容審核 → 全球發稿 → AI 買家意圖追蹤 → 成效報告交付。客戶全程只需提供資訊與確認內容，其餘流程由維訊代為處理。'
    },
    {
      q: '單次發稿和訂閱方案有什麼差別？',
      a: '單次專案適合有特定活動或新品發布需求的客戶，按次計費，靈活彈性。訂閱方案（季度或年約）適合需要持續國際曝光的客戶，享有優惠費率，並可搭配 AI 數據情報服務，建立長期品牌聲量。'
    },
    {
      q: '企業訪客解密是什麼？怎麼運作？',
      a: '企業訪客解密是維訊專業版的核心功能。當匿名企業訪客瀏覽客戶網站時，系統會自動識別該訪客所屬企業及所在國家，並記錄其瀏覽行為與停留時間。維訊團隊同時彙整訪客動態，定期整理進戰情報告，將匿名流量轉化為可追蹤的商機。'
    },
    {
      q: '競爭對手監控可以追蹤什麼？',
      a: '維訊的競爭對手 AI 動態監控可追蹤競爭對手的主要買家變動、市場貨量增減趨勢及供應鏈異動訊號。數據以月報形式定期交付，協助客戶掌握市場動態、即時調整策略。具體監控技術與數據來源屬維訊核心機密，不對外公開。'
    },
    {
      q: 'AI 買手情報名單是怎麼產生的？準確嗎？',
      a: '維訊透過自有的數據交叉比對機制，鎖定具有真實採購意圖的目標公司，並由團隊進一步確認實際決策者身份，交付聯絡資料。名單完整度因目標市場而異，並持續優化海外市場覆蓋。背後的技術整合方法與作業流程，是維訊多年投入建立的專屬技術架構，所有數據來源皆合法合規取得，確保客戶使用無虞。'
    },
    {
      q: '買手情報覆蓋哪些市場？',
      a: '維訊的買手情報服務覆蓋全球主要外銷目標市場，包含歐美、亞洲及新興市場。針對不同市場的數據開放程度，維訊採用多元數據補強策略，確保各市場的買手情報完整覆蓋。'
    },
    {
      q: '維訊的成效報告包含哪些內容？',
      a: '維訊定期交付的成效報告包含：全球媒體刊登清單與連結、各地區媒體覆蓋範圍摘要、以及 AI 買家意圖追蹤重點整理。進階方案以上另含買手情報更新與市場動態摘要；專業版以上再納入全球展會通路夥伴與競爭情報彙整。報告格式固定清晰，方便客戶內部呈報或補助核銷使用。'
    },
    {
      q: '我還需要花錢參加國際展會嗎？',
      a: '不一定。參展的核心價值──讓買手認識你（曝光）、找到通路夥伴（開發）、掌握同業動態（競爭情報）──維訊都能透過另一種方式協助你達成，而且觸及更廣、成本更低：全球媒體發稿讓你的品牌故事觸及目標市場所有相關受眾，不受限於單一展會的時間地點；同時透過數據情報，遠端鎖定目標市場相關展覽的參與者，梳理出潛在通路夥伴與競爭對手名單。你不必負擔攤位費與差旅成本，就能取得同等甚至更廣泛的商機情報與品牌曝光。'
    },
  ];

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
              {openIndex === i && (
                <div className="px-6 py-4 bg-navy/5 border-t border-navy/10">
                  <p className="font-inter text-text-muted leading-relaxed">{faq.a}</p>
                </div>
              )}
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

  const handleSubmit = async () => {
    if (formData.name && formData.company && formData.contact) {
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
        }
      } catch (error) {
        console.error('Form submission error:', error);
      }
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
            <button
              onClick={handleSubmit}
              className="w-full py-4 bg-navy text-white font-inter font-semibold rounded-lg hover:bg-gold hover:text-navy transition-all duration-300 text-lg"
            >
              立即諮詢
            </button>
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
        <p className="font-inter text-white text-lg mb-2">© 2025 維訊國際數位有限公司</p>
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

function App() {
  const [activeSection, setActiveSection] = useState('section-1');

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

  return (
    <div className="font-inter bg-navy min-h-screen">
      <Sidebar activeSection={activeSection} />
      <main className="w-full">
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

export default App;
