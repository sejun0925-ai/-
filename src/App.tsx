import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { WorksView } from './components/WorksView';
import { AboutView } from './components/AboutView';
import { ServiceView } from './components/ServiceView';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { AdminModal } from './components/AdminModal';
import { Project } from './types/portfolio';
import {
  getStoredProjects,
  saveStoredProjects,
} from './utils/storage';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [projects, setProjects] = useState<Project[]>([]);
  
  // Modals & Navigation States
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // Initial load from storage
    try {
      const loadedProjects = getStoredProjects();
      setProjects(loadedProjects);
    } catch (e) {
      console.error('Failed to load projects', e);
    }

    // Check if admin was previously logged in during this session
    try {
      const adminSession = sessionStorage.getItem('portfolio_admin_auth');
      if (adminSession === 'true') {
        setIsAdminLoggedIn(true);
      }
    } catch (e) {
      // Ignore storage restrictions in iframes
    }
  }, []);

  const handleSaveProjects = (updatedProjects: Project[]) => {
    setProjects(updatedProjects);
    try {
      saveStoredProjects(updatedProjects);
    } catch (e) {
      console.error('Failed to save projects', e);
    }
  };

  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
    try {
      sessionStorage.setItem('portfolio_admin_auth', 'true');
    } catch (e) {}
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    try {
      sessionStorage.removeItem('portfolio_admin_auth');
    } catch (e) {}
  };

  const handleNavigate = (tab: string) => {
    setCurrentTab(tab);
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {}
  };

  return (
    <div className="min-h-screen bg-[#07080a] text-[#f4f4f5] flex flex-col font-pretendard antialiased selection:bg-[#e5b964] selection:text-black">
      {/* 3-Zone Top Navigation with 'portfolio' Wordmark & Gold Accents */}
      <Header
        currentTab={currentTab}
        onNavigate={handleNavigate}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
        isAdminLoggedIn={isAdminLoggedIn}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomeView
            projects={projects}
            onNavigate={handleNavigate}
            onSelectProject={(p) => setSelectedProject(p)}
          />
        )}

        {currentTab === 'works' && (
          <WorksView
            projects={projects}
            onSelectProject={(p) => setSelectedProject(p)}
            onOpenAdmin={() => setIsAdminModalOpen(true)}
          />
        )}

        {currentTab === 'about' && (
          <AboutView onNavigate={handleNavigate} />
        )}

        {currentTab === 'service' && (
          <ServiceView />
        )}
      </main>

      {/* Luxury Editorial Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
      />

      {/* Project Case Study Lightbox Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Admin Management Modal (Password: 1111) */}
      <AdminModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        isAuthenticated={isAdminLoggedIn}
        onLogin={handleAdminLogin}
        onLogout={handleAdminLogout}
        projects={projects}
        onSaveProjects={handleSaveProjects}
        onSelectProjectPreview={(p) => {
          setIsAdminModalOpen(false);
          setSelectedProject(p);
        }}
      />
    </div>
  );
}
