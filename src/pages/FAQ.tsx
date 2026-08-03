import { useState } from 'react';
import TopNav from '../components/TopNav';
import { faqs } from '../data/faqs';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="font-inter bg-navy min-h-screen">
      <TopNav />
      <main className="w-full pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h1
            className="font-playfair text-gold font-bold mb-4 text-center"
            style={{ fontSize: 'clamp(1.8rem, 5vw, 2.6rem)' }}
          >
            常見問題
          </h1>
          <p className="font-inter text-white/60 text-center mb-12">關於維訊服務的常見疑問</p>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-white/15 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <span className="font-inter font-semibold text-white pr-4">{faq.q}</span>
                  <span className="text-gold font-bold text-xl flex-shrink-0">
                    {openIndex === i ? '−' : '+'}
                  </span>
                </button>
                {openIndex === i && (
                  <div className="px-6 py-4 bg-white/[0.03] border-t border-white/10">
                    <p className="font-inter text-white/70 leading-relaxed text-sm">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 pt-6 border-t border-white/10 text-center">
            <p className="font-inter text-white/50 text-xs leading-relaxed">
              本站提供之情報服務內容係彙整自公開及訂閱資料來源，僅供業務決策參考，
              實際商業成果由客戶自行評估與承擔。
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
