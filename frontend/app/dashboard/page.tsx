"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

/* ════════════════════════════════════════════════════════════════════
   UNIVERSAL THEME SPECIFICATION BLOCK (4-COLOR PREMIUM BLEND MATRIX)
   Your exact, authentic palette completely locked down and protected.
════════════════════════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --font-main:  'Plus Jakarta Sans', sans-serif;
  
  --green:      #10b981;
  --red:        #ef4444;
  --orange:     #f97316;
  
  /* 🎨 YOUR EXACT 4-COLOR PALETTE SCHEME Kept Intact */
  --oxford-blue:   #002147;
  --silent-ocean:  #0F3C65;
  --vanilla-beige: #FAF1CA;
  --tan-accent:    #D2B48C;
  
  /* THEME STYLING ASSIGNMENTS */
  --bg:            linear-gradient(135deg, var(--oxford-blue) 0%, var(--silent-ocean) 100%);
  --card:          rgba(4, 11, 28, 0.12); 
  --card-border:   rgba(210, 180, 140, 0.25);
  --silver:        var(--vanilla-beige); 
  --gold:          var(--tan-accent); 
  --gold-18:       rgba(210, 180, 140, 0.18);
  --gold-06:       rgba(210, 180, 140, 0.06);
  --terminal-bg:   rgba(0, 5, 15, 0.25);  
  --input-bg:      rgba(0, 5, 15, 0.3);
}

.db-root.light-theme {
  --bg:            var(--vanilla-beige);                     
  --card:          rgba(255, 255, 255, 0.75);                     
  --card-border:   rgba(0, 33, 71, 0.2);
  --silver:        var(--oxford-blue);                     
  --gold:          var(--silent-ocean);
  --gold-18:       rgba(0, 33, 71, 0.15);     
  --gold-06:       rgba(0, 33, 71, 0.04);    
  --terminal-bg:   rgba(253, 251, 242, 0.7);                    
  --input-bg:      #ffffff;                     
}

html, body { height: 100%; overflow: hidden; background: #002147; }

.db-root {
  height: 100vh;
  min-height: 100vh;
  background: radial-gradient(circle, rgba(255, 176, 0, 0.4) 0%, rgba(255, 176, 0, 0.08) 45%, transparent 70%);
  display: flex;
  flex-direction: column;
  font-family: var(--font-main);
  position: relative;
  overflow: hidden;
  color: var(--silver);
  transition: background 0.4s cubic-bezier(0.4, 0, 0.2, 1), color 0.3s ease;
}

.db-root::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--bg);
  z-index: -2;
}

.db-glow-layer-container {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
}

.db-glow-spot-primary {
  position: absolute;
  top: 35%;
  left: 45%;
  width: 450px;
  height: 450px;
  background: #D2B48C;
  opacity: 0.25;
  filter: blur(130px);
  border-radius: 50%;
}

.db-glow-spot-secondary {
  position: absolute;
  bottom: 10%;
  right: 15%;
  width: 350px;
  height: 350px;
  background: #FAF1CA;
  opacity: 0.15;
  filter: blur(100px);
  border-radius: 50%;
}

.db-root.light-theme .db-glow-layer-container {
  display: none;
}

/* 🏛️ HIGH-VISIBILITY CRISP BACKGROUND ARCHITECTURE MATRIX */
.db-columns-backdrop-asset {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  opacity: 0.38;      
  filter: grayscale(100%) contrast(1.25) brightness(1.15); 
  mix-blend-mode: luminosity;
  pointer-events: none;
  user-select: none;
  z-index: 1;
  mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 55%, rgba(0,0,0,0.3) 85%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 55%, rgba(0,0,0,0.3) 85%, transparent 100%);
}

s

@keyframes vaultScanSweep {
  0% { top: -2%; }
  50% { top: 102%; }
  100% { top: -2%; }
}

.db-app-layout {
  display: flex;
  flex: 1;
  min-height: 0;
  overflow: hidden;
  position: relative;
  z-index: 5;
}

.db-sidebar {
  width: 240px;
  background: rgba(0, 12, 30, 0.25); 
  border-right: 1px solid var(--card-border);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px 16px;
  flex-shrink: 0;
}

.db-sb-top { display: flex; flex-direction: column; gap: 32px; }

.db-logo {
  display: flex; align-items: center; gap: 10px;
  font-size: 14px; font-weight: 700;
  letter-spacing: .2em; text-transform: uppercase;
}
.db-logo-accent { color: var(--gold); }

.db-nav-list { display: flex; flex-direction: column; gap: 8px; list-style: none; }
.db-nav-item {
  display: flex; align-items: center; gap: 12px;
  padding: 12px 14px; border-radius: 8px;
  font-size: 13px; font-weight: 500; color: var(--silver);
  cursor: pointer; transition: all 0.2s;
}
.db-nav-item.active {
  background: var(--gold-18);
  color: var(--gold);
  font-weight: 600;
  border-left: 3px solid var(--gold);
}
.db-nav-item:hover:not(.active) {
  background: var(--gold-06);
}

.db-vault-badge {
  display: flex; align-items: center; gap: 10px;
  padding: 12px; background: rgba(16, 185, 129, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 8px;
}
.db-vb-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--green); }
.db-vault-badge span { font-size: 11px; font-weight: 600; letter-spacing: 0.05em; color: var(--green); }

.db-main {
  flex: 1; display: flex; flex-direction: column; min-width: 0; overflow: hidden;
}

