"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

/* ════════════════════════════════════════════════════════════════════
   🎨 CINZEL / SHARE TECH MONO LANDING THEME MATRIX
   Optimized to stretch the backdrop fully across the entire widescreen grid.
════════════════════════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Share+Tech+Mono&family=Cormorant+Garamond:wght@300;400&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --gold: #F59E0B;
  --gold-soft: rgba(245,158,11,0.55);
  --gold-dim: rgba(245,158,11,0.15);
  --silver: #CBD5E1;
  --silver-soft: rgba(203,213,225,0.6);
  --bg: #020617;
  --mono: 'Share Tech Mono', monospace;
  --serif: 'Cinzel', serif;
  --display: 'Cormorant Garamond', serif;
}

html, body { height: 100%; overflow: hidden; background: #020617; }

.lf-root {
  min-height: 100vh;
  height: 100vh;
  background: #020617;
  display: flex;
  align-items: stretch;
  font-family: var(--mono);
  position: relative;
  overflow: hidden;
}

.lf-aurora {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.aurora-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.55;
  will-change: transform;
}

.blob-1 {
  width: 700px; height: 600px;
  top: -180px; left: -120px;
  background: radial-gradient(ellipse, #1e1b6e 0%, #0d0b3e 60%, transparent 100%);
  animation: blobDrift1 18s ease-in-out infinite alternate;
}
.blob-2 {
  width: 600px; height: 500px;
  bottom: -150px; right: -100px;
  background: radial-gradient(ellipse, rgba(180,100,0,0.7) 0%, rgba(120,60,0,0.4) 55%, transparent 100%);
  animation: blobDrift2 22s ease-in-out infinite alternate;
}
.blob-3 {
  width: 500px; height: 400px;
  top: -80px; left: 35%;
  background: radial-gradient(ellipse, rgba(100,130,180,0.35) 0%, rgba(60,90,140,0.2) 55%, transparent 100%);
  animation: blobDrift3 26s ease-in-out infinite alternate;
}
.blob-4 {
  width: 450px; height: 550px;
  top: 20%; right: -80px;
  background: radial-gradient(ellipse, rgba(80,40,160,0.4) 0%, rgba(40,20,80,0.2) 55%, transparent 100%);
  animation: blobDrift4 20s ease-in-out infinite alternate;
}
.blob-5 {
  width: 800px; height: 300px;
  bottom: -60px; left: 10%;
  background: radial-gradient(ellipse, rgba(150,160,190,0.18) 0%, transparent 70%);
  animation: blobDrift5 30s ease-in-out infinite alternate;
}

@keyframes blobDrift1 {
  0%   { transform: translate(0,0) scale(1) rotate(0deg); }
  33%  { transform: translate(60px, 80px) scale(1.08) rotate(8deg); }
  66%  { transform: translate(-40px, 120px) scale(0.95) rotate(-5deg); }
  100% { transform: translate(30px, 40px) scale(1.05) rotate(12deg); }
}
@keyframes blobDrift2 {
  0%   { transform: translate(0,0) scale(1) rotate(0deg); }
  40%  { transform: translate(-80px,-60px) scale(1.1) rotate(-10deg); }
  80%  { transform: translate(-30px,-120px) scale(0.9) rotate(6deg); }
  100% { transform: translate(-60px,-40px) scale(1.06) rotate(-8deg); }
}
@keyframes blobDrift3 {
  0%   { transform: translate(0,0) scale(1); }
  50%  { transform: translate(80px, 60px) scale(1.12); }
  100% { transform: translate(-50px, 30px) scale(0.94); }
}
@keyframes blobDrift4 {
  0%   { transform: translate(0,0) scale(1) rotate(0deg); }
  50%  { transform: translate(-60px, 80px) scale(1.08) rotate(15deg); }
  100% { transform: translate(40px, -40px) scale(0.96) rotate(-10deg); }
}
@keyframes blobDrift5 {
  0%   { transform: translateX(0) scaleX(1); opacity: 0.18; }
  50%  { transform: translateX(80px) scaleX(1.1); opacity: 0.28; }
  100% { transform: translateX(-60px) scaleX(0.92); opacity: 0.15; }
}

.lf-grain {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  opacity: 0.25;
}

.lf-shimmer {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background:
    radial-gradient(ellipse 120% 60% at 50% 50%, rgba(200,210,230,0.04) 0%, transparent 70%),
    radial-gradient(ellipse 60% 80% at 20% 80%, rgba(180,195,220,0.05) 0%, transparent 60%);
}

/* ⚖️ FULL SCREEN WATERMARK COMPOSITION (STRETCHED COMPLETELY TO LEFT WALL) */
.auth-justice-bg {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100vw;       /* Forced full container screen scale */
  height: 100vh;      /* Forced vertical screen span */
  opacity: 0.26;      /* Maintains that deep structural visibility presence */
  filter: grayscale(100%) brightness(0.88);
  mix-blend-mode: luminosity;
  pointer-events: none;
  user-select: none;
  z-index: 2;
  
  /* Retuned masking so it breaks cleanly across the left margins without creating hard vertical stops */
  mask-image: linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 50%, transparent 100%);
  -webkit-mask-image: linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 50%, transparent 100%);
}

