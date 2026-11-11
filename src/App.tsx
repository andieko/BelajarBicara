import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { SpeechAssessment } from './components/SpeechAssessment.tsx';
import { ProgramsGrid } from './components/ProgramsGrid.tsx';
import { MethodologySection } from './components/MethodologySection.tsx';
import { ServiceLevels } from './components/ServiceLevels.tsx';
import { RegistrationForm } from './components/RegistrationForm.tsx';
import { TestimonialsAndTrainers } from './components/TestimonialsAndTrainers.tsx';
import { FaqSection } from './components/FaqSection.tsx';
import { Footer } from './components/Footer.tsx';
import { SyllabusModal } from './components/SyllabusModal.tsx';
import { PdfViewerModal } from './components/PdfViewerModal.tsx';
import { LegalInfoModal, LegalTabType } from './components/LegalInfoModal.tsx';
import { ScrollProgressBar } from './components/ScrollProgressBar.tsx';
import { FloatingWhatsApp } from './components/FloatingWhatsApp.tsx';
import { ProgramItem, PROGRAMS } from './data/programsData.ts';

export default function App() {
  const [selectedProgramId, setSelectedProgramId] = useState<string>('effective-public-speaking');
  const [selectedBatchId, setSelectedBatchId] = useState<string | null>(null);
  const [syllabusProgram, setSyllabusProgram] = useState<ProgramItem | null>(null);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState<boolean>(false);
  const [legalModalTab, setLegalModalTab] = useState<LegalTabType | null>(null);

  // Listen to hash changes for direct legal links (#syarat-ketentuan & #kebijakan-privasi)
  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#syarat-ketentuan' || hash === '#terms') {
        setLegalModalTab('terms');
      } else if (hash === '#kebijakan-privasi' || hash === '#privacy') {
        setLegalModalTab('privacy');
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleSelectProgram = (programId: string, batchId?: string) => {
    setSelectedProgramId(programId);
    if (batchId) {
      setSelectedBatchId(batchId);
    }
    scrollToSection('pendaftaran');
  };

  const handleSelectLevel = (levelTitle: string) => {
    // Scroll to registration and set appropriate focus
    scrollToSection('pendaftaran');
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] dark:bg-[#0D1117] text-[#191D24] dark:text-[#F3F4F6] flex flex-col font-sans transition-colors duration-150">
      {/* Scroll-triggered Reading Progress Bar at the very top */}
      <ScrollProgressBar />

      {/* Top 3-Zone Navigation */}
      <Navbar
        onOpenPdf={() => setIsPdfModalOpen(true)}
        onScrollToSection={scrollToSection}
      />

      {/* Main Content Flow */}
      <main className="flex-1">
        {/* 1. High Impact Hero with Interactive Micro-Coaching */}
        <Hero
          onRegisterClick={() => scrollToSection('pendaftaran')}
          onOpenPdf={() => setIsPdfModalOpen(true)}
          onExplorePrograms={() => scrollToSection('program-kelas')}
        />

        {/* 2. Interactive Speech Diagnostic Assessment */}
        <SpeechAssessment
          onSelectRecommendedProgram={(programId) => handleSelectProgram(programId)}
        />

        {/* 3. Program Catalog & Batches with Filters */}
        <ProgramsGrid
          onSelectProgram={handleSelectProgram}
          onViewSyllabus={(prog) => setSyllabusProgram(prog)}
          onOpenPdf={() => setIsPdfModalOpen(true)}
        />

        {/* 4. 5-Tahap Metodologi Belajar NMARK */}
        <MethodologySection />

        {/* 5. 3 Pilihan Model Layanan */}
        <ServiceLevels
          onSelectLevel={handleSelectLevel}
          onOpenPdf={() => setIsPdfModalOpen(true)}
        />

        {/* 6. Easy, Frictionless Registration Feature */}
        <RegistrationForm
          selectedProgramId={selectedProgramId}
          selectedBatchId={selectedBatchId}
          onProgramChange={(id) => setSelectedProgramId(id)}
          onOpenLegal={(tab) => setLegalModalTab(tab)}
        />

        {/* 7. Trainers & Tangible Alumni Stories */}
        <TestimonialsAndTrainers />

        {/* 8. Frequently Asked Questions */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenPdf={() => setIsPdfModalOpen(true)}
        onScrollToSection={scrollToSection}
        onOpenLegal={(tab) => setLegalModalTab(tab)}
      />

      {/* Syllabus Modal */}
      <SyllabusModal
        program={syllabusProgram}
        onClose={() => setSyllabusProgram(null)}
        onSelectProgramToRegister={(progId) => {
          setSyllabusProgram(null);
          handleSelectProgram(progId);
        }}
        onOpenPdf={() => {
          setSyllabusProgram(null);
          setIsPdfModalOpen(true);
        }}
      />

      {/* PDF Catalog Modal Viewer */}
      <PdfViewerModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
      />

      {/* Legal Information Modal (Syarat & Ketentuan & Kebijakan Privasi) */}
      <LegalInfoModal
        isOpen={legalModalTab !== null}
        initialTab={legalModalTab || 'terms'}
        onClose={() => {
          setLegalModalTab(null);
          if (window.location.hash.startsWith('#syarat') || window.location.hash.startsWith('#kebijakan')) {
            window.history.replaceState(null, '', window.location.pathname + window.location.search);
          }
        }}
      />

      {/* Floating Quick WhatsApp Contact */}
      <FloatingWhatsApp />
    </div>
  );
}
