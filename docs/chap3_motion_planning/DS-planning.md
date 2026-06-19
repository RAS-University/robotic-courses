---
title: 3.3 DS-planning
parent: "Chapter 3: Motion Planning and Navigation"
nav_order: 3
layout: numbered
has_children: false
math: mathjax
chapter: 3
section: 3
---
<!-- Link external JavaScript file (root-relative so it loads on GitHub Pages and locally) -->
<script src="{{ site.baseurl }}/docs/questions.js"></script>

<style>
/* DS-planning — neutral “editorial” surfaces + single indigo accent (no gradients) */
.ds-page {
  --ds-accent: #4f46e5;
  --ds-accent-2: #6366f1;
  --ds-ink: #0f172a;
  --ds-body: #334155;
  --ds-muted: #64748b;
  --ds-line: #e2e8f0;
  --ds-surface: #fafafa;
  --ds-card: #ffffff;
  --ds-shadow: 0 4px 28px -12px rgba(15, 23, 42, 0.1);
  --ds-shadow-sm: 0 1px 2px rgba(15, 23, 42, 0.05);
  font-size: 1.0625rem;
  line-height: 1.78;
  color: var(--ds-body);
  letter-spacing: 0.011em;
  font-feature-settings: "kern" 1, "liga" 1;
}
/* Opening narrative — storytelling frame (flat background, no gradients) */
.ds-chapter-story {
  margin: 0 0 1.5rem;
  padding: 1.2rem 1.4rem 1.35rem;
  border-radius: 14px;
  border: 1px solid #e2e8f0;
  border-left: 4px solid #6366f1;
  background: #f8fafc;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.06);
}
.ds-story-lead {
  font-size: 1.06rem;
  line-height: 1.62;
  color: var(--ds-ink);
  margin: 0 0 0.9rem;
  font-weight: 600;
  letter-spacing: -0.02em;
}
.ds-chapter-story .ds-story-body {
  font-family: Georgia, "Iowan Old Style", "Times New Roman", serif;
  font-size: 1.03rem;
  line-height: 1.75;
  color: #475569;
  margin: 0 0 0.85rem;
}
.ds-chapter-story .ds-story-body:last-child { margin-bottom: 0; }
.ds-study-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.35rem 0.75rem;
  margin: 0 0 1rem;
  padding: 0.65rem 0.95rem;
  font-size: 0.84rem;
  color: var(--ds-muted);
  line-height: 1.5;
  background: #fff;
  border: 1px solid var(--ds-line);
  border-radius: 10px;
}
.ds-study-meta .ds-meta-tag {
  display: inline-block;
  padding: 0.15rem 0.5rem;
  border-radius: 6px;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  background: #eef2ff;
  color: #4338ca;
}
.ds-page h1 {
  font-size: clamp(1.55rem, 3.2vw, 2.05rem);
  font-weight: 750;
  letter-spacing: -0.03em;
  line-height: 1.2;
  margin: 0.5rem 0 1rem;
  padding: 1.25rem 1.4rem;
  border-radius: 12px;
  background: var(--ds-card);
  border: 1px solid var(--ds-line);
  border-left: 4px solid var(--ds-accent);
  box-shadow: var(--ds-shadow-sm);
  color: var(--ds-ink);
}
.ds-page h2 {
  margin-top: 2.75rem;
  margin-bottom: 1rem;
  padding: 0.55rem 0.95rem 0.6rem;
  border-left: 5px solid #4f46e5;
  margin-left: 0;
  font-weight: 760;
  font-size: 1.2rem;
  color: var(--ds-ink);
  background: #eef2ff;
  border-radius: 0 10px 10px 0;
}
.ds-page h3 {
  margin-top: 2rem;
  margin-bottom: 0.7rem;
  font-weight: 720;
  font-size: 1.08rem;
  color: #3730a3;
  padding: 0.28rem 0.58rem;
  border-left: none;
  background: #eef2ff;
  border-radius: 6px;
  letter-spacing: -0.02em;
}
.ds-page h4 {
  margin-top: 1.5rem;
  margin-bottom: 0.6rem;
  color: #1d4ed8;
  font-weight: 700;
  font-size: 1.03rem;
  padding: 0.24rem 0.52rem;
  border-left: none;
  background: #eff6ff;
  border-radius: 6px;
  border-bottom: none;
}
.ds-page h5 {
  margin-top: 1.3rem;
  margin-bottom: 0.5rem;
  color: #1d4ed8;
  font-weight: 700;
  font-size: 0.98rem;
  padding: 0.2rem 0.45rem;
  border-left: none;
  background: #eff6ff;
  border-radius: 6px;
}
.main-content .ds-page h5,
.main-content .ds-page h5 a {
  color: #1d4ed8 !important;
  background: #eff6ff !important;
}
.main-content .ds-page .note h5,
.main-content .ds-page .note h5 a {
  color: inherit !important;
  background: transparent !important;
  padding: 0 !important;
}
.ds-page h2::before,
.ds-page h3::before,
.ds-page h4::before,
.ds-page h5::before {
  display: inline-block;
  margin-right: 0.5rem;
  padding: 0.1rem 0.45rem;
  border-radius: 999px;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  vertical-align: middle;
}
.ds-page h2::before {
  content: "PARTIE";
  color: #3730a3;
  background: #dbeafe;
}
.ds-page h3::before,
.ds-page h4::before,
.ds-page h5::before {
  content: none;
}
.ds-page p { margin: 0.9rem 0; }
.ds-page ul li, .ds-page ol li { margin: 0.45rem 0; }
.ds-page ul { padding-left: 1.25rem; }
.ds-page a { color: #4338ca; text-underline-offset: 3px; font-weight: 500; }
.ds-page a:hover { color: #312e81; }
.ds-page .definition,
.ds-page .note {
  margin: 1rem 0 !important;
  padding: 1rem 1rem 0.9rem !important;
  border-left: 6px solid !important;
  border-radius: 0 10px 10px 0 !important;
  box-shadow: 0 1px 4px rgba(15, 23, 42, 0.06) !important;
}
.ds-page .definition {
  background: #0ea5e90d !important;
  border-left-color: #0ea5e9 !important;
}
.ds-page .note {
  background: #e9990e0d !important;
  border-left-color: #e9620e !important;
}
.ds-page .definition::before,
.ds-page .note::before {
  display: inline-block !important;
  margin-bottom: 0.7rem !important;
  padding: 0.22rem 0.65rem !important;
  border-radius: 999px !important;
  font-size: 0.98rem !important;
  font-weight: 800 !important;
  letter-spacing: 0.04em !important;
  line-height: 1.2 !important;
}
.ds-page .definition::before {
  content: "DEFINITION";
  color: #0c4a6e;
  background: #bae6fd;
}
.ds-page .note::before {
  content: "NOTE";
  color: #7c2d12;
  background: #fed7aa;
}
.ds-page hr {
  border: 0;
  height: 1px;
  margin: 2.5rem 0;
  background: #e2e8f0;
  opacity: 1;
}
.ds-page figure {
  margin: 1.85rem auto;
  max-width: 100%;
  padding: 1rem;
  border-radius: 12px;
  background: var(--ds-card);
  border: 1px solid var(--ds-line);
  box-shadow: var(--ds-shadow-sm);
}
.ds-page figure img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  display: block;
}
.ds-page figcaption {
  margin-top: 0.85rem;
  font-size: 0.875rem;
  line-height: 1.55;
  color: var(--ds-muted);
  text-align: center;
}
/* Collapsible exercises — clean card */
.ds-page details:not(.ds-learn-break) {
  margin: 1.35rem 0;
  border-radius: 12px;
  border: 1px solid var(--ds-line);
  background: var(--ds-card);
  overflow: hidden;
  box-shadow: var(--ds-shadow-sm);
}
.ds-page details:not(.ds-learn-break) summary {
  padding: 0.9rem 1.15rem;
  cursor: pointer;
  font-weight: 650;
  color: var(--ds-ink);
  background: var(--ds-surface);
  border-bottom: 1px solid transparent;
  list-style: none;
}
.ds-page details:not(.ds-learn-break)[open] summary {
  border-bottom-color: var(--ds-line);
}
.ds-page details:not(.ds-learn-break) summary::-webkit-details-marker { display: none; }
.ds-page details:not(.ds-learn-break) { padding-bottom: 0.35rem; }
/* Algorithm boxes */
.ds-page .algo-box {
  margin: 1.35rem 0 !important;
  border: 1px solid var(--ds-line) !important;
  border-radius: 12px !important;
  padding: 1.15rem 1.35rem !important;
  background: var(--ds-surface) !important;
  box-shadow: var(--ds-shadow-sm) !important;
}
.ds-page .algo-box .title { color: var(--ds-ink) !important; font-size: 1rem !important; font-weight: 650 !important; }
.ds-page .algo-box .kw { font-weight: 600 !important; }
/* Drag-and-drop */
.ds-page .ds-drag-game {
  margin: 1rem 0 1.25rem;
  padding: 1.15rem 1.2rem 1.2rem;
  border-radius: 12px;
  border: 1px solid var(--ds-line);
  background: var(--ds-surface);
}
.ds-page .ds-drag-hint {
  margin: 0 0 1.1rem;
  font-size: 0.94rem;
  color: var(--ds-muted);
  line-height: 1.55;
}
.ds-page .ds-drag-columns {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.35rem;
}
@media (min-width: 720px) {
  .ds-page .ds-drag-columns {
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
}
.ds-page .ds-drag-label {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--ds-muted);
  margin-bottom: 0.5rem;
}
.ds-page .ds-drop-title {
  margin: 0 0 0.5rem;
  font-size: 1rem;
  font-weight: 650;
  color: var(--ds-ink);
}
.ds-page .ds-drop-placeholder {
  margin: 0;
  font-size: 0.875rem;
  color: #94a3b8;
  font-style: italic;
}
.ds-page .drop-zone:has(.drag-item) .ds-drop-placeholder {
  display: none;
}
.ds-page .drop-zone {
  border-radius: 10px !important;
  border: 2px dashed #cbd5e1 !important;
  background: var(--ds-card) !important;
  box-shadow: inset 0 1px 2px rgba(15, 23, 42, 0.04);
  min-height: 200px;
  padding: 0.9rem 1rem 1rem !important;
  transition: border-color 0.15s ease, background-color 0.15s ease, box-shadow 0.15s ease;
}
.ds-page .drop-zone.drop-zone--drag-over {
  border-color: var(--ds-accent) !important;
  background: #f5f3ff !important;
  box-shadow: inset 0 0 0 1px rgba(79, 70, 229, 0.2);
}
.ds-page .drop-zone.drop-zone--ok {
  border-style: solid !important;
  border-color: #10b981 !important;
  background: #ecfdf5 !important;
}
.ds-page .drop-zone.drop-zone--bad {
  border-style: solid !important;
  border-color: #f87171 !important;
  background: #fef2f2 !important;
}
.ds-page .ds-drag-pool {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  align-content: flex-start;
  min-height: 120px;
  padding: 0.5rem 0 0;
}
.ds-page .drag-item {
  border-radius: 8px !important;
  border: 1px solid var(--ds-line) !important;
  background: var(--ds-card) !important;
  box-shadow: var(--ds-shadow-sm);
  transition: transform 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease, border-color 0.15s ease;
  padding: 0.55rem 0.8rem !important;
  cursor: grab;
  max-width: 100%;
  font-size: 0.92rem;
  color: var(--ds-ink);
}
.ds-page .drag-item:active {
  cursor: grabbing;
}
.ds-page .drag-item.drag-item--dragging {
  opacity: 0.92;
  transform: scale(1.02);
  box-shadow: var(--ds-shadow);
  z-index: 3;
  border-color: #c7d2fe !important;
}
.ds-page .drag-item.drag-item--wrong-zone {
  border-color: #fca5a5 !important;
  background: #fef2f2 !important;
}
.ds-page .drag-item.drag-item--correct {
  border-color: #6ee7b7 !important;
  background: #ecfdf5 !important;
}
.ds-page .drag-item:hover {
  transform: translateY(-2px);
  border-color: #c7d2fe !important;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);
}
.ds-page .check-button {
  margin-top: 1rem;
  padding: 0.55rem 1.25rem !important;
  border-radius: 8px !important;
  border: 1px solid var(--ds-accent) !important;
  background: var(--ds-card) !important;
  font-weight: 600 !important;
  color: var(--ds-accent) !important;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease, box-shadow 0.15s ease;
}
.ds-page .check-button:hover {
  background: var(--ds-accent) !important;
  color: #fff !important;
  box-shadow: 0 2px 8px rgba(79, 70, 229, 0.35);
}
.ds-page .feedback {
  margin-top: 0.85rem;
  font-size: 0.94rem;
  line-height: 1.5;
}
.ds-learn-break {
  margin: 1.85rem 0;
  border: 1px solid var(--ds-line);
  border-left: 3px solid var(--ds-accent);
  border-radius: 12px;
  padding: 0.75rem 1.2rem 1rem;
  background: var(--ds-card);
  box-shadow: var(--ds-shadow-sm);
  transition: box-shadow 0.2s ease, border-color 0.2s ease;
}
.ds-learn-break:hover {
  box-shadow: var(--ds-shadow);
}
.ds-learn-break summary {
  cursor: pointer;
  font-weight: 650;
  color: var(--ds-ink);
  font-size: 1.03rem;
  padding: 0.25rem 0;
  transition: color 0.15s ease;
}
.ds-learn-break summary:hover {
  color: var(--ds-accent);
}
.ds-learn-break summary:focus-visible {
  outline: 2px solid var(--ds-accent-2);
  outline-offset: 3px;
  border-radius: 4px;
}
.ds-learn-break[open] {
  border-color: #cbd5e1;
  border-left-color: var(--ds-accent);
  background: var(--ds-card);
}
.ds-quiz {
  margin-top: 1rem;
  padding: 1.1rem 1.2rem 1.2rem;
  border-radius: 10px;
  border: 1px solid var(--ds-line);
  border-top: 3px solid var(--ds-accent-2);
  box-shadow: var(--ds-shadow-sm);
  background: var(--ds-card);
}
.ds-quiz p:first-child { margin-top: 0; }
.ds-quiz form {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.ds-quiz .ds-multi-caption {
  font-size: 0.88rem;
  color: var(--ds-muted);
  margin: 0 0 0.4rem;
  line-height: 1.5;
}
.ds-quiz .ds-choice input[type="checkbox"] {
  margin-top: 0.3rem;
  flex-shrink: 0;
  accent-color: var(--ds-accent);
}
.ds-quiz .ds-quiz-actions {
  margin-top: 0.65rem;
}
.ds-quiz button[type="button"] {
  padding: 0.5rem 1.2rem;
  border-radius: 8px;
  border: 1px solid var(--ds-accent);
  background: var(--ds-card);
  color: var(--ds-accent);
  cursor: pointer;
  font-weight: 600;
  font-size: 0.92rem;
  transition: background 0.15s ease, color 0.15s ease, box-shadow 0.15s ease;
}
.ds-quiz button[type="button"]:hover {
  background: var(--ds-accent);
  color: #fff;
  box-shadow: 0 2px 8px rgba(79, 70, 229, 0.3);
}
.ds-page .ds-quiz .ds-feedback {
  margin-top: 0.7rem;
}
/* Section markers */
.ds-addon-label {
  display: inline-block;
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-weight: 700;
  color: var(--ds-muted);
  margin: 1.75rem 0 0.55rem;
  padding: 0.35rem 0.8rem;
  border-radius: 6px;
  background: var(--ds-surface);
  border: 1px solid var(--ds-line);
}
/* Tutorial embed */
.ds-tutor-panel {
  max-width: 100%;
  width: 100%;
  margin: 1.15rem 0 1.6rem;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--ds-line);
  box-shadow: var(--ds-shadow);
  background: var(--ds-card);
}
.ds-tutor-panel .ds-tutor-head {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.1rem;
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--ds-ink);
  background: var(--ds-surface);
  border-bottom: 1px solid var(--ds-line);
}
.ds-tutor-panel .ds-tutor-head span {
  font-size: 0.72rem;
  font-weight: 500;
  color: var(--ds-muted);
}
.ds-tutor-panel iframe {
  display: block;
  width: 100%;
  height: 1600px;
  min-height: 1100px;
  border: 0;
  background: #fff;
}
.ds-tutor-panel .ds-tutor-foot {
  padding: 0.65rem 1rem 0.85rem;
  font-size: 0.8rem;
  color: var(--ds-muted);
  text-align: center;
  background: var(--ds-surface);
  border-top: 1px solid var(--ds-line);
}
.ds-tutor-panel .ds-tutor-foot a {
  color: var(--ds-accent);
  font-weight: 600;
  text-decoration: none;
}
.ds-tutor-panel .ds-tutor-foot a:hover { text-decoration: underline; }

