export type ProjectCategory = 
  | 'All'
  | 'Brand Film / CF'
  | 'Motion & 3D'
  | 'Documentary / Interview'
  | 'Short-form / YouTube';

export interface Project {
  id: string;
  title: string;
  client: string;
  category: 'Brand Film / CF' | 'Motion & 3D' | 'Documentary / Interview' | 'Short-form / YouTube';
  year: string;
  duration: string;
  thumbnailUrl: string; // 메인 대표 썸네일
  images?: string[]; // 여러 장의 스틸컷 / 작업 이미지 갤러리
  videoUrl?: string; // YouTube, Vimeo or MP4
  featured: boolean;
  order: number;
  summary: string;
  purpose: string; // 제작 의도
  directRole: string[]; // 직접 작업한 부분 (e.g. 컷 편집, 색보정, 오디오 믹싱, 모션그래픽)
  process: string; // 어떻게 완성했는지 (편집 과정, 타임라인 전략)
  tools: string[]; // Premiere Pro, DaVinci Resolve, After Effects, etc.
  beforeAfterNote?: string; // 비포/애프터 & 편집 차별점
  deliverables?: string; // 납품 포맷 (4K UHD 24fps, Vertical 9:16 등)
  clientReview?: {
    quote: string;
    author: string;
    role: string;
  };
}

export interface ContactInquiry {
  id: string;
  createdAt: string;
  clientName: string;
  companyName: string;
  email: string;
  phone: string;
  projectType: string;
  budgetRange: string;
  timeline: string;
  referenceUrl: string;
  projectDetails: string;
  status: '신규접수' | '검토중' | '상담완료';
}

export interface ServicePackage {
  id: string;
  title: string;
  subtitle: string;
  scope: string[];
  turnaround: string;
  revisions: string;
  deliverableFormat: string;
  recommendedFor: string;
  indicativePrice: string;
}
