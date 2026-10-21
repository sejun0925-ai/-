import { Project, ServicePackage } from '../types/portfolio';

// Local direct assets provided by user
export const STUDIO_HERO_IMAGE = '/assets/aistudio/___26c72ec4.png';
export const ABOUT_WORKSPACE_IMAGE = '/assets/aistudio/_______1_7b6e2e73.png';

// 사용자 요청: 대표 작업물 2개 (네이버 쇼핑라이브 작업물 + 제공해주신 실제 사진 적용)
export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-naver-live',
    title: '네이버 쇼핑라이브 — 더미식 숏클립 하이라이트 편집',
    client: '네이버 1784 라이브커머스제작팀',
    category: 'Short-form / YouTube',
    year: '2026',
    duration: '00:59',
    thumbnailUrl: '/assets/aistudio/_______1_7b6e2e73.png',
    images: [
      '/assets/aistudio/_______1_7b6e2e73.png'
    ],
    videoUrl: 'https://www.youtube.com/embed/5qap5aO4i9A',
    featured: true,
    order: 1,
    summary: '네이버 1784 라이브커머스 방송 현장 보조 및 더미식 비빔면 & 만두 숏클립 하이라이트 편집',
    purpose: '실시간 라이브 방송 소스에서 즉각적인 구매 전환과 시청자 반응을 이끌어내는 핵심 세일즈 구간을 선별하고, 첫 3초 이탈을 방어하는 다이내믹한 훅(Hook) 인트로와 모바일 최적화 자막으로 도달률을 극대화했습니다.',
    directRole: [
      '라이브 방송 현장 보조 및 소스 아카이빙',
      '세로형(9:16) 숏츠 최적화 컷 편집',
      '첫 3초 훅(Hook) 인트로 시퀀스 구성',
      '모바일 가독성 중심 자막 & 타이포그래피 모션 디자인'
    ],
    process: '장시간의 라이브 원본에서 쇼호스트의 멘트와 상품 시연이 가장 돋보이는 찰나를 포착하여 밀리초 단위의 템포로 컷팅했습니다. 모바일 세로 화면 중앙 영역에 핵심 상품을 배치하는 프레임 리센터링과 다이내믹 줌인 효과로 몰입감을 배가했습니다.',
    tools: ['프리미어프로', '포토샵', '일러스트'],
    beforeAfterNote: '수정 전: 단순 방송 녹화본 컷팅으로 템포가 늘어짐 → 수정 후: 0.8초 주기 비트 컷팅과 강조 자막 팝업으로 시청 지속 시간 대폭 향상.',
    deliverables: 'Vertical 9:16 (1080x1920) 60fps 쇼츠 마스터, 클린본',
    clientReview: {
      quote: '라이브의 긴장감과 하이라이트 포인트를 숏츠의 문법으로 완벽히 재해석해 주어 높은 조회수와 전환을 기록했습니다.',
      author: '네이버 1784 라이브제작팀',
      role: 'Production Team'
    }
  },
  {
    id: 'proj-quanta-x',
    title: 'QUANTA-X — 시네마틱 브랜드 필름 & 3D 에디토리얼',
    client: 'QUANTA-X / 한국공학대학교 산업디자인',
    category: 'Brand Film / CF',
    year: '2026',
    duration: '01:12',
    thumbnailUrl: '/assets/aistudio/___26c72ec4.png',
    images: [
      '/assets/aistudio/___26c72ec4.png'
    ],
    videoUrl: 'https://www.youtube.com/embed/ScMzIvxBSi4',
    featured: true,
    order: 2,
    summary: '자연의 빛과 공간감, 산업디자인 조형미를 결합한 QUANTA-X 하이엔드 시네마틱 브랜드 필름',
    purpose: '깊은 숲 속의 빛과 유기적 텍스처, 그리고 현대적 타이포그래피를 조화롭게 융합하여 브랜드의 정체성과 감각적인 공간감을 영상 언어로 완성했습니다.',
    directRole: [
      '시네마틱 자연 다큐멘터리 씬 앵글 연출 & 컷 편집',
      '스위스 미니멀 인터내셔널 그리드 타이포그래피 레이아웃',
      '3D 조형 및 투시도 공간 설계 연출',
      '시네마틱 톤 매핑 & 컬러 그레이딩'
    ],
    process: '빛의 산란과 나무 줄기의 깊이감이 드러나는 숲의 풍경에 강렬한 레드 세리프 타이포그래피 QUANTA-X를 대비 배치하여 시각적 긴장감을 부여했습니다. 퓨전360과 스케치업의 3D 공간 원리를 영상 프레임 구성에 접목했습니다.',
    tools: ['프리미어프로', '포토샵', '일러스트', '퓨전360', '스케치업'],
    beforeAfterNote: '수정 전: 평이한 자연 풍경 나열 → 수정 후: 조도와 피사계 심도를 살린 2.07:1 와이드 시네마틱 프레이밍과 타이포그래피 조화로 브랜드 필름 완성도 극대화.',
    deliverables: '4K UHD Cinema Master (2.39:1 / 16:9), ProRes 422HQ',
    clientReview: {
      quote: '산업디자인의 공간 감각과 시네마틱 영상의 미장센이 완벽히 결합된 인상적인 작품입니다.',
      author: 'QUANTA-X Project',
      role: 'Creative Direction'
    }
  }
];