.lf-layout {
  position: relative;
  z-index: 10;
  display: flex;
  width: 100%;
  align-items: center;
}

.lf-left {
  width: 44%;
  min-width: 400px;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 48px;
  position: relative;
}

.lf-glass {
  width: 100%;
  max-width: 400px;
  background: rgba(4, 11, 28, 0.65); /* Made slightly values deeper to secure crisp field text readouts over the column art */
  backdrop-filter: blur(28px) saturate(160%);
  -webkit-backdrop-filter: blur(28px) saturate(160%);
  border: 1px solid rgba(245,158,11,0.18);
  border-radius: 2px;
  padding: 0;
  position: relative;
  box-shadow:
    0 0 0 1px rgba(245,158,11,0.06),
    0 0 60px rgba(245,158,11,0.08),
    0 0 120px rgba(245,158,11,0.04),
    0 30px 80px rgba(0,0,0,0.5),
    inset 0 1px 0 rgba(255,255,255,0.05);
  animation: glassRise 1s 0.2s cubic-bezier(0.16,1,0.3,1) both;
  opacity: 0;
}
@keyframes glassRise {
  from { opacity: 0; transform: translateY(24px) scale(0.975); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

.lf-glass-topbar {
  height: 2px;
  border-radius: 2px 2px 0 0;
  background: linear-gradient(90deg, transparent 5%, rgba(245,158,11,0.4) 30%, rgba(245,158,11,0.9) 50%, rgba(245,158,11,0.4) 70%, transparent 95%);
  position: relative;
}
.lf-glass-topbar::after {
  content: '';
  position: absolute;
  inset: 0;
  background: inherit;
  filter: blur(6px);
  opacity: 0.7;
  border-radius: inherit;
}

.lf-glass::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 2px;
  background: radial-gradient(ellipse 80% 50% at 50% 0%, rgba(245,158,11,0.06) 0%, transparent 65%);
  pointer-events: none;
  z-index: 0;
}

.lf-glass-body {
  padding: 40px 40px 36px;
  position: relative;
  z-index: 1;
}

.lf-card-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
  animation: fadeUp 0.6s 0.6s both;
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

.lf-card-shield {
  width: 36px; height: 36px;
  border: 1px solid rgba(245,158,11,0.3);
  display: flex; align-items: center; justify-content: center;
  position: relative;
  flex-shrink: 0;
  clip-path: polygon(50% 0%, 100% 22%, 100% 68%, 50% 100%, 0% 68%, 0% 22%);
  background: rgba(245,158,11,0.05);
}
.lf-card-brand-sub {
  font-family: var(--serif);
  font-size: 10px;
  letter-spacing: 0.22em;
  color: #F59E0B;
  text-transform: uppercase;
  margin-top: 2px;
}

.lf-div {
  display: flex; align-items: center; gap: 10px;
  margin-bottom: 28px;
  animation: fadeUp 0.6s 0.7s both;
}
.lf-div-line { flex: 1; height: 1px; background: rgba(245,158,11,0.1); }
.lf-div-diamond { width: 4px; height: 4px; border: 1px solid rgba(245,158,11,0.35); transform: rotate(45deg); flex-shrink: 0; }

.lf-fields { display: flex; flex-direction: column; gap: 18px; }

.lf-field { animation: fadeUp 0.6s both; }
.lf-field:nth-child(1) { animation-delay: 0.75s; }
.lf-field:nth-child(2) { animation-delay: 0.85s; }

.lf-field-header {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 7px;
}
.lf-label {
  font-size: 8px; letter-spacing: 0.32em;
  color: rgba(245,158,11,0.5); text-transform: uppercase;
}
.lf-field-id { font-size: 7.5px; letter-spacing: 0.14em; color: rgba(100,116,139,0.35); }

.lf-input-wrap { position: relative; }

.lf-input {
  width: 100%;
  background: rgba(2,6,23,0.6);
  border: 1px solid rgba(245,158,11,0.13);
  border-radius: 1px;
  color: #CBD5E1;
  font-family: var(--mono);
  font-size: 12.5px;
  letter-spacing: 0.04em;
  padding: 13px 42px 13px 14px;
  outline: none;
  transition: border-color 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s;
}
.lf-input::placeholder { color: rgba(100,116,139,0.38); font-size: 12px; }

.lf-input:focus {
  border-color: #F59E0B;
  background: rgba(2,6,23,0.88);
  box-shadow:
    0 0 0 1px rgba(245,158,11,0.55),
    0 0 0 4px rgba(245,158,11,0.1),
    0 0 18px rgba(245,158,11,0.12),
    inset 0 1px 0 rgba(245,158,11,0.08),
    inset 0 0 20px rgba(245,158,11,0.03);
}

.lf-input-icon {
  position: absolute; right: 13px; top: 50%;
  transform: translateY(-50%);
  color: rgba(245,158,11,0.24); pointer-events: none;
  transition: color 0.25s;
}
.lf-input:focus ~ .lf-input-icon { color: rgba(245,158,11,0.85); }

.lf-eye-btn {
  position: absolute; right: 12px; top: 50%;
  transform: translateY(-50%);
  background: none; border: none; cursor: pointer;
  color: rgba(245,158,11,0.24); padding: 0; line-height: 0;
  transition: color 0.2s;
}
.lf-eye-btn:hover { color: rgba(245,158,11,0.65); }

.lf-strength { display: flex; gap: 3px; margin-top: 7px; }
.lf-seg { flex: 1; height: 2px; background: rgba(245,158,11,0.08); border-radius: 1px; transition: background 0.3s; }
.lf-seg.s1 { background: #ef4444; }
.lf-seg.s2 { background: #f59e0b; }
.lf-seg.s3 { background: #10b981; }

.lf-alert {
  font-size: 9.5px; letter-spacing: 0.13em;
  padding: 10px 13px; border: 1px solid;
  border-radius: 1px;
  margin-top: 12px;
  animation: fadeUp 0.25s ease both;
}
.lf-alert--error   { color: #f87171; border-color: rgba(239,68,68,0.2); background: rgba(239,68,68,0.05); }

.lf-btn-wrap { margin-top: 8px; animation: fadeUp 0.6s 0.95s both; }

.lf-btn {
  width: 100%;
  background: transparent;
  border: 1px solid rgba(245,158,11,0.32);
  border-radius: 1px;
  color: #F59E0B;
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.38em;
  text-transform: uppercase;
  padding: 16px 24px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  display: flex; align-items: center; justify-content: center; gap: 12px;
  transition: border-color 0.3s, color 0.3s, box-shadow 0.3s;
}
.lf-btn::before {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(245,158,11,0) 0%, rgba(245,158,11,0.07) 100%);
  opacity: 0; transition: opacity 0.3s;
}
.lf-btn::after {
  content: '';
  position: absolute; bottom: 0; left: 50%; right: 50%; height: 1px;
  background: #F59E0B; transition: left 0.35s, right 0.35s;
}
.lf-btn:not(:disabled):hover { border-color: rgba(245,158,11,0.7); color: #fcd34d; box-shadow: 0 0 30px rgba(245,158,11,0.12); }
.lf-btn:not(:disabled):hover::before { opacity: 1; }
.lf-btn:not(:disabled):hover::after { left: 4%; right: 4%; }
.lf-btn:not(:disabled):active { transform: scale(0.998); }
.lf-btn:disabled { cursor: not-allowed; border-color: rgba(245,158,11,0.14); color: rgba(245,158,11,0.3); }

.lf-spin {
  width: 12px; height: 12px;
  border: 1px solid rgba(245,158,11,0.2);
  border-top-color: #F59E0B;
  border-radius: 50%;
  animation: spin 0.65s linear infinite; flex-shrink: 0;
}
@keyframes spin { to { transform: rotate(360deg); } }

.lf-card-footer {
  display: flex; align-items: center; justify-content: space-between;
  margin-top: 24px;
  animation: fadeUp 0.6s 1.05s both;
}
.lf-card-meta { font-size: 8px; letter-spacing: 0.16em; color: rgba(100,116,139,0.4); }
.lf-card-link {
  font-size: 8px; letter-spacing: 0.16em; color: rgba(245,158,11,0.38);
  background: none; border: none; cursor: pointer;
  transition: color 0.2s;
}
.lf-card-link:hover { color: rgba(245,158,11,0.72); }

.lf-right {
  flex: 1;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 60px 64px 60px 48px;
  position: relative;
}

.lf-divider-v {
  position: absolute;
  left: 0; top: 10%; bottom: 10%;
  width: 1px;
  background: linear-gradient(180deg, transparent 0%, rgba(245,158,11,0.18) 30%, rgba(245,158,11,0.18) 70%, transparent 100%);
}

.lf-hero-pre {
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.42em;
  color: rgba(245,158,11,0.5);
  text-transform: uppercase;
  margin-bottom: 20px;
  display: flex; align-items: center; gap: 12px;
  animation: fadeRight 0.8s 0.5s cubic-bezier(0.16,1,0.3,1) both;
}
@keyframes fadeRight {
  from { opacity: 0; transform: translateX(20px); }
  to   { opacity: 1; transform: translateX(0); }
}
.lf-hero-pre-line { width: 28px; height: 1px; background: rgba(245,158,11,0.35); }

.lf-hero-title {
  font-family: var(--serif);
  font-size: clamp(52px, 5.5vw, 80px);
  font-weight: 600;
  letter-spacing: 0.06em;
  line-height: 0.95;
  white-space: nowrap;
  color: transparent;
  background: linear-gradient(135deg,
    #e8dfc8 0%,
    #CBD5E1 25%,
    #f0e8d0 45%,
    #F59E0B 55%,
    #e8c87a 70%,
    #CBD5E1 85%,
    #d4cfc0 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  background-size: 200% 200%;
  animation:
    fadeRight 0.9s 0.65s cubic-bezier(0.16,1,0.3,1) both,
    shimmerFlow 8s 1.5s ease-in-out infinite alternate;
}
@keyframes shimmerFlow {
  0%   { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}

.lf-hero-sub {
  font-family: var(--display);
  font-size: clamp(14px, 1.4vw, 20px);
  font-weight: 300;
  letter-spacing: 0.35em;
  color: rgba(203,213,225,0.45);
  text-transform: uppercase;
  margin-top: 14px;
  white-space: nowrap;
  animation: fadeRight 0.8s 0.8s cubic-bezier(0.16,1,0.3,1) both;
}

.lf-hero-rule {
  width: 80px; height: 1px;
  background: linear-gradient(90deg, rgba(245,158,11,0.5), transparent);
  margin: 28px 0;
  animation: fadeRight 0.8s 0.9s both;
}

.lf-hero-desc {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.12em;
  line-height: 1.9;
  color: rgba(203,213,225,0.32);
  max-width: 380px;
  animation: fadeRight 0.8s 1s both;
}

.lf-granted {
  position: absolute; inset: 0; border-radius: 2px;
  background: rgba(8,15,35,0.96);
  backdrop-filter: blur(16px);
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 14px; z-index: 30;
  animation: fadeIn 0.4s ease both;
}
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
.lf-granted-ring {
  width: 58px; height: 58px; border-radius: 50%;
  border: 1px solid rgba(16,185,129,0.4);
  display: flex; align-items: center; justify-content: center;
  position: relative;
}
.lf-granted-ring::after {
  content: ''; position: absolute; inset: -10px;
  border: 1px solid rgba(16,185,129,0.12); border-radius: 50%;
  animation: grantPulse 1.6s ease infinite;
}
@keyframes grantPulse {
  0%,100% { transform: scale(1); opacity: 0.4; }
  50% { transform: scale(1.18); opacity: 0; }
}
.lf-granted-label { font-size: 9.5px; letter-spacing: 0.32em; color: #34d399; text-transform: uppercase; }
.lf-granted-sub { font-size: 7.5px; letter-spacing: 0.2em; color: rgba(52,211,153,0.4); }

.lf-bracket {
  position: fixed; width: 56px; height: 56px;
  z-index: 15; pointer-events: none;
  opacity: 0; animation: bIn 0.5s forwards;
}
@keyframes bIn { to { opacity: 1; } }
.b-tl { top:20px; left:20px; border-top:1px solid rgba(245,158,11,0.16); border-left:1px solid rgba(245,158,11,0.16); animation-delay:1s; }
.b-tr { top:20px; right:20px; border-top:1px solid rgba(245,158,11,0.16); border-right:1px solid rgba(245,158,11,0.16); animation-delay:1.1s; }
.b-bl { bottom:20px; left:20px; border-bottom:1px solid rgba(245,158,11,0.16); border-left:1px solid rgba(245,158,11,0.16); animation-delay:1.2s; }
.b-br { bottom:20px; right:20px; border-bottom:1px solid rgba(245,158,11,0.16); border-right:1px solid rgba(245,158,11,0.16); animation-delay:1.3s; }
`;

const IconShield = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(245,158,11,0.7)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7L12 2z"/>
    <path d="M9 12l2 2 4-4" strokeWidth="1.5"/>
  </svg>
);
const IconMail = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="1"/><polyline points="2,7 12,14 22,7"/>
  </svg>
);
const IconEye = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);
const IconEyeOff = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45(0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19M10.73 10.73a3 3 0 104.24 4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);
const IconCheck = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

function strScore(v: string) {
  if (!v) return 0;
  let s = 0;
  if (v.length >= 8) s++;
  if (/[^a-zA-Z0-9]/.test(v)) s++;
  if (v.length >= 14) s++;
  return s;
}

export default function LegalFortress() {
  const router = useRouter();
  const [vaultId, setVaultId] = useState("");
  const [passkey, setPasskey] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: string; msg: string } | null>(null);
  const [granted, setGranted] = useState(false);
  const score = strScore(passkey);

  const handleAuth = async () => {
    if (!vaultId) return setStatus({ type: "error", msg: "// ERR-401: Vault ID is required" });
    if (!vaultId.includes("@")) return setStatus({ type: "error", msg: "// ERR-400: Invalid Vault ID format" });
    if (!passkey) return setStatus({ type: "error", msg: "// ERR-401: Passkey is required" });
    
    setStatus(null); 
    setLoading(true);

    try {
      const structuralDelay = new Promise(resolve => setTimeout(resolve, 1400));
      
      const responsePromise = fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: vaultId, password: passkey }),
      });

      const [response] = await Promise.all([responsePromise, structuralDelay]);
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("fortress_token", data.access_token);
        setGranted(true);
        
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      } else {
        setStatus({ type: "error", msg: `// ${data.detail || "Authentication Failed"}` });
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setStatus({ type: "error", msg: "// ERR-500: Security server unreachable" });
      setLoading(false);
    }
  };

  const onKey = (e: React.KeyboardEvent) => { if (e.key === "Enter") handleAuth(); };

  return (
    <>
      <style>{CSS}</style>

      <div className="lf-bracket b-tl" />
      <div className="lf-bracket b-tr" />
      <div className="lf-bracket b-bl" />
      <div className="lf-bracket b-br" />

      <div className="lf-root">
        <div className="lf-aurora">
          <div className="aurora-blob blob-1" />
          <div className="aurora-blob blob-2" />
          <div className="aurora-blob blob-3" />
          <div className="aurora-blob blob-4" />
          <div className="aurora-blob blob-5" />
        </div>
        <div className="lf-grain" />
        <div className="lf-shimmer" />

        {/* ⚖️ WIDESCREEN BLENDED LADY JUSTICE ASSET */}
        <img 
          src="/justice.png" 
          alt="Lady Justice Graphic Asset" 
          className="auth-justice-bg"
          style={{ objectFit: "cover", objectPosition: "center right" }}
        />

        <div className="lf-layout">

          {/* ── LEFT: Login Card ── */}
          <div className="lf-left">
            <div className="lf-glass">
              <div className="lf-glass-topbar" />
              <div className="lf-glass-body">

                <div className="lf-card-brand">
                  <div className="lf-card-shield"><IconShield /></div>
                  <div>
                    <div className="lf-card-brand-sub">Vault Access Portal</div>
                  </div>
                </div>

                <div className="lf-div">
                  <div className="lf-div-line" />
                  <div className="lf-div-diamond" />
                  <div className="lf-div-line" />
                </div>

                <div className="lf-fields">
                  <div className="lf-field">
                    <div className="lf-field-header">
                      <label className="lf-label" htmlFor="vid">Vault ID</label>
                      <span className="lf-field-id">AUTH[0]</span>
                    </div>
                    <div className="lf-input-wrap">
                      <input id="vid" className="lf-input" type="email"
                        placeholder="counsel@fortress.law"
                        value={vaultId}
                        onChange={e => { setVaultId(e.target.value); setStatus(null); }}
                        onKeyDown={onKey}
                        autoComplete="email" spellCheck={false}
                        disabled={loading || granted}
                      />
                      <span className="lf-input-icon"><IconMail /></span>
                    </div>
                  </div>

                  <div className="lf-field">
                    <div className="lf-field-header">
                      <label className="lf-label" htmlFor="pk">Passkey</label>
                      <span className="lf-field-id">AUTH[1]</span>
                    </div>
                    <div className="lf-input-wrap">
                      <input id="pk" className="lf-input"
                        type={showPass ? "text" : "password"}
                        placeholder="••••••••••••••••"
                        value={passkey}
                        onChange={e => { setPasskey(e.target.value); setStatus(null); }}
                        onKeyDown={onKey}
                        autoComplete="current-password"
                        disabled={loading || granted}
                      />
                      <button className="lf-eye-btn" type="button"
                        onClick={() => setShowPass(p => !p)}
                        aria-label={showPass ? "Hide" : "Show"}>
                        {showPass ? <IconEyeOff /> : <IconEye />}
                      </button>
                    </div>
                    {passkey && (
                      <div className="lf-strength">
                        {[1,2,3].map(i => (
                          <div key={i} className={`lf-seg${score >= i ? ` s${Math.min(score,3)}` : ""}`} />
                        ))}
                      </div>
                    )}
                  </div>

                  {status && (
                    <div className={`lf-alert lf-alert--${status.type}`} role="alert">{status.msg}</div>
                  )}

                  <div className="lf-btn-wrap">
                    <button className="lf-btn" onClick={handleAuth}
                      disabled={loading || granted} type="button" aria-busy={loading}>
                      {loading
                        ? <><span className="lf-spin" />Verifying Heartbeat...</>
                        : <span>Authenticate</span>
                      }
                    </button>
                  </div>
                </div>

                <div className="lf-card-footer">
                  <span className="lf-card-meta">TLS 1.3 · AES-256</span>
                  <button className="lf-card-link" type="button">Reset Access</button>
                </div>
              </div>

              {granted && (
                <div className="lf-granted">
                  <div className="lf-granted-ring"><IconCheck /></div>
                  <div className="lf-granted-label">Access Granted</div>
                  <div className="lf-granted-sub">Session Established · Identity Verified</div>
                </div>
              )}
            </div>
          </div>

          {/* ── RIGHT: Branding Hero ── */}
          <div className="lf-right">
            <div className="lf-divider-v" />

            <div className="lf-hero-pre">
              <div className="lf-hero-pre-line" />
              Executive Protocol
            </div>

            <h1 className="lf-hero-title">Legal Fortress</h1>

            <div className="lf-hero-sub">Secure Document Vault</div>

            <div className="lf-hero-rule" />

            <p className="lf-hero-desc">
              Military-grade encryption for the world's<br />
              most sensitive legal documentation.<br />
              Zero-knowledge architecture. No exceptions.
            </p>
          </div>

        </div>
      </div>
    </>
  );
}