import React, { useState } from 'react';
import { Mail, CheckCircle2, Clock, RotateCcw, Package, ChevronDown, ChevronUp } from 'lucide-react';
import { SERVICE_PACKAGES, WORK_PROCESS_STEPS, FAQ_ITEMS } from '../data/initialPortfolio';

export const ServiceView: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-24 bg-[#07080a]">
      {/* 1. Page Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="text-xs font-mono-nums tracking-widest text-[#e5b964] font-semibold uppercase flex items-center gap-2">
          <span className="w-2 h-[1px] bg-[#e5b964]" />
          <span>SERVICES & PRODUCTION STANDARDS</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          서비스 범위 및 투명한 작업 가이드
        </h1>
        <p className="text-base text-neutral-400 leading-relaxed font-normal">
          예산과 목적에 맞춘 명확한 작업 범위, 공정별 소요 기간, 그리고 수정 및 납품 기준을 투명하게 공개하여 불필요한 비용 낭비와 일정 지연 없이 신뢰를 드립니다.
        </p>
      </div>

      {/* 2. Service Packages Grid with Direct Email Actions */}
      <section className="space-y-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            제공 서비스 패키지
          </h2>
          <span className="text-xs text-[#e5b964] font-mono-nums hidden sm:inline font-semibold">
            4 Core Production Lines
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICE_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className="p-8 rounded-xl bg-[#0e1015] border border-white/[0.08] flex flex-col justify-between hover:border-[#e5b964]/50 transition-all space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {pkg.title}
                    </h3>
                    <p className="text-xs text-[#e5b964] font-semibold mt-1">
                      {pkg.subtitle}
                    </p>
                  </div>
                  <span className="text-xs font-mono-nums text-[#e5b964] bg-[#e5b964]/10 border border-[#e5b964]/30 px-2.5 py-1 rounded shrink-0 font-semibold">
                    {pkg.indicativePrice}
                  </span>
                </div>

                <div className="text-xs text-neutral-300 bg-[#13151c] p-3 rounded-lg border border-white/[0.06]">
                  <span className="text-[#e5b964] font-semibold">추천 대상:</span> {pkg.recommendedFor}
                </div>

                {/* Scope items */}
                <div className="space-y-2 pt-2">
                  <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                    주요 작업 범위 (Scope)
                  </div>
                  <ul className="space-y-2 text-xs text-neutral-300">
                    {pkg.scope.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#e5b964] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Specifications: Turnaround, Revisions, Deliverables */}
                <div className="pt-4 border-t border-white/[0.08] space-y-2 text-xs text-neutral-300">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#e5b964] shrink-0" />
                    <span><strong className="text-white">작업 기간:</strong> {pkg.turnaround}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RotateCcw className="w-3.5 h-3.5 text-[#e5b964] shrink-0" />
                    <span><strong className="text-white">수정 정책:</strong> {pkg.revisions}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="w-3.5 h-3.5 text-[#e5b964] shrink-0" />
                    <span><strong className="text-white">납품 방식:</strong> {pkg.deliverableFormat}</span>
                  </div>
                </div>
              </div>

              {/* Action Button: Direct mailto link */}
              <div className="pt-2">
                <a
                  href={`mailto:helicat123@naver.com?subject=[${encodeURIComponent(pkg.title)}] 제작 문의`}
                  className="w-full py-3 bg-[#e5b964]/10 hover:bg-[#e5b964] text-[#e5b964] hover:text-black border border-[#e5b964]/40 hover:border-[#e5b964] font-bold text-xs rounded transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>이 서비스 이메일 문의하기</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Production Process Steps */}
      <section className="space-y-10">
        <div className="space-y-2">
          <div className="text-xs font-mono-nums tracking-widest text-[#e5b964] font-semibold uppercase">
            WORK PROCESS
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            체계적인 4단계 제작 파이프라인
          </h2>
          <p className="text-sm text-neutral-400">
            프로젝트 착수부터 최종 마스터링까지, 모든 단계에서 클라이언트와의 밀접한 소통으로 불확실성을 없앱니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WORK_PROCESS_STEPS.map((step) => (
            <div
              key={step.step}
              className="p-6 rounded-xl bg-[#0e1015] border border-white/[0.08] space-y-3 relative group hover:border-[#e5b964]/40 transition-all"
            >
              <div className="font-mono-nums text-3xl font-bold text-neutral-700 group-hover:text-[#e5b964] transition-colors">
                {step.step}
              </div>
              <h3 className="text-base font-bold text-white">
                {step.title}
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Revision & Quality Standards Policy */}
      <section className="p-8 sm:p-12 rounded-xl bg-[#0e1015] border border-[#e5b964]/20 space-y-6">
        <div className="space-y-2">
          <div className="text-xs font-mono-nums tracking-widest text-[#e5b964] font-semibold uppercase">
            TRUST & GUARANTEE
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            수정 및 품질 보증 가이드라인
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-neutral-300 leading-relaxed">
          <div className="p-5 rounded-lg bg-[#13151c] border border-white/[0.08] space-y-2">
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e5b964]" />
              1. 단계별 피드백 수렴
            </h4>
            <p className="text-neutral-400 font-normal">
              러프컷(가편집) 단계에서 전체 호흡과 구성에 대한 의견을 취합하여, 후반 작업(컬러/사운드/모션)에서의 불필요한 번복과 재작업을 사전 차단합니다.
            </p>
          </div>

          <div className="p-5 rounded-lg bg-[#13151c] border border-white/[0.08] space-y-2">
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e5b964]" />
              2. 상업용 라이선스 준수
            </h4>
            <p className="text-neutral-400 font-normal">
              사용되는 모든 배경음악(BGM), 효과음(SFX), 폰트 에셋은 상업용 라이선스를 취득한 자산만을 엄선하여 저작권 이슈를 원천 방지합니다.
            </p>
          </div>

          <div className="p-5 rounded-lg bg-[#13151c] border border-white/[0.08] space-y-2">
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e5b964]" />
              3. 영구 백업 & 클라우드 전달
            </h4>
            <p className="text-neutral-400 font-normal">
              납품 완료 후에도 마스터 파일 및 프로젝트 소스를 최소 1년간 안전하게 보관하여, 향후 파생 버전 제작이나 추가 컷팅 시 즉각 대응 가능합니다.
            </p>
          </div>
        </div>
      </section>

      {/* 5. FAQ Accordion */}
      <section className="space-y-8">
        <div className="space-y-2">
          <div className="text-xs font-mono-nums tracking-widest text-[#e5b964] font-semibold uppercase">
            FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            자주 묻는 질문
          </h2>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-lg border border-white/[0.08] bg-[#0e1015] overflow-hidden transition-all hover:border-[#e5b964]/30"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02]"
                >
                  <span className="font-semibold text-sm text-white flex items-center gap-2">
                    <span className="text-[#e5b964] font-mono-nums font-bold">Q.</span>
                    {item.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#e5b964] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-neutral-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-white/[0.08] pt-4 bg-[#13151c]">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
