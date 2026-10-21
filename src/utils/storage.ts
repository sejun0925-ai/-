import { Project, ContactInquiry } from '../types/portfolio';
import { INITIAL_PROJECTS } from '../data/initialPortfolio';

const PROJECTS_KEY = 'portfolio_projects_v6';
const INQUIRIES_KEY = 'portfolio_inquiries_v6';

// Allowed tools as per user instruction:
// 프리미어프로, 포토샵, 일러스트, 퓨전360, 스케치업
const ALLOWED_TOOLS = ['프리미어프로', '포토샵', '일러스트', '퓨전360', '스케치업'];

let inMemoryProjects: Project[] | null = null;

function sanitizeProject(p: Project): Project {
  const cleanedTools = (p.tools || []).map(t => {
    const lower = t.toLowerCase();
    if (lower.includes('premiere')) return '프리미어프로';
    if (lower.includes('photoshop')) return '포토샵';
    if (lower.includes('illustrator')) return '일러스트';
    if (lower.includes('fusion')) return '퓨전360';
    if (lower.includes('sketchup')) return '스케치업';
    if (ALLOWED_TOOLS.includes(t)) return t;
    return '프리미어프로';
  }).filter((v, i, a) => ALLOWED_TOOLS.includes(v) && a.indexOf(v) === i);

  const cleanedRoles = (p.directRole || []).filter(role => !role.includes('믹싱'));
  const images = (p.images && p.images.length > 0) ? p.images : (p.thumbnailUrl ? [p.thumbnailUrl] : []);
  const thumbnail = p.thumbnailUrl || (images[0] || '');

  return {
    ...p,
    tools: cleanedTools.length > 0 ? cleanedTools : ['프리미어프로'],
    directRole: cleanedRoles.length > 0 ? cleanedRoles : ['컷 편집', '색보정'],
    images: images,
    thumbnailUrl: thumbnail,
  };
}

export function getStoredProjects(): Project[] {
  if (inMemoryProjects && inMemoryProjects.length > 0) {
    return inMemoryProjects;
  }

  try {
    const raw = localStorage.getItem(PROJECTS_KEY);
    if (!raw) {
      inMemoryProjects = INITIAL_PROJECTS;
      try {
        localStorage.setItem(PROJECTS_KEY, JSON.stringify(INITIAL_PROJECTS));
      } catch (err) {}
      return INITIAL_PROJECTS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      const sanitized = parsed.map(sanitizeProject);
      inMemoryProjects = sanitized;
      return sanitized;
    }
    inMemoryProjects = INITIAL_PROJECTS;
    return INITIAL_PROJECTS;
  } catch (e) {
    console.error('Failed to load projects from storage', e);
    inMemoryProjects = INITIAL_PROJECTS;
    return INITIAL_PROJECTS;
  }
}

export function saveStoredProjects(projects: Project[]): void {
  const cleaned = projects.map(sanitizeProject);
  inMemoryProjects = cleaned;

  try {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(cleaned));
  } catch (e: any) {
    console.error('Failed to save projects to localStorage:', e);
    // If quota exceeded, attempt to clear older keys from previous versions
    try {
      localStorage.removeItem('portfolio_projects_v5');
      localStorage.removeItem('portfolio_projects_v4');
      localStorage.removeItem('portfolio_projects_v3');
      localStorage.removeItem('im_video_projects_v1');
      localStorage.setItem(PROJECTS_KEY, JSON.stringify(cleaned));
    } catch (retryErr) {
      console.warn('Retry saving after cache cleanup failed, kept in-memory:', retryErr);
    }
  }
}

export function resetStoredProjects(): Project[] {
  inMemoryProjects = INITIAL_PROJECTS;
  try {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(INITIAL_PROJECTS));
  } catch (e) {
    console.error('Failed to reset projects', e);
  }
  return INITIAL_PROJECTS;
}

export function getStoredInquiries(): ContactInquiry[] {
  try {
    const raw = localStorage.getItem(INQUIRIES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Failed to load inquiries', e);
    return [];
  }
}

export function saveInquiry(inquiry: Omit<ContactInquiry, 'id' | 'createdAt' | 'status'>): ContactInquiry {
  const current = getStoredInquiries();
  const newInquiry: ContactInquiry = {
    ...inquiry,
    id: 'inq-' + Date.now(),
    createdAt: new Date().toISOString(),
    status: '신규접수'
  };
  const updated = [newInquiry, ...current];
  try {
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save inquiry', e);
  }
  return newInquiry;
}
