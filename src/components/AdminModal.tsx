import React, { useState, useRef } from 'react';
import { X, Lock, Plus, Trash2, Edit3, RotateCcw, Check, Film, Eye, UploadCloud, Star, Image as ImageIcon, Sparkles } from 'lucide-react';
import { Project, ContactInquiry } from '../types/portfolio';
import { resetStoredProjects } from '../utils/storage';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
  onLogin: () => void;
  onLogout: () => void;
  projects: Project[];
  onSaveProjects: (projects: Project[]) => void;
  inquiries?: ContactInquiry[];
  onUpdateInquiryStatus?: (id: string, status: ContactInquiry['status']) => void;
  onDeleteInquiry?: (id: string) => void;
  onSelectProjectPreview: (p: Project) => void;
}

const ALLOWED_TOOLS = ['프리미어프로', '포토샵', '일러스트', '퓨전360', '스케치업'];

const QUICK_ROLES = [
  '컷 편집',
  '색보정',
  '숏폼 하이라이트 편집',
  '자막 디자인',
  '모션 타이포그래피',
  '스피드 램핑',
  '3D 모델링',
  '공간 투시도 설계'
];

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  isAuthenticated,
  onLogin,
  onLogout,
  projects,
  onSaveProjects,
  onSelectProjectPreview,
}) => {
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  
  // Project editing state
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [isEditingNew, setIsEditingNew] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [manualImageUrl, setManualImageUrl] = useState('');

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === '1111') {
      onLogin();
      setAuthError('');
      setPasswordInput('');
    } else {
      setAuthError('비밀번호가 일치하지 않습니다. (관리자 비밀번호: 1111)');
    }
  };

  const showStatus = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(''), 3000);
  };

  const handleOpenAddProject = () => {
    setIsEditingNew(true);
    setManualImageUrl('');
    setEditingProject({
      id: 'proj-' + Date.now(),
      title: '',
      client: '',
      category: 'Brand Film / CF',
      year: new Date().getFullYear().toString(),
      duration: '01:00',
      thumbnailUrl: '',
      images: [],
      videoUrl: '',
      featured: false,
      order: projects.length + 1,
      summary: '',
      purpose: '',
      directRole: ['컷 편집', '색보정'],
      process: '',
      tools: ['프리미어프로', '포토샵'],
      beforeAfterNote: '',
      deliverables: '4K UHD Master (16:9)',
    });
  };

  // Handle local files upload from computer (multiple images support)
  const handleFilesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileList = Array.from(files);
    let loadedCount = 0;
    const newImages: string[] = [];

    fileList.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          newImages.push(result);
        }
        loadedCount++;
        if (loadedCount === fileList.length && editingProject) {
          const currentImages = editingProject.images || [];
          const updatedImages = [...currentImages, ...newImages];
          // Default thumbnail to first image if none chosen
          const currentThumb = editingProject.thumbnailUrl || updatedImages[0];
          setEditingProject({
            ...editingProject,
            images: updatedImages,
            thumbnailUrl: currentThumb,
          });
          showStatus(`내 컴퓨터에서 ${newImages.length}장의 이미지가 성공적으로 추가되었습니다.`);
        }
      };
      reader.readAsDataURL(file);
    });

    e.target.value = '';
  };

  const handleAddManualImage = () => {
    if (!manualImageUrl.trim() || !editingProject) return;
    const url = manualImageUrl.trim();
    const currentImages = editingProject.images || [];
    const updatedImages = [...currentImages, url];
    setEditingProject({
      ...editingProject,
      images: updatedImages,
      thumbnailUrl: editingProject.thumbnailUrl || url,
    });
    setManualImageUrl('');
    showStatus('이미지 URL이 추가되었습니다.');
  };

  const handleSetCoverImage = (imgUrl: string) => {
    if (!editingProject) return;
    setEditingProject({
      ...editingProject,
      thumbnailUrl: imgUrl,
    });
    showStatus('대표 썸네일로 지정되었습니다.');
  };

  const handleRemoveImage = (indexToRemove: number) => {
    if (!editingProject) return;
    const currentImages = editingProject.images || [];
    const removedImg = currentImages[indexToRemove];
    const updatedImages = currentImages.filter((_, idx) => idx !== indexToRemove);
    
    let newThumbnail = editingProject.thumbnailUrl;
    if (newThumbnail === removedImg) {
      newThumbnail = updatedImages.length > 0 ? updatedImages[0] : '';
    }

    setEditingProject({
      ...editingProject,
      images: updatedImages,
      thumbnailUrl: newThumbnail,
    });
  };

  const toggleTool = (toolName: string) => {
    if (!editingProject) return;
    const currentTools = editingProject.tools || [];
    const exists = currentTools.includes(toolName);
    const updated = exists
      ? currentTools.filter((t) => t !== toolName)
      : [...currentTools, toolName];
    setEditingProject({
      ...editingProject,
      tools: updated,
    });
  };

  const toggleRole = (roleName: string) => {
    if (!editingProject) return;
    const currentRoles = editingProject.directRole || [];
    const exists = currentRoles.includes(roleName);
    const updated = exists
      ? currentRoles.filter((r) => r !== roleName)
      : [...currentRoles, roleName];
    setEditingProject({
      ...editingProject,
      directRole: updated,
    });
  };

  const handleSaveProjectForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.title || !editingProject.client) {
      alert('프로젝트 제목과 클라이언트명을 입력해주세요.');
      return;
    }

    const currentImages = editingProject.images || [];
    const finalThumbnail = editingProject.thumbnailUrl || (currentImages.length > 0 ? currentImages[0] : '/src/assets/images/hero_studio_showreel_1792465366310.jpg');

    const fullProj: Project = {
      ...(editingProject as Project),
      thumbnailUrl: finalThumbnail,
      images: currentImages.length > 0 ? currentImages : [finalThumbnail],
      tools: (editingProject.tools && editingProject.tools.length > 0) ? editingProject.tools : ['프리미어프로'],
      directRole: (editingProject.directRole && editingProject.directRole.length > 0) ? editingProject.directRole : ['컷 편집'],
    };

    if (isEditingNew) {
      const updated = [fullProj, ...projects];
      onSaveProjects(updated);
      showStatus('새 프로젝트가 등록되었습니다.');
    } else {
      const updated = projects.map((p) => (p.id === fullProj.id ? fullProj : p));
      onSaveProjects(updated);
      showStatus('프로젝트 수정 사항이 저장되었습니다.');
    }

    setEditingProject(null);
    setIsEditingNew(false);
  };

  const handleDeleteProject = (id: string, title: string) => {
    if (window.confirm(`'${title}' 프로젝트를 삭제하시겠습니까?`)) {
      const updated = projects.filter((p) => p.id !== id);
      onSaveProjects(updated);
      showStatus('프로젝트가 삭제되었습니다.');
    }
  };

  const handleResetToDefault = () => {
    if (window.confirm('포트폴리오를 초기 기본 데이터 세트로 복원하시겠습니까?')) {
      const restored = resetStoredProjects();
      onSaveProjects(restored);
      showStatus('기본 포트폴리오 데이터로 복원되었습니다.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0e1015] border border-white/[0.1] rounded-xl shadow-2xl overflow-hidden my-6 text-neutral-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#12141a]">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#e5b964]" />
            <h3 className="font-bold text-white text-base">
              portfolio 관리자 콘솔
            </h3>
            {isAuthenticated && (
              <span className="text-[11px] font-mono-nums bg-[#e5b964]/10 text-[#e5b964] border border-[#e5b964]/30 px-2 py-0.5 rounded ml-2 font-semibold">
                ADMIN LOGGED IN
              </span>
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

        {/* Content Area */}
        <div className="p-6">
          {!isAuthenticated ? (
            /* Login Gate (Password: 1111) */
            <div className="max-w-md mx-auto py-12 text-center space-y-6">
              <div className="w-14 h-14 rounded-full bg-[#13151c] flex items-center justify-center mx-auto text-[#e5b964] border border-[#e5b964]/40 shadow-[0_0_16px_rgba(229,185,100,0.2)]">
                <Lock className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xl font-bold text-white">
                  관리자 비밀번호 인증
                </h4>
                <p className="text-xs text-neutral-400">
                  컴퓨터 이미지 업로드, 프로젝트 추가, 수정 및 삭제 권한을 부여합니다.
                </p>
                <div className="text-xs text-[#e5b964] font-mono-nums pt-1 font-semibold">
                  (기본 비밀번호: 1111)
                </div>
              </div>

              <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-xs mx-auto">
                <div>
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="비밀번호 1111 입력"
                    autoFocus
                    className="w-full px-4 py-2.5 bg-[#13151c] border border-white/[0.1] rounded text-center text-sm text-white focus:outline-none focus:border-[#e5b964] font-mono-nums"
                  />
                  {authError && (
                    <p className="text-rose-400 text-xs mt-2 font-medium">
                      {authError}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#e5b964] hover:bg-[#f2c776] text-black font-bold text-xs rounded transition-colors cursor-pointer"
                >
                  로그인 및 관리자 진입
                </button>
              </form>
            </div>
          ) : (
            /* Authenticated Admin Management Interface */
            <div className="space-y-6">
              {/* Top Bar with Logout & Status */}
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-white">포트폴리오 프로젝트 관리</span>
                  <span className="text-xs text-neutral-500 font-mono-nums">({projects.length}개)</span>
                </div>

                <div className="flex items-center gap-3">
                  {statusMessage && (
                    <span className="text-xs text-[#e5b964] font-semibold animate-pulse">
                      {statusMessage}
                    </span>
                  )}
                  <button
                    onClick={onLogout}
                    className="text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  >
                    로그아웃
                  </button>
                </div>
              </div>

              {/* Editing Project Form */}
              {editingProject ? (
                <form onSubmit={handleSaveProjectForm} className="space-y-5 bg-[#12141a] p-6 rounded-xl border border-white/[0.08]">
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                    <div className="flex items-center gap-2">
                      <Film className="w-4 h-4 text-[#e5b964]" />
                      <h4 className="font-bold text-white text-sm">
                        {isEditingNew ? '새 프로젝트 추가' : `'${editingProject.title}' 프로젝트 수정`}
                      </h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditingProject(null)}
                      className="text-xs text-neutral-400 hover:text-white cursor-pointer"
                    >
                      취소
                    </button>
                  </div>

                  {/* Title & Client */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-neutral-400 mb-1">
                        프로젝트 제목 <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={editingProject.title || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                        placeholder="예: VELOS — Sound in Motion 브랜드 필름"
                        className="w-full px-3 py-2 bg-[#0e1015] border border-white/[0.1] rounded text-sm text-white focus:outline-none focus:border-[#e5b964]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-neutral-400 mb-1">
                        클라이언트 / 브랜드 <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={editingProject.client || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, client: e.target.value })}
                        placeholder="예: VELOS Audio Lab"
                        className="w-full px-3 py-2 bg-[#0e1015] border border-white/[0.1] rounded text-sm text-white focus:outline-none focus:border-[#e5b964]"
                      />
                    </div>
                  </div>

                  {/* Category, Year, Duration */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs text-neutral-400 mb-1">
                        카테고리
                      </label>
                      <select
                        value={editingProject.category || 'Brand Film / CF'}
                        onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as Project['category'] })}
                        className="w-full px-3 py-2 bg-[#0e1015] border border-white/[0.1] rounded text-sm text-white focus:outline-none focus:border-[#e5b964]"
                      >
                        <option value="Brand Film / CF">Brand Film / CF</option>
                        <option value="Motion & 3D">Motion & 3D</option>
                        <option value="Documentary / Interview">Documentary / Interview</option>
                        <option value="Short-form / YouTube">Short-form / YouTube</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs text-neutral-400 mb-1">
                        제작 연도
                      </label>
                      <input
                        type="text"
                        value={editingProject.year || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                        placeholder="2024"
                        className="w-full px-3 py-2 bg-[#0e1015] border border-white/[0.1] rounded text-sm text-white focus:outline-none focus:border-[#e5b964]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-neutral-400 mb-1">
                        러닝타임 (길이)
                      </label>
                      <input
                        type="text"
                        value={editingProject.duration || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, duration: e.target.value })}
                        placeholder="01:15"
                        className="w-full px-3 py-2 bg-[#0e1015] border border-white/[0.1] rounded text-sm text-white focus:outline-none focus:border-[#e5b964]"
                      />
                    </div>
                  </div>

                  {/* MULTI-IMAGE UPLOADER FROM LOCAL COMPUTER (요청 5번 사항) */}
                  <div className="space-y-3 pt-2 pb-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <label className="block text-xs font-semibold text-white flex items-center gap-1.5">
                          <ImageIcon className="w-4 h-4 text-[#e5b964]" />
                          <span>포트폴리오 이미지 (내 컴퓨터에서 여러 장 첨부 가능)</span>
                        </label>
                        <p className="text-[11px] text-neutral-400">
                          내 컴퓨터에 있는 이미지 파일을 여러 개 선택하여 업로드할 수 있습니다. 등록된 사진 중 원하는 이미지를 '대표 썸네일'로 지정하세요.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3.5 py-1.5 bg-[#e5b964] hover:bg-[#f2c776] text-black text-xs font-bold rounded flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-sm"
                      >
                        <UploadCloud className="w-4 h-4" />
                        <span>컴퓨터에서 이미지 올리기</span>
                      </button>
                    </div>

                    {/* Hidden Multiple File Input */}
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFilesUpload}
                      className="hidden"
                    />

                    {/* Image Gallery Grid Preview */}
                    {editingProject.images && editingProject.images.length > 0 ? (
                      <div className="space-y-2">
                        <div className="text-[11px] text-neutral-400 flex items-center justify-between">
                          <span>총 {editingProject.images.length}장의 이미지가 등록되었습니다. (★ 별표를 클릭해 대표 썸네일을 지정하세요)</span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
                          {editingProject.images.map((img, idx) => {
                            const isCover = editingProject.thumbnailUrl === img || (!editingProject.thumbnailUrl && idx === 0);
                            return (
                              <div
                                key={idx}
                                className={`relative aspect-video rounded-lg overflow-hidden border bg-black group transition-all ${
                                  isCover
                                    ? 'border-[#e5b964] ring-2 ring-[#e5b964]/40'
                                    : 'border-white/[0.1] hover:border-white/30'
                                }`}
                              >
                                <img
                                  src={img}
                                  alt={`Preview ${idx + 1}`}
                                  className="w-full h-full object-cover"
                                />

                                {/* Cover Badge */}
                                {isCover && (
                                  <div className="absolute top-1.5 left-1.5 bg-[#e5b964] text-black text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5 shadow">
                                    <Star className="w-2.5 h-2.5 fill-black" />
                                    <span>대표 썸네일</span>
                                  </div>
                                )}

                                {/* Action overlays */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                                  {!isCover && (
                                    <button
                                      type="button"
                                      onClick={() => handleSetCoverImage(img)}
                                      title="대표 썸네일로 설정"
                                      className="p-1.5 bg-black/80 text-[#e5b964] hover:bg-[#e5b964] hover:text-black rounded transition-colors cursor-pointer"
                                    >
                                      <Star className="w-3.5 h-3.5" />
                                    </button>
                                  )}
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveImage(idx)}
                                    title="이미지 삭제"
                                    className="p-1.5 bg-black/80 text-rose-400 hover:bg-rose-500 hover:text-white rounded transition-colors cursor-pointer"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-white/[0.15] hover:border-[#e5b964]/60 rounded-xl p-8 text-center cursor-pointer transition-colors bg-[#13151c]/50 space-y-2"
                      >
                        <UploadCloud className="w-8 h-8 text-[#e5b964] mx-auto opacity-80" />
                        <div className="text-xs text-white font-medium">
                          여기를 클릭하여 내 컴퓨터에서 이미지 파일을 선택하세요.
                        </div>
                        <div className="text-[11px] text-neutral-500">
                          JPG, PNG, WebP 등 여러 장 동시 선택 가능
                        </div>
                      </div>
                    )}

                    {/* Optional Web URL Input Fallback */}
                    <div className="pt-2 border-t border-white/[0.06] flex items-center gap-2">
                      <input
                        type="text"
                        value={manualImageUrl}
                        onChange={(e) => setManualImageUrl(e.target.value)}
                        placeholder="외부 웹 이미지 URL 주소로도 추가 가능"
                        className="flex-1 px-3 py-1.5 bg-[#13151c] border border-white/[0.08] rounded text-xs text-white focus:outline-none focus:border-[#e5b964]"
                      />
                      <button
                        type="button"
                        onClick={handleAddManualImage}
                        className="px-3 py-1.5 bg-white/[0.08] hover:bg-white/[0.15] text-xs text-white rounded transition-colors whitespace-nowrap cursor-pointer"
                      >
                        URL 추가
                      </button>
                    </div>
                  </div>

                  {/* Video URL */}
                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">
                      영상 재생 URL (YouTube 임베드 또는 비디오 링크)
                    </label>
                    <input
                      type="text"
                      value={editingProject.videoUrl || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, videoUrl: e.target.value })}
                      placeholder="https://www.youtube.com/embed/..."
                      className="w-full px-3 py-2 bg-[#0e1015] border border-white/[0.1] rounded text-sm text-white focus:outline-none focus:border-[#e5b964]"
                    />
                  </div>

                  {/* Summary & Purpose */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-neutral-400 mb-1">
                        핵심 한 줄 요약 (Summary)
                      </label>
                      <input
                        type="text"
                        value={editingProject.summary || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, summary: e.target.value })}
                        placeholder="하이엔드 프리미엄 무선 오디오 런칭 캠페인 시네마틱 필름"
                        className="w-full px-3 py-2 bg-[#0e1015] border border-white/[0.1] rounded text-sm text-white focus:outline-none focus:border-[#e5b964]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-neutral-400 mb-1">
                        제작 목적 & 기획 의도 (Purpose)
                      </label>
                      <input
                        type="text"
                        value={editingProject.purpose || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, purpose: e.target.value })}
                        placeholder="첫 3초 이탈 방어와 브랜드 감성 전달을 위한 기획 의도"
                        className="w-full px-3 py-2 bg-[#0e1015] border border-white/[0.1] rounded text-sm text-white focus:outline-none focus:border-[#e5b964]"
                      />
                    </div>
                  </div>

                  {/* TOOLS (EXCLUSIVELY 5 TOOLS) */}
                  <div className="space-y-2">
                    <label className="block text-xs text-neutral-400">
                      사용 가능 툴 (클릭하여 선택/해제)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {ALLOWED_TOOLS.map((tool) => {
                        const isSelected = (editingProject.tools || []).includes(tool);
                        return (
                          <button
                            type="button"
                            key={tool}
                            onClick={() => toggleTool(tool)}
                            className={`px-3 py-1.5 rounded text-xs font-semibold transition-all cursor-pointer border ${
                              isSelected
                                ? 'bg-[#e5b964] text-black border-[#e5b964] shadow-sm'
                                : 'bg-[#0e1015] text-neutral-400 border-white/[0.1] hover:text-white hover:border-white/30'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 inline-block mr-1 stroke-[3]" />}
                            {tool}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* DIRECT ROLES (NO AUDIO MIXING) */}
                  <div className="space-y-2">
                    <label className="block text-xs text-neutral-400">
                      직접 작업한 영역 (Role)
                    </label>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {QUICK_ROLES.map((role) => {
                        const isSelected = (editingProject.directRole || []).includes(role);
                        return (
                          <button
                            type="button"
                            key={role}
                            onClick={() => toggleRole(role)}
                            className={`px-2.5 py-1 rounded text-[11px] transition-all cursor-pointer border ${
                              isSelected
                                ? 'bg-white/20 text-white border-white/40 font-semibold'
                                : 'bg-[#0e1015] text-neutral-400 border-white/[0.08] hover:text-white'
                            }`}
                          >
                            + {role}
                          </button>
                        );
                      })}
                    </div>
                    <input
                      type="text"
                      value={(editingProject.directRole || []).join(', ')}
                      onChange={(e) => setEditingProject({
                        ...editingProject,
                        directRole: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                      })}
                      placeholder="쉼표(,)로 구분하여 입력"
                      className="w-full px-3 py-2 bg-[#0e1015] border border-white/[0.1] rounded text-sm text-white focus:outline-none focus:border-[#e5b964]"
                    />
                  </div>

                  {/* Process & Before/After */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-neutral-400 mb-1">
                        편집 과정 (Process - 어떻게 완성했는가?)
                      </label>
                      <textarea
                        rows={2}
                        value={editingProject.process || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, process: e.target.value })}
                        placeholder="타임라인 구성, 템포 제어, 산업디자인적 형태미 반영 등"
                        className="w-full px-3 py-2 bg-[#0e1015] border border-white/[0.1] rounded text-sm text-white focus:outline-none focus:border-[#e5b964]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-neutral-400 mb-1">
                        비포/애프터 & 문제 해결 노트 (선택 사항)
                      </label>
                      <textarea
                        rows={2}
                        value={editingProject.beforeAfterNote || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, beforeAfterNote: e.target.value })}
                        placeholder="수정 전: 처지던 템포 → 수정 후: 컷 타이밍 재설계로 이탈률 40% 방어"
                        className="w-full px-3 py-2 bg-[#0e1015] border border-white/[0.1] rounded text-sm text-white focus:outline-none focus:border-[#e5b964]"
                      />
                    </div>
                  </div>

                  {/* Featured checkbox */}
                  <div>
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-300">
                      <input
                        type="checkbox"
                        checked={!!editingProject.featured}
                        onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                        className="rounded bg-[#0e1015] border-neutral-700 text-[#e5b964] focus:ring-[#e5b964]"
                      />
                      <span className="font-semibold text-white">홈(HOME) 메인 대표 작업물로 노출하기</span>
                    </label>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-white/[0.08]">
                    <button
                      type="button"
                      onClick={() => setEditingProject(null)}
                      className="px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white cursor-pointer"
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 text-xs font-bold text-black bg-[#e5b964] rounded hover:bg-[#f2c776] transition-colors cursor-pointer shadow-md"
                    >
                      저장 완료
                    </button>
                  </div>
                </form>
              ) : (
                /* Projects List */
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-neutral-400 font-mono-nums">
                      등록된 프로젝트를 수정하거나 내 컴퓨터에서 이미지를 추가하세요.
                    </div>
                    <button
                      onClick={handleOpenAddProject}
                      className="px-4 py-2 text-xs font-bold text-black bg-[#e5b964] rounded hover:bg-[#f2c776] transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>새 프로젝트 추가</span>
                    </button>
                  </div>

                  <div className="divide-y divide-white/[0.08] border border-white/[0.08] rounded-xl overflow-hidden bg-[#12141a]">
                    {projects.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={item.thumbnailUrl || (item.images && item.images[0])}
                            alt={item.title}
                            className="w-16 h-10 object-cover rounded bg-black shrink-0 border border-white/10"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <h5 className="font-bold text-white text-sm">
                                {item.title}
                              </h5>
                              {item.featured && (
                                <span className="text-[10px] bg-[#e5b964]/10 text-[#e5b964] border border-[#e5b964]/30 px-1.5 py-0.2 rounded font-semibold">
                                  FEATURED
                                </span>
                              )}
                              {item.images && item.images.length > 1 && (
                                <span className="text-[10px] bg-white/10 text-neutral-300 px-1.5 py-0.2 rounded">
                                  이미지 {item.images.length}장
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-neutral-400 font-mono-nums mt-0.5">
                              {item.client} · {item.category} · {item.duration} · {item.tools.join(', ')}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-auto">
                          <button
                            type="button"
                            onClick={() => onSelectProjectPreview(item)}
                            title="모달 미리보기"
                            className="p-2 text-neutral-400 hover:text-white hover:bg-white/[0.06] rounded transition-colors cursor-pointer"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setIsEditingNew(false);
                              setEditingProject(item);
                            }}
                            title="수정하기"
                            className="p-2 text-[#e5b964] hover:bg-[#e5b964]/10 rounded transition-colors cursor-pointer"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteProject(item.id, item.title)}
                            title="삭제하기"
                            className="p-2 text-rose-400 hover:bg-rose-500/10 rounded transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Reset to initial button */}
                  <div className="pt-4 flex justify-between items-center text-xs text-neutral-500">
                    <span>실수로 삭제했거나 기본 예시로 되돌리려면 초기화를 누르세요.</span>
                    <button
                      onClick={handleResetToDefault}
                      className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-rose-400 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>기본 데이터로 초기화</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
