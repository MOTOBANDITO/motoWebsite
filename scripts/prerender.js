// Pre-render a real HTML file per route.
//
// GitHub Pages has no server-side rewrite, so an SPA route like /music has no
// file behind it and gets served 404.html — with an HTTP 404 status. Browsers
// don't care (React Router boots and renders the right page), but crawlers read
// the status first and refuse to index. Writing a real file per route makes each
// one respond 200 with its own title and description.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const dist = join(dirname(fileURLToPath(import.meta.url)), "..", "dist");
const ORIGIN = "https://motobandit.net";

// Keep in sync with the routes in src/main.jsx and vite.config.js.
const routes = [
  {
    path: "/",
    title: "MOTO BANDIT",
    description:
      "New American punk soul from Cincinnati, Ohio. Music, videos and merch from MOTO BANDIT.",
  },
  {
    path: "/music",
    title: "Music | MOTO BANDIT",
    description:
      "Stream or buy every MOTO BANDIT release, including DAYLIGHT DOOM and OBSERVATIONS 1, on Spotify and Bandcamp.",
  },
  {
    path: "/videos",
    title: "Videos | MOTO BANDIT",
    description: "Music videos and live footage from MOTO BANDIT.",
  },
  {
    path: "/shop",
    title: "Shop | MOTO BANDIT",
    description: "Official MOTO BANDIT merch, shipped direct.",
  },
  {
    path: "/about",
    title: "About | MOTO BANDIT",
    description:
      "On the precipice of new American punk soul — MOTO BANDIT hails from Cincinnati, Ohio.",
  },
  {
    path: "/contact",
    title: "Contact | MOTO BANDIT",
    description: "Booking, press and general inquiries for MOTO BANDIT.",
  },
  {
    path: "/unlock",
    title: "Unlock a Song | MOTO BANDIT",
    description: "Unlock an exclusive track from MOTO BANDIT.",
  },
];

const escape = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const shell = readFileSync(join(dist, "index.html"), "utf8");

if (!/<title>.*?<\/title>/s.test(shell)) {
  throw new Error("prerender: no <title> in dist/index.html — cannot inject metadata");
}

for (const { path, title, description } of routes) {
  const canonical = `${ORIGIN}${path}`;
  const head = [
    `<title>${escape(title)}</title>`,
    `<meta name="description" content="${escape(description)}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="MOTO BANDIT" />`,
    `<meta property="og:title" content="${escape(title)}" />`,
    `<meta property="og:description" content="${escape(description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ].join("\n    ");

  const html = shell.replace(/<title>.*?<\/title>/s, head);

  if (path === "/") {
    writeFileSync(join(dist, "index.html"), html);
    continue;
  }

  const name = path.slice(1);
  // Write both forms so the route resolves whichever way GitHub Pages matches:
  // /music -> music.html directly, or /music -> /music/ -> music/index.html.
  // Both carry the same canonical, so Google consolidates them.
  writeFileSync(join(dist, `${name}.html`), html);
  mkdirSync(join(dist, name), { recursive: true });
  writeFileSync(join(dist, name, "index.html"), html);
}

console.log(`prerender: wrote ${routes.length} routes`);
