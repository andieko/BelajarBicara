/**
 * Analytics Utility (Mock Implementation for Marketing & Growth Teams)
 *
 * Simulates event logging for marketing conversions, campaigns, and user intent.
 * Emits events to console, window events, and stores recent conversions in localStorage.
 */

export interface AnalyticsEventPayload {
  eventName: string;
  parameters?: Record<string, unknown>;
  timestamp: string;
}

const STORAGE_KEY = 'nmark_analytics_events';
const MAX_STORED_EVENTS = 50;

/**
 * Log an analytics event to console, localStorage, and window event listeners.
 */
export const trackAnalyticsEvent = (
  eventName: string,
  parameters: Record<string, unknown> = {}
): AnalyticsEventPayload => {
  const payload: AnalyticsEventPayload = {
    eventName,
    parameters: {
      ...parameters,
      referrer: typeof document !== 'undefined' ? document.referrer : '',
      page_path: typeof window !== 'undefined' ? window.location.pathname : '',
      timestamp_wib: new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })
    },
    timestamp: new Date().toISOString()
  };

  // 1. Console log with styling for marketing QA & developers
  if (typeof console !== 'undefined') {
    console.groupCollapsed(
      `%c[Analytics Event]%c ${eventName}`,
      'background: #10B981; color: white; padding: 2px 6px; border-radius: 3px; font-weight: bold;',
      'color: #E85923; font-weight: bold;'
    );
    console.log('Payload:', payload.parameters);
    console.log('Timestamp (UTC):', payload.timestamp);
    console.groupEnd();
  }

  // 2. Persist to localStorage for marketing audit inspection
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const existingRaw = window.localStorage.getItem(STORAGE_KEY);
      const existing: AnalyticsEventPayload[] = existingRaw ? JSON.parse(existingRaw) : [];
      const updated = [payload, ...existing].slice(0, MAX_STORED_EVENTS);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Storage quota or privacy mode fallback
    }
  }

  // 3. Dispatch DOM CustomEvent for potential GTM / Tag Manager / Pixel integration
  if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
    try {
      window.dispatchEvent(
        new CustomEvent('nmark:analytics', {
          detail: payload
        })
      );
    } catch {
      // CustomEvent error catch
    }
  }

  return payload;
};

// Global helper for console debugging by marketing team
if (typeof window !== 'undefined') {
  (window as unknown as { __nmark_analytics?: object }).__nmark_analytics = {
    track: trackAnalyticsEvent,
    getEvents: () => {
      try {
        return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
      } catch {
        return [];
      }
    },
    clearEvents: () => {
      window.localStorage.removeItem(STORAGE_KEY);
      console.log('[Analytics] Event log cleared.');
    }
  };
}