.db-topbar {
  height: 75px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 32px; border-bottom: 1px solid var(--card-border);
  background: rgba(0, 12, 30, 0.15);
}

.db-topbar-left-block { display: flex; flex-direction: column; gap: 2px; }
.db-topbar-breadcrumb { font-size: 10px; font-weight: 600; letter-spacing: 0.1em; color: var(--gold); opacity: 0.6; text-transform: uppercase; }
.db-header-title { font-size: 14px; font-weight: 700; letter-spacing: 0.08em; color: var(--vanilla-beige); text-transform: uppercase; }

.db-tb-controls { display: flex; align-items: center; gap: 28px; }

.db-action-wipe {
  font-family: var(--font-main); font-size: 11px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase;
  color: var(--gold); background: var(--gold-06); border: 1px solid var(--card-border);
  padding: 10px 18px; border-radius: 6px; cursor: pointer; transition: all 0.2s;
}
.db-action-wipe:hover { background: var(--gold); color: #002147; border-color: var(--gold); }

.db-slider-wrap { display: flex; align-items: center; gap: 12px; }
.db-mode-icon { display: flex; align-items: center; justify-content: center; color: var(--silver); opacity: 0.45; transition: opacity 0.2s, color 0.2s; }
.db-mode-icon.active { opacity: 1; color: var(--gold); }
.db-slider-bg {
  width: 54px; height: 26px; background: var(--input-bg); border: 1px solid var(--card-border);
  border-radius: 20px; position: relative; cursor: pointer; transition: all 0.3s;
}
.db-slider-knob {
  width: 18px; height: 18px; background: var(--gold); border-radius: 50%;
  position: absolute; top: 3px; left: 4px; transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.db-root.light-theme .db-slider-knob { transform: translateX(26px); }

.db-large-timer {
  display: flex; flex-direction: column; align-items: flex-end; justify-content: center;
}
.db-timer-digits { font-size: 26px; font-weight: 700; letter-spacing: 0.05em; color: var(--gold); line-height: 1; }
.db-timer-lbl { font-size: 9px; font-weight: 700; letter-spacing: 0.12em; opacity: 0.5; text-transform: uppercase; margin-top: 2px; }

.db-workspace {
  flex: 1; min-height: 0; display: grid; grid-template-columns: 1.12fr 0.88fr; gap: 24px; padding: 24px 32px;
}

/* 💎 IDEA B: HIGH-END FROSTED GLASS SHEETS MATRIX RULES */
.db-panel {
  background: var(--card); 
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-top: 1px solid rgba(210, 180, 140, 0.35); 
  border-radius: 12px; 
  display: flex; 
  flex-direction: column; 
  overflow: hidden;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(16px) saturate(130%);
  -webkit-backdrop-filter: blur(16px) saturate(130%);
}
.db-panel-hdr { padding: 18px 24px; border-bottom: 1px solid rgba(255, 255, 255, 0.06); background: rgba(210, 180, 140, 0.01); display: flex; justify-content: space-between; align-items: center; }
.db-panel-title { font-size: 12px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: var(--gold); }
.db-panel-body { flex: 1; padding: 20px 24px; display: flex; flex-direction: column; gap: 16px; min-height: 0; }

.db-term-label-row { display: flex; justify-content: space-between; align-items: center; width: 100%; }
.db-restore-arrow-btn { background: transparent; border: none; color: var(--gold); font-size: 11px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; cursor: pointer; display: flex; align-items: center; gap: 4px; transition: opacity 0.2s; }
.db-restore-arrow-btn:hover { opacity: 0.8; }

.db-analysis-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 2px; flex-shrink: 0; position: relative; }
.db-analysis-card { 
  padding: 14px 18px; 
  border-radius: 8px; 
  border: 1px solid rgba(255, 255, 255, 0.06); 
  backdrop-filter: blur(8px); 
  position: relative;
}
.db-analysis-card.risk { border-color: rgba(239, 68, 68, 0.25); background: rgba(239, 68, 68, 0.02); }
.db-analysis-card.timeline { border-color: rgba(249, 115, 22, 0.25); background: rgba(249, 115, 22, 0.02); }
.db-analysis-lbl { font-size: 10px; font-weight: 700; letter-spacing: .05em; text-transform: uppercase; margin-bottom: 6px; }
.db-analysis-card.risk .db-analysis-lbl { color: var(--red); }
.db-analysis-card.timeline .db-analysis-lbl { color: var(--orange); }
.db-analysis-txt { font-size: 12px; line-height: 1.55; opacity: 0.95; padding-right: 12px; }

.db-box-close-cross {
  position: absolute;
  top: 10px;
  right: 12px;
  background: transparent;
  border: none;
  color: var(--silver);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  opacity: 0.4;
  transition: opacity 0.2s, color 0.2s;
}
.db-box-close-cross:hover { opacity: 1; color: var(--red); }

.db-dz {
  border: 1px dashed rgba(210, 180, 140, 0.35); padding: 36px 20px; border-radius: 10px;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px;
  cursor: pointer; position: relative; background: rgba(0, 12, 30, 0.15); transition: all 0.2s;
  flex-shrink: 0;
}
.db-dz:hover { background: rgba(210, 180, 140, 0.02); border-color: var(--gold); }
.db-dz-icon { color: var(--gold); opacity: 0.9; margin-bottom: 2px; }
.db-dz-title { font-size: 13px; font-weight: 700; color: var(--silver); }
.db-dz-sub { font-size: 11px; color: var(--silver); opacity: 0.5; }
.db-file-input { position: absolute; inset: 0; opacity: 0; cursor: pointer; }

.db-dz-tags { display: flex; gap: 6px; margin-top: 4px; }
.db-dz-tag { font-size: 10px; font-weight: 600; opacity: 0.6; background: rgba(255,255,255,0.01); border: 1px solid rgba(255,255,255,0.05); padding: 3px 8px; border-radius: 4px; color: var(--gold); }

.db-sel-wrap { flex-shrink: 0; }
.db-field-lbl { font-size: 10px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--gold); margin-bottom: 6px; }
.db-sel { width: 100%; background: var(--input-bg); border: 1px solid rgba(255, 255, 255, 0.06); color: var(--silver); font-family: var(--font-main); font-size: 13px; padding: 12px; outline: none; border-radius: 6px; }
.db-sel option { background: #001126; color: #FAF1CA; }

.db-term-wrap { flex: 1; display: flex; flex-direction: column; min-height: 0; }
.db-terminal {
  flex: 1; min-height: 0; background: var(--terminal-bg); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 6px; padding: 16px; outline: none; resize: none;
  font-family: 'Times New Roman', Times, serif; font-size: 18px; line-height: 1.65; color: var(--silver); overflow-y: auto;
}

.db-proc-btn {
  font-family: var(--font-main); font-size: 11px; font-weight: 700; letter-spacing: .15em; text-transform: uppercase; width: 100%; padding: 14px;
  background: var(--gold) !important; color: #002147 !important; border: 1px solid var(--gold) !important; border-radius: 6px; cursor: pointer; transition: all 0.2s;
  flex-shrink: 0;
}
.db-proc-btn:disabled { opacity: 0.35; cursor: not-allowed; }

.db-chat-container { display: flex; flex-direction: column; flex: 1; min-height: 0; justify-content: space-between; }
.db-msgs { flex: 1; overflow-y: auto; min-height: 0; display: flex; flex-direction: column; gap: 16px; padding-right: 4px; }
.db-msgs::-webkit-scrollbar { width: 4px; }
.db-msgs::-webkit-scrollbar-thumb { background: var(--card-border); border-radius: 4px; }
.db-msg { display: flex; flex-direction: column; gap: 6px; max-width: 85%; }
.db-msg.user { align-self: flex-end; }
.db-msg.ai { align-self: flex-start; }

.db-role { font-size: 9px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; padding: 2px 6px; border-radius: 4px; width: max-content; }
.db-msg.user .db-role { background: rgba(250, 241, 202, 0.1); color: var(--silver); align-self: flex-end; }
.db-msg.ai .db-role { background: var(--gold-18); color: var(--gold); align-self: flex-start; }

.db-bubble {
  padding: 12px 16px; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.05);
  font-family: 'Times New Roman', Times, serif; font-size: 18px; line-height: 1.6;
}
.db-msg.user .db-bubble { background: var(--gold-06); border-top-right-radius: 0; }
.db-msg.ai .db-bubble { background: rgba(0, 12, 30, 0.1); border-top-left-radius: 0; }

