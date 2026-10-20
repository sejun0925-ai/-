import React, { useState } from 'react';
import { Lock, Menu, X, Mail } from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  onOpenAdmin,
  isAdminLoggedIn
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'HOME' },
    { id: 'works', label: 'WORKS' },
    { id: 'about', label: 'ABOUT' },
    { id: 'service', label: 'SERVICE' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#07080a]/90 border-b border-white/[0.07] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark: 'portfolio' */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#e5b964]"
          aria-label="portfolio 홈으로 이동"
        >
          <div className="flex items-center gap-1.5">
            <span className="font-bold tracking-tight text-xl text-white group-hover:text-neutral-200 transition-colors whitespace-nowrap shrink-0">
              portfolio
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#e5b964] inline-block mb-1 shadow-[0_0_8px_rgba(229,185,100,0.8)]" />
          </div>
        </button>

        {/* Zone 2: 4 Clean Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-medium tracking-wider text-neutral-400 uppercase">
          {navLinks.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`transition-colors whitespace-nowrap shrink-0 hover:text-white cursor-pointer py-1 relative ${
                  isActive ? 'text-white font-semibold' : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#e5b964] rounded-full shadow-[0_0_10px_rgba(229,185,100,0.6)]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Direct Email Action + Admin Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenAdmin}
            title={isAdminLoggedIn ? '관리자 모드 활성화됨 (비밀번호: 1111)' : '관리자 로그인 (비밀번호: 1111)'}
            aria-label="관리자 모드"
            className={`px-2.5 py-1.5 rounded text-xs transition-colors flex items-center gap-1.5 cursor-pointer border ${
              isAdminLoggedIn
                ? 'text-[#e5b964] bg-[#e5b964]/10 border-[#e5b964]/40 shadow-[0_0_12px_rgba(229,185,100,0.15)]'
                : 'text-neutral-400 border-transparent hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[11px] font-mono-nums">
              ADMIN
            </span>
          </button>

          <a
            href="mailto:helicat123@naver.com"
            className="px-4 py-2 text-xs font-bold text-black bg-[#e5b964] rounded hover:bg-[#f2c776] hover:shadow-[0_0_16px_rgba(229,185,100,0.3)] transition-all whitespace-nowrap shrink-0 cursor-pointer active:scale-95 shadow-sm flex items-center gap-1.5"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>이메일 문의</span>
          </a>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-400 hover:text-white cursor-pointer"
            aria-label="메뉴 열기"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-800 bg-[#0d0e12] px-6 py-4 animate-in fade-in duration-150">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left text-sm font-semibold tracking-wider uppercase py-2 cursor-pointer transition-colors ${
                  currentTab === item.id ? 'text-[#e5b964]' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
