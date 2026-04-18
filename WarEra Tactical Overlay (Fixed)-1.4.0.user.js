// ==UserScript==
// @name         WarEra Tactical Overlay (Fixed)
// @namespace    https://warera.io/
// @version      1.5.0
// @updateURL    https://raw.githubusercontent.com/Sam-187/tactical-overlay/main/WarEra%20Tactical%20Overlay%20(Fixed)-1.4.0.user.js
// @downloadURL  https://raw.githubusercontent.com/Sam-187/tactical-overlay/main/WarEra%20Tactical%20Overlay%20(Fixed)-1.4.0.user.js
// @description  Redesigned tactical interface for warera.io – dark military theme with multiple skins. FIXED: Compact buttons, settings in HUD bar
// @author       WarEra Community
// @match        *://app.warera.io/*
// @match        *://warera.io/*
// @match        *://*.warera.io/*
// @run-at       document-end
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @noframes
// ==/UserScript==

/* global GM_addStyle, GM_setValue, GM_getValue, GM_registerMenuCommand */

(function () {
  'use strict';

  console.log('[WarEra Overlay] starting on ' + location.href);

  /* ============================================================
     1) CSS (mobile-friendly, high specificity via html body[data-we-theme])
     ============================================================ */
  const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;600;900&family=Rajdhani:wght@400;500;600&display=swap');

/* === TACTICAL THEME === */
html body[data-we-theme="tactical"] {
  --bg-primary:#090c0f; --bg-secondary:#0d1117; --bg-panel:#111820; --bg-hover:#1a2535;
  --border:#1e3a2e; --border-bright:#2e6645; --accent:#39ff85; --accent-dim:#1c7a42;
  --accent-glow:rgba(57,255,133,0.15); --text-primary:#d4f0dc; --text-muted:#5a7a65; --text-bright:#39ff85;
  --font-display:'Orbitron',monospace; --font-ui:'Rajdhani',sans-serif; --font-mono:'Share Tech Mono',monospace;
  --scanline-opacity:0.03;
}
html body[data-we-theme="tactical"].we-soft-colors {
  --border-bright:#2a5040; --accent:#6fcf97; --accent-dim:#3a7a55;
  --accent-glow:rgba(111,207,151,0.1); --text-primary:#c8ddd0; --text-muted:#5a7065; --text-bright:#7ac9a0;
}

/* === NEON THEME === */
html body[data-we-theme="neon"] {
  --bg-primary:#06010f; --bg-secondary:#0a0218; --bg-panel:#100325; --bg-hover:#1a0535;
  --border:#2a0a50; --border-bright:#7a20cc; --accent:#c820ff; --accent-dim:#6010a0;
  --accent-glow:rgba(200,32,255,0.2); --text-primary:#e8c0ff; --text-muted:#6040a0; --text-bright:#ff40ff;
  --font-display:'Orbitron',monospace; --font-ui:'Rajdhani',sans-serif; --font-mono:'Share Tech Mono',monospace;
  --scanline-opacity:0.04;
}
html body[data-we-theme="neon"].we-soft-colors {
  --border-bright:#5a3090; --accent:#a080c8; --accent-dim:#5a4080;
  --accent-glow:rgba(160,128,200,0.12); --text-primary:#d8c8e8; --text-muted:#6050a0; --text-bright:#b898d0;
}

/* === SAND THEME === */
html body[data-we-theme="sand"] {
  --bg-primary:#12100a; --bg-secondary:#1a1710; --bg-panel:#201e14; --bg-hover:#2e2b1c;
  --border:#3d3820; --border-bright:#8a7a30; --accent:#f5c842; --accent-dim:#907520;
  --accent-glow:rgba(245,200,66,0.15); --text-primary:#e8d8a0; --text-muted:#6a6030; --text-bright:#f5c842;
  --font-display:'Orbitron',monospace; --font-ui:'Rajdhani',sans-serif; --font-mono:'Share Tech Mono',monospace;
  --scanline-opacity:0.025;
}
html body[data-we-theme="sand"].we-soft-colors {
  --border-bright:#706840; --accent:#d4b060; --accent-dim:#806838;
  --accent-glow:rgba(212,176,96,0.1); --text-primary:#ddd0a8; --text-muted:#605838; --text-bright:#c8a858;
}

/* === GHOST THEME === */
html body[data-we-theme="ghost"] {
  --bg-primary:#f2f4f5; --bg-secondary:#e8eaec; --bg-panel:#ffffff; --bg-hover:#dde2e8;
  --border:#c0c8d0; --border-bright:#809ab0; --accent:#1a4a6e; --accent-dim:#4070a0;
  --accent-glow:rgba(26,74,110,0.1); --text-primary:#1a2535; --text-muted:#8090a0; --text-bright:#1a4a6e;
  --font-display:'Orbitron',monospace; --font-ui:'Rajdhani',sans-serif; --font-mono:'Share Tech Mono',monospace;
  --scanline-opacity:0;
}
html body[data-we-theme="ghost"].we-soft-colors {
  --border-bright:#90a0b0; --accent:#406080; --accent-dim:#5080a0;
  --accent-glow:rgba(64,96,128,0.08); --text-primary:#3a4555; --text-muted:#8898a8; --text-bright:#506878;
}
/* === DARK THEME === */
html body[data-we-theme="dark"] {
  --bg-primary:#000000; --bg-secondary:#0a0a0a; --bg-panel:#111111; --bg-hover:#1a1a1a;
  --border:#222222; --border-bright:#444444; --accent:#cccccc; --accent-dim:#555555;
  --accent-glow:rgba(200,200,200,0.1); --text-primary:#aaaaaa; --text-muted:#555555; --text-bright:#ffffff;
  --font-display:'Orbitron',monospace; --font-ui:'Rajdhani',sans-serif; --font-mono:'Share Tech Mono',monospace;
  --scanline-opacity:0.025;
}
html body[data-we-theme="dark"].we-soft-colors {
  --border-bright:#383838; --accent:#999999; --accent-dim:#444444;
  --accent-glow:rgba(153,153,153,0.08); --text-primary:#888888; --text-muted:#484848; --text-bright:#bbbbbb;
}

/* === BLOOD THEME === */
html body[data-we-theme="blood"] {
  --bg-primary:#0a0000; --bg-secondary:#120000; --bg-panel:#1a0000; --bg-hover:#260000;
  --border:#3a0a0a; --border-bright:#7a1515; --accent:#ff2020; --accent-dim:#8a0a0a;
  --accent-glow:rgba(255,32,32,0.18); --text-primary:#f0c0c0; --text-muted:#7a4040; --text-bright:#ff4040;
  --font-display:'Orbitron',monospace; --font-ui:'Rajdhani',sans-serif; --font-mono:'Share Tech Mono',monospace;
  --scanline-opacity:0.035;
}
html body[data-we-theme="blood"].we-soft-colors {
  --border-bright:#602020; --accent:#cc5555; --accent-dim:#6a2020;
  --accent-glow:rgba(204,85,85,0.12); --text-primary:#d8a8a8; --text-muted:#6a4040; --text-bright:#cc6060;
}


html body[data-we-theme] {
  background: var(--bg-primary) !important;
  color: var(--text-primary) !important;
  font-family: var(--font-ui) !important;
}
html body[data-we-theme] * { border-color: var(--border) !important; }

html body[data-we-theme] #root,
html body[data-we-theme] #root > *,
html body[data-we-theme] main,
html body[data-we-theme] [class*="App"],
html body[data-we-theme] [class*="app"],
html body[data-we-theme] [class*="Layout"],
html body[data-we-theme] [class*="layout"],
html body[data-we-theme] [class*="Page"],
html body[data-we-theme] [class*="page"],
html body[data-we-theme] [class*="Container"],
html body[data-we-theme] [class*="container"],
html body[data-we-theme] [class*="Wrapper"],
html body[data-we-theme] [class*="wrapper"] {
  background-color: var(--bg-primary) !important;
  color: var(--text-primary) !important;
}

html body[data-we-theme] [class*="card"],
html body[data-we-theme] [class*="Card"],
html body[data-we-theme] [class*="panel"],
html body[data-we-theme] [class*="Panel"],
html body[data-we-theme] [class*="modal"],
html body[data-we-theme] [class*="Modal"],
html body[data-we-theme] [class*="sidebar"],
html body[data-we-theme] [class*="Sidebar"],
html body[data-we-theme] [class*="header"],
html body[data-we-theme] [class*="Header"],
html body[data-we-theme] [class*="footer"],
html body[data-we-theme] [class*="Footer"],
html body[data-we-theme] [class*="dialog"],
html body[data-we-theme] [class*="Dialog"],
html body[data-we-theme] [class*="Menu"],
html body[data-we-theme] [class*="menu"] {
  background-color: var(--bg-panel) !important;
  border: 1px solid var(--border) !important;
  color: var(--text-primary) !important;
}

html body[data-we-theme] h1,
html body[data-we-theme] h2,
html body[data-we-theme] h3,
html body[data-we-theme] h4,
html body[data-we-theme] h5,
html body[data-we-theme] h6 {
  font-family: var(--font-display) !important;
  color: var(--text-bright) !important;
  letter-spacing: 0.05em !important;
}

html body[data-we-theme] input,
html body[data-we-theme] textarea,
html body[data-we-theme] select {
  background: var(--bg-secondary) !important;
  color: var(--text-primary) !important;
  border: 1px solid var(--border-bright) !important;
  border-radius: 2px !important;
  font-family: var(--font-mono) !important;
  caret-color: var(--accent) !important;
}
html body[data-we-theme] input:focus,
html body[data-we-theme] textarea:focus,
html body[data-we-theme] select:focus {
  border-color: var(--accent) !important;
  outline: none !important;
}

/* ============================================================
   BUTTONS - KOMPAKTE GRÖßE (FIX)
   ============================================================ */
html body[data-we-theme] button,
html body[data-we-theme] [role="button"],
html body[data-we-theme] a[class*="button"],
html body[data-we-theme] [class*="btn"],
html body[data-we-theme] [class*="Btn"],
html body[data-we-theme] [class*="Button"] {
  background: var(--bg-panel) !important;
  color: var(--text-bright) !important;
  border: 1px solid var(--border-bright) !important;
  border-radius: 2px !important;
  font-family: var(--font-display) !important;
  font-size: 10px !important;
  letter-spacing: 0.05em !important;
  text-transform: uppercase !important;
  cursor: pointer !important;
  /* KOMPAKTES PADDING - DAS IST DER FIX */
  padding: 4px 8px !important;
  margin: 1px !important;
  line-height: 1.2 !important;
  min-height: unset !important;
  height: auto !important;
}

/* Tabs und Filter-Buttons (NEU, TOP, etc.) */
html body[data-we-theme] [class*="tab"],
html body[data-we-theme] [class*="Tab"],
html body[data-we-theme] [class*="filter"],
html body[data-we-theme] [class*="Filter"],
html body[data-we-theme] [class*="chip"],
html body[data-we-theme] [class*="Chip"],
html body[data-we-theme] [class*="tag"],
html body[data-we-theme] [class*="Tag"] {
  padding: 3px 6px !important;
  font-size: 9px !important;
  margin: 1px !important;
  line-height: 1.2 !important;
  min-height: unset !important;
}

/* Kleine Icon-Buttons (wie der ◈ Button rechts unten) */
html body[data-we-theme] button[class*="icon"],
html body[data-we-theme] [class*="IconButton"],
html body[data-we-theme] [class*="icon-btn"],
html body[data-we-theme] button:has(svg):not(:has(span)),
html body[data-we-theme] [class*="action"] button {
  padding: 4px !important;
  min-width: 28px !important;
  min-height: 28px !important;
  width: auto !important;
  height: auto !important;
}

/* Dropdown und Select kompakter */
html body[data-we-theme] [class*="dropdown"],
html body[data-we-theme] [class*="Dropdown"],
html body[data-we-theme] [class*="select"],
html body[data-we-theme] [class*="Select"] {
  padding: 4px 8px !important;
  font-size: 11px !important;
  min-height: unset !important;
}

html body[data-we-theme] a {
  color: var(--accent) !important;
  text-decoration: none !important;
}

html body[data-we-theme] table { border-collapse: collapse !important; width: 100% !important; }
html body[data-we-theme] thead tr,
html body[data-we-theme] th {
  background: var(--bg-secondary) !important;
  color: var(--text-bright) !important;
  font-family: var(--font-display) !important;
  text-transform: uppercase !important;
  border-bottom: 2px solid var(--border-bright) !important;
}
html body[data-we-theme] tbody tr { border-bottom: 1px solid var(--border) !important; }
html body[data-we-theme] tbody tr:hover { background: var(--bg-hover) !important; }

html body.we-scanlines::before {
  content: '';
  position: fixed; inset: 0;
  background: repeating-linear-gradient(
    0deg, transparent, transparent 2px,
    rgba(0,0,0, var(--scanline-opacity)) 2px,
    rgba(0,0,0, var(--scanline-opacity)) 4px
  );
  pointer-events: none;
  z-index: 9999;
}
html body.we-grain::after {
  content: '';
  position: fixed; inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  pointer-events: none; z-index: 9998; opacity: 0.5;
}

#we-hud {
  position: fixed; top: 0; left: 0; right: 0;
  height: 32px;
  background: var(--bg-secondary, #0d1117);
  border-bottom: 1px solid var(--border-bright, #2e6645);
  display: flex; align-items: center; gap: 12px;
  padding: 0 12px;
  z-index: 2147483646;
  font-family: 'Share Tech Mono', monospace;
  font-size: 10px; color: var(--text-muted, #5a7a65);
  box-shadow: 0 2px 20px rgba(0,0,0,0.5);
  white-space: nowrap; overflow: hidden;
}
body.we-hud-hidden #we-hud { display: none !important; }
#we-hud .we-brand {
  font-family: 'Orbitron', monospace;
  font-weight: 900; letter-spacing: 0.2em;
  color: var(--accent, #39ff85); text-transform: uppercase;
}
#we-hud .we-sep { color: var(--border-bright, #2e6645); opacity: 0.5; }
#we-hud .we-time { color: var(--text-bright, #39ff85); margin-left: auto; margin-right: 8px; }

/* Settings Button in HUD */
#we-hud .we-settings-btn {
  background: transparent !important;
  border: 1px solid var(--border-bright, #2e6645) !important;
  color: var(--text-muted, #5a7a65) !important;
  width: 24px !important; height: 24px !important;
  min-width: unset !important; min-height: unset !important;
  padding: 0 !important;
  font-size: 14px !important;
  cursor: pointer;
  display: flex !important; align-items: center !important; justify-content: center !important;
  border-radius: 3px !important;
  transition: all 0.2s ease;
}
#we-hud .we-settings-btn:hover {
  color: var(--accent, #39ff85) !important;
  border-color: var(--accent, #39ff85) !important;
}
#we-hud .we-status { display: flex; align-items: center; gap: 6px; }
#we-hud .we-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--accent, #39ff85);
  box-shadow: 0 0 6px var(--accent, #39ff85);
}

/* FLOATING TOGGLE BUTTON - NUR SICHTBAR WENN HUD VERSTECKT */
#we-theme-toggle {
  position: fixed; bottom: 90px; right: 16px;
  width: 36px !important; height: 36px !important;
  background: var(--bg-panel, #111820) !important;
  border: 2px solid var(--border-bright, #2e6645) !important;
  color: var(--accent, #39ff85) !important;
  font-size: 16px !important;
  border-radius: 4px !important;
  cursor: pointer !important;
  z-index: 2147483647 !important;
  display: flex !important; align-items: center !important; justify-content: center !important;
  box-shadow: 0 0 16px rgba(0,0,0,0.7) !important;
  font-family: 'Orbitron', monospace !important;
  padding: 0 !important;
  min-width: unset !important;
  min-height: unset !important;
}

/* Verstecke floating button wenn HUD sichtbar ist */
body:not(.we-hud-hidden) #we-theme-toggle {
  display: none !important;
}

#we-panel {
  position: fixed; bottom: 140px; right: 16px;
  width: 260px; max-width: calc(100vw - 32px);
  background: var(--bg-primary, #090c0f);
  border: 1px solid var(--border-bright, #2e6645);
  color: var(--text-primary, #d4f0dc);
  font-family: 'Rajdhani', sans-serif; font-size: 12px;
  z-index: 2147483647;
  box-shadow: 0 8px 32px rgba(0,0,0,0.8);
  display: none;
}
#we-panel.open { display: block; }
#we-panel * { box-sizing: border-box; }
#we-panel .we-p-header {
  background: var(--bg-secondary, #0d1117);
  border-bottom: 1px solid var(--border-bright, #2e6645);
  padding: 10px 12px; position: relative;
}
#we-panel .we-p-header h1 {
  font-family: 'Orbitron', monospace;
  font-size: 10px; font-weight: 900; letter-spacing: 0.15em;
  color: var(--accent, #39ff85) !important;
  text-transform: uppercase; margin: 0;
}
#we-panel .we-p-header .sub {
  font-family: 'Share Tech Mono', monospace;
  font-size: 8px; color: var(--text-muted, #5a7a65);
  letter-spacing: 0.1em; margin-top: 2px;
}
#we-panel .we-p-close {
  position: absolute; right: 8px; top: 8px;
  width: 24px !important; height: 24px !important;
  background: transparent !important;
  border: 1px solid var(--border-bright, #2e6645) !important;
  color: var(--text-muted, #5a7a65) !important;
  font-size: 12px !important;
  cursor: pointer; padding: 0 !important; line-height: 1;
  min-width: unset !important; min-height: unset !important;
}
#we-panel .we-p-section {
  padding: 10px 12px;
  border-bottom: 1px solid var(--border, #1e3a2e);
}
#we-panel .we-p-label {
  font-family: 'Share Tech Mono', monospace;
  font-size: 8px; color: var(--text-muted, #5a7a65);
  letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 8px;
}
#we-panel .we-p-themes { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4px; }
#we-panel .we-p-theme {
  background: var(--bg-panel, #111820) !important;
  border: 1px solid var(--border, #1e3a2e) !important;
  color: var(--text-primary, #d4f0dc) !important;
  font-family: 'Share Tech Mono', monospace !important;
  font-size: 9px !important; letter-spacing: 0.03em !important;
  padding: 6px 4px !important; cursor: pointer;
  display: flex; flex-direction: column; align-items: center; gap: 3px;
  text-transform: uppercase !important;
  min-height: unset !important;
  height: auto !important;
  min-width: unset !important;
  margin: 0 !important;
}
#we-panel .we-p-theme .swatch {
  width: 100%; height: 16px;
  border: 1px solid rgba(255,255,255,0.05);
}
#we-panel .we-p-theme.active {
  border-color: var(--accent, #39ff85) !important;
  color: var(--accent, #39ff85) !important;
}
.we-sw-tactical { background: linear-gradient(135deg,#090c0f 40%,#39ff85 100%); }
.we-sw-neon     { background: linear-gradient(135deg,#06010f 40%,#c820ff 100%); }
.we-sw-sand     { background: linear-gradient(135deg,#12100a 40%,#f5c842 100%); }
.we-sw-ghost    { background: linear-gradient(135deg,#e8eaec 40%,#1a4a6e 100%); }
.we-sw-dark     { background: linear-gradient(135deg,#000000 40%,#888888 100%); }
.we-sw-blood    { background: linear-gradient(135deg,#0a0000 40%,#ff2020 100%); }
#we-panel .we-p-row {
  display: flex; align-items: center; justify-content: space-between;
  padding: 6px 0; border-bottom: 1px solid var(--border, #1e3a2e);
}
#we-panel .we-p-row:last-child { border-bottom: none; }
#we-panel .we-p-row-label {
  font-family: 'Share Tech Mono', monospace;
  font-size: 9px; color: var(--text-primary, #d4f0dc) !important;
  letter-spacing: 0.03em; text-transform: uppercase;
}
#we-panel .we-toggle {
  position: relative; width: 36px; height: 18px;
  cursor: pointer; display: inline-block;
}
#we-panel .we-toggle input { display: none; }
#we-panel .we-toggle .tr {
  position: absolute; inset: 0;
  background: var(--border, #1e3a2e);
  border: 1px solid var(--border-bright, #2e6645);
  transition: background 0.2s;
}
#we-panel .we-toggle .th {
  position: absolute; top: 3px; left: 3px;
  width: 10px; height: 10px;
  background: var(--text-muted, #5a7a65);
  transition: all 0.2s;
}
#we-panel .we-toggle input:checked ~ .tr { background: var(--accent-dim, #1c7a42); }
#we-panel .we-toggle input:checked ~ .th { left: 21px; background: var(--accent, #39ff85); }
#we-panel .we-p-hint {
  font-family: 'Share Tech Mono', monospace;
  font-size: 8px; color: var(--text-muted, #5a7a65);
  text-align: center; padding: 6px;
  background: var(--bg-secondary, #0d1117);
}
#we-panel .we-p-footer {
  padding: 5px 12px;
  background: var(--bg-secondary, #0d1117);
  border-top: 1px solid var(--border, #1e3a2e);
  display: flex; justify-content: space-between; align-items: center;
}
#we-panel .we-p-footer span {
  font-family: 'Share Tech Mono', monospace;
  font-size: 8px; color: var(--text-muted, #5a7a65);
  letter-spacing: 0.08em;
}
  `;

  function injectCSS() {
    if (document.getElementById('we-style')) return;
    try {
      if (typeof GM_addStyle === 'function') {
        const el = GM_addStyle(CSS);
        if (el && el.id !== undefined) el.id = 'we-style';
        else {
          const s = document.querySelector('style:not([id]):last-of-type');
          if (s) s.id = 'we-style';
        }
      } else {
        throw new Error('no GM_addStyle');
      }
    } catch (_) {
      const style = document.createElement('style');
      style.id = 'we-style';
      style.textContent = CSS;
      (document.head || document.documentElement).appendChild(style);
    }
    console.log('[WarEra Overlay] CSS injected');
  }

  /* ============================================================
     2) STORAGE
     ============================================================ */
  const storage = {
    get(key, def) {
      try {
        const v = GM_getValue(key, undefined);
        return (v === undefined || v === null) ? def : v;
      } catch (_) {
        try {
          const raw = localStorage.getItem('we_' + key);
          if (raw === null) return def;
          return JSON.parse(raw);
        } catch (_) { return def; }
      }
    },
    set(key, val) {
      try { GM_setValue(key, val); }
      catch (_) {
        try { localStorage.setItem('we_' + key, JSON.stringify(val)); } catch (_) {}
      }
    }
  };

  /* ============================================================
     3) STATE
     ============================================================ */
  const THEMES = ['tactical', 'neon', 'sand', 'ghost', 'dark', 'blood'];
  const THEME_LABELS = {
    tactical: '🟢 Tactical',
    neon: '🟣 Neon',
    sand: '🟡 Sand',
    ghost: '⚪ Ghost',
    dark:  '⚫ Dark',
    blood: '🔴 Blood'
  };

  const state = {
    theme:     storage.get('we_theme', 'tactical'),
    scanlines: storage.get('we_scanlines', true),
    hud:       storage.get('we_hud', true),
    grain:     storage.get('we_grain', true),
    softColors: storage.get('we_softColors', false),
  };

  /* ============================================================
     4) APPLY
     ============================================================ */
  function applyTheme(theme) {
state.theme = theme;
    storage.set('we_theme', theme);
    if (document.body) document.body.setAttribute('data-we-theme', theme);
    if (document.documentElement) document.documentElement.setAttribute('data-we-theme', theme);
    document.querySelectorAll('.we-p-theme').forEach((b) => {
      b.classList.toggle('active', b.dataset.theme === theme);
    });
    const btn = document.getElementById('we-theme-toggle');
    if (btn) btn.title = `Theme: ${THEME_LABELS[theme]}`;
  }

  function applyOptions() {
    if (!document.body) return;
    document.body.classList.toggle('we-scanlines',  state.scanlines);
    document.body.classList.toggle('we-grain',      state.grain);
    document.body.classList.toggle('we-hud-hidden', !state.hud);
    document.body.classList.toggle('we-soft-colors', state.softColors);
    document.body.style.paddingTop = state.hud ? '32px' : '';
  }

  function cycleTheme() {
    const idx = THEMES.indexOf(state.theme);
    applyTheme(THEMES[(idx + 1) % THEMES.length]);
  }

  /* ============================================================
     5) HUD
     ============================================================ */
  function buildHUD() {
    if (!document.body || document.getElementById('we-hud')) return;
    const hud = document.createElement('div');
    hud.id = 'we-hud';
    hud.innerHTML = `
      <span class="we-brand">WAR ERA</span>
      <span class="we-sep">|</span>
      <span class="we-status"><span class="we-dot"></span> ACTIVE</span>
      <span class="we-time" id="we-clock">--:--:--</span>
      <button class="we-settings-btn" id="we-hud-settings" type="button" title="Overlay Settings">⚙</button>
    `;
    document.body.appendChild(hud);

    function updateClock() {
      const el = document.getElementById('we-clock');
      if (el) el.textContent = new Date().toTimeString().slice(0, 8);
    }
    updateClock();
    setInterval(updateClock, 1000);
    
    // Settings button in HUD
    const settingsBtn = document.getElementById('we-hud-settings');
    if (settingsBtn) {
      settingsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.shiftKey) cycleTheme();
        else togglePanel();
      });
    }
    
    console.log('[WarEra Overlay] HUD built');
  }

  /* ============================================================
     6) FLOATING BUTTON
     ============================================================ */
  function buildToggleButton() {
    if (!document.body || document.getElementById('we-theme-toggle')) return;
    const btn = document.createElement('button');
    btn.id = 'we-theme-toggle';
    btn.type = 'button';
    btn.title = `Theme: ${THEME_LABELS[state.theme]}`;
    btn.textContent = '◈';
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.shiftKey) cycleTheme();
      else togglePanel();
    });
    document.body.appendChild(btn);
    console.log('[WarEra Overlay] toggle button built');
  }

  /* ============================================================
     7) SETTINGS PANEL
     ============================================================ */
  function buildPanel() {
    if (!document.body || document.getElementById('we-panel')) return;
    const panel = document.createElement('div');
    panel.id = 'we-panel';
    panel.innerHTML = `
      <div class="we-p-header">
        <h1>Tactical Overlay</h1>
        <div class="sub">WARERA.IO // v1.5.0</div>
        <button class="we-p-close" type="button">✕</button>
      </div>
      <div class="we-p-section">
        <div class="we-p-label">// Color Theme</div>
        <div class="we-p-themes">
          <button type="button" class="we-p-theme" data-theme="tactical"><div class="swatch we-sw-tactical"></div>Tactical</button>
          <button type="button" class="we-p-theme" data-theme="neon"><div class="swatch we-sw-neon"></div>Neon</button>
          <button type="button" class="we-p-theme" data-theme="sand"><div class="swatch we-sw-sand"></div>Sand</button>
          <button type="button" class="we-p-theme" data-theme="ghost"><div class="swatch we-sw-ghost"></div>Ghost</button>
          <button type="button" class="we-p-theme" data-theme="dark"><div class="swatch we-sw-dark"></div>Dark</button>
          <button type="button" class="we-p-theme" data-theme="blood"><div class="swatch we-sw-blood"></div>Blood</button>
        </div>
      </div>
      <div class="we-p-section">
        <div class="we-p-label">// Options</div>
        ${row('opt-soft','Sanfte Farben',state.softColors)}
        ${row('opt-scanlines','Scanlines',state.scanlines)}
        ${row('opt-hud','HUD Bar',state.hud)}
        ${row('opt-grain','Grain',state.grain)}
      </div>
      <div class="we-p-hint">Tip: Shift+Click on ◈ = cycle theme</div>
      <div class="we-p-footer"><span>TACTICAL OVERLAY</span><span>v1.5.0</span></div>
    `;
    document.body.appendChild(panel);

    panel.querySelector('.we-p-close').addEventListener('click', () => panel.classList.remove('open'));
  
panel.querySelectorAll('.we-p-theme').forEach((b) => {
      b.classList.toggle('active', b.dataset.theme === state.theme);
      b.addEventListener('click', () => applyTheme(b.dataset.theme));
    });

    [['opt-soft','softColors'],['opt-scanlines','scanlines'],['opt-hud','hud'],['opt-grain','grain']].forEach(([id,k]) => {
      const el = panel.querySelector('#'+id);
      if (el) el.addEventListener('change', () => {
        state[k] = el.checked;
        storage.set('we_'+k, el.checked);
        applyOptions();
      });
    });
    console.log('[WarEra Overlay] panel built');
  }

  function row(id, label, checked) {
    return `
      <div class="we-p-row">
        <span class="we-p-row-label">${label}</span>
        <label class="we-toggle">
          <input type="checkbox" id="${id}" ${checked?'checked':''}>
          <span class="tr"></span><span class="th"></span>
        </label>
      </div>`;
  }

  function togglePanel() {
    buildPanel();
    const panel = document.getElementById('we-panel');
    if (panel) panel.classList.toggle('open');
  }

  /* ============================================================
     8) KEYBOARD SHORTCUT
     ============================================================ */
  document.addEventListener('keydown', (e) => {
    if (e.altKey && (e.key === 't' || e.key === 'T')) cycleTheme();
  });

  /* ============================================================
     9) TAMPERMONKEY MENU
     ============================================================ */
  try {
    GM_registerMenuCommand('⚙ Open Settings Panel', () => {
      buildPanel();
      const p = document.getElementById('we-panel');
      if (p) p.classList.add('open');
    });
    GM_registerMenuCommand('◈ Cycle Theme', cycleTheme);
    THEMES.forEach((t) => {
      GM_registerMenuCommand(`  → ${THEME_LABELS[t]}`, () => applyTheme(t));
    });
  } catch (_) {}

  /* ============================================================
     10) INIT
     ============================================================ */
  function mount() {
    injectCSS();
    if (!document.body) return false;
    applyTheme(state.theme);
    applyOptions();
    buildHUD();
    buildToggleButton();
    buildPanel();
    return true;
  }

  function waitForBody() {
    if (mount()) return;
    const iv = setInterval(() => {
      if (mount()) clearInterval(iv);
    }, 100);
    setTimeout(() => clearInterval(iv), 10000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitForBody, { once: true });
  } else {
    waitForBody();
  }

  /* ── Observer: debounced, re-entry safe ───────────────────── */
  let rafPending = false;
  let observerBusy = false;

  function observerTick() {
    rafPending = false;
    if (!document.body || observerBusy) return;
    observerBusy = true;
    try {
      if (!document.body.hasAttribute('data-we-theme')) {
        document.body.setAttribute('data-we-theme', state.theme);
        document.documentElement.setAttribute('data-we-theme', state.theme);
      }
      if (!document.getElementById('we-style'))        injectCSS();
      if (!document.getElementById('we-hud'))          buildHUD();
      if (!document.getElementById('we-theme-toggle')) buildToggleButton();
    } finally {
      observerBusy = false;
    }
                         }

 const obs = new MutationObserver(() => {
    if (!rafPending) {
      rafPending = true;
      requestAnimationFrame(observerTick);
    }
  });

  obs.observe(document.documentElement, { childList: true });
  if (document.body) obs.observe(document.body, { childList: true });
})();
   