.db-input-row { display: flex; gap: 12px; flex-shrink: 0; padding-top: 14px; border-top: 1px solid rgba(255, 255, 255, 0.06); }
.db-chat-in { flex: 1; background: var(--input-bg); border: 1px solid rgba(255, 255, 255, 0.06); color: var(--silver); font-family: var(--font-main); font-size: 13px; padding: 12px; outline: none; border-radius: 6px; }
.db-send { font-family: var(--font-main); font-size: 11px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; padding: 0 18px; background: var(--gold-06); border: 1px solid var(--card-border); color: var(--gold); cursor: pointer; border-radius: 6px; transition: all 0.2s; }
.db-send:hover:not(:disabled) { background: var(--gold); color: #002147; border-color: var(--gold); }

.db-spin { width: 14px; height: 14px; border-radius: 50%; border: 2px solid transparent; border-top-color: var(--gold); animation:spinR .65s linear infinite; margin: 4px auto; }
@keyframes spinR { to { transform:rotate(360deg); } }

.db-strip { height: 32px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; background: #001126; border-top: 1px solid var(--card-border); position: relative; z-index: 15; }
.db-strip-txt { font-size: 9px; font-weight: 600; letter-spacing: .15em; text-transform: uppercase; color: var(--gold); opacity: 0.5; }

/* ❓ FAQ HELP PANEL DESIGN — Synchronized transparent glass base */
.db-faq-panel { flex: 1; padding: 24px 32px; display: flex; flex-direction: column; gap: 20px; overflow-y: auto; }
.db-faq-title-row { display: flex; align-items: center; gap: 12px; font-size: 18px; font-weight: 700; color: var(--gold); border-bottom: 1px solid var(--card-border); padding-bottom: 12px; }
.db-faq-list { display: flex; flex-direction: column; gap: 12px; }
.db-faq-card { 
  background: var(--card); 
  border: 1px solid var(--card-border); 
  border-radius: 12px; 
  overflow: hidden;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}
.db-faq-trigger { width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; background: transparent; border: none; color: var(--silver); text-align: left; font-family: var(--font-main); font-size: 14px; font-weight: 600; cursor: pointer; transition: background 0.2s; }
.db-faq-trigger:hover { background: var(--gold-06); }
.db-faq-icon-indicator { color: var(--gold); font-size: 16px; font-weight: 700; transition: transform 0.2s; }
.db-faq-card.open .db-faq-icon-indicator { transform: rotate(45deg); }
.db-faq-content { padding: 0 20px 16px 20px; font-size: 13px; line-height: 1.6; color: var(--silver); opacity: 0.85; display: none; }
.db-faq-card.open .db-faq-content { display: block; border-top: 1px solid rgba(210, 180, 140, 0.15); padding-top: 14px; }

/* 📁 MODULE ARCHIVES PANEL STYLES */
.db-archives-layout { flex: 1; padding: 24px 32px; display: flex; flex-direction: column; gap: 20px; overflow-y: auto; }
.db-arch-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
.db-arch-card {
  background: var(--card); border: 1px solid var(--card-border); border-top: 2px solid var(--gold);
  border-radius: 10px; padding: 20px; display: flex; flex-direction: column; gap: 14px;
  backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); box-shadow: 0 10px 25px rgba(0,0,0,0.15);
}
.db-arch-meta-row { display: flex; justify-content: space-between; align-items: center; font-family: var(--font-main); font-size: 10px; font-weight: 600; letter-spacing: 0.05em; color: var(--gold); opacity: 0.6; text-transform: uppercase; }
.db-arch-title { font-size: 14px; font-weight: 700; color: #ffffff; letter-spacing: 0.02em; line-height: 1.3; }
.db-arch-desc { font-size: 12px; line-height: 1.5; opacity: 0.7; }
.db-arch-action-bar { display: flex; gap: 10px; margin-top: 4px; }
.db-arch-btn { flex: 1; font-family: var(--font-main); font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; padding: 8px; border-radius: 4px; cursor: pointer; text-align: center; transition: all 0.2s; }
.db-arch-btn.primary { background: var(--gold); color: #002147; border: 1px solid var(--gold); }
.db-arch-btn.primary:hover { background: #fcd34d; border-color: #fcd34d; }
.db-arch-btn.secondary { background: transparent; color: var(--gold); border: 1px solid rgba(210, 180, 140, 0.3); }
.db-arch-btn.secondary:hover { background: var(--gold-06); border-color: var(--gold); }

/* 🔑 MODULE AUDIT LOGS STYLES */
.db-audit-layout { flex: 1; padding: 24px 32px; display: flex; flex-direction: column; gap: 20px; overflow-y: auto; }
.db-audit-stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.db-audit-stat-box {
  background: var(--card); border: 1px solid var(--card-border); border-radius: 8px; padding: 16px;
  display: flex; flex-direction: column; gap: 4px; backdrop-filter: blur(16px);
}
.db-audit-stat-val { font-size: 20px; font-weight: 700; color: #ffffff; }
.db-audit-stat-lbl { font-size: 10px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--gold); opacity: 0.6; }
.db-audit-table-wrapper {
  background: var(--card); border: 1px solid var(--card-border); border-radius: 10px; overflow: hidden;
  backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
}
.db-audit-row { display: grid; grid-template-columns: 140px 150px 1fr; padding: 12px 20px; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 12px; align-items: center; }
.db-audit-row.header { background: rgba(210, 180, 140, 0.04); font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--gold); border-bottom: 1px solid var(--card-border); }
.db-audit-time { font-family: var(--font-main); opacity: 0.5; font-size: 11px; }
.db-audit-tag { font-family: var(--font-main); font-size: 9px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; padding: 3px 8px; border-radius: 4px; width: max-content; }
.db-audit-tag.success { background: rgba(16, 185, 129, 0.12); color: var(--green); border: 1px solid rgba(16, 185, 129, 0.25); }
.db-audit-tag.warning { background: rgba(249, 115, 22, 0.12); color: var(--orange); border: 1px solid rgba(249, 115, 22, 0.25); }
.db-audit-msg { font-family: var(--font-main); opacity: 0.85; }
`;

interface LanguageItem { value: string; label: string; nativeName: string; }
interface MessageItem { role: string; text: string; ts: string; }
interface TimelineEvent { date: string; event: string; }
interface FAQItem { id: number; q: string; a: string; }
interface ArchiveItem { id: string; filename: string; date: string; lang: string; snippet: string; }
interface AuditLogItem { time: string; system: string; message: string; type: "success" | "warning"; }

const TIMER_START = 20 * 60;

const LANGUAGES: LanguageItem[] = [
  { value: "en", label: "English (Source Document)",    nativeName: "English" },
  { value: "as", label: "Assamese  —  অসমীয়া",          nativeName: "Assamese" },
  { value: "kn", label: "Kannada   —  ಕನ್ನಡ",           nativeName: "Kannada" },
  { value: "hi", label: "Hindi     —  हिंदी",            nativeName: "Hindi" },
  { value: "bn", label: "Bengali   —  বাংলা",           nativeName: "Bengali" },
  { value: "te", label: "Telugu    —  తెలుగు",           nativeName: "Telugu" },
  { value: "ta", label: "Tamil     —  தமிழ்",            nativeName: "Tamil" },
  { value: "ml", label: "Malayalam —  മലയാളം",           nativeName: "Malayalam" },
  { value: "mr", label: "Marathi   —  মরাঠি",            nativeName: "Marathi" },
  { value: "gu", label: "Gujarati  —  ગુજરાતી",          nativeName: "Gujarati" },
  { value: "pa", label: "Punjabi   —  ਪੰਜਾਬী",           nativeName: "Punjabi" },
  { value: "or", label: "Odia      —  ଓড଼িଆ",            nativeName: "Odia" },
];
const UI_LABELS: Record<string, { risks: string; timeline: string }> = {
  en: { risks: "Risky Clauses Detected", timeline: "Due Timelines Mapped" },
  as: { risks: "চিনাক্ত কৰা বিপদসমূহ", timeline: "চুক্তিৰ সময়সীমা" },
  kn: { risks: "ಅಪಾಯಕಾರಿ ಷರತ್ತುಗಳು ಪತ್ತೆಯಾಗಿವೆ", timeline: "ಸಮಯಮಿತಿ ನಿಗದಿಪಡಿಸಲಾಗಿದೆ" },
  hi: { risks: "जोखिमपूर्ण क्लॉज का पता चला", timeline: "समय सीमा निर्धारित" },
  bn: { risks: "ঝুঁকিপূর্ণ ধারা শনাক্ত", timeline: "সময়সীমা নির্ধারিত" },
  te: { risks: "ప్రమాదకరమైన నిబంధనలు గుర్తించబడ్డాయి", timeline: "సమయ పరిమితులు మ్యాప్ చేయబడ్డాయి" },
  ta: { risks: "ஆபத்தான உட்பிரிவுகள் கண்டறியப்பட்டன", timeline: "காலக்கெடு வரைபடமாக்கப்பட்டது" },
  ml: { risks: "അപകടകരമായ വ്യവസ്ഥകൾ കണ്ടെത്തി", timeline: "സമയപരിധി നിശ്ചയിച്ചു" },
  mr: { risks: "धोकादायक कलम्स आढळले", timeline: "वेळेचे नियोजन केले" },
  gu: { risks: "જોખમી કલમો મળી", timeline: "સમયમર્યાદા નક્કી કરવામાં આવી" },
  pa: { risks: "ਖਤਰਨਾਕ ਧਾਰਾਵਾਂ ਦਾ ਪਤਾ ਲੱਗਿਆ", timeline: "ਸਮਾਂ ਸੀਮਾ ਨਿਰਧਾਰਤ ਕੀਤੀ ਗਈ" },
  or: { risks: "ବିପଦଜନକ ଧାରା ଚିହ୍ନଟ ହୋଇଛି", timeline: "ସମୟ ସୀମା ନିର୍ଧାରଣ କରାଯାଇଛି" },
};
const FAQS: FAQItem[] = [
 { id: 1, q: "Is my document stored on cloud?", a: "No, Legal Fortress operates entirely offline." },
  { id: 2, q: "What formats are supported?", a: "PDF, PNG, JPG, and WEBP." },
  { id: 3, q: "How do I access past documents?", a: "Click 'Vault Archives' in the sidebar to view historically processed contracts." },
  { id: 4, q: "What are Audit Logs for?", a: "The Audit Logs tab shows the real-time security operations and cryptographic handshakes of the vault." },
  { id: 5, q: "Does 'Wipe Core' clear everything?", a: "Yes, it flushes the memory and resets the current session." }
];


const INITIAL_ARCHIVES: ArchiveItem[] = [];
 

const INITIAL_AUDITS: AuditLogItem[] = [
  { time: "14:02:54", system: "Sec-Engine", message: "AES-256-GCM Handshake Array Validated Successfully", type: "success" },
  { time: "14:03:10", system: "Model-Core", message: "Local Llama-3 Vector Database Ingestion Loop Initialized", type: "success" },
  { time: "14:04:22", system: "Auth-Vault", message: "Handshake tracing warning: Session token approach 75% limit parameters", type: "warning" },
  { time: "14:05:01", system: "Linguist",   message: "Assamese (অসমীয়া) script tokenizers loaded into pipeline framework", type: "success" }
];

const SEED_MSGS: MessageItem[] = [
  { role: "ai", text: "ask questions about clauses , timelines..........", ts: "11:13:21" }
];

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  
  const [isLightMode, setIsLightMode] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIMER_START);

  const [hasGenerated, setHasGenerated] = useState(false);
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);
  const [risks,        setRisks]        = useState("");
  const [timeline,     setTimeline]     = useState("");
  const [showAnalysis, setShowAnalysis] = useState(true);
  const [archives, setArchives] = useState<ArchiveItem[]>(INITIAL_ARCHIVES);
  const [loadedArtifactId, setLoadedArtifactId] = useState<string | null>(null);
  const [loadedArtifactName, setLoadedArtifactName] = useState<string | null>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("fortress_token");
      if (!token) router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(t => (t <= 1 ? 0 : t - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
  if (timeLeft === 0) {
    clearWorkspace();                              // Option 2: wipe the session
    if (typeof window !== "undefined") {
      localStorage.removeItem("fortress_token");    // clear the auth token too
    }
    router.push("/login");                          // Option 1: redirect to login
  }
}, [timeLeft]);

  const formatTimer = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600).toString().padStart(2, "0");
    const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  const [file,       setFile]       = useState<File | null>(null);
  const [dragging,   setDragging]   = useState(false);
  const [language,   setLanguage]   = useState("en");
  const [summary,    setSummary]    = useState("");
  const [processing, setProcessing] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [msgs,      setMsgs]      = useState<MessageItem[]>(SEED_MSGS);
  const [chatVal,   setChatVal]   = useState("");
  const [aiTyping,  setAiTyping]  = useState(false);
  const chatEndRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  const selectedLang = LANGUAGES.find(l => l.value === language);
  const btnLabel = language === "en" ? "Generate Summary" : `Generate ${selectedLang?.nativeName ?? ""} Summary`;

  const handleFile = (f: File | undefined) => {
  if (f) {
    setFile(f);
    setLoadedArtifactId(null);
    setLoadedArtifactName(null);
    setSummary("");
    setHasGenerated(false);
  }
};

  const clearWorkspace = () => {
    setFile(null);
    setLoadedArtifactId(null);
    setLoadedArtifactName(null);
    setSummary("");
    setHasGenerated(false);
    setRisks("");
    setTimeline("");
    setMsgs(SEED_MSGS);
    setChatVal("");
    setShowAnalysis(true);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
const handleLoadArtifact = (item: ArchiveItem) => {
  setActiveTab("dashboard");
  setFile(null);
  setLoadedArtifactId(item.id);
  setLoadedArtifactName(item.filename);
  setSummary("");
  setHasGenerated(false);
  setRisks("");
  setTimeline("");
  setShowAnalysis(true);
};

const handleExportJSON = (item: any) => {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(item));
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", `${item.filename}.json`);
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
};
  const runProcess = async () => {
  if ((!file && !loadedArtifactId) || processing) return;
  setProcessing(true);
  setSummary("");
  setHasGenerated(false);

  try {
    let response;
    if (loadedArtifactId) {
      response = await fetch("http://localhost:8000/vault/regenerate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: loadedArtifactId, language }),
      });
    } else {
      const formData = new FormData();
      formData.append("file", file as File);
      formData.append("language", language);
      response = await fetch("http://localhost:8000/analyze", { method: "POST", body: formData });
    }

    if (!response.ok) throw new Error("Processing loop exception triggered.");
    const data = await response.json();

    if (data.timeline_events) setTimelineEvents(data.timeline_events);
    setRisks(data.risks || "");
    setTimeline(data.timeline || "");

    // Fresh upload that produced a new archive_id -> add it to the Vault list
    if (!loadedArtifactId && data.archive_id && file) {
      setArchives(prev => [
        {
          id: data.archive_id,
          filename: file.name,
          date: new Date().toLocaleDateString("en-GB"),
          lang: selectedLang?.label ?? "English",
          snippet: (data.summary || "").slice(0, 140),
        },
        ...prev,
      ]);
    }

    const realAIResult = data.summary || "";
    let i = 0;
    const tick = () => {
      i += Math.floor(Math.random() * 4) + 2;
      setSummary(realAIResult.slice(0, i));
      if (i < realAIResult.length) {
        setTimeout(tick, 5);
      } else {
        setProcessing(false);
        setHasGenerated(true);
      }
    };
    tick();
  } catch (error: any) {
    setSummary(`// SYSTEM ERROR: ${error.message || "Endpoint matrix failed."}`);
    setProcessing(false);
  }
};
  const sendMsg = async () => {
    const text = chatVal.trim();
    if (!text || aiTyping) return;

    const currentMsgsLog = [...msgs, { role: "user", text, ts: new Date().toLocaleTimeString("en-GB") }];
    setMsgs(currentMsgsLog);
    setChatVal("");
    setAiTyping(true);

    let parsedLanguage = language;
    const lowerQuery = text.toLowerCase();
    if (lowerQuery.includes("bipod") || lowerQuery.includes("chukti") || lowerQuery.includes("somoy")) {
      parsedLanguage = "as";
    }

    try {
      const response = await fetch("http://localhost:8000/interrogate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: text, language: parsedLanguage }),
      });

      if (!response.ok) throw new Error("Interrogate pipe reset.");
      const data = await response.json();
      
      const aiReplyText = data.response || data.reply || data.output || data.message || data.summary;
      
      if (aiReplyText) {
        setMsgs([...currentMsgsLog, { role: "ai", text: aiReplyText, ts: new Date().toLocaleTimeString("en-GB") }]);
      } else {
        const genericFallback = parsedLanguage === "as" 
          ? "ছিষ্টেম সক্ৰিয় অৱস্থাত আছে। আপোনাৰ প্ৰশ্নটো অনুগ্ৰহ কৰি আকৌ পৰীক্ষা কৰক।" 
          : "System query handshake complete. Vector trace active.";
        setMsgs([...currentMsgsLog, { role: "ai", text: genericFallback, ts: new Date().toLocaleTimeString("en-GB") }]);
      }
    } catch (error: any) {
      const errorFallback = parsedLanguage === "as"
        ? "// ত্ৰুটি: স্থানীয় সার্ভাৰ সংযোগ ব্যাহত হৈছে।"
        : `// COMPILATION INTERRUPT: Unable to communicate with active backend engine matrix on port 8000.`;
      setMsgs([...currentMsgsLog, { role: "ai", text: errorFallback, ts: new Date().toLocaleTimeString("en-GB") }]);
    } finally {
      setAiTyping(false);
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div className={isLightMode ? "db-root light-theme" : "db-root"}>
        <div className="db-glow-layer-container">
          <div className="db-glow-spot-primary" />
          <div className="db-glow-spot-secondary" />
        </div>

        {/* 🏛️ FIXED PATH WAY: Pointing cleanly to your saved colum.png background image asset */}
        <img 
          src="/colum.png" 
          alt="Courthouse Columns Background Matrix" 
          className="db-columns-backdrop-asset" 
          style={{ objectFit: "cover", objectPosition: "top center" }}
        />

        {/* ⚡ IDEA A: HIGH-TECH CYBER SCANNING SWEEP LINE */}
        <div className={`db-scanning-ray ${processing ? "active" : ""}`} />

        <div className="db-app-layout">
          <aside className="db-sidebar">
            <div className="db-sb-top">
              <div className="db-logo">
                <span className="db-logo-accent">Legal</span>&nbsp;Fortress
              </div>
              <ul className="db-nav-list">
                <li className={`db-nav-item ${activeTab === "dashboard" ? "active" : ""}`} onClick={() => setActiveTab("dashboard")}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>
                  Dashboard
                </li>
                {/* 📁 NEW NAVIGATION ITEM: VAULT ARCHIVES */}
                <li className={`db-nav-item ${activeTab === "archives" ? "active" : ""}`} onClick={() => setActiveTab("archives")}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                  Vault Archives
                </li>
                {/* 🔑 NEW NAVIGATION ITEM: SECURITY & AUDIT LOGS */}
                <li className={`db-nav-item ${activeTab === "audit" ? "active" : ""}`} onClick={() => setActiveTab("audit")}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  Audit Logs
                </li>
                <li className={`db-nav-item ${activeTab === "settings" ? "active" : ""}`} onClick={() => setActiveTab("settings")}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/></svg>
                  Help
                </li>
              </ul>
            </div>
            
            <div className="db-vault-badge">
              <div className="db-vb-dot" />
              <span className="db-vb-txt">Vault Session Secure</span>
            </div>
          </aside>

          <main className="db-main">
            <header className="db-topbar">
              <div className="db-topbar-left-block">
                
                <h1 className="db-header-title">
                  {activeTab === "dashboard" && "Vault Management Engine"}
                  {activeTab === "archives" && "Encrypted Archives Repository"}
                  {activeTab === "audit" && "System Key Metrics & Audit Logs"}
                  {activeTab === "settings" && "Knowledge Base Directory"}
                </h1>
              </div>
              
              <div className="db-tb-controls">
                <button className="db-action-wipe" onClick={clearWorkspace} type="button">
                  Wipe Core
                </button>

                <div className="db-slider-wrap">
                  <div className={`db-mode-icon ${!isLightMode ? "active" : ""}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>
                  </div>
                  
                  <div className="db-slider-bg" onClick={() => setIsLightMode(!isLightMode)}>
                    <div className="db-slider-knob" />
                  </div>

                  <div className={`db-mode-icon ${isLightMode ? "active" : ""}`}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="5" />
                      <line x1="12" y1="1" x2="12" y2="3" />
                      <line x1="12" y1="21" x2="12" y2="23" />
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                      <line x1="1" y1="12" x2="3" y2="12" />
                      <line x1="21" y1="12" x2="23" y2="12" />
                      <line x1="4.22" y1="19.22" x2="5.64" y2="17.76" />
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                    </svg>
                  </div>
                </div>

                <div className="db-large-timer">
                  <span className="db-timer-digits">{formatTimer(timeLeft)}</span>
                  <span className="db-timer-lbl">Timer</span>
                </div>
              </div>
            </header>

            {/* 🖥️ VIEW ROUTER CONDITIONAL SWITCH CONTROLLER */}
            {activeTab === "dashboard" && (
              <div className="db-workspace">
                <section className="db-panel">
                  <div className="db-panel-hdr">
                    <span className="db-panel-title">Document Processing Pipeline</span>
                  </div>
                  <div className="db-panel-body">
                    <div
                      className={`db-dz${dragging ? " drag" : ""}`}
                      onDragOver={e => { e.preventDefault(); setDragging(true); }}
                      onDragLeave={() => setDragging(false)}
                      onDrop={e => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files?.[0]); }}
                    >
                      <input
                        ref={fileInputRef}
                        className="db-file-input"
                        type="file" accept=".pdf, .png, .jpeg, .jpg, .webp"
                        onChange={e => handleFile(e.target.files?.[0])}
                      />
                      <svg className="db-dz-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
                      </svg>
                      <span className="db-dz-title">
                      {file ? `↳ ${file.name}` : loadedArtifactName ? `↳ ${loadedArtifactName} (Loaded from Vault)` : "Drop PDF or Image Contract Artifact"}
                      </span>
                      {!file && !loadedArtifactName && <span className="db-dz-sub">Or click to browse your machine</span>}
                      {!file && (
                        <div className="db-dz-tags">
                          <span className="db-dz-tag">.pdf</span>
                          <span className="db-dz-tag">.png</span>
                          <span className="db-dz-tag">.jpg</span>
                        </div>
                      )}
                    </div>

                    <div className="db-sel-wrap">
                      <div className="db-field-lbl">Target Viewport Language</div>
                      <select className="db-sel" value={language} onChange={e => { setLanguage(e.target.value); setSummary(""); setProcessing(false); }}>
                        {LANGUAGES.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
                      </select>
                    </div>

                    <div className="db-term-wrap">
                      <div className="db-term-label-row">
                        <div className="db-field-lbl">Translation Output</div>
                        {hasGenerated && !showAnalysis && (
                          <button className="db-restore-arrow-btn" onClick={() => setShowAnalysis(true)} type="button">
                            {language === "as" ? "▲ বিশ্লেষণ দেখুৱাওক" : "▲ Show Analysis Metrics"}
                          </button>
                        )}
                      </div>
                      <textarea readOnly className="db-terminal" value={summary || "// Translated output will appear here...\nAI-generated translation of uploaded document"} />
                    </div>

                    {hasGenerated && showAnalysis && (
  <div className="db-analysis-grid">
    <div className="db-analysis-card risk">
      <button className="db-box-close-cross" onClick={() => setShowAnalysis(false)} title="Hide Box" type="button">×</button>
      
      {/* DYNAMIC LABEL FOR RISKS */}
      <div className="db-analysis-lbl">
       {UI_LABELS[language]?.risks || "Risky Clauses Detected"}
      </div>
       <p className="db-analysis-txt">{risks}</p>
       </div>
    
    <div className="db-analysis-card timeline">
      <button className="db-box-close-cross" onClick={() => setShowAnalysis(false)} title="Hide Box" type="button">×</button>
      
      {/* DYNAMIC LABEL FOR TIMELINE */}
      <div className="db-analysis-lbl">
        {UI_LABELS[language]?.timeline || "Due Timelines Mapped"}
      </div>
      
      <p className="db-analysis-txt">{timeline}</p>
    </div>
  </div>
)}
<button className="db-proc-btn" onClick={runProcess} disabled={(!file && !loadedArtifactId) || processing} type="button">
                    
                      {processing ? "Processing Ingestion..." : btnLabel.toUpperCase()}
                    </button>
                  </div>
                </section>

                <section className="db-panel">
                  <div className="db-panel-hdr">
                    <span className="db-panel-title">AI Assistant</span>
                  </div>
                  <div className="db-panel-body">
                    <div className="db-chat-container">
                      <div className="db-msgs">
                        {msgs.map((m, i) => (
                          <div className={`db-msg ${m.role}`} key={i}>
                            <span className="db-role">{m.role === "user" ? "Counsel" : "Astraea"}</span>
                            <div className="db-bubble">{m.text}</div>
                          </div>
                        ))}
                        {aiTyping && <div className="db-spin" />}
                        <div ref={chatEndRef} />
                      </div>

                      <div className="db-input-row">
                        <input
                          className="db-chat-in"
                          type="text"
                          placeholder="type here"
                          value={chatVal}
                          onChange={e => setChatVal(e.target.value)}
                          onKeyDown={e => { if (e.key === "Enter") sendMsg(); }}
                          disabled={aiTyping}
                        />
                        <button className="db-send" onClick={sendMsg} disabled={aiTyping || !chatVal.trim()} type="button">
                          Execute Query
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* 📁 VIEW: VAULT ARCHIVES CONSOLE WINDOW GRID */}
            {activeTab === "archives" && (
              <div className="db-archives-layout">
                <div className="db-arch-grid">
                  {archives.map(item => (
                    <div className="db-arch-card" key={item.id}>
                      <div className="db-arch-meta-row">
                        <span>{item.id}</span>
                        <span>{item.date}</span>
                      </div>
                      <h3 className="db-arch-title">{item.filename}</h3>
                      <div className="db-nav-item active" style={{ padding: "4px 8px", width: "max-content", fontSize: "10px" }}>
                        {item.lang}
                      </div>
                      <p className="db-analysis-txt" style={{ opacity: 0.7, fontSize: "11px", lineHeight: "1.5" }}>
                        {item.snippet}
                      </p>
                      <div className="db-arch-action-bar">
                        <button className="db-arch-btn primary" type="button" onClick={() => handleLoadArtifact(item)}>
                          Load Artifact
                        </button>
                        <button className="db-arch-btn secondary" type="button" onClick={() => handleExportJSON(item)}>
                          Export JSON
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 🔑 VIEW: SYSTEM HARDWARE KEY SECURITY & AUDIT LOGS */}
            {activeTab === "audit" && (
              <div className="db-audit-layout">
                <div className="db-audit-stats-row">
                  <div className="db-audit-stat-box">
                    <span className="db-audit-stat-val">AES-256</span>
                    <span className="db-audit-stat-lbl">Cipher Paradigm</span>
                  </div>
                  <div className="db-audit-stat-box">
                    <span className="db-audit-stat-val" style={{ color: "var(--green)" }}>0.00ms</span>
                    <span className="db-audit-stat-lbl">Data Leak Leakage Risk</span>
                  </div>
                  <div className="db-audit-stat-box">
                    <span className="db-audit-stat-val">Localhost</span>
                    <span className="db-audit-stat-lbl">Host Node Binding</span>
                  </div>
                </div>

                <div className="db-audit-table-wrapper">
                  <div className="db-audit-row header">
                    <div>Timestamp</div>
                    <div>SubSystem</div>
                    <div>Security Operation Handshake Message Tracer</div>
                  </div>
                  {INITIAL_AUDITS.map((log, index) => (
                    <div className="db-audit-row" key={index}>
                      <div className="db-audit-time">{log.time}</div>
                      <div>
                        <span className={`db-audit-tag ${log.type}`}>
                          {log.system}
                        </span>
                      </div>
                      <div className="db-audit-msg">{log.message}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="db-faq-panel">
                <div className="db-faq-title-row">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/></svg>
                  
                </div>
                
                <div className="db-faq-list">
                  {FAQS.map(item => (
                    <div className={`db-faq-card ${openFAQ === item.id ? "open" : ""}`} key={item.id}>
                      <button className="db-faq-trigger" onClick={() => setOpenFAQ(openFAQ === item.id ? null : item.id)} type="button">
                        <span>{item.q}</span>
                        <span className="db-faq-icon-indicator">+</span>
                      </button>
                      <div className="db-faq-content">
                        {item.a}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>

        <footer className="db-strip">
          <span className="db-strip-txt">LOCAL COMPILATION INTERFACE LAYER OPERATING VALID HANDSHAKES</span>
        </footer>
      </div>
    </>
  );
}