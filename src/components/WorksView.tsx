import React, { useState } from 'react';
import { Play, ArrowUpRight, Film, Wrench, CheckCircle2, Images } from 'lucide-react';
import { Project, ProjectCategory } from '../types/portfolio';

interface WorksViewProps {
  projects: Project[];
  onSelectProject: (p: Project) => void;
  onOpenAdmin: () => void;
}

export const WorksView: React.FC<WorksViewProps> = ({
  projects,
  onSelectProject,
  onOpenAdmin,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');

  const categories: ProjectCategory[] = [
    'All',
    'Brand Film / CF',
    'Motion & 3D',
    'Documentary / Interview',
    'Short-form / YouTube',
  ];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12 bg-[#07080a]">
      {/* Page Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="text-xs font-mono-nums tracking-widest text-[#e5b964] font-semibold uppercase flex items-center gap-2">
          <span className="w-2 h-[1px] bg-[#e5b964]" />
          <span>PORTFOLIO ARCHIVE</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Selected Works & Case Studies
        </h1>
        <p className="text-base text-neutral-400 leading-relaxed font-normal">
          영상만 단순 나열하는 포트폴리오를 넘어, <span className="text-white font-medium">어떤 목적을 위해 기획되었는지</span>, <span className="text-[#e5b964] font-medium">어떤 영역을 직접 작업했는지</span>, 그리고 <span className="text-white font-medium">어떤 컷팅과 그레이딩 과정을 거쳐 완성했는지</span> 상세히 기록합니다.
        </p>
      </div>

      {/* Interactive Segmented Filter Controls with Gold Point Accent */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#0e1015] border border-white/[0.08] rounded-lg">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-semibold rounded transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-[#e5b964] text-black shadow-md font-bold'
                    : 'text-neutral-400 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="text-xs text-neutral-400 font-mono-nums flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e5b964]" />
          <span>{filteredProjects.length} Projects displayed</span>
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-24 border border-white/[0.08] rounded-xl bg-[#0e1015] text-neutral-400 text-sm">
          해당 카테고리의 프로젝트가 없습니다.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {filteredProjects.map((project) => {
            const hasMultipleImages = project.images && project.images.length > 1;
            return (
              <article
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="group bg-[#0e1015] border border-white/[0.08] rounded-xl overflow-hidden hover:border-[#e5b964]/50 transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                {/* Media Thumbnail Container */}
                <div className="relative aspect-video w-full bg-black overflow-hidden">
                  <img
                    src={project.thumbnailUrl || (project.images && project.images[0])}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-104"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-between p-5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono-nums bg-black/80 backdrop-blur-md text-[#e5b964] px-2.5 py-1 rounded border border-[#e5b964]/30 font-semibold">
                        {project.category}
                      </span>
                      <div className="flex items-center gap-2">
                        {hasMultipleImages && (
                          <span className="text-[11px] font-mono-nums bg-black/80 backdrop-blur-md text-white px-2 py-1 rounded border border-white/20 flex items-center gap-1">
                            <Images className="w-3 h-3 text-[#e5b964]" />
                            <span>{project.images!.length}장</span>
                          </span>
                        )}
                        <span className="text-[11px] font-mono-nums bg-black/80 backdrop-blur-md text-neutral-300 px-2 py-1 rounded border border-white/10">
                          {project.duration}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-end justify-between">
                      <div className="text-xs text-neutral-300 font-mono-nums">
                        <span>{project.client}</span>
                        <span className="mx-2 text-[#e5b964]">·</span>
                        <span>{project.year}</span>
                      </div>

                      <div className="w-10 h-10 rounded-full bg-[#e5b964] text-black flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#f2c776] transition-transform">
                        <Play className="w-4 h-4 fill-black ml-0.5" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Editorial Case Study Content */}
                <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#e5b964] transition-colors leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-sm text-neutral-300 mt-2 leading-relaxed font-normal">
                        {project.summary}
                      </p>
                    </div>

                    {/* 01. 제작 의도 & 목적 */}
                    <div className="bg-[#13151c] p-4 rounded-lg border border-white/[0.06] space-y-1.5">
                      <div className="text-xs font-semibold text-[#e5b964] flex items-center gap-1.5 uppercase tracking-wider">
                        <Film className="w-3.5 h-3.5 text-[#e5b964]" />
                        <span>제작 목적 & 기획 의도</span>
                      </div>
                      <p className="text-xs text-neutral-300 leading-relaxed line-clamp-2">
                        {project.purpose}
                      </p>
                    </div>

                    {/* 02. 직접 작업한 영역 */}
                    <div className="space-y-1.5">
                      <div className="text-xs font-semibold text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#e5b964]" />
                        <span>직접 작업한 영역 (Role)</span>
                      </div>
                      <div className="text-xs text-neutral-300 flex flex-wrap gap-x-2 gap-y-1 font-mono-nums">
                        {project.directRole.map((role, rIdx) => (
                          <span key={rIdx}>
                            {role}{rIdx < project.directRole.length - 1 ? ' · ' : ''}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* 03. 편집 과정 핵심 */}
                    <div className="space-y-1.5">
                      <div className="text-xs font-semibold text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
                        <Wrench className="w-3.5 h-3.5 text-[#e5b964]" />
                        <span>편집 전략 & 파이프라인</span>
                      </div>
                      <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2">
                        {project.process}
                      </p>
                    </div>
                  </div>

                  {/* Footer of Card */}
                  <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs">
                    <div className="text-neutral-400 font-mono-nums truncate max-w-[240px]">
                      {project.tools.join(', ')}
                    </div>
                    <span className="text-[#e5b964] font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      <span>상세 케이스 & 갤러리</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Admin Notice */}
      <div className="pt-12 text-center">
        <button
          onClick={onOpenAdmin}
          className="text-xs text-neutral-500 hover:text-[#e5b964] transition-colors underline cursor-pointer"
        >
          관리자이신가요? 포트폴리오를 추가 및 수정하려면 클릭하세요 (PW: 1111)
        </button>
      </div>
    </div>
  );
};
