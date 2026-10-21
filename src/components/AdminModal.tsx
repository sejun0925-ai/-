import React, { useState, useRef } from 'react';
import { X, Lock, Plus, Trash2, Edit3, RotateCcw, Check, Film, Eye, UploadCloud, Star, Image as ImageIcon, Camera, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Project, ContactInquiry } from '../types/portfolio';
import { resetStoredProjects } from '../utils/storage';
import { compressImageFile, compressMultipleImages } from '../utils/imageHelper';

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
  const [isProcessingImages, setIsProcessingImages] = useState(false);
  const [manualImageUrl, setManualImageUrl] = useState('');

  // Quick upload for project list row
  const [quickUploadTargetProjectId, setQuickUploadTargetProjectId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const quickFileInputRef = useRef<HTMLInputElement | null>(null);

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
    setTimeout(() => setStatusMessage(''), 4000);
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
      featured: true,
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

  // 1. FAST ONE-CLICK IMAGE REPLACE FROM PROJECT LIST
  const handleTriggerQuickUpload = (projectId: string) => {
    setQuickUploadTargetProjectId(projectId);
    quickFileInputRef.current?.click();
  };

  const handleQuickImageSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !quickUploadTargetProjectId) return;

    setIsProcessingImages(true);
    try {
      const optimizedDataUrl = await compressImageFile(file, 1920, 0.85);
      const target = projects.find((p) => p.id === quickUploadTargetProjectId);
      if (target) {
        const updatedImages = [optimizedDataUrl, ...(target.images || []).filter((img) => img !== target.thumbnailUrl)];
        const updatedProject: Project = {
          ...target,
          thumbnailUrl: optimizedDataUrl,
          images: updatedImages,
        };
        const updatedList = projects.map((p) => (p.id === target.id ? updatedProject : p));
        onSaveProjects(updatedList);
        showStatus(`'${target.title}'의 대표 사진이 즉시 포트폴리오에 반영되었습니다!`);
      }
    } catch (err) {
      console.error('Image compression error:', err);
      alert('이미지 처리 중 오류가 발생했습니다. 다른 이미지 파일을 선택해 주세요.');
    } finally {
      setIsProcessingImages(false);
      setQuickUploadTargetProjectId(null);
      e.target.value = '';
    }
  };

  // 2. MULTI-IMAGE UPLOAD FROM COMPUTER INSIDE EDIT FORM
  const handleFilesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !editingProject) return;

    setIsProcessingImages(true);
    try {
      const fileList = Array.from(files);
      const compressedUrls = await compressMultipleImages(fileList);
      const validUrls = compressedUrls.filter(Boolean);

      if (validUrls.length === 0) {
        alert('올바른 이미지 파일을 선택해 주세요.');
        return;
      }

      // Automatically set the FIRST uploaded image as the active cover thumbnail!
      const newCoverImage = validUrls[0];
      const currentImages = editingProject.images || [];
      // Prepend new images to the front so they appear immediately in gallery
      const updatedImages = [...validUrls, ...currentImages];

      setEditingProject({
        ...editingProject,
        images: updatedImages,
        thumbnailUrl: newCoverImage, // CRITICAL FIX: Update thumbnailUrl to newly uploaded image immediately!
      });

      showStatus(`내 컴퓨터에서 ${validUrls.length}장의 사진이 추가되었으며, 첫 번째 사진이 '대표 썸네일'로 자동 지정되었습니다! (저장 완료를 누르면 웹에 최종 반영됩니다)`);
    } catch (err) {
      console.error('Failed to process uploaded images:', err);
      alert('이미지 파일 처리 중 오류가 발생했습니다.');
    } finally {
      setIsProcessingImages(false);
      e.target.value = '';
    }
  };

  const handleAddManualImage = () => {
    if (!manualImageUrl.trim() || !editingProject) return;
    const url = manualImageUrl.trim();
    const currentImages = editingProject.images || [];
    const updatedImages = [url, ...currentImages];
    setEditingProject({
      ...editingProject,
      images: updatedImages,
      thumbnailUrl: url, // Automatically set as thumbnail
    });
    setManualImageUrl('');
    showStatus('이미지 URL이 추가되고 대표 썸네일로 지정되었습니다.');
  };

  const handleSetCoverImage = (imgUrl: string) => {
    if (!editingProject) return;
    setEditingProject({
      ...editingProject,
      thumbnailUrl: imgUrl,
    });
    showStatus('선택한 이미지가 대표 썸네일로 지정되었습니다.');
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
    showStatus('이미지가 갤러리에서 삭제되었습니다.');
  };

  // Remove old demo stock images to leave only user's uploaded images
  const handleClearDemoImages = () => {
    if (!editingProject) return;
    const currentImages = editingProject.images || [];
    // Filter out demo assets from initial bundle
    const userOnly = currentImages.filter((img) => !img.startsWith('/src/assets/images/') && !img.includes('assets/images/'));
    const finalCover = userOnly.length > 0 ? userOnly[0] : (editingProject.thumbnailUrl && !editingProject.thumbnailUrl.includes('assets/images/') ? editingProject.thumbnailUrl : '');
    
    setEditingProject({
      ...editingProject,
      images: userOnly,
      thumbnailUrl: finalCover,
    });
    showStatus('기존 샘플 이미지가 모두 제거되었습니다. 이제 내 컴퓨터 사진만 유지됩니다.');
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

  const handleSaveProjectForm = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!editingProject?.title || !editingProject.client) {
      alert('프로젝트 제목과 클라이언트명을 입력해주세요.');
      return;
    }

    const currentImages = editingProject.images || [];
    const finalThumbnail = editingProject.thumbnailUrl || (currentImages.length > 0 ? currentImages[0] : '');

    const fullProj: Project = {
      ...(editingProject as Project),
      thumbnailUrl: finalThumbnail,
      images: currentImages.length > 0 ? currentImages : (finalThumbnail ? [finalThumbnail] : []),
      tools: (editingProject.tools && editingProject.tools.length > 0) ? editingProject.tools : ['프리미어프로'],
      directRole: (editingProject.directRole && editingProject.directRole.length > 0) ? editingProject.directRole : ['컷 편집'],
    };

    let updatedList: Project[];
    if (isEditingNew) {
      updatedList = [fullProj, ...projects];
    } else {
      updatedList = projects.map((p) => (p.id === fullProj.id ? fullProj : p));
    }

    onSaveProjects(updatedList);
    showStatus(`'${fullProj.title}' 프로젝트와 이미지가 웹사이트에 즉시 반영되었습니다!`);

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
      {/* Hidden single file input for quick image change from list view */}
      <input
        ref={quickFileInputRef}
        type="file"
        accept="image/*"
        onChange={handleQuickImageSelected}
        className="hidden"
      />

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
                  컴퓨터 이미지 업로드, 대표 썸네일 변경, 프로젝트 등록 및 관리가 가능합니다.
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
                  className="w-full py-2.5 bg-[#e5b964] hover:bg-[#f2c776] text-black font-bold text-xs rounded transition-colors cursor-pointer shadow-md"
                >
                  로그인 및 관리자 진입
                </button>
              </form>
            </div>
          ) : (
            /* Authenticated Admin Management Interface */
            <div className="space-y-6">
              {/* Top Bar with Logout & Status */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/[0.08] gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-white">포트폴리오 프로젝트 & 이미지 관리</span>
                  <span className="text-xs text-neutral-500 font-mono-nums">({projects.length}개)</span>
                </div>

                <div className="flex items-center gap-3">
                  {isProcessingImages && (
                    <div className="flex items-center gap-1.5 text-xs text-[#e5b964]">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>이미지 최적화 중...</span>
                    </div>
                  )}
                  {statusMessage && (
                    <span className="text-xs text-[#e5b964] font-semibold bg-[#e5b964]/10 px-2.5 py-1 rounded border border-[#e5b964]/30 animate-in fade-in">
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
                <form onSubmit={handleSaveProjectForm} className="space-y-6 bg-[#12141a] p-6 rounded-xl border border-white/[0.08]">
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                    <div className="flex items-center gap-2">
                      <Film className="w-4 h-4 text-[#e5b964]" />
                      <h4 className="font-bold text-white text-sm">
                        {isEditingNew ? '새 프로젝트 등록' : `'${editingProject.title}' 프로젝트 & 이미지 수정`}
                      </h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleSaveProjectForm()}
                        className="px-3.5 py-1.5 bg-[#e5b964] hover:bg-[#f2c776] text-black font-bold text-xs rounded transition-colors cursor-pointer shadow-sm flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>즉시 저장</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingProject(null)}
                        className="text-xs text-neutral-400 hover:text-white cursor-pointer px-2 py-1"
                      >
                        취소
                      </button>
                    </div>
                  </div>

                  {/* 1. REPRESENTATIVE COVER THUMBNAIL SHOWCASE (CRITICAL) */}
                  <div className="p-4 rounded-xl bg-[#0a0c10] border border-[#e5b964]/30 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-1.5">
                          <Star className="w-4 h-4 text-[#e5b964] fill-[#e5b964]" />
                          <span>현재 대표 썸네일 (사이트 메인 & 포트폴리오 카드에 노출)</span>
                        </div>
                        <p className="text-[11px] text-neutral-400 mt-0.5">
                          내 컴퓨터에서 새 사진을 올리면 이 대표 썸네일에 <strong>즉시 자동 반영</strong>됩니다.
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={isProcessingImages}
                          className="px-4 py-2 bg-[#e5b964] hover:bg-[#f2c776] text-black text-xs font-bold rounded flex items-center gap-1.5 transition-all cursor-pointer shadow-md disabled:opacity-50"
                        >
                          <Camera className="w-4 h-4" />
                          <span>내 컴퓨터에서 사진 올리기</span>
                        </button>
                      </div>
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

                    {/* Active Cover Preview Box */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center pt-1">
                      <div className="md:col-span-5 relative aspect-video rounded-lg overflow-hidden border-2 border-[#e5b964] bg-black shadow-lg group">
                        {editingProject.thumbnailUrl ? (
                          <>
                            <img
                              src={editingProject.thumbnailUrl}
                              alt="Representative Cover"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2 left-2 bg-[#e5b964] text-black text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 shadow">
                              <Star className="w-3 h-3 fill-black" />
                              <span>현재 대표 썸네일로 적용됨</span>
                            </div>
                          </>
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-neutral-500 space-y-1 p-4 text-center">
                            <ImageIcon className="w-8 h-8 text-neutral-600" />
                            <span className="text-xs text-neutral-400">등록된 대표 이미지가 없습니다.</span>
                            <span className="text-[10px] text-neutral-500">'내 컴퓨터에서 사진 올리기'를 클릭하세요.</span>
                          </div>
                        )}
                      </div>

                      <div className="md:col-span-7 space-y-2 text-xs text-neutral-300">
                        <div className="p-3 bg-[#12141a] rounded-lg border border-white/[0.06] space-y-1.5">
                          <div className="font-semibold text-white flex items-center gap-1 text-[11px]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#e5b964]" />
                            <span>자동 크기 최적화 및 고화질 압축 지원</span>
                          </div>
                          <p className="text-[11px] text-neutral-400 leading-relaxed">
                            스마트폰이나 카메라 원본 사진(최대 20MB)을 선택해도 브라우저 내에서 고화질 1080p로 즉시 최적화되어 용량 초과 없이 안전하게 저장 및 반영됩니다.
                          </p>
                        </div>

                        {editingProject.images && editingProject.images.length > 0 && (
                          <div className="flex items-center justify-between pt-1">
                            <span className="text-[11px] text-neutral-400 font-mono-nums">
                              총 {editingProject.images.length}장의 사진이 등록되어 있습니다.
                            </span>
                            <button
                              type="button"
                              onClick={handleClearDemoImages}
                              className="text-[11px] text-neutral-400 hover:text-rose-400 transition-colors underline cursor-pointer"
                            >
                              기존 샘플 사진 지우기
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Attached Gallery Images List */}
                    {editingProject.images && editingProject.images.length > 0 && (
                      <div className="pt-3 border-t border-white/[0.08] space-y-2">
                        <div className="text-xs font-semibold text-neutral-300 flex items-center justify-between">
                          <span>스틸컷 갤러리 목록 (클릭하여 대표 썸네일 변경 또는 삭제):</span>
                          <span className="text-[11px] text-[#e5b964] font-normal">
                            ★ 별표 버튼을 누르면 해당 사진이 대표 썸네일로 바뀝니다.
                          </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
                          {editingProject.images.map((img, idx) => {
                            const isCover = editingProject.thumbnailUrl === img || (!editingProject.thumbnailUrl && idx === 0);
                            return (
                              <div
                                key={idx}
                                className={`relative aspect-video rounded-lg overflow-hidden border bg-black group transition-all ${
                                  isCover
                                    ? 'border-[#e5b964] ring-2 ring-[#e5b964]/50'
                                    : 'border-white/[0.1] hover:border-white/40'
                                }`}
                              >
                                <img
                                  src={img}
                                  alt={`Gallery ${idx + 1}`}
                                  className="w-full h-full object-cover"
                                />

                                {/* Cover indicator badge */}
                                {isCover ? (
                                  <div className="absolute top-1 left-1 bg-[#e5b964] text-black text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5 shadow">
                                    <Star className="w-2.5 h-2.5 fill-black" />
                                    <span>대표</span>
                                  </div>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => handleSetCoverImage(img)}
                                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 text-[10px] text-white font-semibold cursor-pointer"
                                  >
                                    <Star className="w-4 h-4 text-[#e5b964]" />
                                    <span>대표로 지정</span>
                                  </button>
                                )}

                                {/* Delete button */}
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveImage(idx);
                                  }}
                                  title="이미지 삭제"
                                  className="absolute top-1 right-1 p-1 bg-black/80 hover:bg-rose-500 text-white rounded transition-colors opacity-0 group-hover:opacity-100 cursor-pointer shadow"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Optional URL input fallback */}
                    <div className="pt-2 flex items-center gap-2">
                      <input
                        type="text"
                        value={manualImageUrl}
                        onChange={(e) => setManualImageUrl(e.target.value)}
                        placeholder="외부 웹 이미지 URL 주소로도 추가 가능 (선택 사항)"
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
                        placeholder="예: 네이버 쇼핑라이브 & 숏츠 하이라이트 편집"
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
                        placeholder="예: 네이버 1784 라이브커머스제작팀"
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
                        value={editingProject.category || 'Short-form / YouTube'}
                        onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as Project['category'] })}
                        className="w-full px-3 py-2 bg-[#0e1015] border border-white/[0.1] rounded text-sm text-white focus:outline-none focus:border-[#e5b964]"
                      >
                        <option value="Short-form / YouTube">Short-form / YouTube</option>
                        <option value="Brand Film / CF">Brand Film / CF</option>
                        <option value="Motion & 3D">Motion & 3D</option>
                        <option value="Documentary / Interview">Documentary / Interview</option>
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
                        placeholder="2026"
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
                        placeholder="00:58"
                        className="w-full px-3 py-2 bg-[#0e1015] border border-white/[0.1] rounded text-sm text-white focus:outline-none focus:border-[#e5b964]"
                      />
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
                        placeholder="네이버 1784 라이브커머스 방송 현장 보조 및 모바일 숏폼(숏츠) 하이라이트 편집"
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

                  {/* DIRECT ROLES */}
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
                      disabled={isProcessingImages}
                      className="px-6 py-2.5 text-xs font-bold text-black bg-[#e5b964] rounded hover:bg-[#f2c776] transition-colors cursor-pointer shadow-md disabled:opacity-50"
                    >
                      저장 완료 및 포트폴리오 즉시 반영
                    </button>
                  </div>
                </form>
              ) : (
                /* Projects List */
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#13151c] p-3.5 rounded-lg border border-white/[0.06]">
                    <div className="text-xs text-neutral-300">
                      <strong className="text-white">빠른 사진 교체:</strong> 각 프로젝트의 <span className="text-[#e5b964] font-semibold">'사진 변경'</span> 버튼을 누르면 내 컴퓨터 사진이 즉시 대표 이미지로 교체됩니다.
                    </div>
                    <button
                      onClick={handleOpenAddProject}
                      className="px-4 py-2 text-xs font-bold text-black bg-[#e5b964] rounded hover:bg-[#f2c776] transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm shrink-0 self-start sm:self-auto"
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
                          <div className="relative w-20 h-12 rounded overflow-hidden bg-black shrink-0 border border-white/20 group">
                            <img
                              src={item.thumbnailUrl || (item.images && item.images[0]) || '/src/assets/images/hero_studio_showreel_1792465366310.jpg'}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => handleTriggerQuickUpload(item.id)}
                              title="사진 바로 변경"
                              className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[#e5b964] cursor-pointer"
                            >
                              <Camera className="w-4 h-4" />
                            </button>
                          </div>

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
                                <span className="text-[10px] bg-white/10 text-neutral-300 px-1.5 py-0.2 rounded font-mono-nums">
                                  사진 {item.images.length}장
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-neutral-400 font-mono-nums mt-0.5">
                              {item.client} · {item.category} · {item.duration} · {item.tools.join(', ')}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                          {/* Direct Quick Photo Change Button */}
                          <button
                            type="button"
                            onClick={() => handleTriggerQuickUpload(item.id)}
                            className="px-2.5 py-1.5 text-xs font-semibold bg-[#e5b964]/15 hover:bg-[#e5b964] text-[#e5b964] hover:text-black border border-[#e5b964]/40 rounded transition-colors flex items-center gap-1 cursor-pointer"
                            title="내 컴퓨터 사진으로 즉시 교체"
                          >
                            <Camera className="w-3.5 h-3.5" />
                            <span>사진 변경</span>
                          </button>

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
                            title="전체 내용 및 갤러리 수정"
                            className="p-2 text-white hover:bg-white/[0.1] rounded transition-colors cursor-pointer"
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
