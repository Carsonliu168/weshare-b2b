import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const links = [
  { to: '/', label: '首頁' },
  { to: '/pricing', label: '訂閱方案' },
  { to: '/faq', label: '常見問題' },
];

export default function TopNav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 w-full z-[60] bg-navy/95 backdrop-blur border-b border-gold/20">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link to="/" className="font-playfair text-gold text-lg font-semibold tracking-wide">
          維訊國際數位
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          {links.map((link) => {
            const active = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg font-inter text-sm transition-colors ${
                  active
                    ? 'text-gold bg-gold/10'
                    : 'text-white/70 hover:text-gold hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            to="/#section-contact"
            className="ml-2 px-4 py-2 rounded-lg font-inter text-sm bg-gold text-navy font-semibold hover:bg-gold/90 transition-colors"
          >
            立即諮詢
          </Link>
        </nav>

        <button
          className="md:hidden text-white/80"
          onClick={() => setOpen(!open)}
          aria-label="開啟選單"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <nav className="md:hidden bg-navy border-t border-gold/20 px-6 py-4 space-y-2">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="block px-2 py-2 font-inter text-sm text-white/80 hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/#section-contact"
            onClick={() => setOpen(false)}
            className="block px-2 py-2 font-inter text-sm text-gold font-semibold"
          >
            立即諮詢
          </Link>
        </nav>
      )}
    </header>
  );
}
