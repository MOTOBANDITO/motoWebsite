/**
 * GA4 helpers — gtag.js is loaded from index.html (Google’s snippet).
 * Optional: set VITE_GA_MEASUREMENT_ID in .env.local to match; defaults to the same property as index.html.
 */

const DEFAULT_MEASUREMENT_ID = "G-L478XYKQ62";

const measurementId =
  import.meta.env.VITE_GA_MEASUREMENT_ID || DEFAULT_MEASUREMENT_ID;

export function isGa4Enabled() {
  return typeof window !== "undefined" && typeof window.gtag === "function";
}

/** SPA navigations after the first load (initial page_view comes from gtag config in index.html). */
export function ga4PageView() {
  if (!measurementId || typeof window.gtag !== "function") return;
  window.gtag("event", "page_view", {
    page_path: window.location.pathname + window.location.search,
    page_title: document.title,
  });
}

export function ga4Event(name, params = {}) {
  if (!measurementId || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}
