import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { FAQS } from '../data/programsData.ts';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Structured Data (JSON-LD) for Schema.org FAQPage rich snippets
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  return (
    <section id="faq" className="py-16 md:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#E8E2D6] dark:border-[#222B38]">
      {/* Schema.org FAQPage Structured Data for Google Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="text-center mb-12">
        <div className="text-xs font-semibold text-[#8C3A16] dark:text-[#F97316] uppercase tracking-wider mb-2">
          Pertanyaan Umum
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#13171F] dark:text-white tracking-tight">
          Hal yang Sering Ditanyakan
        </h2>
        <p className="mt-2 text-sm sm:text-base text-[#4B5563] dark:text-[#94A3B8]">
          Semua yang perlu Anda ketahui sebelum mendaftar ke program Belajar Bicara NMARK.
        </p>
      </div>

      <div className="space-y-3">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white dark:bg-[#151C26] rounded-lg border border-[#E0D8CB] dark:border-[#283344] overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => toggleFaq(idx)}
                className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF9F5] dark:hover:bg-[#1A2330] transition-colors"
              >
                <span className="text-sm sm:text-base font-bold text-[#13171F] dark:text-white">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-[#8C3A16] dark:text-[#F97316] shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-[#4B5563] dark:text-[#CBD5E1] leading-relaxed border-t border-[#F0EBE1] dark:border-[#283344] pt-3.5 bg-[#FAF9F5]/40 dark:bg-[#111722] animate-in fade-in duration-150">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Need more help banner */}
      <div className="mt-10 p-5 rounded-xl bg-[#FAF9F5] dark:bg-[#151C26] border border-[#E0D8CB] dark:border-[#283344] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <h4 className="text-sm font-bold text-[#13171F] dark:text-white">
            Punya Pertanyaan Spesifik Lainnya?
          </h4>
          <p className="text-xs text-[#525E6F] dark:text-[#94A3B8] mt-0.5">
            Konsultan admission NMARK siap membantu Anda memilih kelas yang paling tepat.
          </p>
        </div>
        <a
          href="https://api.whatsapp.com/send?phone=628181494240&text=Halo%20Admin%20NMARK,%20saya%20ingin%20konsultasi%20mengenai%20kelas%20Belajar%20Bicara"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#10B981] hover:bg-[#059669] rounded-md transition-colors shrink-0 shadow-sm"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Chat WhatsApp (+62 818-1494-240)</span>
        </a>
      </div>
    </section>
  );
};