/* Scientific assistant: white background card */
.ds-scientist-walker {
  position: fixed;
  right: 1.1rem;
  bottom: 1rem;
  z-index: 56;
  width: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: auto;
  background: transparent;
  border: 0;
  border-radius: 0;
  padding: 0;
  box-shadow: none;
  animation: dsAssistantIdleDrift 3.6s ease-in-out infinite;
  overflow: visible;
  transform-origin: 90% 100%;
}
.ds-scientist-walker::after {
  content: "";
  position: absolute;
  inset: -8px;
  border-radius: 22px;
  border: 2px solid rgba(59, 130, 246, 0.45);
  opacity: 0;
  pointer-events: none;
  transform: scale(0.9);
}
.ds-scientist-photo {
  width: 260px !important;
  height: 260px !important;
  object-fit: contain;
  object-position: center bottom;
  border-radius: 0;
  cursor: pointer;
  background: transparent;
  border: 0;
  box-shadow: none;
  transition: transform 0.15s ease, box-shadow 0.15s ease, filter 0.2s ease;
  animation: dsScientistAliveLoop 3.4s ease-in-out infinite !important;
}
.ds-scientist-photo:hover {
  transform: translateY(-4px) scale(1.035);
  box-shadow: none;
}
.ds-scientist-photo:focus-visible {
  outline: 3px solid rgba(37, 99, 235, 0.55);
  outline-offset: 3px;
}
.ds-scientist-walker.is-walking {
  animation: dsAssistantWalking 0.7s ease-in-out 1;
}
.ds-scientist-walker.is-react .ds-scientist-photo {
  animation: dsScientistReact 0.4s ease-in-out 2;
}
.ds-scientist-walker.is-greeting .ds-scientist-photo {
  animation: dsScientistHello 2s ease-in-out 1;
}
.ds-scientist-walker.is-startup::after {
  animation: dsMotivatePulse 1.2s ease-out 2;
}
.ds-scientist-walker.is-highfive .ds-scientist-photo {
  animation: dsScientistHighFive 0.9s cubic-bezier(0.22, 0.9, 0.2, 1) 1;
}
.ds-scientist-walker.is-curious .ds-scientist-photo {
  filter: saturate(1.1) brightness(1.04);
}
@keyframes dsAssistantIdleDrift {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-2px); }
}
@keyframes dsAssistantWalking {
  0% { transform: translateX(0); }
  30% { transform: translateX(-12px); }
  60% { transform: translateX(0); }
  100% { transform: translateX(-6px); }
}
@keyframes dsScientistReact {
  0%   { transform: translateY(0) rotate(0deg) scale(1); }
  35%  { transform: translateY(-10px) rotate(-6deg) scale(1.06); }
  70%  { transform: translateY(-2px) rotate(5deg) scale(1.03); }
  100% { transform: translateY(0) rotate(0deg) scale(1); }
}
@keyframes dsScientistAliveLoop {
  0%, 100% { transform: translateY(0) rotate(0deg) scale(1); filter: saturate(1); }
  30% { transform: translateY(-3px) rotate(-0.9deg) scale(1.012); filter: saturate(1.03); }
  55% { transform: translateY(-1px) rotate(0.7deg) scale(1.008); filter: saturate(1.04); }
  80% { transform: translateY(-2px) rotate(-0.5deg) scale(1.01); filter: saturate(1.03); }
}
@keyframes dsScientistHello {
  0%   { transform: translateY(0) rotate(0deg) scale(1); }
  18%  { transform: translateY(-8px) rotate(-7deg) scale(1.05); }
  35%  { transform: translateY(-6px) rotate(8deg) scale(1.05); }
  52%  { transform: translateY(-8px) rotate(-6deg) scale(1.05); }
  70%  { transform: translateY(-4px) rotate(5deg) scale(1.03); }
  100% { transform: translateY(0) rotate(0deg) scale(1); }
}
@keyframes dsMotivatePulse {
  0%   { opacity: 0; transform: scale(0.9); }
  35%  { opacity: 0.85; transform: scale(1.06); }
  100% { opacity: 0; transform: scale(1.2); }
}
@keyframes dsScientistHighFive {
  0%   { transform: translateY(0) scale(1); }
  18%  { transform: translateY(8px) scale(0.97) rotate(0deg); }
  46%  { transform: translateY(-56px) translateX(-12px) scale(1.08) rotate(-13deg); }
  74%  { transform: translateY(-16px) translateX(-4px) scale(1.03) rotate(-6deg); }
  100% { transform: translateY(0) scale(1); }
}
@media (max-width: 860px) {
  .ds-scientist-walker {
    right: 0.5rem;
    bottom: 0.5rem;
    padding: 0.45rem 0.48rem 0.4rem;
  }
  .ds-scientist-photo {
    width: 190px !important;
    height: 190px !important;
  }
}

/* Page toolbar: progress + random jump (sticky while scrolling) */
.ds-interactive-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  gap: 1rem 1.25rem;
  margin: 1.15rem 0 1.4rem;
  padding: 1rem 1.15rem;
  border-radius: 12px;
  border: 1px solid var(--ds-line);
  background: var(--ds-surface);
  box-shadow: var(--ds-shadow-sm);
  position: sticky;
  top: 0.75rem;
  z-index: 40;
  backdrop-filter: blur(8px);
}
.ds-study-tips.ds-learn-break { margin: 0 0 1.25rem; }
.ds-study-tips .ds-study-tips-intro {
  margin: 0 0 0.65rem;
  font-size: 0.9rem;
  line-height: 1.55;
  color: #64748b;
  font-style: italic;
}
.ds-study-tips .ds-study-tips-list {
  margin: 0.5rem 0 0;
  padding-left: 1.2rem;
  font-size: 0.9rem;
  color: var(--ds-body);
  line-height: 1.55;
}
.ds-section-game {
  margin: 1rem 0 1.35rem;
  padding: 0.9rem 1rem 0.8rem;
  border: 3px dashed #60a5fa;
  border-radius: 14px;
  background: #eff6ff;
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.15);
}
.ds-section-game .ds-addon-label {
  margin: 0 0 0.4rem;
  color: #1e40af;
  background: #dbeafe;
  border-color: #93c5fd;
  font-size: 0.78rem;
  letter-spacing: 0.06em;
}
.ds-section-game > p strong {
  color: #1e3a8a;
}
.ds-quiz-reveal-btn {
  margin-left: 0.45rem;
  padding: 0.16rem 0.5rem;
  font-size: 0.74rem;
}
.ds-quiz-answer {
  margin-left: 0.45rem;
  display: inline-block;
  padding: 0.1rem 0.42rem;
  border-radius: 999px;
  font-size: 0.74rem;
  font-weight: 700;
  color: #1e3a8a;
  background: #dbeafe;
  border: 1px solid #bfdbfe;
}
.ds-quiz-step-hidden { display: none; }
.ds-goodjob-toast {
  position: fixed;
  left: 50%;
  top: 18%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  padding: 0.75rem 1.1rem;
  border-radius: 12px;
  background: #16a34a;
  color: #fff;
  font-weight: 800;
  letter-spacing: 0.02em;
  box-shadow: 0 10px 24px rgba(22, 163, 74, 0.35);
  animation: dsToastPop 0.9s ease-out 1;
  pointer-events: none;
}
.ds-assistant-fallback-toast {
  position: fixed;
  right: 1rem;
  bottom: 18rem;
  z-index: 9999;
  padding: 0.5rem 0.7rem;
  border-radius: 10px;
  border: 1px solid #cbd5e1;
  background: #ffffff;
  color: #0f172a;
  font-size: 0.8rem;
  font-weight: 700;
  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.18);
  animation: dsToastPop 0.9s ease-out 1;
  pointer-events: none;
}
.ds-assistant-speech {
  position: absolute;
  right: calc(100% + 0.55rem);
  bottom: 52%;
  max-width: 230px;
  padding: 0.5rem 0.65rem;
  border-radius: 12px;
  background: #ffffff;
  border: 1px solid #cbd5e1;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.16);
  color: #0f172a;
  font-size: 0.82rem;
  font-weight: 700;
  line-height: 1.25;
  opacity: 0;
  transform: translateY(6px) scale(0.96);
  transition: opacity 0.18s ease, transform 0.18s ease;
  pointer-events: none;
}
.ds-assistant-speech::after {
  content: "";
  position: absolute;
  right: -7px;
  bottom: 16px;
  width: 12px;
  height: 12px;
  background: #ffffff;
  border-top: 1px solid #cbd5e1;
  border-right: 1px solid #cbd5e1;
  transform: rotate(45deg);
}
.ds-assistant-speech.is-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}
.ds-assistant-speech.is-success {
  border-color: #86efac;
  background: #f0fdf4;
  color: #166534;
}
.ds-assistant-speech.is-error {
  border-color: #fecaca;
  background: #fef2f2;
  color: #991b1b;
}
@keyframes dsToastPop {
  0% { opacity: 0; transform: translate(-50%, -40%) scale(0.86); }
  20% { opacity: 1; transform: translate(-50%, -50%) scale(1.03); }
  100% { opacity: 0; transform: translate(-50%, -64%) scale(1); }
}
.ds-toolbar-btn.ds-toolbar-btn--ghost {
  border-color: var(--ds-line);
  color: var(--ds-muted);
  background: transparent;
  font-weight: 500;
  font-size: 0.82rem;
}
.ds-toolbar-btn.ds-toolbar-btn--ghost:hover {
  border-color: #cbd5e1;
  color: var(--ds-ink);
  background: var(--ds-card);
}
.ds-page h2,
.ds-page h3,
.ds-page h4,
.ds-page h5 {
  scroll-margin-top: 5.5rem;
}
.ds-progress-block { flex: 1 1 220px; min-width: 200px; }
.ds-progress-head {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--ds-muted);
  margin-bottom: 0.45rem;
}
.ds-progress-track {
  height: 8px;
  border-radius: 999px;
  background: #e2e8f0;
  overflow: hidden;
  border: 1px solid var(--ds-line);
}
.ds-progress-bar {
  height: 100%;
  width: 0%;
  background: var(--ds-accent);
  transition: width 0.35s ease;
  border-radius: 999px;
}
.ds-progress-label { margin: 0.45rem 0 0; font-size: 0.85rem; color: var(--ds-muted); }
.ds-toolbar-actions { display: flex; align-items: center; flex-wrap: wrap; gap: 0.5rem; }
.ds-toolbar-btn {
  padding: 0.55rem 1.1rem;
  border-radius: 8px;
  border: 1px solid var(--ds-accent);
  background: var(--ds-card);
  color: var(--ds-accent);
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
}
.ds-toolbar-btn:hover { background: var(--ds-accent); color: #fff; }
.ds-highlight-flash { animation: dsFlashOutline 1.2s ease-out; }
@keyframes dsFlashOutline {
  0% { outline: 3px solid var(--ds-accent); outline-offset: 4px; }
  100% { outline: 3px solid transparent; outline-offset: 8px; }
}
.ds-term-explorer { display: grid; gap: 0.5rem; margin-top: 0.75rem; }
.ds-term-acc {
  border: 1px solid var(--ds-line);
  border-radius: 8px;
  padding: 0.35rem 0.8rem;
  background: var(--ds-card);
}
.ds-term-acc summary { cursor: pointer; font-weight: 600; font-size: 0.95rem; }
.ds-term-acc[open] { border-color: #c7d2fe; }
.ds-reveal-panel { margin-top: 0.5rem; padding: 0.75rem 1rem; border-radius: 8px; border: 1px dashed var(--ds-line); background: #fff; font-size: 0.92rem; line-height: 1.5; }

/* Table of contents — same visual family as .ds-learn-break, calmer typography */
.ds-toc-panel.ds-learn-break {
  margin: 0 0 1.35rem;
}
.ds-toc-panel .ds-toc-caption {
  margin: 0 0 0.65rem;
  font-size: 0.87rem;
  color: var(--ds-muted);
  line-height: 1.45;
}
.ds-toc-panel .ds-markdown-toc {
  margin: 0;
  padding: 0;
  border: 0;
}
.ds-toc-panel #markdown-toc {
  margin: 0;
  padding: 0.5rem 0 0.15rem;
  padding-left: 0.5rem;
  max-height: min(52vh, 20rem);
  overflow: auto;
  font-size: 0.895rem;
  line-height: 1.55;
  list-style: none;
}
.ds-toc-panel #markdown-toc ul {
  margin: 0.15rem 0 0.15rem 0.5rem;
  padding-left: 0.85rem;
  border-left: 1px solid #e8ecf1;
  list-style: none;
}
.ds-toc-panel #markdown-toc li {
  margin: 0.18rem 0;
  position: relative;
}
.ds-toc-panel #markdown-toc > li {
  margin: 0.35rem 0;
}
.ds-toc-panel #markdown-toc a {
  color: #475569;
  font-weight: 400;
  text-decoration: none;
  border-radius: 4px;
  padding: 0.1rem 0.15rem;
  margin: 0 -0.15rem;
  transition: color 0.12s ease, background 0.12s ease;
}
.ds-toc-panel #markdown-toc > li > a {
  color: var(--ds-ink);
  font-weight: 600;
  font-size: 0.92rem;
}
.ds-toc-panel #markdown-toc a:hover {
  color: var(--ds-accent);
  background: rgba(79, 70, 229, 0.06);
}
.ds-toc-panel #markdown-toc a:focus-visible {
  outline: 2px solid var(--ds-accent-2);
  outline-offset: 2px;
}
.ds-toc-panel #markdown-toc .ds-toc-emoji {
  display: inline-block;
  margin-right: 0.15em;
  font-style: normal;
  line-height: 1;
  opacity: 0.95;
}

