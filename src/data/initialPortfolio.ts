import { Project, ServicePackage } from '../types/portfolio';

// Initial images created during image generation
export const STUDIO_HERO_IMAGE = '/src/assets/images/hero_studio_showreel_1792465366310.jpg';
export const ABOUT_WORKSPACE_IMAGE = '/src/assets/images/about_director_workspace_1792465367666.jpg';

// 사용자 요청: 대표 작업물 2개 (네이버 쇼핑라이브 작업물 유지, 나머지 정리)
export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-naver-live',
    title: '네이버 쇼핑라이브 & 숏츠 하이라이트 편집',
    client: '네이버 1784 라이브커머스제작팀',
    category: 'Short-form / YouTube',
    year: '2026',
    duration: '00:58',
    thumbnailUrl: '/src/assets/images/work_brand_commercial_1792465366564.jpg',
    images: [
      '/src/assets/images/work_brand_commercial_1792465366564.jpg',
      '/src/assets/images/hero_studio_showreel_1792465366310.jpg',
      '/src/assets/images/about_director_workspace_1792465367666.jpg'
    ],
    videoUrl: 'https://www.youtube.com/embed/5qap5aO4i9A',
    featured: true,
    order: 1,
    summary: '네이버 1784 라이브커머스 방송 현장 보조 및 모바일 숏폼(숏츠) 하이라이트 편집',
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
    id: 'proj-kpu-design',
    title: '한국공학대 산업디자인 — 3D 제품 조형 & 브랜드 필름',
    client: '한국공학대학교 산업디자인공학부',
    category: 'Brand Film / CF',
    year: '2026',
    duration: '01:12',
    thumbnailUrl: '/src/assets/images/work_motion_art_1792465366964.jpg',
    images: [
      '/src/assets/images/work_motion_art_1792465366964.jpg',
      '/src/assets/images/hero_studio_showreel_1792465366310.jpg',
      '/src/assets/images/about_director_workspace_1792465367666.jpg'
    ],
    videoUrl: 'https://www.youtube.com/embed/ScMzIvxBSi4',
    featured: true,
    order: 2,
    summary: '산업디자인 조형 원리와 그리드 시스템을 기반으로 완성한 하이엔드 3D 시네마틱 필름',
    purpose: '제품 디자인의 곡선미, 금속과 글라스의 물질감, 그리고 공간 투시도를 영상 언어로 정교하게 구현하여 산업디자인 전공의 감각과 영상 편집의 구조적 완성도를 증명하고자 기획되었습니다.',
    directRole: [
      '3D 제품 조형 모델링 & 투시도 씬 앵글 연출',
      'A-Roll / B-Roll 리듬감 있는 시퀀스 컷 편집',
      '스위스 인터내셔널 그리드 타이포그래피 레이아웃',
      '시네마틱 톤 매핑 및 색보정'
    ],
    process: '퓨전360과 스케치업으로 설계된 제품의 3D 조형 데이터를 기반으로 빛의 반사각과 카메라 동선을 설계했습니다. 음악의 템포와 컷 전환을 완벽히 일치시켜 감각적이고 구조적인 미니멀 에디토리얼 무드를 연출했습니다.',
    tools: ['프리미어프로', '포토샵', '일러스트', '퓨전360', '스케치업'],
    beforeAfterNote: '단순한 3D 턴테이블 회전 영상에서 벗어나, 제품의 파팅 라인과 비례를 클로즈업하는 시네마틱 매치컷으로 브랜드 가치를 격상시켰습니다.',
    deliverables: '4K UHD Cinema Master (16:9), ProRes 422HQ',
    clientReview: {
      quote: '산업디자인의 엄밀한 비례 감각과 영상의 시각적 쾌감이 공존하는 수준 높은 졸업 대표작입니다.',
      author: '한국공학대학교',
      role: '산업디자인공학부'
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
      '밀리초 단위의 경쾌한 점프컷과 템포 제어',
      '스크롤을 멈추게 하는 썸네일 & 훅(Hook) 인트로 설계',
      '트렌디한 텍스트 팝업 모션 및 시각 효과',
      '월 단위 패키지 구독 및 캘린더 매니지먼트 지원'
    ]
  }
];

export const WORK_PROCESS_STEPS = [
  {
    step: '01',
    title: '기획 분석 & 소통',
    desc: '고객의 목적, 타깃 오디언스, 레퍼런스를 분석하여 프로젝트의 방향성과 무드보드를 합의합니다.'
  },
  {
    step: '02',
    title: '러프 컷 (가편집)',
    desc: '스토리라인과 흐름의 뼈대를 잡는 가편집본을 제작하여 전체적인 호흡과 핵심 구성을 1차 확인합니다.'
  },
  {
    step: '03',
    title: '정밀 편집 & 색보정/자막',
    desc: '세부 B-Roll 인서트, 트랜지션, 색보정, 타이포그래피 자막을 입혀 완성도를 끌어올립니다.'
  },
  {
    step: '04',
    title: '최종 검수 & 마스터 납품',
    desc: '고객 피드백을 반영한 2차 수정 후 플랫폼 규격(4K, 세로형, 비압축 마스터 등)에 맞추어 클라우드 링크로 최종 납품합니다.'
  }
];

export const FAQ_ITEMS = [
  {
    q: '촬영도 함께 진행하시나요, 아니면 편집만 맡기나요?',
    a: '기본적으로 고객님께서 보유하신 촬영 소스를 기반으로 한 고품질 편집, 색보정, 2D/3D 그래픽, 자막 디자인을 전문으로 합니다. 필요 시 수도권 내 현장 인터뷰 및 숏폼 촬영 지원도 사전 협의 후 연계 가능합니다.'
  },
  {
    q: '수정은 몇 회까지 가능하고, 추가 수정 정책은 어떻게 되나요?',
    a: '모든 프로젝트는 기본 2회의 정밀 수정(러프컷 피드백 1회 + 디테일/자막 수정 1회)이 포함되어 있습니다. 초기 기획의 틀을 벗어난 전면 재촬영/재편집이 아닌 이상 자막, 미세 컷 타이밍은 만족하실 때까지 유연하게 소통하며 조율해 드립니다.'
  },
  {
    q: '급한 숏츠나 라이브커머스 하이라이트 작업도 빠른 납품이 가능한가요?',
    a: '네, 일정이 촉박한 릴스/숏츠나 긴급 발표 클립의 경우 Fast-Track 옵션을 통해 24-48시간 내 신속 납품이 가능합니다. 이메일(helicat123@naver.com) 또는 전화(+82 10 3374 5355)로 사전 문의 시 일정을 협의해 주세요.'
  },
  {
    q: '산업디자인 공학 전공이 영상 제작에 어떤 도움이 되나요?',
    a: '단순히 컷을 자르고 붙이는 작업을 넘어, 제품의 형태(Form), 공간감, 빛의 반사, 타이포그래피의 비례와 그리드를 구조적으로 이해하고 영상을 설계합니다. 시각적 균형감과 미니멀한 감각으로 브랜드의 가치를 시각적으로 증명합니다.'
  }
];
