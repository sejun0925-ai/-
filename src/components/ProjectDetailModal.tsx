import React, { useEffect, useState } from 'react';
import { X, Play, Clock, Film, Wrench, CheckCircle2, Award, Mail, Phone, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { Project } from '../types/portfolio';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
}) => {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    if (project) {
      document.body.style.overflow = 'hidden';
      setActiveImageIndex(0);
      setIsPlayingVideo(false);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [project, onClose]);

  if (!project) return null;

  // Resolve all images for this project (multiple images support)
  const galleryImages: string[] = (() => {
    const list = project.images && project.images.length > 0 ? [...project.images] : [];
    if (project.thumbnailUrl && !list.includes(project.thumbnailUrl)) {
      list.unshift(project.thumbnailUrl);
    } else if (project.thumbnailUrl && list.includes(project.thumbnailUrl)) {
      const idx = list.indexOf(project.thumbnailUrl);
      if (idx > 0) {
        list.splice(idx, 1);
        list.unshift(project.thumbnailUrl);
      }
    }
    return list.length > 0 ? list : (project.thumbnailUrl ? [project.thumbnailUrl] : []);
  })();

  const currentDisplayedImage = galleryImages[activeImageIndex] || project.thumbnailUrl || galleryImages[0];

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlayingVideo(false);
    setActiveImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlayingVideo(false);
    setActiveImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#0e1015] border border-white/[0.1] rounded-xl overflow-hidden shadow-2xl my-8 text-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#12141a]">
          <div className="flex items-center gap-3 text-xs text-neutral-400 font-mono-nums">
            <span className="text-[#e5b964] font-semibold">{project.category}</span>
            <span>·</span>
            <span>{project.year}</span>
            <span>·</span>
            <span className="text-white">{project.duration}</span>
            {galleryImages.length > 1 && (
              <>
                <span>·</span>
                <span className="bg-[#e5b964]/10 text-[#e5b964] px-2 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1">
                  <ImageIcon className="w-3 h-3" />
                  <span>스틸컷 {activeImageIndex + 1} / {galleryImages.length}</span>
                </span>
              </>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Media Frame (Video or Thumbnail & Multi-Image Showcase) */}
        <div className="relative aspect-video w-full bg-black overflow-hidden group">
          {isPlayingVideo && project.videoUrl ? (
            <iframe
              src={`${project.videoUrl}?autoplay=1&rel=0`}
              title={project.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="relative w-full h-full">
              <img
                src={currentDisplayedImage}
                alt={`${project.title} - ${activeImageIndex + 1}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700"
              />

              {/* Gradient scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent pointer-events-none" />

              {/* Video Play Button (if project has a videoUrl) */}
              {project.videoUrl && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => setIsPlayingVideo(true)}
                    className="flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#e5b964] text-black font-bold text-sm hover:bg-[#f2c776] hover:shadow-[0_0_20px_rgba(229,185,100,0.4)] transition-all hover:scale-105 shadow-xl cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-black" />
                    <span>영상 재생하기</span>
                  </button>
                </div>
              )}

              {/* Prev / Next controls for multiple images */}
              {galleryImages.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer hover:scale-105"
                    aria-label="이전 이미지"
                  >
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer hover:scale-105"
                    aria-label="다음 이미지"
                  >
                    <ChevronRight className="w-5 h-5 text-white" />
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Thumbnail Filmstrip Navigation for Multiple Images */}
        {galleryImages.length > 1 && (
          <div className="px-6 py-3 bg-[#111318] border-b border-white/[0.08] flex items-center gap-2 overflow-x-auto">
            <span className="text-[11px] text-neutral-400 font-mono-nums shrink-0 mr-1">
              갤러리 스틸컷:
            </span>
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setIsPlayingVideo(false);
                  setActiveImageIndex(idx);
                }}
                className={`relative w-16 h-10 rounded overflow-hidden shrink-0 border transition-all cursor-pointer ${
                  activeImageIndex === idx && !isPlayingVideo
                    ? 'border-[#e5b964] ring-2 ring-[#e5b964]/40 scale-105'
                    : 'border-white/10 opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[60vh] overflow-y-auto">
          {/* Title & Client Headline */}
          <div className="space-y-2 border-b border-white/[0.08] pb-6">
            <div className="text-xs font-mono-nums tracking-widest text-[#e5b964] font-semibold uppercase">
              {project.client} · {project.category}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
              {project.summary}
            </p>
          </div>

          {/* 01. 제작 의도 & 목적 */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#e5b964] flex items-center gap-1.5">
              <Film className="w-4 h-4 text-[#e5b964]" />
              <span>01. 기획 배경 & 제작 의도 (Purpose)</span>
            </h4>
            <div className="text-sm text-neutral-300 leading-relaxed bg-[#13151c] p-5 rounded-lg border border-white/[0.06] font-normal">
              {project.purpose}
            </div>
          </div>

          {/* 02. 직접 작업한 부분 (Roles) */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#e5b964] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#e5b964]" />
              <span>02. 직접 작업한 영역 (Direct Responsibilities)</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.directRole.map((role, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-lg bg-[#13151c] border border-white/[0.06] text-xs text-neutral-200"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e5b964] shrink-0 mt-1.5" />
                  <span className="font-medium">{role}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 03. 편집 과정 (Process) */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#e5b964] flex items-center gap-1.5">
              <Wrench className="w-4 h-4 text-[#e5b964]" />
              <span>03. 완성 과정 & 편집 전략 (Timeline & Execution)</span>
            </h4>
            <div className="text-sm text-neutral-300 leading-relaxed bg-[#13151c] p-5 rounded-lg border border-white/[0.06] font-normal">
              {project.process}
            </div>
          </div>

          {/* 04. 비포/애프터 노트 */}
          {project.beforeAfterNote && (
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#e5b964] flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#e5b964]" />
                <span>04. 편집 전후 차별점 & 문제 해결 (Before & After)</span>
              </h4>
              <div className="text-sm text-neutral-300 leading-relaxed bg-[#e5b964]/5 p-4 rounded-lg border border-[#e5b964]/20 font-normal">
                {project.beforeAfterNote}
              </div>
            </div>
          )}

          {/* Tools & Deliverables */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-lg bg-[#13151c] border border-white/[0.06]">
              <div className="text-xs text-[#e5b964] mb-2 font-semibold">사용 소프트웨어 & 툴</div>
              <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-neutral-200 font-mono-nums">
                {project.tools.map((tool, idx) => (
                  <span key={idx} className="bg-white/[0.06] px-2 py-0.5 rounded border border-white/[0.08]">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-lg bg-[#13151c] border border-white/[0.06]">
              <div className="text-xs text-[#e5b964] mb-2 font-semibold">납품 포맷 & 규격</div>
              <div className="text-xs text-neutral-200 font-mono-nums">
                {project.deliverables || '4K UHD Master (16:9), H.264 / ProRes'}
              </div>
            </div>
          </div>

          {/* Client Testimonial if present */}
          {project.clientReview && (
            <div className="p-5 rounded-lg bg-[#13151c] border border-[#e5b964]/20 space-y-2">
              <div className="text-xs font-semibold text-[#e5b964] uppercase tracking-wider">
                Client Feedback
              </div>
              <blockquote className="text-base font-medium text-neutral-100 leading-snug">
                "{project.clientReview.quote}"
              </blockquote>
              <div className="text-xs text-neutral-400 pt-1">
                {project.clientReview.author} · {project.clientReview.role}
              </div>
            </div>
          )}

          {/* Bottom Direct Contact */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/[0.08]">
            <div className="text-xs text-neutral-400">
              이와 유사한 프로젝트 또는 영상 제작 협업이 필요하신가요?
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href={`mailto:helicat123@naver.com?subject=[${encodeURIComponent(project.title)}] 협업 및 제작 문의`}
                className="flex-1 sm:flex-initial px-5 py-2.5 bg-[#e5b964] text-black font-bold text-xs rounded hover:bg-[#f2c776] hover:shadow-[0_0_16px_rgba(229,185,100,0.3)] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>이메일 문의</span>
              </a>
              <a
                href="tel:+821033745355"
                className="flex-1 sm:flex-initial px-4 py-2.5 bg-[#13151c] border border-white/[0.1] hover:border-[#e5b964] text-white text-xs font-semibold rounded transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-[#e5b964]" />
                <span>전화 연결</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
