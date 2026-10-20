import React from 'react';
import { ArrowUpRight, Mail, Phone } from 'lucide-react';
import { ABOUT_WORKSPACE_IMAGE } from '../data/initialPortfolio';

interface AboutViewProps {
  onNavigate: (tab: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  // 경력 및 주요 이력 (사용자 요청 사항 정확히 반영)
  const experiences = [
    {
      period: '2026.05 — 2026.08',
      title: '네이버 1784 라이브커머스제작팀. 라이브 보조 및 숏츠 편집.',
      desc: '네이버 1784 사옥 라이브커머스 방송 현장 보조 및 모바일 숏폼(숏츠) 하이라이트 편집, 컷 템포 제어 및 자막 디자인'
    },
    {
      period: '2021 — 2026',
      title: '한국공학대 산업디자인 공학 전공 졸업',
      desc: '제품 조형 원리와 그리드 시스템, 3D 모델링 및 시각적 구성 능력을 체계적으로 전공하고 졸업. 디자인 전공의 심미안과 공학적 논리를 영상 편집에 접목'
    }
  ];

  // 사용가능 툴: 프리미어프로 포토샵 일러스트 퓨전360 스케치업 으로만 구성
  const availableTools = [
    {
      name: '프리미어프로',
      nameEn: 'Adobe Premiere Pro',
      category: '영상 편집',
      desc: 'A-Roll/B-Roll 컷 편집, 멀티트랙 시퀀스 구성, 숏츠 및 롱폼 영상 호흡 제어, 프레임 리듬감 설계'
    },
    {
      name: '포토샵',
      nameEn: 'Adobe Photoshop',
      category: '그래픽 & 아트워크',
      desc: '고해상도 썸네일 아트워크 제작, 텍스처 보정 및 비주얼 합성, 타이틀 그래픽 에셋 디자인'
    },
    {
      name: '일러스트',
      nameEn: 'Adobe Illustrator',
      category: '벡터 & 타이포그래피',
      desc: '벡터 로고 및 아이콘 디자인, 스위스 스타일 그리드 타이포그래피, 그래픽 오버레이 에셋 제작'
    },
    {
      name: '퓨전360',
      nameEn: 'Autodesk Fusion 360',
      category: '3D CAD & 모델링',
      desc: '산업디자인 3D 제품 조형 모델링, 기구 구조 설계, 렌더링 뷰 추출'
    },
    {
      name: '스케치업',
      nameEn: 'Trimble SketchUp',
      category: '공간 & 투시도 설계',
      desc: '건축/인테리어 3D 공간 모델링, 투시도 앵글 설정, 공간감 있는 씬 구성'
    }
  ];

  const philosophies = [
    {
      num: '01',
      title: '산업디자인적 조형 감각',
      desc: '단순히 클립을 붙이는 작업을 넘어, 화면 안의 빛, 여백, 오브제의 비례와 그리드를 구조적으로 설계합니다.'
    },
    {
      num: '02',
      title: '스킵할 수 없는 템포',
      desc: '시청자의 시선이 어디로 향하는지 동체 시력을 고려한 매치컷과 리듬감으로 첫 프레임부터 몰입을 유도합니다.'
    },
    {
      num: '03',
      title: '시네마틱 컬러의 진정성',
      desc: '인위적인 필터 대신 브랜드의 정체성과 감정에 부합하는 고유의 톤 매핑을 통해 영상의 품격을 높입니다.'
    },
    {
      num: '04',
      title: '철저한 공정과 납기 신뢰',
      desc: '체계적인 버전 관리와 단계별 피드백 프로세스로 마감 기한을 엄수하는 프로페셔널한 신뢰를 지킵니다.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-24 bg-[#07080a]">
      {/* 1. Header & Director Bio Split */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="text-xs font-mono-nums tracking-widest text-[#e5b964] font-semibold uppercase flex items-center gap-2">
            <span className="w-2 h-[1px] bg-[#e5b964]" />
            <span>ABOUT DIRECTOR & STUDIO</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            영상 편집에 <br />
            <span className="text-[#e5b964] font-semibold">디자인의 구조미</span>를 더하다.
          </h1>

          <div className="space-y-4 text-neutral-300 text-sm sm:text-base leading-relaxed">
            <p>
              안녕하세요. 비디오 스튜디오 <span className="text-white font-semibold">portfolio</span>를 이끌고 있는 디렉터입니다.
              한국공학대학교에서 산업디자인공학을 전공하며 익힌 조형(Form), 공간(Space), 그리고 그리드(Grid)에 대한 깊은 이해와 네이버 1784 라이브커머스 제작팀에서 체득한 실전 숏폼 및 라이브 편집 감각을 결합하여 감각적인 영상 결과물을 제작합니다.
            </p>
            <p>
              단순히 트렌디한 효과를 덧바르는 영상은 금세 소비되고 잊힙니다. 
              우리는 클라이언트가 전달하고자 하는 브랜드의 본질과 이야기의 맥락을 치밀하게 분석하고, 리듬의 호흡과 프레임의 구도가 완벽히 맞물리는 지점을 찾아냅니다.
            </p>
            <p className="text-neutral-400">
              브랜드 필름, 감각적인 모션그래픽, 진정성 있는 다큐멘터리, 그리고 고효율 숏폼까지—
              당신의 소중한 이야기를 누구도 스킵할 수 없는 콘텐츠로 완성해 드립니다.
            </p>
          </div>

          {/* Contact Direct Info */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a
              href="mailto:helicat123@naver.com"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#e5b964] text-black font-bold text-xs rounded hover:bg-[#f2c776] hover:shadow-[0_0_20px_rgba(229,185,100,0.3)] transition-all cursor-pointer shadow-md"
            >
              <Mail className="w-4 h-4" />
              <span>helicat123@naver.com</span>
            </a>

            <a
              href="tel:+821033745355"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#13151c] border border-white/[0.1] hover:border-[#e5b964] text-white font-semibold text-xs rounded transition-all cursor-pointer"
            >
              <Phone className="w-4 h-4 text-[#e5b964]" />
              <span>+82 10 3374 5355</span>
            </a>
          </div>
        </div>

        {/* Right Workspace Studio Visual */}
        <div className="lg:col-span-5 relative rounded-xl overflow-hidden border border-white/[0.1] bg-[#0e1015] shadow-xl">
          <img
            src={ABOUT_WORKSPACE_IMAGE}
            alt="Director Studio Workspace"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex flex-col justify-end p-6">
            <div className="text-xs font-mono-nums text-white font-semibold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e5b964]" />
              <span>STUDIO WORKSPACE</span>
            </div>
            <div className="text-xs text-neutral-400 mt-0.5 font-mono-nums">
              Industrial Design Engineering & Video Editing Suite
            </div>
          </div>
        </div>
      </section>

      {/* 2. 경력 및 주요 이력 (사용자 필수 요구사항) */}
      <section className="space-y-10">
        <div className="space-y-2">
          <div className="text-xs font-mono-nums tracking-widest text-[#e5b964] font-semibold uppercase">
            CAREER & MILESTONES
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            경력 및 주요 이력
          </h2>
        </div>

        <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline"
            >
              <div className="md:col-span-3 text-xs font-mono-nums text-[#e5b964] font-semibold">
                {exp.period}
              </div>
              <div className="md:col-span-5">
                <div className="text-base font-bold text-white leading-snug">
                  {exp.title}
                </div>
              </div>
              <div className="md:col-span-4 text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
                {exp.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. 사용가능 툴 (사용자 필수 요구사항: 프리미어프로, 포토샵, 일러스트, 퓨전360, 스케치업) */}
      <section className="space-y-10">
        <div className="space-y-2">
          <div className="text-xs font-mono-nums tracking-widest text-[#e5b964] font-semibold uppercase">
            TOOLSTACK & SOFTWARE
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            사용 가능 툴
          </h2>
          <p className="text-sm text-neutral-400">
            영상 편집, 그래픽 디자인, 3D 모델링 및 공간 설계를 위한 5가지 전문 소프트웨어를 능숙하게 활용합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableTools.map((tool, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-[#0e1015] border border-white/[0.08] space-y-3 hover:border-[#e5b964]/40 transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-nums text-[#e5b964] font-semibold">
                  0{idx + 1} · {tool.category}
                </span>
                <span className="text-[11px] font-mono-nums text-neutral-500">
                  {tool.nameEn}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-[#e5b964] transition-colors">
                {tool.name}
              </h3>

              <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                {tool.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Core Philosophies with Gold Numbering */}
      <section className="space-y-10">
        <div className="space-y-2">
          <div className="text-xs font-mono-nums tracking-widest text-[#e5b964] font-semibold uppercase">
            CORE PHILOSOPHY
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            portfolio가 일하는 4가지 원칙
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {philosophies.map((item) => (
            <div
              key={item.num}
              className="p-6 rounded-xl bg-[#0e1015] border border-white/[0.08] space-y-3 hover:border-[#e5b964]/40 transition-all"
            >
              <div className="font-mono-nums text-[#e5b964] font-bold text-base">
                {item.num}.
              </div>
              <h3 className="text-base font-bold text-white">
                {item.title}
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA to Works */}
      <div className="p-8 sm:p-12 rounded-xl bg-[#0e1015] border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div className="space-y-1">
          <h4 className="text-lg font-bold text-white">
            실제 프로젝트 작업물이 궁금하신가요?
          </h4>
          <p className="text-xs text-neutral-400">
            기획 의도, 편집 과정, 전후 인사이트가 담긴 포트폴리오를 확인해 보세요.
          </p>
        </div>
        <button
          onClick={() => onNavigate('works')}
          className="px-6 py-3 bg-[#e5b964] text-black text-xs font-bold rounded hover:bg-[#f2c776] transition-all flex items-center gap-1.5 cursor-pointer shrink-0 shadow-md"
        >
          <span>작업물 전체 보기</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