export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    id: 'serv-1',
    title: 'Brand Film & CF',
    subtitle: '브랜드 가치를 격상시키는 시네마틱 영상',
    recommendedFor: '신제품 런칭, 브랜드 리브랜딩, 기업 대표 홍보 영상',
    turnaround: '영업일 기준 10 ~ 14일',
    revisions: '기본 2회 정밀 수정 포함 (A컷 러프컷 1회 + 파이널 컬러/자막 1회)',
    deliverableFormat: '4K UHD 마스터 (ProRes 422HQ & H.264 MP4), SNS용 리프레임 1종',
    indicativePrice: '1,500,000원 ~ (촬영본 기준, 분량 및 기획 난이도별 협의)',
    scope: [
      '스토리라인 및 내러티브 시퀀스 재구성',
      '전문 컬러 그레이딩 및 톤 매핑',
      '상업용 BGM 및 사운드 효과 편집',
      '키네틱 타이포그래피 & 로고 엔드카드'
    ]
  },
  {
    id: 'serv-2',
    title: 'Motion & 3D Graphic',
    subtitle: '시선을 붙잡는 감각적인 그래픽 디자인',
    recommendedFor: '제품 기능 시각화, 전시 타이틀 영상, 앱/웹 서비스 소개',
    turnaround: '영업일 기준 7 ~ 10일',
    revisions: '스토리보드 컨펌 1회 + 모션 프리뷰 2회 수정',
    deliverableFormat: '원하는 모든 해상도 (4K/8K, 알파 채널 지원)',
    indicativePrice: '1,000,000원 ~ (복잡도 및 러닝타임 기준)',
    scope: [
      '산업디자인 3D 모델링 기반 뷰 및 모션 애니메이션',
      '스위스 미니멀 스타일의 정밀한 타이포그래피 레이아웃',
      '타이밍 싱크 및 그래픽 효과 디자인',
      '소스 프로젝트 및 벡터 에셋 정리 납품'
    ]
  },
  {
    id: 'serv-3',
    title: 'Interview & Documentary',
    subtitle: '진정성과 신뢰를 전하는 이야기 중심 영상',
    recommendedFor: '고객 성공 사례, CEO 인터뷰, 기업 IR, 채용 브랜딩',
    turnaround: '영업일 기준 5 ~ 7일',
    revisions: '가편집 1회 + 자막 최종 검수 1회 (총 2회)',
    deliverableFormat: 'Full HD / 4K YouTube 최적화 파일, 클린본 제공',
    indicativePrice: '800,000원 ~',
    scope: [
      '방대한 원본에서 핵심 메시지만을 추출하는 스토리 컷팅',
      '인터뷰 음성 정돈 및 선명도 보정',
      '톤다운된 자연스러운 웜톤 색보정',
      '가독성 높은 브랜드 전용 폰트 자막 디자인'
    ]
  },
  {
    id: 'serv-4',
    title: 'YouTube & Short-form',
    subtitle: '첫 3초 이탈을 막는 고밀도 숏폼 & 유튜브 편집',
    recommendedFor: '네이버 라이브커머스 숏츠, 유튜브 쇼츠, 인스타그램 릴스',
    turnaround: '영업일 기준 3 ~ 5일 (정기 계약 시 일정 단축)',
    revisions: '기본 2회 수정 (빠른 피드백 반영)',
    deliverableFormat: '세로 9:16 모바일 최적화 및 가로 16:9 동시 납품 지원',
    indicativePrice: '건당 250,000원 ~ (월 정기 패키지 시 할인 적용)',
    scope: [
      '시선 고정을 위한 첫 3초 훅(Hook) 구성',
      '스마트폰 화면에 최적화된 자막 및 스티커 모션',
      '트렌디한 비트 컷팅 및 템포 조율',
      '모바일 세로화면 리센터링'
    ]
  }
];
