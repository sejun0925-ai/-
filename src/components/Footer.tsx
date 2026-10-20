import React from 'react';
import { Lock, ArrowUpRight, Mail, Phone } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAdmin }) => {
  return (
    <footer className="border-t border-white/[0.08] bg-[#050608] text-neutral-400 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Studio Brand: portfolio */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-white text-xl tracking-tight">
                portfolio
              </h3>
              <span className="w-1.5 h-1.5 rounded-full bg-[#e5b964] inline-block mb-1 shadow-[0_0_8px_rgba(229,185,100,0.8)]" />
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
              Make your story impossible to skip.<br />
              영상 편집과 디자인으로 콘텐츠의 가치를 온전히 전달하는 하이엔드 에디토리얼 비디오 스튜디오입니다.
            </p>
            <div className="pt-2 text-xs text-neutral-400 font-mono-nums space-y-1">
              <div>Seoul, Republic of Korea</div>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a href="mailto:helicat123@naver.com" className="hover:text-[#e5b964] transition-colors flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-[#e5b964]" />
                  <span>helicat123@naver.com</span>
                </a>
                <span>·</span>
                <a href="tel:+821033745355" className="hover:text-[#e5b964] transition-colors flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-[#e5b964]" />
                  <span>+82 10 3374 5355</span>
                </a>
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#e5b964]">
              Navigation
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => { onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#e5b964] transition-colors cursor-pointer"
                >
                  HOME
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('works'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#e5b964] transition-colors cursor-pointer"
                >
                  WORKS (영상 포트폴리오)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#e5b964] transition-colors cursor-pointer"
                >
                  ABOUT (소개 & 철학)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('service'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#e5b964] transition-colors cursor-pointer"
                >
                  SERVICE (작업 절차 & 가이드)
                </button>
              </li>
              <li>
                <a
                  href="mailto:helicat123@naver.com"
                  className="hover:text-[#e5b964] transition-colors cursor-pointer flex items-center gap-1 text-white font-medium"
                >
                  <span>DIRECT EMAIL</span> <ArrowUpRight className="w-3.5 h-3.5 text-[#e5b964]" />
                </a>
              </li>
            </ul>
          </div>

          {/* Production Standards */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#e5b964]">
              Production Standards
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              모든 작업은 1:1 맞춤형 컷팅과 상업용 라이선스 음원, 정밀한 색보정 파이프라인을 준수합니다. 기획 초기부터 최종 납품까지 투명한 일정과 확실한 수정 정책으로 신뢰를 제공합니다.
            </p>
            <div className="pt-3">
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-[#e5b964] transition-colors py-1 cursor-pointer"
              >
                <Lock className="w-3 h-3 text-[#e5b964]" />
                <span>Admin Console (PW: 1111)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Exclusively the 5 allowed tools */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © {new Date().getFullYear()} portfolio. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-5 font-mono-nums text-[11px] sm:text-xs">
            <span>프리미어프로</span>
            <span className="text-[#e5b964]">·</span>
            <span>포토샵</span>
            <span className="text-[#e5b964]">·</span>
            <span>일러스트</span>
            <span className="text-[#e5b964]">·</span>
            <span>퓨전360</span>
            <span className="text-[#e5b964]">·</span>
            <span>스케치업</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
