import React, { useState, useEffect } from 'react';
import { ThemeAndAccessibilityProvider } from './context/ThemeAndAccessibilityContext';
import { AuthProvider } from './context/AuthContext';
import { TopNavbar } from './components/TopNavbar';
import { EditorialHero } from './components/EditorialHero';
import { ThreeDisciplines } from './components/ThreeDisciplines';
import { FeaturedWorks } from './components/FeaturedWorks';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { AIConsultationModal } from './components/AIConsultationModal';
import { AccessibilityModal } from './components/AccessibilityModal';
import { DocumentationModal } from './components/DocumentationModal';

export default function App() {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
  const [isDocsOpen, setIsDocsOpen] = useState(false);

  // Record initial page view event to analytics
  useEffect(() => {
    try {
      fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event_type: 'page_view', path: window.location.pathname }),
      }).catch(() => {});
    } catch {}
  }, []);

  return (
    <ThemeAndAccessibilityProvider>
      <AuthProvider>
        <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-300 font-sans">
          
          {/* Top Bar Navigation (Strict 3-zone contract) */}
          <TopNavbar
            onOpenDashboard={() => setIsDashboardOpen(true)}
            onOpenAccessibility={() => setIsAccessibilityOpen(true)}
            onOpenDocs={() => setIsDocsOpen(true)}
          />

          {/* Main Content Area */}
          <main className="flex-1">
            {/* 1. Editorial Hero Poster with user's portrait and graphic layout */}
            <EditorialHero
              onOpenConsultation={() => setIsConsultationOpen(true)}
            />

            {/* 2. The Three Confirmed Disciplines ("ketiganya") */}
            <ThreeDisciplines />

            {/* 3. Selected Case Studies & Works Bento Grid */}
            <FeaturedWorks />

            {/* 4. Contact Form directly integrated with abahahawrp@gmail.com & Supabase */}
            <ContactSection
              onOpenConsultation={() => setIsConsultationOpen(true)}
            />
          </main>

          {/* Clean Unboxed Footer */}
          <Footer
            onOpenDocs={() => setIsDocsOpen(true)}
            onOpenDashboard={() => setIsDashboardOpen(true)}
            onOpenAccessibility={() => setIsAccessibilityOpen(true)}
          />

          {/* Modals & Dialogs */}
          <AdminDashboardModal
            isOpen={isDashboardOpen}
            onClose={() => setIsDashboardOpen(false)}
          />

          <AIConsultationModal
            isOpen={isConsultationOpen}
            onClose={() => setIsConsultationOpen(false)}
          />

          <AccessibilityModal
            isOpen={isAccessibilityOpen}
            onClose={() => setIsAccessibilityOpen(false)}
          />

          <DocumentationModal
            isOpen={isDocsOpen}
            onClose={() => setIsDocsOpen(false)}
          />

        </div>
      </AuthProvider>
    </ThemeAndAccessibilityProvider>
  );
}
