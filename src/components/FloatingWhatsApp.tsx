import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { trackAnalyticsEvent } from '../utils/analytics.ts';

export const FloatingWhatsApp: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const whatsappNumber = '628181494240';
  const displayPhone = '+62 818-1494-240';

  // Check if current time is within business hours (09:00 - 17:00 WIB)
  const checkWibStatus = () => {
    try {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Jakarta',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
      });
      const parts = formatter.formatToParts(now);
      const hour = parseInt(parts.find((p) => p.type === 'hour')?.value || '0', 10);
      const minute = parseInt(parts.find((p) => p.type === 'minute')?.value || '0', 10);
      const totalMinutes = hour * 60 + minute;
      // 09:00 WIB (540m) to 17:00 WIB (1020m)
      return totalMinutes >= 540 && totalMinutes < 1020;
    } catch {
      // Fallback calculation via UTC+7 offset
      const now = new Date();
      const utcHours = now.getUTCHours();
      const utcMinutes = now.getUTCMinutes();
      const wibHours = (utcHours + 7) % 24;
      const totalMinutes = wibHours * 60 + utcMinutes;
      return totalMinutes >= 540 && totalMinutes < 1020;
    }
  };

  useEffect(() => {
    // Initial status check
    setIsOnline(checkWibStatus());

    // Periodic check every minute to keep status accurate in real-time
    const interval = setInterval(() => {
      setIsOnline(checkWibStatus());
    }, 60000);

    // Subtle delay so the floating widget glides into view smoothly after page load
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 600);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(
    isOnline
      ? 'Halo NMARK, saya ingin konsultasi cepat mengenai jadwal dan pendaftaran kelas Belajar Bicara.'
      : 'Halo NMARK, saya meninggalkan pesan terkait informasi kelas Belajar Bicara untuk ditindaklanjuti pada jam kerja.'
  )}`;

  const handleWhatsAppClick = () => {
    trackAnalyticsEvent('whatsapp_floating_button_clicked', {
      button_location: 'floating_widget',
      phone_number: '+628181494240',
      status_at_click: isOnline ? 'online_business_hours' : 'offline_outside_hours',
      conversion_type: 'lead_inquiry'
    });
  };

  return (
    <aside
      aria-label="Kontak Cepat WhatsApp"
      className={`fixed bottom-5 right-5 z-40 flex items-center transition-all duration-700 ease-out transform ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-6 pointer-events-none'
      }`}
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleWhatsAppClick}
        className={`group flex items-center gap-2.5 text-white px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full shadow-lg hover:shadow-xl hover:animate-pulse-shadow transition-all duration-200 transform hover:-translate-y-1 active:scale-95 border ${
          isOnline
            ? 'bg-[#10B981] hover:bg-[#059669] border-emerald-400/40'
            : 'bg-[#0F766E] hover:bg-[#115E59] border-teal-300/40'
        }`}
        title={`WhatsApp: ${displayPhone} • ${
          isOnline
            ? 'Online - Siap Membalas (Jam Operasional: 09:00 - 17:00 WIB)'
            : 'Kami Sedang Off (Jam Operasional: 09:00 - 17:00 WIB, pesan tetap diterima)'
        }`}
      >
        <div className="relative">
          <MessageCircle className="w-5 h-5 fill-white text-[#10B981]" />
          {isOnline ? (
            <>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-300 rounded-full ring-2 ring-[#10B981] animate-ping opacity-75" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full ring-2 ring-[#10B981]" />
            </>
          ) : (
            <span
              className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full ring-2 ring-[#0F766E]"
              title="Di luar jam kerja"
            />
          )}
        </div>

        <div className="flex flex-col text-left leading-none">
          <div className="flex items-center gap-1.5">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isOnline ? 'bg-emerald-200 animate-pulse' : 'bg-amber-300'
              }`}
            />
            <span
              className={`text-[10px] uppercase font-bold tracking-wider ${
                isOnline ? 'text-emerald-100' : 'text-amber-100'
              }`}
            >
              {isOnline ? 'Online - Siap Membalas' : 'Kami Sedang Off'}
            </span>
          </div>
          <span className="text-xs sm:text-sm font-extrabold text-white mt-1 tracking-tight">
            WhatsApp: {displayPhone}
          </span>
        </div>
      </a>
    </aside>
  );
};