/* Icons before main headings (uses kramdown-generated ids) */
.ds-page h2#prerequisites::before { content: "📋 "; }
.ds-page h2#general-motivation::before { content: "💡 "; }
.ds-page h2#course-content::before { content: "📚 "; }
.ds-page h2#credits::before { content: "✨ "; }
.ds-page h2#references::before { content: "🔗 "; }
.ds-page h3#dynamical-systemsbased-planning-overview::before { content: "📖 "; }
.ds-page h3#stability::before { content: "⚖️ "; }
.ds-page h3#diffeomorphic-mapping-for-ds::before { content: "🔀 "; }
.ds-page h3#state-of-the-art-approaches-to-training-the-mapping::before { content: "🚀 "; }
.ds-page h3#programming-exercise-for-classical-methods::before { content: "🧪 "; }
.ds-page h3#want-to-implement-a-real-project::before { content: "🛠️ "; }
.ds-page h2::before, .ds-page h3#dynamical-systemsbased-planning-overview::before,
.ds-page h3#stability::before, .ds-page h3#diffeomorphic-mapping-for-ds::before,
.ds-page h3#state-of-the-art-approaches-to-training-the-mapping::before,
.ds-page h3#programming-exercise-for-classical-methods::before,
.ds-page h3#want-to-implement-a-real-project::before {
  font-style: normal;
  margin-right: 0.15em;
}
</style>

<div class="ds-page" markdown="1" data-ds-storage-key="ds-planning-ch3">

# Dynamical-Systems-Based Planning {#start}

<div class="ds-scientist-walker" id="ds-scientist-guide" markdown="0" aria-live="polite">
  <img id="ds-scientist-assistant" class="ds-scientist-photo" src="{{ site.baseurl }}/assets/images/characters/scientist_assistant.svg?v=20260611-1620" alt="Scientific assistant" role="button" tabindex="0" />
</div>

<details markdown="1" class="ds-learn-break ds-toc-panel" open id="on-this-page">
<summary><strong>On this page</strong></summary>

<p class="ds-toc-caption">Your map through the chapter — icons echo the topic of each section.</p>

<div class="ds-markdown-toc" markdown="1">

* Table of Contents
{:toc}

</div>
</details>

<p class="ds-study-meta" markdown="0"><span class="ds-meta-tag">Pace</span> <span>About <strong>40–55 min</strong> to read the core text; plan more for quizzes and drag-and-drop.</span> <span class="ds-meta-tag">Session</span> <span>Progress is kept in this browser tab until you close it.</span></p>

<details markdown="1" class="ds-learn-break ds-study-tips">
<summary><strong>Study tips</strong> (optional)</summary>
<div class="note" markdown="1">
<p class="ds-study-tips-intro">Optional notes on how the page is laid out.</p>
<ol class="ds-study-tips-list">
<li>Outline at the top; sticky <strong>activity bar</strong> while scrolling.</li>
<li><strong>Quick check-in</strong> boxes sit next to the paragraphs they refer to.</li>
<li><strong>Reset progress</strong> clears saved activity in this tab and reloads.</li>
</ol>
</div>
</details>

## Prerequisites
* Basic knowledge of dynamical systems (DS)
* Control theory, system stability
* Diffeomorphic mapping

