import React from 'react';
import { ArrowUpRight, Play, Sparkles, ShieldCheck, Mail, Phone, LayoutGrid, Images } from 'lucide-react';
import { Project } from '../types/portfolio';
import { STUDIO_HERO_IMAGE } from '../data/initialPortfolio';

interface HomeViewProps {
  projects: Project[];
  onNavigate: (tab: string) => void;
  onSelectProject: (p: Project) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  projects,
  onNavigate,
  onSelectProject,
}) => {
  // 대표 작업물 2개 선별
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 2);
  const displayProjects = featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 2);

  return (
    <div className="space-y-24 pb-24 bg-[#07080a]">
      {/* 1. Hero Split-Screen Section */}
      <section className="pt-8 sm:pt-14 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <div className="text-xs font-mono-nums tracking-widest text-[#e5b964] font-semibold uppercase flex items-center gap-2">
                <span className="w-2 h-[1px] bg-[#e5b964]" />
                <span>PORTFOLIO · EDITORIAL & CINEMATIC MOTION</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.08] text-balance">
                Make your story <br />
                <span className="text-[#e5b964] font-semibold">impossible</span> to skip.
              </h1>

              <p className="text-base sm:text-lg text-neutral-400 max-w-xl leading-relaxed font-normal">
                영상 편집과 디자인으로 콘텐츠의 가치를 전달합니다.<br />
                한국공학대 산업디자인공학 전공의 조형 감각과 네이버 1784 라이브커머스 숏츠 편집 경험으로 첫 3초의 시선을 붙잡고, 끝까지 몰입하게 만드는 영상을 제작합니다.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('works')}
                className="px-6 py-3.5 bg-[#e5b964] text-black text-xs font-bold rounded hover:bg-[#f2c776] hover:shadow-[0_0_20px_rgba(229,185,100,0.3)] transition-all flex items-center gap-2 cursor-pointer active:scale-95 shadow-md"
              >
                <span>작업물 보기</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <a
                href="mailto:helicat123@naver.com"
                className="px-6 py-3.5 bg-black/40 border border-[#e5b964]/40 text-[#f4f4f5] hover:text-[#e5b964] hover:border-[#e5b964] text-xs font-bold rounded transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <Mail className="w-4 h-4 text-[#e5b964]" />
                <span>helicat123@naver.com</span>
              </a>

              <a
                href="tel:+821033745355"
                className="px-4 py-3.5 bg-transparent border border-white/10 text-neutral-400 hover:text-white text-xs font-medium rounded transition-all flex items-center gap-2 cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-[#e5b964]" />
                <span>+82 10 3374 5355</span>
              </a>
            </div>
          </div>

          {/* Right Column: Hero Visual Container */}
          <div className="lg:col-span-5 relative rounded-xl overflow-hidden border border-white/[0.1] bg-[#0d0e12] group min-h-[380px] lg:h-full">
            <img
              src={STUDIO_HERO_IMAGE}
              alt="portfolio editing suite"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6">
              <div className="flex items-center justify-between text-xs text-neutral-300 font-mono-nums">
                <span className="text-white font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e5b964]" />
                  STUDIO SHOWREEL
                </span>
                <span className="text-[#e5b964]">4K DCI · 24FPS</span>
              </div>
              <p className="text-xs text-neutral-400 mt-1 font-mono-nums">
                프리미어프로 & 산업디자인 3D 조형 에디팅 파이프라인
              </p>
            </div>
          </div>
        </div>

        {/* Full-width KPI Strip below the hero split */}
        <div className="mt-14 pt-8 border-t border-white/[0.08] grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold font-mono-nums text-[#e5b964]">100%</div>
            <div className="text-xs text-neutral-400">납기 일정 준수율</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold font-mono-nums text-[#e5b964]">48h</div>
            <div className="text-xs text-neutral-400">평균 1차 가편집 전달</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold font-mono-nums text-[#e5b964]">첫 3초</div>
            <div className="text-xs text-neutral-400">이탈 방어 훅(Hook) 설계</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold font-mono-nums text-[#e5b964]">1:1</div>
            <div className="text-xs text-neutral-400">맞춤형 정밀 디렉팅</div>
          </div>
        </div>
      </section>

      {/* 2. Core Pillars with Luxury Gold Accents */}
      <section className="px-6 max-w-7xl mx-auto">
        <div className="mb-10 space-y-2">
          <div className="text-xs font-mono-nums tracking-widest text-[#e5b964] font-semibold uppercase">
            WHY PORTFOLIO
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            영상이 가진 힘을 온전히 증명하는 3가지 약속
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1: 디자인 실력 */}
          <div className="p-8 rounded-xl bg-[#0e1015] border border-white/[0.08] space-y-4 hover:border-[#e5b964]/40 transition-all">
            <div className="w-10 h-10 rounded bg-[#e5b964]/10 border border-[#e5b964]/30 text-[#e5b964] flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5 text-[#e5b964]" />
            </div>
            <h3 className="text-lg font-bold text-white">
              01. 디자인 실력과 감각
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed font-normal">
              영상 퀄리티, 감각적인 레이아웃, 세련된 타이포그래피와 색감으로 차별화됩니다. 산업디자인 전공의 조형 감각으로 오브제와 인물의 비례를 극대화합니다.
            </p>
          </div>

          {/* Pillar 2: 신뢰 */}
          <div className="p-8 rounded-xl bg-[#0e1015] border border-white/[0.08] space-y-4 hover:border-[#e5b964]/40 transition-all">
            <div className="w-10 h-10 rounded bg-[#e5b964]/10 border border-[#e5b964]/30 text-[#e5b964] flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5 text-[#e5b964]" />
            </div>
            <h3 className="text-lg font-bold text-white">
              02. 투명한 공정과 신뢰
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed font-normal">
              실제 작업 경험, 체계적인 타임라인, 명확한 작업 범위와 수정 정책을 사전에 안내합니다. 제작 과정 중 진행 상황을 투명하게 공유합니다.
            </p>
          </div>

          {/* Pillar 3: 1:1 맞춤 디렉팅 */}
          <div className="p-8 rounded-xl bg-[#0e1015] border border-white/[0.08] space-y-4 hover:border-[#e5b964]/40 transition-all">
            <div className="w-10 h-10 rounded bg-[#e5b964]/10 border border-[#e5b964]/30 text-[#e5b964] flex items-center justify-center font-bold">
              <LayoutGrid className="w-5 h-5 text-[#e5b964]" />
            </div>
            <h3 className="text-lg font-bold text-white">
              03. 정밀한 컷팅과 템포 설계
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed font-normal">
              클라이언트의 목적과 콘텐츠 특성에 맞춰 밀착형 점프컷과 타이밍 싱크, 시네마틱 톤 매핑을 적용하여 최상의 퀄리티를 완성합니다.
            </p>
          </div>
        </div>
      </section>

      {/* 3. 대표 작업물 2개 쇼케이스 (사용자 요청: 대표 작업물은 두 개로, 네이버 쇼핑라이브 포함) */}
      <section className="px-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-mono-nums tracking-widest text-[#e5b964] font-semibold uppercase mb-2">
              FEATURED WORKS (2 SELECTED PROJECTS)
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              대표 작업물 쇼케이스
            </h2>
            <p className="text-sm text-neutral-400 mt-1">
              네이버 쇼핑라이브 숏츠 편집과 산업디자인 3D 조형 브랜드 필름을 확인하세요.
            </p>
          </div>

          <button
            onClick={() => onNavigate('works')}
            className="text-xs font-semibold text-[#e5b964] hover:text-[#f3ca7e] flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            <span>전체 포트폴리오 보기</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* 2-Column Balanced Grid for 2 Featured Works */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayProjects.map((project, idx) => {
            const hasMultipleImages = project.images && project.images.length > 1;
            return (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="rounded-xl overflow-hidden bg-[#0e1015] border border-white/[0.08] group cursor-pointer hover:border-[#e5b964]/50 transition-all flex flex-col justify-between"
              >
                {/* Media Preview Frame */}
                <div className="relative aspect-video w-full overflow-hidden bg-black">
                  <img
                    src={project.thumbnailUrl || (project.images && project.images[0]) || '/assets/aistudio/___26c72ec4.png'}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-104"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                  {/* Play icon overlay */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/70 backdrop-blur-md flex items-center justify-center text-white border border-[#e5b964]/50 group-hover:bg-[#e5b964] group-hover:text-black transition-all shadow-md">
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </div>

                  {/* Multi-image count badge */}
                  {hasMultipleImages && (
                    <div className="absolute top-4 left-4 bg-black/80 text-white text-[11px] font-mono-nums px-2.5 py-1 rounded border border-white/20 flex items-center gap-1.5">
                      <Images className="w-3 h-3 text-[#e5b964]" />
                      <span>스틸컷 {project.images!.length}장</span>
                    </div>
                  )}

                  {/* Bottom meta */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono-nums text-neutral-300">
                    <span className="truncate max-w-[200px]">{project.client}</span>
                    <span className="text-[#e5b964] shrink-0 font-semibold">{project.duration}</span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono-nums">
                      <span className="text-[#e5b964] font-semibold uppercase">
                        대표작 0{idx + 1} · {project.category}
                      </span>
                      <span className="text-neutral-500">{project.year}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#e5b964] transition-colors leading-snug">
                      {project.title}
                    </h3>

                    <p className="text-sm text-neutral-400 line-clamp-2 leading-relaxed">
                      {project.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/[0.08] space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                      {project.directRole.slice(0, 3).map((role, rIdx) => (
                        <span
                          key={rIdx}
                          className="text-[11px] bg-white/[0.05] text-neutral-300 px-2 py-0.5 rounded border border-white/[0.06]"
                        >
                          {role}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="text-neutral-500 font-mono-nums truncate max-w-[200px]">
                        {project.tools.join(' · ')}
                      </span>
                      <span className="text-[#e5b964] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>상세 분석 보기</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Editorial Quote & Philosophy */}
      <section className="px-6 max-w-7xl mx-auto">
        <div className="p-10 sm:p-14 rounded-xl bg-[#0c0d12] border border-[#e5b964]/20 text-center space-y-6 relative overflow-hidden">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#e5b964]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="text-xs font-mono-nums uppercase tracking-widest text-[#e5b964] font-semibold">
            OUR PHILOSOPHY
          </div>
          <blockquote className="text-2xl sm:text-3xl text-white font-medium max-w-3xl mx-auto leading-snug tracking-tight">
            "좋은 편집은 보이지 않고 오직 감동만이 남는다. <br className="hidden sm:inline" />
            우리는 컷과 컷 사이의 미세한 공백에서 이야기의 가치를 완성합니다."
          </blockquote>
          <div className="text-xs text-neutral-400 font-mono-nums flex items-center justify-center gap-2">
            <span>PORTFOLIO</span>
            <span className="text-[#e5b964]">·</span>
            <span>CREATIVE DIRECTION</span>
          </div>
        </div>
      </section>
    </div>
  );
};
