import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import TopNav from '../components/TopNav';
import { tiers } from '../data/tiers';

export default function Pricing() {
  return (
    <div className="font-inter bg-navy min-h-screen">
      <TopNav />
      <main className="w-full pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <h1
            className="font-playfair text-gold font-bold mb-4"
            style={{ fontSize: 'clamp(1.8rem, 5vw, 2.6rem)' }}
          >
            選擇適合您規模的買家情報服務
          </h1>
          <p className="font-inter text-white/70 leading-relaxed">
            從單一市場試水溫，到多國同步開發——四種方案，對應不同階段的海外業務需求。
            每位客戶的目標市場、產業與資源投入不同，我們先了解您的預算與需求，
            再配置對應方案，避免您為用不到的功能付費。
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 mb-16">
          {tiers.map((tier, i) => (
            <div
              key={i}
              className={`rounded-xl p-8 transition-all duration-300 relative flex flex-col ${
                tier.highlighted
                  ? 'bg-navy border-2 border-gold gold-box-glow'
                  : 'bg-white/5 border-2 border-white/10'
              }`}
            >
              {tier.badge && (
                <div className="absolute top-4 right-4 bg-gold text-navy text-xs font-semibold px-3 py-1 rounded-full">
                  {tier.badge}
                </div>
              )}
              <div className="mb-6">
                <h2 className={`font-playfair text-2xl font-bold ${tier.highlighted ? 'text-gold' : 'text-white'}`}>
                  {tier.title}
                </h2>
                <p className="font-inter text-sm text-white/60">{tier.subtitle}</p>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((feature, j) => (
                  <li key={j} className="flex items-start text-white/85">
                    <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0 text-gold" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/#section-contact"
                className={`w-full text-center py-3 rounded-lg font-inter font-semibold transition-all duration-300 ${
                  tier.highlighted
                    ? 'bg-gold text-navy hover:bg-gold/90'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                洽詢專員規劃
              </Link>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto bg-white/5 border border-gold/20 rounded-xl p-8 mb-16">
          <h2 className="font-playfair text-gold text-xl font-bold mb-3">不賣您用不到的功能</h2>
          <p className="font-inter text-white/70 text-sm leading-relaxed">
            市面上許多方案採一口價套餐，包含大量您可能永遠用不到的功能。我們的做法相反
            ——先了解您的目標市場、業務階段與預算範圍，再從四個方案中配置最合適的組合。
            這代表您付的每一分錢，都對應到實際會用上的情報服務。
          </p>
        </div>

        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-playfair text-white text-xl font-bold mb-4">
            告訴我們您的目標市場與預算，我們為您配置方案
          </h2>
          <Link
            to="/#section-contact"
            className="inline-block px-8 py-3 bg-gold text-navy font-inter font-semibold rounded-lg hover:bg-gold/90 transition-colors"
          >
            開始諮詢
          </Link>
        </div>
      </main>
    </div>
  );
}