## General Motivation
![Overview](https://www.youtube.com/watch?v=7fKLhzgeBac&ab_channel=LASA)

In **trajectory planning** problems, the robot’s objective is to generate smooth, stable, and goal-directed motions that can adapt to changes in the environment or task — beyond simply following a fixed path. This is where **dynamical systems (DS)** offer a powerful framework: instead of relying on time-parameterized trajectories, DS-based approaches define a continuous vector field that governs the robot’s motion toward a target.

While the idea of using DS may appear conceptually simple, it provides a flexible and reactive foundation for robot motion generation. A key advantage lies in its ability to generalize to different start positions, adapt online to perturbations, and naturally handle convergence, stability, and obstacle avoidance within a unified structure.

This is why, in recent years, dynamical system-based methods have gained prominence in robotic motion planning and control, particularly in scenarios requiring real-time adaptation. In industrial robotics, DS approaches have been successfully applied to tasks such as surface finishing, spraying, and assembly, where motion must adapt to variations in the environment. In physical human-robot interaction, DS frameworks also enable robots to generate compliant and predictable motions that respond continuously to human inputs — making shared control and learning from demonstration both efficient and intuitive.

<script>
document.addEventListener("DOMContentLoaded", function () {
  // Remove old quiz blocks and keep only the new section-based question bank.
  const oldDetailsKeywords = [
    "Quick check",
    "Level up",
    "Go deeper",
    "Wrap up",
    "Interactive toolkit"
  ];
  document.querySelectorAll("details.ds-learn-break").forEach((panel) => {
    const summary = panel.querySelector("summary");
    const text = summary ? summary.textContent.trim() : "";
    if (oldDetailsKeywords.some((k) => text.includes(k))) {
      const prev = panel.previousElementSibling;
      if (prev && prev.classList && prev.classList.contains("ds-addon-label")) prev.remove();
      panel.remove();
    }
  });

  // Remove standalone legacy check blocks (drag/drop + feedback leftovers).
  document.querySelectorAll("button.check-button").forEach((btn) => {
    const click = btn.getAttribute("onclick") || "";
    if (click.includes("checkDragDropAnswer") || click.includes("checkDropdownAnswers")) {
      const feedback = btn.nextElementSibling;
      if (feedback && feedback.classList && feedback.classList.contains("feedback")) feedback.remove();
      btn.remove();
    }
  });
  document.querySelectorAll(".ds-drag-game").forEach((el) => el.remove());

  const scientist = document.getElementById("ds-scientist-assistant");
  const guide = document.getElementById("ds-scientist-guide");
  if (!scientist || !guide) return;

  const speech = document.createElement("div");
  speech.className = "ds-assistant-speech";
  guide.appendChild(speech);
  let speechTimer = null;
  window.dsAssistantSpeak = function (message, tone) {
    speech.textContent = message;
    speech.classList.remove("is-success", "is-error", "is-visible");
    if (tone === "success") speech.classList.add("is-success");
    else if (tone === "error") speech.classList.add("is-error");
    void speech.offsetWidth;
    speech.classList.add("is-visible");
    if (speechTimer) window.clearTimeout(speechTimer);
    speechTimer = window.setTimeout(() => {
      speech.classList.remove("is-visible");
    }, 1500);
  };

  scientist.title = "Science assistant - click to see your progress";
  scientist.setAttribute("aria-label", "Science assistant. Click to open the progress tracker.");

  // Wave with hand on page open.
  guide.classList.add("is-startup");
  guide.classList.add("is-greeting");
  window.setTimeout(() => {
    guide.classList.remove("is-startup");
    guide.classList.remove("is-greeting");
  }, 2000);

  // React animation on scientist click (the actual click handler is wired by
  // /assets/js/ds-scientist-panel.js to avoid kramdown mangling inline JS).
  scientist.addEventListener("click", function () {
    guide.classList.remove("is-startup");
    guide.classList.remove("is-greeting");
    guide.classList.remove("is-react");
    void guide.offsetWidth;
    guide.classList.add("is-react");
    window.setTimeout(function () { guide.classList.remove("is-react"); }, 700);
  });

  // Simple scroll response.
  let lastY = window.scrollY;
  window.addEventListener("scroll", function () {
    const delta = Math.abs(window.scrollY - lastY);
    lastY = window.scrollY;
    if (delta > 2) {
      guide.classList.remove("is-walking");
      void guide.offsetWidth;
      guide.classList.add("is-walking");
      window.setTimeout(() => guide.classList.remove("is-walking"), 450);
    }
  }, { passive: true });

  // High-five style tap up on each correct answer.
  window.addEventListener("ds-correct-answer", function () {
    guide.classList.remove("is-highfive");
    void guide.offsetWidth;
    guide.classList.add("is-highfive");
    window.setTimeout(() => guide.classList.remove("is-highfive"), 900);
  });

});
</script>

<script src="{{ site.baseurl }}/assets/js/ds-scientist-panel.js?v=20260612-1144"></script>

<script>
document.addEventListener("DOMContentLoaded", function () {
  const sectionQuizBank = {
    "General Motivation": [
      { q: "What is the main goal of trajectory planning in robotics according to the text?", opts: ["Minimize computation time","Follow a predefined trajectory exactly","Generate smooth, stable, goal-directed, and adaptive motions","Avoid using control theory"], a: 2 },
      { q: "How do dynamical systems represent motion?", opts: ["As discrete waypoints","As time-indexed trajectories","As a continuous vector field","As a static function"], a: 2 },
      { q: "Which capability is NOT explicitly mentioned as an advantage of DS-based approaches?", opts: ["Generalization to new start positions","Online adaptation to perturbations","Exact trajectory replay","Natural handling of convergence"], a: 2 },
      { q: "In which context are DS particularly useful for human-robot interaction?", opts: ["High-speed computation","Predictable and compliant motion generation","Offline trajectory optimization","Static environments"], a: 1 }
    ],
    "Programming by Demonstration and DS Overview": [
      { q: "What is learned in Programming by Demonstration?", opts: ["Fixed trajectories","Time-invariant vector fields","Control gains only","Sensor models"], a: 1 },
      { q: "What does the equation ξ˙ = f(ξ) represent?", opts: ["A stochastic process","A time-dependent trajectory","An autonomous dynamical system","A linear regression"], a: 2 },
      { q: "What is the key advantage of autonomous DS models?", opts: ["They eliminate noise","They allow immediate response to perturbations","They reduce dimensionality","They avoid optimization"], a: 1 },
      { q: "Movement primitives (MPs) are:", opts: ["Hardware modules","Predefined control laws","Reusable motion behaviors encoded as vector fields","Optimization algorithms"], a: 2 }
    ],
    "Classical Dynamical System Models": [
      { q: "What characterizes Dynamic Movement Primitives (DMP)?", opts: ["Time-independent formulation","Gaussian mixture modeling","Time-dependent forcing term","Stochastic differential equations"], a: 2 },
      { q: "What is a limitation of DMP?", opts: ["Lack of convergence guarantees","Phase modulation may distort timing","Requires too much data","Cannot model nonlinear systems"], a: 1 },
      { q: "What does SEDS use to model demonstrations?", opts: ["Neural networks","Gaussian Mixture Models","Decision trees","Linear regression"], a: 1 },
      { q: "What is a limitation of SEDS?", opts: ["No stability guarantee","Too flexible","Quadratic Lyapunov constraints limit accuracy","Requires stochastic modeling"], a: 2 },
      { q: "What is the role of LAGS-DS?", opts: ["Remove stability constraints","Improve local accuracy with state-dependent modulation","Replace Gaussian models","Optimize time discretization"], a: 1 },
      { q: "Neural ODEs model the dynamics as:", opts: ["Discrete-time systems","Static mappings","Continuous-depth neural networks","Linear transformations"], a: 2 }
    ],
    "Stability in Dynamical Systems": [
      { q: "Why is stability essential in imitation learning?", opts: ["To reduce computation time","To guarantee convergence despite disturbances","To eliminate noise","To simplify models"], a: 1 },
      { q: "Which of the following is NOT a stability method mentioned?", opts: ["Lyapunov functions","Contraction theory","Fourier analysis","Diffeomorphic transformations"], a: 2 }
    ],
    "Lyapunov Stability": [
      { q: "A Lyapunov function represents:", opts: ["A trajectory","A control signal","A scalar energy-like quantity","A probability distribution"], a: 2 },
      { q: "What condition ensures stability using Lyapunov methods?", opts: ["Constant value","Increasing value","Decreasing along trajectories","Random variation"], a: 2 },
      { q: "What is a limitation of Lyapunov-based methods?", opts: ["No theoretical guarantees","Cannot handle noise","Difficulty balancing accuracy and robustness","Only works for linear systems"], a: 2 }
    ],
    "Contraction Theory": [
      { q: "What does contraction guarantee?", opts: ["Linear behavior","Exact tracking","Exponential convergence","Zero error"], a: 2 }
    ],
    "Diffeomorphic Mapping": [
      { q: "A diffeomorphism is:", opts: ["A discontinuous mapping","A bijective smooth mapping with smooth inverse","A linear transformation","A stochastic function"], a: 1 },
      { q: "What problem does τ-SEDS address?", opts: ["Overfitting","Stability-accuracy trade-off","Computational complexity","Data scarcity"], a: 1 }
    ],
    "Theory of Diffeomorphic Transformations": [
      { q: "A diffeomorphism can be generated by:", opts: ["A random process","A flow of a vector field","A linear mapping","A discrete system"], a: 1 }
    ],
    "Building a Diffeomorphic Mapping": [
      { q: "What is the purpose of the latent space?", opts: ["Store data","Simplify dynamics for stability analysis","Increase dimensionality","Reduce noise"], a: 1 },
      { q: "What is a key challenge in high dimensions?", opts: ["Overfitting","Curse of dimensionality","Lack of data","Slow convergence"], a: 1 }
    ],
    "Fast Diffeomorphic Matching (FDM)": [
      { q: "FDM builds a mapping using:", opts: ["Global transformation","Iterative local transformations","Neural networks","Random sampling"], a: 1 },
      { q: "What is the final result of FDM?", opts: ["A single transformation","A composition of local transformations","A neural model","A regression function"], a: 1 }
    ],
    "Euclideanizing Flows (E-flow)": [
      { q: "E-flow represents diffeomorphisms as:", opts: ["Single mapping","Composition of parameterized mappings","Linear functions","Random transformations"], a: 1 },
      { q: "What ensures invertibility in E-flow?", opts: ["Gaussian noise","Coupling layers","Linear constraints","Optimization"], a: 1 },
      { q: "What is minimized during training?", opts: ["Energy","Distance between trajectories","Trajectory error","Computational cost"], a: 2 }
    ],
    "Imitation Flow": [
      { q: "ImitationFlow introduces:", opts: ["Deterministic DS only","Stochastic DS with normalizing flows","Linear regression","Reinforcement learning"], a: 1 },
      { q: "What equation governs latent dynamics?", opts: ["ODE","PDE","SDE","Algebraic equation"], a: 2 },
      { q: "What ensures stability in observation space?", opts: ["Noise reduction","Diffeomorphic transformation","Optimization","Regularization"], a: 1 },
      { q: "What is the training objective?", opts: ["Minimize error","Maximize likelihood","Reduce dimensionality","Increase speed"], a: 1 }
    ],
    "Code Framework and Evaluation": [
      { q: "What is the purpose of the code framework?", opts: ["Only visualization","Only training","Experimentation and comparison of methods","Data collection"], a: 2 },
      { q: "What is the role of visualization tools?", opts: ["Data storage","Model training","Analysis of vector fields and trajectories","Optimization"], a: 2 }
    ]
  };

  const letters = ["A", "B", "C", "D"];
  const speakAssistant = (message, tone) => {
    if (typeof window.dsAssistantSpeak === "function") {
      window.dsAssistantSpeak(message, tone);
      return;
    }
    const toast = document.createElement("div");
    toast.className = "ds-assistant-fallback-toast";
    toast.textContent = message;
    if (tone === "success") {
      toast.style.borderColor = "#86efac";
      toast.style.background = "#f0fdf4";
      toast.style.color = "#166534";
    } else if (tone === "error") {
      toast.style.borderColor = "#fecaca";
      toast.style.background = "#fef2f2";
      toast.style.color = "#991b1b";
    }
    document.body.appendChild(toast);
    window.setTimeout(() => toast.remove(), 1000);
  };
  document.querySelectorAll("details.ds-section-game").forEach((panel, sIdx) => {
    const summary = panel.querySelector("summary");
    if (!summary) return;
    const title = summary.textContent.replace(/^Section game\s*—\s*/i, "").trim();
    const questions = sectionQuizBank[title];
    if (!questions) return;

    Array.from(panel.children).forEach((child) => {
      if (child !== summary) child.remove();
    });

    const questionNodes = [];
    questions.forEach((item, qIdx) => {
      const qWrap = document.createElement("div");
      qWrap.className = "ds-quiz";

      const qText = document.createElement("p");
      qText.innerHTML = `<strong>Q${qIdx + 1}.</strong> ${item.q}`;
      qWrap.appendChild(qText);

      const form = document.createElement("form");
      form.id = `quiz-${sIdx}-${qIdx}`;
      const inputName = `quiz-${sIdx}-${qIdx}-choice`;

      item.opts.forEach((opt, oIdx) => {
        const label = document.createElement("label");
        label.className = "ds-choice";
        label.innerHTML = `<input type="radio" name="${inputName}" value="${oIdx}"> <span>${letters[oIdx]}. ${opt}</span>`;
        form.appendChild(label);
      });
      qWrap.appendChild(form);

      const actions = document.createElement("div");
      actions.className = "ds-quiz-actions";
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = "Check answer";
      actions.appendChild(btn);
      qWrap.appendChild(actions);

      const feedback = document.createElement("p");
      qWrap.appendChild(feedback);

      btn.addEventListener("click", function () {
        const selected = panel.querySelector(`input[name="${inputName}"]:checked`);
        if (!selected) {
          feedback.textContent = "Select one option first.";
          applyFeedbackStyles(feedback, "hint");
          return;
        }
        const picked = Number(selected.value);
        const correctLetter = letters[item.a];
        if (picked === item.a) {
          feedback.textContent = `Correct. Answer: ${correctLetter}.`;
          applyFeedbackStyles(feedback, "correct");
          speakAssistant("Good job!", "success");
          btn.disabled = true;
          const nextNode = questionNodes[qIdx + 1];
          if (nextNode) {
            window.setTimeout(() => {
              nextNode.classList.remove("ds-quiz-step-hidden");
              nextNode.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 420);
          }
        } else {
          feedback.textContent = `Not correct. Right answer: ${correctLetter} - ${item.opts[item.a]}`;
          applyFeedbackStyles(feedback, "wrong");
          speakAssistant("Wrong answer, try again!", "error");
        }
      });

      panel.appendChild(qWrap);
      questionNodes.push(qWrap);
    });
    questionNodes.forEach((node, idx) => {
      if (idx > 0) node.classList.add("ds-quiz-step-hidden");
    });
  });
});
</script>

<details markdown="1" class="ds-learn-break ds-section-game">
<summary><strong>Section game — General Motivation</strong></summary>
<p><strong>Q1.</strong> Main goal of trajectory planning? <strong>(Answer: C)</strong></p>
<p><strong>Q2.</strong> DS represent motion as? <strong>(Answer: C)</strong></p>
<p><strong>Q3.</strong> NOT an advantage of DS approaches? <strong>(Answer: C)</strong></p>
<p><strong>Q4.</strong> DS useful in HRI for? <strong>(Answer: B)</strong></p>
</details>

## Course Content

Use **On this page** at the top for the full heading list (same as the classic table of contents). Read in order so vocabulary (stability, diffeomorphisms, SOTA) stays connected.

### Dynamical-Systems–Based Planning Overview

#### Motivation & Programming-by-Demonstration

<div class="definition" markdown="1">
Robotic path planning via dynamical systems learns continuous, time-invariant vector fields from human demonstrations (“Programming by Demonstration”) rather than hand-crafting trajectories<sup><a href="#ref1">1</a></sup>. By modeling motions as autonomous systems

$$
\dot\xi = f(\xi),
$$

robots react immediately to perturbations, offering smooth, robust replanning<sup><a href="#ref2">2</a></sup>.
</div>

<figure>
  <img src="{{ site.baseurl }}/assets/images/DS-based-planning/5953529-fig-15-source-large.gif" alt="Dynamical system example" width="600">
  <figcaption><center><em>Figure: Dynamical system model embedding different ways of performing a task in one single model. The robot follows an arc, a sine, or a straight line starting from different points in the workspace. </em><br><sub>Shiferaw, T. (2025) Advanced robotic manipulation with impedance control. MathWorks. Available at: https://ch.mathworks.com/company/technical-articles/enhancing-robot-precision-and-safety-with-impedance-control.html</sub></center> </figcaption>
</figure>



Nonlinear dynamical systems have recently emerged as a powerful framework for capturing robotic motor skills.  In particular, endpoint-to-endpoint behaviors can be encoded directly as time-invariant vector fields, forming reusable “movement primitives” (MPs) that drive a wide array of manipulation tasks.  Unlike traditional trajectory planners, DS-based methods naturally absorb disturbances by treating the goal as a globally attracting equilibrium, while the precise motion profiles are acquired from demonstration data.
<!-- Nonlinear dynamical systems have recently emerged as a powerful framework for capturing robotic motor skills<sup><a href="#refN1">N1</a>–<a href="#refN3">N3</a></sup>.  In particular, endpoint-to-endpoint behaviors can be encoded directly as time-invariant vector fields, forming reusable “movement primitives” (MPs)<sup><a href="#refN4">N4</a>,<a href="#refN5">N5</a></sup> that drive a wide array of manipulation tasks<sup><a href="#refN6">N6</a></sup>.  Unlike traditional trajectory planners, DS-based methods naturally absorb disturbances by treating the goal as a globally attracting equilibrium, while the precise motion profiles are acquired from demonstration data<sup><a href="#refN7">N7</a>–<a href="#refN10">N10</a></sup>. -->


<details markdown="1" class="ds-learn-break ds-section-game">
<summary><strong>Section game — Programming by Demonstration and DS Overview</strong></summary>
<p><strong>Q5.</strong> What is learned in PbD? <strong>(Answer: B)</strong></p>
<p><strong>Q6.</strong> `ξ˙ = f(ξ)` represents? <strong>(Answer: C)</strong></p>
<p><strong>Q7.</strong> Key advantage of autonomous DS? <strong>(Answer: B)</strong></p>
<p><strong>Q8.</strong> Movement primitives are? <strong>(Answer: C)</strong></p>
</details>

#### Classical DS Models

<div class="definition" markdown="1">
- **Dynamic Movement Primitives (DMP)**: encodes each degree of freedom separately with a time-dependent forcing term; yields fast one-shot learning but limited coupling across dimensions<sup><a href="#ref3">3</a></sup>.  
DMP formulates motions as a non-autonomous dynamical system. In essence, a DMP augments a simple linear attractor with a learned nonlinear forcing term to reproduce complex trajectories from demonstrations. To guarantee convergence, the nonlinear component is gradually attenuated near the goal by a phase variable, smoothly reverting the system to its stable linear form. However, this external phase-driven modulation can warp the timing of the original motion, limiting DMP’s ability to extrapolate beyond the demonstrated paths.
</div>
<!-- DMP formulates motions as a non-autonomous dynamical system. In essence, a DMP augments a simple linear attractor with a learned nonlinear forcing term to reproduce complex trajectories from demonstrations. To guarantee convergence, the nonlinear component is gradually attenuated near the goal by a phase variable, smoothly reverting the system to its stable linear form. However, this external phase-driven modulation can warp the timing of the original motion, limiting DMP’s ability to extrapolate beyond the demonstrated paths<sup><a href="#refN11">N11</a></sup>. -->


To address this limitation, more recent approaches adopt **time-independent** models that maintain the spatial and temporal structure of demonstrations under perturbations. By decoupling motion generation from an explicit phase, these methods focus on “what to imitate” rather than “when to imitate,” enabling robust generalization to unseen regions of the workspace.  An appealing alternative is the Stable Estimator of Dynamical Systems (SEDS) <sup><a href="#ref2">2</a></sup>.

- **Stable Estimator of Dynamical Systems (SEDS)**: fits a Gaussian Mixture Model (GMM) to demonstrations under convex constraints guaranteeing global asymptotic stability at the goal<sup><a href="#ref2">2</a></sup>.  However, its quadratic Lyapunov-function constraint can limit reproduction accuracy when demonstrations violate purely contractive dynamics.  
- **Control-Lyapunov Function DS (CLF-DM)**: learns a Lyapunov candidate by constrained regression, ensuring stability via sum-of-squares certificates<sup><a href="#ref4">4</a></sup>.  
- **LAGS-DS (Locally Active, Globally Stable DS)**: augments a stable global attractor with local, state-dependent modulation for higher fidelity near demonstrations, yet retains global convergence<sup><a href="#ref6">6</a></sup>.  
- **Gaussian-Process DS**: Bayesian nonparametric vector fields with posterior uncertainty and stability enforced via contraction metrics<sup><a href="#ref7">7</a></sup>.  
- **Neural ODEs for DS**: parameterize $f(\xi)$ as a continuous-depth neural network, with stability imposed by spectral normalization or contraction theory<sup><a href="#ref8">8</a></sup>.

<details markdown="1" class="ds-learn-break ds-section-game">
<summary><strong>Section game — Classical Dynamical System Models</strong></summary>
<p><strong>Q9.</strong> DMP characterized by? <strong>(Answer: C)</strong></p>
<p><strong>Q10.</strong> One limitation of DMP? <strong>(Answer: B)</strong></p>
<p><strong>Q11.</strong> SEDS uses? <strong>(Answer: B)</strong></p>
<p><strong>Q12.</strong> Limitation of SEDS? <strong>(Answer: C)</strong></p>
<p><strong>Q14.</strong> Role of LAGS-DS? <strong>(Answer: B)</strong></p>
<p><strong>Q15.</strong> Neural ODEs model dynamics as? <strong>(Answer: C)</strong></p>
</details>

#### Benchmarks & Tools

- **LASA Handwriting Dataset**: 24 handwriting motions used extensively to compare DS methods<sup><a href="#ref9">9</a></sup>.  
- **Toolboxes**:  
  - EPFL-LASA’s SEDS ROS packages (https://github.com/epfl-lasa/icra-lfd-tutorial)  
  - EPFL-LASA’s LAGSDS ROS tasks (https://github.com/epfl-lasa/kuka-lagsds-tasks)

---

### Stability

Within a dynamical systems (DS) framework, achieving system stability alongside accuracy is essential. As robots learn motor skills via imitation learning (IL), robustness becomes paramount: the controller must generalize reliably and continue to converge on the intended behavior despite disturbances or variations. To reinforce stability in DS, three primary approaches are typically employed: Lyapunov functions (LF), Contraction Theory (CT), and diffeomorphic transformations. Each of these methods strengthens the learning system’s resilience by mitigating deviations and external perturbations. In the following, we examine the fundamental principles of these three techniques and their roles in enhancing DS stability.

<details markdown="1" class="ds-learn-break ds-section-game">
<summary><strong>Section game — Stability in Dynamical Systems</strong></summary>
<p><strong>Q16.</strong> Why is stability essential? <strong>(Answer: B)</strong></p>
<p><strong>Q17.</strong> NOT listed stability method? <strong>(Answer: C)</strong></p>
</details>

#### Lyapunov stability

Lyapunov functions (LFs) provide a scalar measure—often thought of as the “energy” or “potential”—of a dynamical system. In control theory, they are indispensable for proving that a system will remain stable and converge to a target behavior. When applied to imitation learning, LF-based methods seek to construct a function that satisfies the usual Lyapunov conditions, then tune it via optimization (e.g., gradient descent, trust-region algorithms or neural-network training). By showing that this function consistently decreases along the system’s trajectories, these approaches guarantee that the learned policy is both stable and convergent.

To address this, LAGS-DS improves local tracking by allowing state-dependent gains near the demonstration manifold, yet sacrifices some of the stiffness of a pure global attractor<sup><a href="#ref6">6</a></sup>.

<!-- Reinhart et al. trained two parallel neural networks for the iCub—one for accuracy and one for stability—but this decoupled scheme is complex and lacks formal guarantees.   -->

The CLF-DM approach reduces conservatism by learning a control Lyapunov function via weighted asymmetric quadratics, yet it applies runtime corrections that can disrupt the learned DS.  

Although Artstein and Sontag’s theory of control Lyapunov functions provides the foundation for stability enforcement, balancing precision and robustness in learned systems remains an open challenge.

Lemme et al.’s Neurally Imprinted Stable Vector Fields (NIVF) employ a neurally learned Lyapunov candidate with quadratic programming, achieving high accuracy but only local stability and requiring expensive ex-post verification.  

<!-- Reinhart et al. trained two parallel neural networks for the iCub—one for accuracy and one for stability—but this decoupled scheme is complex and lacks formal guarantees<sup><a href="#refN10">N10</a></sup>.  

The CLF-DM approach<sup><a href="#refN15">N15</a>,<a href="#refN16">N16</a></sup> reduces conservatism by learning a control Lyapunov function via weighted asymmetric quadratics, yet it applies runtime corrections that can disrupt the learned DS.  

Although Artstein and Sontag’s theory of control Lyapunov functions<sup><a href="#refN17">N17</a>,<a href="#refN18">N18</a></sup> provides the foundation for stability enforcement, balancing precision and robustness in learned systems remains an open challenge.

Lemme et al.’s Neurally Imprinted Stable Vector Fields (NIVF)<sup><a href="#refN8">N8</a></sup> employ a neurally learned Lyapunov candidate with quadratic programming, achieving high accuracy but only local stability and requiring expensive ex-post verification<sup><a href="#refN19">N19</a></sup>.   -->


<details markdown="1" class="ds-learn-break ds-section-game">
<summary><strong>Section game — Lyapunov Stability</strong></summary>
<p><strong>Q18.</strong> Lyapunov function represents? <strong>(Answer: C)</strong></p>
<p><strong>Q19.</strong> Lyapunov condition for stability? <strong>(Answer: C)</strong></p>
<p><strong>Q20.</strong> Limitation of Lyapunov-based methods? <strong>(Answer: C)</strong></p>
</details>

#### Contraction theory
Contraction theory (CT) offers a powerful means to certify stability and robustness in imitation‐learned controllers. Rather than tracking a single nominal trajectory, CT examines how distance between any two trajectories evolves over time. By identifying a metric under which the system’s dynamics cause all trajectories to shrink toward each other—i.e., to “contract”—one can guarantee exponential convergence to the desired behavior, even in the presence of disturbances or modeling errors.

- **Partial Contraction DS**: learns contracting subspaces so that local behaviors track demonstrations, then uses contraction theory for stability<sup><a href="#ref7">7</a></sup>.


<details markdown="1" class="ds-learn-break ds-section-game">
<summary><strong>Section game — Contraction Theory</strong></summary>
<p><strong>Q22.</strong> Contraction guarantees? <strong>(Answer: C)</strong></p>
</details>

#### Diffeomorphic mapping
<div class="definition" markdown="1">
Diffeomorphisms, a key concept in differential geometry and topology, are smooth, bijective mappings between differentiable manifolds that preserve differentiability. When you apply a diffeomorphism to the state space of a dynamical system, the resulting transformed system inherits the exact same stability properties as the original. Their power in stability analysis comes from the fact that by reparameterizing the system’s coordinates or state variables, one can often recast a complicated dynamical system into a simpler, hand‐specified stable system (HSDS) whose stability is already established. In this way, picking the right diffeomorphic transformation can greatly simplify the task of proving stability.
</div>

- **τ-SEDS**: augments SEDS with a diffeomorphic pre-mapping to relax Lyapunov constraints, boosting accuracy while retaining stability<sup><a href="#ref10">10</a></sup>.  This framework overcomes the stability–accuracy dilemma by integrating the Lyapunov candidate into a diffeomorphic transformation, yielding provably globally stable DS that faithfully reproduce demonstrations.  




<details markdown="1" class="ds-learn-break ds-section-game">
<summary><strong>Section game — Diffeomorphic Mapping</strong></summary>
<p><strong>Q23.</strong> Diffeomorphism is? <strong>(Answer: B)</strong></p>
<p><strong>Q25.</strong> τ-SEDS addresses? <strong>(Answer: B)</strong></p>
</details>

---

### Diffeomorphic Mapping for DS

Mapping a simple, hand-designed—but provably stable—DS through a smooth, bijective transformation (a **diffeomorphism**) allows one to inherit stability while recovering complex accuracy.

#### Why Diffeomorphic Mapping --- Stability–Accuracy Dilemma

Robust DS must satisfy two often-conflicting goals:

1. **Stability**: provable global convergence to a target under any perturbation.  
2. **Accuracy**: faithful reproduction of the demonstrated trajectory.

Khansari-Zadeh et al. first highlighted the stability–accuracy trade-off in SEDS, noting that although their Gaussian-mixture stability constraints guarantee global convergence, “these global stability conditions might be too stringent to accurately model some complex motions”<sup><a href="#ref2">2</a></sup>.  <a href="#fig1">Figure 1</a> illustrates this: the left panel shows C-shaped demonstrations from the LASA dataset overlaid on equipotential contours of the quadratic Lyapunov function, while the right panel superimposes the DS flow (blue arrows), original trajectories (black), and reproductions (red), revealing stable yet imprecise tracking.

<!-- Khansari-Zadeh et al. first highlighted the stability–accuracy trade-off in SEDS, noting that although their Gaussian-mixture stability constraints guarantee global convergence, “these global stability conditions might be too stringent to accurately model some complex motions”<sup><a href="#ref2">2</a></sup>.  <a href="#fig1">Figure 1</a> illustrates this: the left panel shows C-shaped demonstrations from the LASA dataset<sup><a href="#refN14">N14</a></sup> overlaid on equipotential contours of the quadratic Lyapunov function, while the right panel superimposes the DS flow (blue arrows), original trajectories (black), and reproductions (red), revealing stable yet imprecise tracking. -->

<figure id="fig1">
  <img src="{{ site.baseurl }}/assets/images/DS-based-planning/lyapunov.png" alt="Dynamical system example" width="600">
  <figcaption><center><em>Figure: The conflict between demonstration data and a DS constrained by a quadratic Lyapunov function. In the left panel, C-shaped trajectories from the LASA dataset are superimposed on the contour lines of the quadratic Lyapunov candidate, revealing their mismatch. The right panel shows the DS flow and its reproductions, which, although guaranteed stable, diverge noticeably from the original demonstrations. </em><br><sub>Shiferaw, T. (2025) Advanced robotic manipulation with impedance control. MathWorks. Available at: https://ch.mathworks.com/company/technical-articles/enhancing-robot-precision-and-safety-with-impedance-control.html</sub></center>  </figcaption>
</figure>

Compared to Lyapunov‐function–based and contraction‐theory–based methods, the diffeomorphic‐mapping–based DS method can handle demonstration data on Riemannian manifolds and, by leveraging the properties of the mapping, guarantee that even complex motion models remain globally stable.

#### Theory of Diffeomorphic Transformations <sup><a href="#ref22">22</a></sup>


<div class="definition" markdown="1">
A diffeomorphism $\psi\colon \mathcal{Y}\to \mathcal{X}$ is a smooth, bijective map with a smooth inverse, thereby providing a coordinate transformation between two differentiable manifolds $\mathcal{Y}$ and $\mathcal{X}$. According to Lee <sup><a href="#ref11">11</a></sup>, any such diffeomorphism can be realized as a flow generated by an infinitesimal generator $\mathbf{V}$, often represented as a vector field on a smooth manifold. Specifically, let $\mathbf{V}\colon \mathbb{R}^d \to \mathbb{R}^d$ be a time-independent vector field and the flow $\gamma\colon \mathbb{R}\times\mathbb{R}^d\to\mathbb{R}^d$ be defined by
</div>

$$
\gamma(t,y) = y + \int_{0}^{t} \mathbf{V}\bigl(\gamma(u,y)\bigr)du
= x.
$$

This flow $\gamma(t,y)$ provides the position $x$ at time $t$ of a trajectory starting at $y$ when $t=0$. For each fixed time $t$, this flow defines a diffeomorphism $\psi_t\colon \mathcal{Y}\to\mathcal{X}$ by $\psi(y):=\gamma(t,y)$. Therefore, the flow defines an invertible mapping, whose inverse can be computed by reversing the direction of time:

$$
\gamma(-t,x) = x + \int_{-t}^{0} \mathbf{V}\bigl(\gamma(u,x)\bigr)du
= y.
$$

<div class="note" markdown="1">
Note that this flow-based diffeomorphism $\psi(y):=\gamma(t,y)$ maps the initial point $y\in\mathcal{Y}$ to the point $x=\gamma(t,y)\in\mathcal{X}$. Furthermore, given a vector field $f\colon \mathcal{X}\to T\mathcal{X}$, where $f(x)$ assigns a tangent vector in $T_x\mathcal{X}$ to each point $x\in\mathcal{X}$, we can use $\psi$ to pull back $f$ to a vector field on $\mathcal{Y}$. Specifically, let $J_{\psi}$ be the Jacobian of $\psi$, then the pullback of $f$ via $\psi$ is

$$
\dot y = J_{\psi}^{-1}f\bigl(\psi(y)\bigr),
$$

thereby transforming tangent vectors on $\mathcal{X}$ to corresponding tangent vectors on $\mathcal{Y}$.



If the system on the manifold $\mathcal{Y}$,

$$
\dot y = J_{\psi}^{-1}f\bigl(\psi(y)\bigr),
$$

is globally asymptotically stable at an equilibrium $y^*\in\mathcal{Y}$, then the mapped system on $\mathcal{X}$,

$$
x = \psi(y), 
\quad
\dot x = D\psi\bigl(y\bigr)\dot y
           = D\psi\bigl(\psi^{-1}(x)\bigr)J_{\psi}^{-1}f\bigl(x\bigr),
$$

is also globally asymptotically stable at the corresponding equilibrium $x^* = \psi(y^*)\in\mathcal{X}$.  
</div>




<details markdown="1" class="ds-learn-break ds-section-game">
<summary><strong>Section game — Theory of Diffeomorphic Transformations</strong></summary>
<p><strong>Q27.</strong> A diffeomorphism can be generated by? <strong>(Answer: B)</strong></p>
</details>

#### How to build a Diffeomorphic Mapping for DS
Step 1: Build latent space based on data
In the latent space, we aim for dynamics that are simple and whose stability is easy to prove. Common choices include:
1. **Linear or Quadratic DS**  
   - **Linearized demonstrations**: e.g., t-SEDS, Laplacian-based dimensionality reduction that projects high-dimensional trajectories into a low-dimensional linear space.  
   - **Stochastic linear dynamics**: including FDM, E-Flow, and I-Flow, which approximate demonstrations via linear differential equations with Gaussian models or random terms.
2. **Stable Neural ODEs**  
   - Modeling latent-space dynamics with Neural ODEs constrained for global asymptotic stability, combining expressiveness with convergence guarantees.

3. **Nonlinear DS and Limit Cycles**  
   - For cyclic motions (limit cycles), introduce phase-based scaling maps; for surfaces or other manifolds, embed them into the latent space via landmark matching or conformal maps.

4. When designing the latent space, also consider the latent space’s dimension and order:  
  - **Non-Euclidean demonstrations** (e.g., finger joints, rotations): express them in the latent space using Riemannian manifolds or Lie group structures.  
  - **Environmental changes and obstacle avoidance**: incorporate infinitesimal generators of flows, space curvature, or rotational avoidance terms in the latent dynamics.  
  - **Second-order or dissipative systems**: simulate energy dissipation and inertial effects via phase-based scaling or higher-dimensional Euclidean representations.




Step 2: Train mapping between the original space and the latent space
After constructing the latent-space DS, the key is learning an **invertible mapping** that preserves stability while accurately reproducing demonstration trajectories. Main methods include:

1. **Classical Optimal Methods**  
   - Large Deformation Diffeomorphic Metric Mapping (LDDMM)  
   - Optimal Transport–based mapping  
   - Locally weighted translations with geometric constraints

2. **Geometry/Physics-Constrained Methods**  
   - Riemannian Gaussian Mixture Models for smooth manifold transformations  
   - Hamiltonian-based diffeomorphic flows  
   - Mappings defined on Lie groups

3. **Neural Network Approaches**  
   - **Normalizing Flows** (invertible neural networks): I-Flow, E-Flow, Jacobian-Constrained Networks, Non-Volume-Preserving flows  
   - **Diffeomorphic Neural Networks**: using Neural ODE structures to ensure invertibility and diffeomorphic properties  
   - **Invertible Residual Networks**: approximating invertible mappings with residual structures



#### Key Challenges: 
Although diffeomorphism is theoretically attractive, practical applications must address:

1. **Model Accuracy vs. Dimensionality Curse**  
   - High accuracy often requires a higher-dimensional latent space, leading to increased training and inference costs.

2. **Approximation Errors**  
   - Approximating diffeomorphic mappings on Riemannian or non-Euclidean spaces can introduce errors that affect strict stability guarantees.

3. **Practical Deployment**  
   - How to deploy on real robotic platforms with sufficient speed while handling sensor noise and real-time control requirements.

---

<details markdown="1" class="ds-learn-break ds-section-game">
<summary><strong>Section game — Building a Diffeomorphic Mapping</strong></summary>
<p><strong>Q31.</strong> Purpose of latent space? <strong>(Answer: B)</strong></p>
<p><strong>Q34.</strong> Key high-dimensional challenge? <strong>(Answer: B)</strong></p>
</details>

### State-of-the-Art Approaches to Training the Mapping

The current methods for computing diffeomorphisms are mainly flow-based approaches, which generate a series of transport equations to iteratively alter the spatial structure and design a cost function to ensure minimization of the deformation.

#### Fast diffeomorphic matching (FDM)
FDM propose a new diffeomorphic matching algorithm and use it to learn nonlinear dynamical systems with the guarantee that the learned systems have global asymptotic stability.
##### Iterative Locally Weighted Matching

A novel approach to diffeomorphic matching is based on **diffeomorphic locally weighted translations**. This method applies smooth, localized updates iteratively to approximate the diffeomorphism efficiently.

- **Parameters:** Fix the number of iterations $K$, with $0 < \\mu < 1$ (safety margin) and $0 < \\beta \\leq 1$ (learning rate). Typically, $K = 150$, $\\mu \\approx 0.9$, and $\\beta \\approx 0.5$.
- **Initialization:** Set $Z := X$.

At each iteration $j$:

1. Select the point $p_j$ in $Z$ furthest from its target $q$ in $Y$.
2. Define the translation $\\psi_{\\rho_j, p_j, v_j}$ with direction $v_j = \\beta (q - p_j)$ and Gaussian RBF kernel, where $\\rho_j \\in [0, \\mu \\rho_{\\max}(v_j)]$ is optimized to minimize the distance between $\\psi_{\\rho_j, p_j, v_j}(Z)$ and $Y$.
3. Update $Z := \\psi_{\\rho_j, p_j, v_j}(Z)$.

The final diffeomorphism is the composition of all local updates:

$$
\\Phi = \\psi_{\\rho_K, p_K, v_K} \\circ \\cdots \\circ \\psi_{\\rho_2, p_2, v_2} \\circ \\psi_{\\rho_1, p_1, v_1}.
$$

---

##### Pseudo-code

<!-- Algorithm: Fast Diffeomorphic Matching (for Just the Docs + MathJax)
     Paste this block into your .md file. -->

<div class="algo-box" markdown="1">
<span class="title">Algorithm — Fast Diffeomorphic Matching (FDM)</span>  

**Input:** X = (x<sub>i</sub>)<sub>i=0,\dots,N</sub>, Y = (y<sub>i</sub>)<sub>i=0,\dots,N</sub>  
**Parameters:** $K \in \mathbb{N}_{>0}, 0 < \mu < 1, 0 < \beta \leq 1$  

Initialize: $Z = (z_i)_{i=0,\dots,N}$  
Set $Z := X$  

**<span class="kw">for</span>** $j = 1$ **to** $K$ **do**  
$\qquad m := \arg\max_{i \in \{0,\dots,N\}}  \lVert z_i - y_i \rVert$  
$\qquad p_j := z_m$  
$\qquad q := y_m$  
$\qquad v_j := \beta (q - p_j)$  
$\qquad \rho_j := \arg\min_{\rho \in [0, \mu \rho_{\max}(v_j)]} \mathrm{dist}\big(\psi_{\rho, p_j, v_j}(Z), Y\big)$  
$\qquad Z := \psi_{\rho_j, p_j, v_j}(Z)$  
**<span class="kw">end for</span>**  

**return** {&rho;<sub>j</sub>}<sub>j=1,\dots,K</sub>, {p<sub>j</sub>}<sub>j=1,\dots,K</sub>, {v<sub>j</sub>}<sub>j=1,\dots,K</sub>
</div>


This iterative matching scheme is both efficient and robust, yielding a smooth diffeomorphism by composing a sequence of locally weighted translations.

With our **tutorial code**, you can **inspect the mapping results** and the **DS constructed** using this method.

<figure id="fig6">
  <img src="{{ site.baseurl }}/assets/images/DS-based-planning/FDM.png" alt="compare results" width="600">
  <figcaption><center><em>Figure: DS mapping results for the FDM method: the left figure shows the velocity vector field, and the right figure shows the potential field.</em></center>  </figcaption>
</figure>

<figure id="fig7">
  <img src="{{ site.baseurl }}/assets/images/DS-based-planning/fdm_map.png" alt="compare results" width="600">
  <figcaption><center><em>Figure: Grid representations of the latent space and original space, showing that the linear trajectory becomes the desired shape after mapping.</em></center>  </figcaption>
</figure>

---

<details markdown="1" class="ds-learn-break ds-section-game">
<summary><strong>Section game — Fast Diffeomorphic Matching (FDM)</strong></summary>
<p><strong>Q35.</strong> FDM builds mapping with? <strong>(Answer: B)</strong></p>
<p><strong>Q37.</strong> Final result of FDM? <strong>(Answer: B)</strong></p>
</details>

#### Euclideanizing Flows （E-flow）
Inspired by recent works in density estimation, E-flow propose to represent the diffeomorphism as a composition of simple parameterized diffeomorphisms. 

<div class="definition" markdown="1">
By definition, a diffeomorphism must be **bijective** and **continuously differentiable**. To achieve this, we model it as a composition of $K$ mappings:
</div>

$$
\\psi = \\psi_1 \\circ \\psi_2 \\circ \\cdots \\circ \\psi_K, \\quad \\psi_k : \\mathbb{R}^n \\to \\mathbb{R}^n.
$$

Each mapping $\\psi_k$ is implemented with a **coupling layer** that splits the input $z_{k-1}$ into two halves and applies scaling and translation:

$$
\psi_k(z_{k-1}) = \begin{bmatrix}
  z_{k-1}^a \\
  z_{k-1}^b \odot \exp\big(s_k(z_{k-1}^a)\big) + t_k\big(z_{k-1}^a\big)
\end{bmatrix}
$$

where $s_k$ and $t_k$ are scaling and translation functions. This guarantees bijectivity and differentiability, so the composition $\\psi$ is a valid diffeomorphism.

---

<div class="note" markdown="1">
##### Learning Objective from Demonstrations

Suppose we have $N$ human demonstrations, each consisting of $T_i$ pairs $(x_{i,t}, \\dot{x}_{i,t})$. We aim to learn a dynamical system

$$
\\dot{x} = f_{\\psi}(x)
$$

that reproduces the demonstrations while ensuring stability. With a coordinate transform $y = \\psi(x)$, the system becomes a gradient flow

$$
\\dot{y} = -\\nabla_y \\Phi(y), \\quad \\Phi(y) = \\| y - y^* \\|, \\quad y^* = \\psi(x^*).
$$

The learning problem reduces to minimizing the trajectory error:

<div class="ds-math-block">
\[
\hat{\theta} = \arg\min_{\theta}
\frac{1}{\sum_{i=1}^{N} T_i}
\sum_{i=1}^{N}\sum_{t=1}^{T_i}
\left\lVert \dot{x}_{i,t} - f_{\psi_{\theta}}(x_{i,t}) \right\rVert^{2}
\]
</div>
</div>

---

##### Kernelized Coupling Layers

To enforce smoothness, we parameterize $s_k$ and $t_k$ with Gaussian kernels:

$$
k(z, z') = \\exp\\Big(-\\frac{\\lVert z - z' \\rVert^2}{2l^2}\\Big).
$$

Using random Fourier features:

$$
\\varphi(z) = \\sqrt{\\tfrac{2}{m}} [\\cos(a_1^T z + b_1), \\ldots, \\cos(a_m^T z + b_m)]^T,
$$

with $a_j \\sim \\mathcal{N}(0, l^{-2} I)$ and $b_j \\sim U(0,2\\pi)$. Then,

$$
s_k(z) = \\varphi(z)^T W_{s_k}, \\quad t_k(z) = \\varphi(z)^T W_{t_k},
$$

where $W_{s_k}, W_{t_k}$ are learnable parameters.



With our **tutorial code**, you can **inspect the mapping results** and the **DS constructed** using this method.

<figure id="fig8">
  <img src="{{ site.baseurl }}/assets/images/DS-based-planning/eflow.png" alt="compare results" width="600">
  <figcaption><center><em>Figure: DS mapping results for the FDM method: the left figure shows the velocity vector field, and the right figure shows the potential field.</em></center>  </figcaption>
</figure>

<figure id="fig9">
  <img src="{{ site.baseurl }}/assets/images/DS-based-planning/eflow_map.png" alt="compare results" width="600">
  <figcaption><center><em>Figure: Grid representations of the latent space and original space, showing that the linear trajectory becomes the desired shape after mapping.</em></center>  </figcaption>
</figure>


---

<details markdown="1" class="ds-learn-break ds-section-game">
<summary><strong>Section game — Euclideanizing Flows (E-flow)</strong></summary>
<p><strong>Q38.</strong> E-flow represents diffeomorphisms as? <strong>(Answer: B)</strong></p>
<p><strong>Q39.</strong> What ensures invertibility in E-flow? <strong>(Answer: B)</strong></p>
<p><strong>Q40.</strong> What is minimized in training? <strong>(Answer: C)</strong></p>
</details>

#### Imitation Flow


<div class="definition" markdown="1">
**ImitationFlow** extends the framework of stochastic dynamical systems by integrating **normalizing flows** into the emission function, providing both stability guarantees and expressive modeling power.  
</div>
The method is designed to learn stable stochastic dynamical systems from demonstration data while preserving asymptotic stability of the dynamics.

---

##### Model Formulation
In the latent space $\mathcal{Z}$, the system evolves according to a stochastic differential equation (SDE):

$$
dz(t) = f_{\phi}(z(t))dt + g_{\phi}(z(t))dB(t),
$$

where $f_{\phi}$ and $g_{\phi}$ are the drift and diffusion terms parameterized by $\phi$, and $B(t)$ is a $d$-dimensional Brownian motion.  
The observation space $\mathcal{Y}$ is linked to the latent space via a diffeomorphic transformation $h_{\theta}$:

$$
y = h_{\theta}(z),
$$

where $h_{\theta}$ is bijective, smooth, and parameterized by $\theta$.  
This guarantees that the learned mapping preserves the stability properties of the latent dynamics in the observation space.

---

##### Equivalent Dynamics in the Observation Space
Given the Jacobian of the transformation $J_{\theta}(y) = \frac{dz}{dy}$, the stochastic dynamics of $y(t)$ can be rewritten as:

$$
dy(t) = J_{\theta}(y) f_{\phi}\left(h_{\theta}^{-1}(y)\right)dt
      + J_{\theta}(y) g_{\phi}\left(h_{\theta}^{-1}(y)\right) dB(t).
$$

This formulation ensures that the transformed dynamics remain stable while enabling expressive modeling of complex motion patterns.

---

##### Learning Algorithm
The goal is to maximize the likelihood of the observed trajectories under the ImitationFlow model:

$$
\psi^* = \arg\max_{\psi=\{\theta,\phi\}}  \mathcal{L}_{\psi}(\mathcal{T}),
$$

where $\mathcal{T}$ is the set of expert demonstrations and $\mathcal{L}_{\psi}$ is the trajectory likelihood.  
By leveraging the change-of-variable rule of normalizing flows, the probability of trajectories in $\mathcal{Y}$ is rewritten in terms of the latent dynamics in $\mathcal{Z}$:

$$
p(y) = p(z) \left|\det \frac{\partial z}{\partial y}\right|.
$$

Thus, the learning process consists of two coupled steps:
1. Estimating the stable latent dynamics parameters $\phi$;
2. Optimizing the flow transformation $h_{\theta}$ to faithfully reproduce demonstrations in the observation space.

---

##### Pseudo-code

<!-- Algorithm 1: ImitationFlow Learning (for Just the Docs + MathJax)
     Paste this anywhere in your .md page (outside code blocks). 
     It uses HTML with markdown="1" so MathJax will render correctly. -->

<div class="algo-box" markdown="1">
<span class="title">Algorithm 1 — ImitationFlow Learning</span>  

**Input:** $\mathcal{T}$ trajectories  
**Parameters:** $\phi$ dynamics, $\theta$ NormalizingFlow  

**<span class="kw">while</span>** not converged **<span class="kw">do</span>**  
$\qquad \tau_y \leftarrow \{\mathcal{T}\}$  
$\qquad \Delta T \leftarrow \text{Get a sampling time}$  
$\qquad \tau_z, \lvert J_{\tau_z}^{-1}\rvert \leftarrow h_{\theta}^{-1}(\tau_y)$  
$\qquad z_{(0:T-\Delta T)}, z_{(\Delta T:T)}, z_n \leftarrow \mathrm{SplitTime}(\tau_z, \Delta T)$  
$\qquad p(\cdot \mid z_i+\Delta T;\phi), p_n(\cdot;\phi) \leftarrow \mathrm{GetDensFunc}\big(z_{(\Delta T:T)}, z_n\big)$  
$\qquad \mathcal{L} = p_n(z_n;\phi)\,\lvert J_{n}^{-1}\rvert \prod_i p\big(z_i \mid z_{i+\Delta T};\phi\big)\,\lvert J_{i}^{-1}\rvert$  
$\qquad \Delta\theta, \Delta\phi \propto -\nabla_{\theta}\mathcal{L}, -\nabla_{\phi}\mathcal{L}$  
**<span class="kw">end while</span>**
</div>

With our **tutorial code**, you can **inspect the mapping results** and the **DS constructed** using this method.

<figure id="fig10">
  <img src="{{ site.baseurl }}/assets/images/DS-based-planning/iflow.png" alt="compare results" width="600">
  <figcaption><center><em>Figure: DS mapping results for the FDM method: the left figure shows the velocity vector field, and the right figure shows the potential field.</em></center>  </figcaption>
</figure>

<figure id="fig11">
  <img src="{{ site.baseurl }}/assets/images/DS-based-planning/iflow_map.png" alt="compare results" width="600">
  <figcaption><center><em>Figure: Grid representations of the latent space and original space, showing that the linear trajectory becomes the desired shape after mapping.</em></center>  </figcaption>
</figure>
---

<details markdown="1" class="ds-learn-break ds-section-game">
<summary><strong>Section game — Imitation Flow</strong></summary>
<p><strong>Q41.</strong> ImitationFlow introduces? <strong>(Answer: B)</strong></p>
<p><strong>Q42.</strong> Latent dynamics governed by? <strong>(Answer: C)</strong></p>
<p><strong>Q43.</strong> What ensures stability in observation space? <strong>(Answer: B)</strong></p>
<p><strong>Q44.</strong> Training objective? <strong>(Answer: B)</strong></p>
</details>

### Programming exercise for classical methods

#### Tutroial code repository

We create a code repository where you can test and try different Diffeomorphic mapping methods for DS training.

[GitHub – RLoad/Tutorial_DS_mapping](https://github.com/RLoad/Tutorial_DS_mapping)

Here we list the method we used in our code structure, and thank them for their open source code repositories.

#### Methods List

- **Fast Diffeomorphic Matching (FDM)**: Perrin & Schlehuber-Caissier (2016) introduce FDM to align a reference attractor to the demonstration manifold by solving large-deformation diffeomorphism matching with stability certificates<sup><a href="#ref12">12</a></sup>.

- **Euclideanizing Flows (E-FLOW)**: Rana, Fox & Qiu (2020) view diffeomorphism learning as a normalizing flow: compose simple parameterized maps so that $x=\phi(z)$, with $z$ following a linear stable DS. Stability follows directly from the base flow<sup><a href="#ref13">13</a></sup>.

- **Imitation Flows (I-FLOW) (On going)**: Urain et al. (2020) extend E-FLOW to stochastic stabilization, pushing a simple contracting SDE through a learnable diffeomorphism via normalizing flows, ensuring both stability and expressivity<sup><a href="#ref14">14</a></sup>.

- **Riemannian Stable DS (RSDS) (On going)**: Saveriano, Abu-Dakka & Kyrki (2023) learn diffeomorphic maps on manifolds (e.g. orientation on $\mathrm{SO}(3)$) via neural manifold ODEs, enforcing Lyapunov stability on Riemannian manifolds<sup><a href="#ref15">15</a></sup>.

- **More is coming ...**

<!-- ——— Extended practice: optional games & deeper quizzes (English UI) ——— -->
<p class="ds-addon-label">Level up</p>
<details markdown="1" class="ds-learn-break">
<summary><strong>Level up — second game & tougher checks</strong></summary>

You already know the basics—here you **sort ideas by family** (phase-driven vs stable mixture models) and **tap the stability toolkit** with a multi-select. It is the right level once the bullet lists no longer feel abstract.

### Game 2 — Sort statements by model family

Drag each card into the correct column: **Phase-driven / non-autonomous** (DMP-style) vs **Stable autonomous / mixture estimation** (SEDS / LAGS-style). Leave distractors in the bank on purpose, or place them wrong once—feedback will show what belongs where.

<div class="ds-drag-game" markdown="0">
  <p class="ds-drag-hint">DMP uses a <strong>phase variable</strong>; SEDS fits a <strong>GMM</strong> with stability constraints; LAGS-DS keeps a <strong>global attractor</strong> with local modulation. The two distractors are not described that way in this chapter.</p>
  <div class="ds-drag-columns">
    <div class="ds-drag-target-wrap">
      <div class="ds-drag-label">Phase-driven (e.g. DMP)</div>
      <div class="drop-zone" id="zone-phase" ondrop="drop(event)" ondragover="allowDrop(event)" role="region" aria-label="Phase-driven statements">
        <h3 class="ds-drop-title">Non-autonomous / phase</h3>
        <p class="ds-drop-placeholder">Drop matching cards here.</p>
      </div>
    </div>
    <div class="ds-drag-target-wrap">
      <div class="ds-drag-label">Stable DS estimation (e.g. SEDS, LAGS)</div>
      <div class="drop-zone" id="zone-autonomous" ondrop="drop(event)" ondragover="allowDrop(event)" role="region" aria-label="Stable autonomous statements">
        <h3 class="ds-drop-title">Mixture / global stability</h3>
        <p class="ds-drop-placeholder">Drop matching cards here.</p>
      </div>
    </div>
  </div>
  <div class="ds-drag-pool-wrap" style="margin-top:1rem;">
    <div class="ds-drag-label">All cards & distractors</div>
    <div class="drag-container ds-drag-pool" id="drag-items-g2">
      <div class="drag-item" id="g2_dmp_phase" draggable="true" ondragstart="drag(event)">Phase variable attenuates the learned forcing term near the goal.</div>
      <div class="drag-item" id="g2_dmp_time" draggable="true" ondragstart="drag(event)">External phase modulation can warp timing relative to demonstrations.</div>
      <div class="drag-item" id="g2_seds_gmm" draggable="true" ondragstart="drag(event)">Fits a GMM to demonstrations with convex constraints for global asymptotic stability at the goal.</div>
      <div class="drag-item" id="g2_lags" draggable="true" ondragstart="drag(event)">Local state-dependent modulation while retaining a globally stable attractor.</div>
      <div class="drag-item" id="g2_rrt" draggable="true" ondragstart="drag(event)">Builds a roadmap with randomized sampling in configuration space (RRT-style).</div>
      <div class="drag-item" id="g2_pid" draggable="true" ondragstart="drag(event)">Tunes three gains on tracking error without learning a vector field.</div>
    </div>
  </div>
</div>

<script>
const correctMappingG2 = {
  "zone-phase": ["g2_dmp_phase", "g2_dmp_time"],
  "zone-autonomous": ["g2_seds_gmm", "g2_lags"]
};
</script>

<button type="button" class="check-button" onclick="checkDragDropAnswer(correctMappingG2, 'feedback-drag-g2')">Check my answer</button>
<div class="feedback ds-feedback" id="feedback-drag-g2"></div>

---

### Multi-select — stability toolkit

<p class="ds-multi-caption">Select <strong>all</strong> that match the opening of the <strong>Stability</strong> section (three main ideas).</p>
<div class="ds-quiz" markdown="1">
<form id="form-dsplan-ms1">
  <label class="ds-choice"><input type="checkbox" name="dsplan-ms1" value="lyap"> <span>Lyapunov functions (LF)</span></label>
  <label class="ds-choice"><input type="checkbox" name="dsplan-ms1" value="contr"> <span>Contraction theory (CT)</span></label>
  <label class="ds-choice"><input type="checkbox" name="dsplan-ms1" value="diffeo"> <span>Diffeomorphic transformations</span></label>
  <label class="ds-choice"><input type="checkbox" name="dsplan-ms1" value="rrt"> <span>RRT and PRM sampling algorithms</span></label>
  <label class="ds-choice"><input type="checkbox" name="dsplan-ms1" value="pid"> <span>Classical PID tuning only</span></label>
  <div class="ds-quiz-actions"><button type="button" onclick="checkMultipleAnswers('dsplan-ms1',['lyap','contr','diffeo'],'✅ Yes — those three are the pillars named at the start of Stability.','❌ Re-read the first paragraph of the Stability section: three approaches are listed.')">Check my answer</button></div>
  <p id="dsplan-ms1-feedback"></p>
</form>
</div>

---

### Extra quick checks — bridge to FDM & code

<div class="ds-quiz" markdown="1">
<p><strong>1.</strong> In the FDM iteration (Iterative Locally Weighted Matching), how is the point \(p_j\) chosen at step \(j\)?</p>
<form id="form-dsplan-mc13">
  <label class="ds-choice"><input type="radio" name="dsplan-mc13" value="far"> <span>Among points in \(Z\), take one that is furthest from its paired target in \(Y\) (worst mismatch).</span></label>
  <label class="ds-choice"><input type="radio" name="dsplan-mc13" value="rand"> <span>Uniform random sample from \(Z\).</span></label>
  <label class="ds-choice"><input type="radio" name="dsplan-mc13" value="mean"> <span>The centroid of \(Z\) only.</span></label>
  <div class="ds-quiz-actions"><button type="button" onclick="checkMCQ('dsplan-mc13','far','✅ Matches the FDM step: select the point in Z furthest from its target in Y.','❌ Re-read the FDM iteration bullet list (select p_j).')">Check my answer</button></div>
  <p id="dsplan-mc13-feedback"></p>
</form>
</div>

<div class="ds-quiz" markdown="1">
<p><strong>2.</strong> The page lists <strong>Neural ODEs for DS</strong> as one family: how is stability often enforced in that setting?</p>
<form id="form-dsplan-mc14">
  <label class="ds-choice"><input type="radio" name="dsplan-mc14" value="spec"> <span>Techniques such as spectral normalization or contraction theory on the learned dynamics.</span></label>
  <label class="ds-choice"><input type="radio" name="dsplan-mc14" value="pid"> <span>By fixing PID gains only.</span></label>
  <label class="ds-choice"><input type="radio" name="dsplan-mc14" value="none"> <span>Stability is never discussed for neural DS.</span></label>
  <div class="ds-quiz-actions"><button type="button" onclick="checkMCQ('dsplan-mc14','spec','✅ Consistent with the Neural ODEs for DS bullet (spectral norm / contraction).','❌ Find the Neural ODEs for DS bullet under Classical DS models.')">Check my answer</button></div>
  <p id="dsplan-mc14-feedback"></p>
</form>
</div>

<div class="ds-quiz" markdown="1">
<p><strong>3.</strong> Evaluation in the tutorial compares trajectories using which metrics (as listed under <em>Evaluation &amp; Visualization</em>)?</p>
<form id="form-dsplan-mc15">
  <label class="ds-choice"><input type="radio" name="dsplan-mc15" value="rmse"> <span>RMSE, DTWD, and Fréchet distance (among others in the pipeline).</span></label>
  <label class="ds-choice"><input type="radio" name="dsplan-mc15" value="bleu"> <span>BLEU score and perplexity only.</span></label>
  <label class="ds-choice"><input type="radio" name="dsplan-mc15" value="fps"> <span>Frames per second of the camera only.</span></label>
  <div class="ds-quiz-actions"><button type="button" onclick="checkMCQ('dsplan-mc15','rmse','✅ The code overview lists RMSE, DTWD, and Fréchet distance.','❌ Skim the Evaluation & Visualization bullet list in Code Structure Overview.')">Check my answer</button></div>
  <p id="dsplan-mc15-feedback"></p>
</form>
</div>

</details>

#### Code Structure Overview

The purpose of this code framework is fourfold:
- Define the core scenario: DS-based skill learning and generalization via geometric configuration
- Provide a concise yet representative example to demonstrate key concepts
- Offer modular code and rich visualizations to facilitate learner understanding
- Enable method comparison and metric selection for objective evaluation


The repository is organized into modular components that follow the stages outlined in the DS diffeomorphic mapping tutorial:

1. **Toy Data Generation**
   - Generates synthetic trajectories based on LASA handwriting data.
   - Supports both 2D S-shaped curves and 3D curved surfaces for refinement.
   - Visualizes raw and target trajectories.

    <figure id="fig2">
      <img src="{{ site.baseurl }}/assets/images/DS-based-planning/Picture1.png" alt="toy data" width="600">
      <figcaption><center><em>Figure: The toy data generated by our code structure. Left: 2D LASA handwrite data; Right: 3D toy data</em></center>  </figcaption>
    </figure>

2. **Mapping Methods choice**
   - **τ-SEDS**: Stable Estimation of Dynamical Systems using Gaussian mixture models.
   - **Fast Diffeomorphic Mapping**: Efficient algorithms for time-variant diffeomorphic transformations.
   - **Euclideanizing Flows**: Flow-based models that map curved dynamics into Euclidean latent spaces.
   - **Imitation Flows**: Neural network–based residual flows for trajectory imitation.
   - **More ...**: 

3. **Training Pipeline**
   - Constructs latent space structure and prepares paired datasets. We can construct the latent space using either a linear or a quadratic form.
    <figure id="fig3">
      <img src="{{ site.baseurl }}/assets/images/DS-based-planning/Picture5.png" alt="latent space" width="600">
      <figcaption><center><em>Figure: The latent-space vector field and its potential energy. Left: Vector field; Right: Potential energy</em></center>  </figcaption>
    </figure>
      
   - Obtain the training dataset for both latent and original spaces.
    <figure id="fig4">
      <img src="{{ site.baseurl }}/assets/images/DS-based-planning/Picture7.png" alt="linearize" width="300">
      <figcaption><center><em>Figure: The original dataset and its linearized counterpart.</em></center>  </figcaption>
    </figure>

   - Selects model parameters and network architecture via command-line interface.
    <figure id="fig5">
      <img src="{{ site.baseurl }}/assets/images/DS-based-planning/Picture8.png" alt="NN structure" width="600">
      <figcaption><center><em>Figure: Common neural network architectures commonly used for training DS mappings.</em></center>  </figcaption>
    </figure>

   - Design the neural network architecture (Option).
   - Training scripts (`train_*.py`) log progress, plot loss curves, and save checkpoints.

4. **Evaluation & Visualization**
   - Computes metrics: Root Mean Squared Error (RMSE), Dynamic Time Warping Distance (DTWD), and Fréchet Distance (FD).
   - Vector field simulation to test learned DS trajectories against ground truth.
   - Plotting utilities for 2D, 3D, and vector field visualizations.

   **here we will have a interaction interface to direct test code**

   <div class="ds-tutor-panel" markdown="0">
    <div class="ds-tutor-head">Tutorial_DS_mapping — Interactive Interface</div>
    <iframe src="http://127.0.0.1:3000" title="Tutorial DS Mapping — interactive view and plots" loading="lazy"></iframe>
     <div class="ds-tutor-foot">
       <a href="http://127.0.0.1:3000" target="_blank" rel="noopener noreferrer">Open in full tab</a>
      · Frontend URL: <code>http://127.0.0.1:3000</code>
     </div>
   </div>

5. **Utilities**
   - Common functions for data loading, logging, and plotting.
   - Configuration loader and argument parsers.

---

<details markdown="1" class="ds-learn-break ds-section-game">
<summary><strong>Section game — Code Framework and Evaluation</strong></summary>
<p><strong>Q45.</strong> Purpose of code framework? <strong>(Answer: C)</strong></p>
<p><strong>Q48.</strong> Role of visualization tools? <strong>(Answer: C)</strong></p>
</details>

##### Getting Started

```bash
# Clone the repository
git clone https://github.com/RLoad/Tutorial_DS_mapping.git
cd Tutorial_DS_mapping

# Create a virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### Want to implement a real project?

[TODO]

</div>

## Credits

## References

1. <a id="ref1"></a>Argall, B. D., Chernova, S., Veloso, M., & Browning, B. (2009). *A survey of robot learning from demonstration.* Robotics and Autonomous Systems, 57(5), 469–483.  
2. <a id="ref2"></a>Khansari-Zadeh, S. M., & Billard, A. (2011). *Learning stable nonlinear dynamical systems with Gaussian mixture models.* IEEE Transactions on Robotics, 27(5), 943–957.  
3. <a id="ref3"></a>Pastor, P., Hoffmann, H., Asfour, T., & Schaal, S. (2009). *Learning and generalization of motor skills by learning from demonstration.* In 2009 IEEE International Conference on Robotics and Automation (ICRA) (pp. 763–768).  
4. <a id="ref4"></a>Khansari-Zadeh, S. M., & Billard, A. (2014). *Learning control Lyapunov functions to ensure stability of dynamical system–based robot reaching motions.* Robotics and Autonomous Systems, 62(6), 752–765.  
5. <a id="ref5"></a>Khansari-Zadeh, S. M., & Billard, A. (2012). *A dynamical system approach to real-time obstacle avoidance.* Autonomous Robots, 32(4), 433–454.  
6. <a id="ref6"></a>Kronander, K., Khansari-Zadeh, S. M., & Billard, A. (2015). *Incremental motion learning with locally modulated dynamical systems.* Robotics and Autonomous Systems, 70, 52–62.  
7. <a id="ref7"></a>Kolter, J. Z., & Manek, G. (2019). *Learning stable deep dynamics models.* Advances in Neural Information Processing Systems, 32, 11128–11136.  
8. <a id="ref8"></a>Kang, Q., Song, Y., Ding, Q., & Tay, W. P. (2021). *Stable Neural ODE with Lyapunov-Stable Equilibrium Points for Defending Against Adversarial Attacks.* In Advances in Neural Information Processing Systems, 34, 14925–14937.  
9. <a id="ref9"></a>Khansari-Zadeh, S. M., & Billard, A. (2014). *The LASA handwriting dataset for evaluation of trajectory generation algorithms.* Technical Report, LASA Lab, EPFL.  
10. <a id="ref10"></a>Neumann, K., & Steil, J. J. (2015). *Learning robot motions with stable dynamical systems under diffeomorphic transformations.* Robotics and Autonomous Systems, 70, 1–15.  
11. <a id="ref11"></a>Lee, J. M. (2013). *Introduction to Smooth Manifolds* (2nd ed., Graduate Texts in Mathematics, Vol. 218). Springer.  
12. <a id="ref12"></a>Perrin, N., & Schlehuber‐Caissier, P. (2016). *Fast diffeomorphic matching to learn globally asymptotically stable nonlinear dynamical systems.* Systems & Control Letters, 96, 51–59.  
13. <a id="ref13"></a>Rana, M. A., Li, A., Fox, D., Boots, B., Ramos, F., & Ratliff, N. (2020). *Euclideanizing flows: Diffeomorphic reduction for learning stable dynamical systems.* In Learning for Dynamics and Control (pp. 630–639). PMLR.  
14. <a id="ref14"></a>Urain, J., Ginesi, M., Tateo, D., & Peters, J. (2020). *ImitationFlow: Learning deep stable stochastic dynamical systems by normalizing flows.* In 2020 IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS) (pp. 5231–5237).  
15. <a id="ref15"></a>Saveriano, M., Abu-Dakka, F. J., & Kyrki, V. (2023). *Learning stable robotic skills on Riemannian manifolds.* Robotics and Autonomous Systems, 169, 104510.  
16. <a id="ref16"></a>Gupta, S., Nayak, A., & Billard, A. (2022). *Learning high dimensional demonstrations using Laplacian eigenmaps.* IEEE Robotics and Automation Letters, 7(4), 10219–10226.  
17. <a id="ref17"></a>Ravanbakhsh, H., & Sankaranarayanan, S. (2019). *Learning control-Lyapunov functions from counterexamples and demonstrations.* Autonomous Robots, 43, 275–307.  
18. <a id="ref18"></a>Jin, Z., Si, W., Liu, A., Zhang, W. A., Yu, L., & Yang, C. (2023). *Learning a flexible neural energy function with a unique minimum for globally stable and accurate demonstration learning.* IEEE Transactions on Robotics, 39(6), 4520–4538.  
19. <a id="ref19"></a>Zhi, W., Lai, T., Ott, L., & Ramos, F. (2022). *Diffeomorphic Transforms for Generalised Imitation Learning.* In Learning for Dynamics and Control, 23, 508–519.  
20. <a id="ref20"></a>Huber, L., Slotine, J. J., & Billard, A. (2023). *Avoidance of concave obstacles through rotation of nonlinear dynamics.* IEEE Transactions on Robotics, 40, 1983–2002.  
21. <a id="ref21"></a>Boumal, N. (2023). *An Introduction to Optimization on Smooth Manifolds* (2nd ed.). Cambridge University Press. ISBN 978-1108426292.
22. 

**Want to learn more ? --> Free Online Courses** TODO?

**Books**

- [Learning for Adaptive and Reactive Robot Control: A Dynamical Systems Approach](https://www.epfl.ch/labs/lasa/mit-press-book-learning/) (Chapter 9: Obstacle avoidance with Dynamical Systems)



[Back to Top](#start)