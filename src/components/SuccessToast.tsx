import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2, X, Copy, Check, ExternalLink, Ticket, Bell } from 'lucide-react';

export interface SuccessToastProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  registrationCode?: string;
  programTitle?: string;
  batchInfo?: string;
  onViewTicket?: () => void;
  duration?: number; // duration in ms, default 7000
}

export const SuccessToast: React.FC<SuccessToastProps> = ({
  isOpen,
  onClose,
  title = 'Pendaftaran Berhasil!',
  message,
  registrationCode,
  programTitle,
  batchInfo,
  onViewTicket,
  duration = 7000
}) => {
  const [copied, setCopied] = useState(false);
  const [progress, setProgress] = useState(100);
  const [isPaused, setIsPaused] = useState(false);
  const progressIntervalRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const remainingTimeRef = useRef<number>(duration);

  // Play subtle gentle chime sound on display
  useEffect(() => {
    if (isOpen) {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioContextClass) {
          const ctx = new AudioContextClass();
          const now = ctx.currentTime;
          
          // Note 1: E5 (659.25 Hz)
          const osc1 = ctx.createOscillator();
          const gain1 = ctx.createGain();
          osc1.type = 'sine';
          osc1.frequency.setValueAtTime(659.25, now);
          gain1.gain.setValueAtTime(0.08, now);
          gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
          osc1.connect(gain1);
          gain1.connect(ctx.destination);
          osc1.start(now);
          osc1.stop(now + 0.35);

          // Note 2: G#5 (830.61 Hz)
          const osc2 = ctx.createOscillator();
          const gain2 = ctx.createGain();
          osc2.type = 'sine';
          osc2.frequency.setValueAtTime(830.61, now + 0.1);
          gain2.gain.setValueAtTime(0.08, now + 0.1);
          gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
          osc2.connect(gain2);
          gain2.connect(ctx.destination);
          osc2.start(now + 0.1);
          osc2.stop(now + 0.55);
        }
      } catch {
        // AudioContext may be restricted by browser policy; silent fallback
      }
    }
  }, [isOpen]);

  // Handle countdown & progress bar with pause on hover
  useEffect(() => {
    if (!isOpen) {
      setProgress(100);
      remainingTimeRef.current = duration;
      return;
    }

    remainingTimeRef.current = duration;
    startTimeRef.current = Date.now();
    const tickInterval = 50;

    const timer = window.setInterval(() => {
      if (isPaused) {
        startTimeRef.current = Date.now() - (duration - remainingTimeRef.current);
        return;
      }

      const elapsed = Date.now() - startTimeRef.current;
      const remaining = Math.max(0, duration - elapsed);
      remainingTimeRef.current = remaining;
      const pct = (remaining / duration) * 100;
      setProgress(pct);

      if (remaining <= 0) {
        clearInterval(timer);
        onClose();
      }
    }, tickInterval);

    progressIntervalRef.current = timer;

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [isOpen, isPaused, duration, onClose]);

  const handleCopyCode = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!registrationCode) return;
    try {
      await navigator.clipboard.writeText(registrationCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback if clipboard API is not available
      const input = document.createElement('input');
      input.value = registrationCode;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="fixed top-5 right-4 left-4 sm:left-auto sm:right-6 z-50 sm:max-w-md w-auto animate-in fade-in slide-in-from-top-4 duration-300 pointer-events-auto"
    >
      <div className="bg-white dark:bg-[#151C26] rounded-xl shadow-2xl border border-[#E0D8CB] dark:border-[#283344] overflow-hidden text-[#13171F] dark:text-[#F3F4F6] backdrop-blur-md">
        {/* Main Content Area */}
        <div className="p-4 sm:p-5">
          <div className="flex items-start gap-3.5">
            {/* Pulsing Success Badge */}
            <div className="relative shrink-0 mt-0.5">
              <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-600/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-[#151C26] animate-ping" />
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-[#151C26]" />
            </div>

            {/* Notification Body */}
            <div className="flex-1 min-w-0 pr-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/40">
                  Konfirmasi Instan
                </span>
                <span className="text-[11px] text-[#6B7280] dark:text-[#94A3B8]">Baru Saja</span>
              </div>

              <h4 className="text-sm sm:text-base font-bold text-[#13171F] dark:text-white leading-tight">
                {title}
              </h4>

              <p className="text-xs text-[#4B5563] dark:text-[#CBD5E1] mt-1 leading-relaxed">
                {message || 'Data pendaftaran kelas Anda telah tercatat dengan aman di sistem NMARK Manajemen Indonesia.'}
              </p>

              {/* Program & Registration Code Pill */}
              {(programTitle || registrationCode) && (
                <div className="mt-3 p-2.5 rounded-lg bg-[#FAF9F5] dark:bg-[#1C2533] border border-[#E8E2D6] dark:border-[#283344] space-y-1.5 text-xs">
                  {programTitle && (
                    <div className="font-semibold text-[#13171F] dark:text-white truncate">
                      {programTitle}
                    </div>
                  )}

                  {batchInfo && (
                    <div className="text-[11px] text-[#6B7280] dark:text-[#94A3B8] truncate">
                      Jadwal: {batchInfo}
                    </div>
                  )}

                  {registrationCode && (
                    <div className="flex items-center justify-between pt-1 border-t border-[#E8E2D6]/80 dark:border-[#283344]">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <Ticket className="w-3.5 h-3.5 text-[#E85923] dark:text-[#F97316] shrink-0" />
                        <span className="font-mono font-bold text-[#E85923] dark:text-[#FFA27B] text-xs truncate">
                          {registrationCode}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyCode}
                        className="inline-flex items-center gap-1 text-[11px] font-medium text-[#4B5563] dark:text-[#CBD5E1] hover:text-[#13171F] dark:hover:text-white bg-white dark:bg-[#151C26] px-2 py-0.5 rounded border border-[#DCD5C9] dark:border-[#2E3C4E] transition-colors cursor-pointer shrink-0"
                        title="Salin kode registrasi"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Tersalin</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Salin</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Quick Actions */}
              <div className="mt-3 flex items-center gap-2">
                {onViewTicket && (
                  <button
                    type="button"
                    onClick={() => {
                      onViewTicket();
                      onClose();
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-[#E85923] hover:bg-[#D44A17] px-3 py-1.5 rounded-md transition-colors shadow-xs cursor-pointer"
                  >
                    <span>Buka E-Tiket</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs font-medium text-[#6B7280] dark:text-[#94A3B8] hover:text-[#13171F] dark:hover:text-white px-2.5 py-1.5 rounded transition-colors cursor-pointer"
                >
                  Tutup Notifikasi
                </button>
              </div>
            </div>

            {/* Close Button (X) */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup pemberitahuan"
              className="text-[#9CA3AF] hover:text-[#13171F] dark:hover:text-white p-1 rounded-md transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Auto-Dismiss Progress Bar */}
        <div className="h-1 w-full bg-[#E8E2D6]/50 dark:bg-[#283344] overflow-hidden">
          <div
            className="h-full bg-emerald-500 dark:bg-emerald-400 transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
