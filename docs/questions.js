/** Shared feedback styling (works with .ds-feedback in custom / page CSS) */
function applyFeedbackStyles(feedbackEl, state) {
  if (!feedbackEl) return;
  feedbackEl.classList.remove(
    'ds-feedback--hint', 'ds-feedback--correct', 'ds-feedback--wrong', 'ds-feedback--partial'
  );
  feedbackEl.classList.add('ds-feedback');
  if (state === 'correct') {
    feedbackEl.classList.add('ds-feedback--correct', 'ds-attempted');
  } else if (state === 'wrong') {
    feedbackEl.classList.add('ds-feedback--wrong', 'ds-attempted');
  } else if (state === 'partial') {
    feedbackEl.classList.add('ds-feedback--partial', 'ds-attempted');
  } else {
    feedbackEl.classList.add('ds-feedback--hint');
  }
  feedbackEl.setAttribute('role', 'status');
  feedbackEl.setAttribute('aria-live', 'polite');
  if (state === 'correct' && !feedbackEl.hasAttribute('data-ds-restore')) {
    window.dispatchEvent(
      new CustomEvent('ds-correct-answer', {
        detail: { feedbackId: feedbackEl.id || null },
      })
    );
  }
  if (state === 'wrong' && !feedbackEl.hasAttribute('data-ds-restore')) {
    window.dispatchEvent(
      new CustomEvent('ds-wrong-answer', {
        detail: { feedbackId: feedbackEl.id || null },
      })
    );
  }
  if (typeof updateDSProgressBar === 'function') updateDSProgressBar();
  if (
    typeof persistDSFeedbackState === 'function' &&
    !feedbackEl.hasAttribute('data-ds-restore') &&
    (state === 'correct' || state === 'wrong' || state === 'partial')
  ) {
    persistDSFeedbackState(feedbackEl, state);
  }
}

function getDSPageStorageKey() {
  const page = document.querySelector('.ds-page[data-ds-storage-key]');
  return page ? page.getAttribute('data-ds-storage-key') : null;
}

function persistDSFeedbackState(feedbackEl, state) {
  const sk = getDSPageStorageKey();
  if (!sk || !feedbackEl.id) return;
  try {
    const storageKey = `ds-feedback:${sk}`;
    const raw = sessionStorage.getItem(storageKey);
    const data = raw ? JSON.parse(raw) : {};
    data[feedbackEl.id] = state;
    sessionStorage.setItem(storageKey, JSON.stringify(data));
  } catch (e) {
    /* ignore quota / private mode */
  }
}

function restoreDSFeedbackFromSession() {
  const sk = getDSPageStorageKey();
  if (!sk) return;
  let data;
  try {
    const raw = sessionStorage.getItem(`ds-feedback:${sk}`);
    if (!raw) return;
    data = JSON.parse(raw);
  } catch (e) {
    return;
  }
  const msg =
    'Result from this browser session — use Check again to refresh the full explanation.';
  Object.entries(data).forEach(([id, state]) => {
    if (!['correct', 'wrong', 'partial'].includes(state)) return;
    const el = document.getElementById(id);
    if (!el || !el.closest('.ds-page')) return;
    el.setAttribute('data-ds-restore', '1');
    el.textContent = msg;
    applyFeedbackStyles(el, state);
    el.removeAttribute('data-ds-restore');
  });
}

function clearDSPageSessionProgress() {
  const sk = getDSPageStorageKey();
  if (!sk) return;
  try {
    sessionStorage.removeItem(`ds-feedback:${sk}`);
  } catch (e) {
    /* ignore */
  }
  window.location.reload();
}

/** Progress strip for pages with .ds-page (DS-planning, etc.) */
function updateDSProgressBar() {
  const page = document.querySelector('.ds-page');
  const bar = document.getElementById('ds-progress-bar');
  const label = document.getElementById('ds-progress-label');
  const track = document.getElementById('ds-progress-track');
  if (!page || !bar || !label) return;
  const total =
    page.querySelectorAll('.ds-quiz').length +
    page.querySelectorAll('.ds-drag-game').length;
  const attempted = page.querySelectorAll('.ds-feedback.ds-attempted').length;
  const correct = page.querySelectorAll('.ds-feedback.ds-feedback--correct').length;
  const pct = total ? Math.min(100, Math.round((attempted / total) * 100)) : 0;
  bar.style.width = `${pct}%`;
  label.textContent = `${attempted}/${total} checked · ${correct} correct`;
  if (track) {
    track.setAttribute('aria-valuenow', String(pct));
    track.setAttribute('aria-valuemax', '100');
  }
}

/** Jump to a random quiz or drag-and-drop block */
function scrollToRandomInteractive() {
  const page = document.querySelector('.ds-page');
  if (!page) return;
  const nodes = page.querySelectorAll('.ds-quiz, .ds-drag-game');
  if (!nodes.length) return;
  const el = nodes[Math.floor(Math.random() * nodes.length)];
  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  el.classList.add('ds-highlight-flash');
  setTimeout(() => el.classList.remove('ds-highlight-flash'), 1400);
}

/** Reveal a hidden hint block (id without #) */
function revealDSBlock(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.hidden = false;
  el.setAttribute('aria-hidden', 'false');
  const btn = document.querySelector(`[data-ds-reveal-for="${id}"]`);
  if (btn) btn.setAttribute('hidden', '');
}

/** Emoji prefixes for DS-planning “On this page” TOC (kramdown anchor ids) */
const DS_PLANNING_TOC_EMOJI = {
  '#start': '📘',
  '#prerequisites': '📋',
  '#general-motivation': '💡',
  '#course-content': '📚',
  '#dynamical-systemsbased-planning-overview': '📖',
  '#motivation--programming-by-demonstration': '🎯',
  '#classical-ds-models': '🔧',
  '#benchmarks--tools': '📊',
  '#stability': '⚖️',
  '#lyapunov-stability': '📐',
  '#contraction-theory': '📏',
  '#diffeomorphic-mapping': '🔄',
  '#diffeomorphic-mapping-for-ds': '🔀',
  '#why-diffeomorphic-mapping--stabilityaccuracy-dilemma': '⚡',
  '#theory-of-diffeomorphic-transformations-22': '📓',
  '#how-to-build-a-diffeomorphic-mapping-for-ds': '🗺',
  '#key-challenges': '❗',
  '#state-of-the-art-approaches-to-training-the-mapping': '🚀',
  '#fast-diffeomorphic-matching-fdm': '⚙️',
  '#iterative-locally-weighted-matching': '🔁',
  '#pseudo-code': '💻',
  '#euclideanizing-flows-e-flow': '🌊',
  '#learning-objective-from-demonstrations': '🎓',
  '#kernelized-coupling-layers': '🧩',
  '#imitation-flow': '💧',
  '#model-formulation': '📝',
  '#equivalent-dynamics-in-the-observation-space': '👁',
  '#learning-algorithm': '🧠',
  '#pseudo-code-1': '💻',
  '#programming-exercise-for-classical-methods': '🧪',
  '#tutroial-code-repository': '📦',
  '#methods-list': '📑',
  '#game-2--sort-statements-by-model-family': '🎲',
  '#multi-select--stability-toolkit': '✅',
  '#extra-quick-checks--bridge-to-fdm--code': '⏩',
  '#code-structure-overview': '🗂',
  '#getting-started': '▶️',
  '#want-to-implement-a-real-project': '🛠️',
  '#credits': '✨',
  '#references': '🔗',
};

function applyDsPlanningTocEmojis() {
  const panel = document.querySelector('.ds-toc-panel #markdown-toc');
  if (!panel) return;
  // Main TOC row links only (skip nested <a href="#ref…"> inside a title)
  panel.querySelectorAll('a[id^="markdown-toc-"]').forEach((a) => {
    if (a.querySelector('.ds-toc-emoji')) return;
    const href = a.getAttribute('href');
    const emoji = DS_PLANNING_TOC_EMOJI[href];
    if (!emoji) return;
    const span = document.createElement('span');
    span.className = 'ds-toc-emoji';
    span.setAttribute('aria-hidden', 'true');
    span.textContent = `${emoji}\u00A0`;
    const tocNum = a.querySelector('.toc-number');
    if (tocNum) tocNum.parentNode.insertBefore(span, tocNum);
    else a.insertBefore(span, a.firstChild);
  });
}

// Generalized True/False checking function
function checkTrueFalse(questionId, correctAnswer, correctMessage, incorrectMessage) {
  const options = document.getElementsByName(questionId);
  let selectedValue = null;

  for (let i = 0; i < options.length; i++) {
    if (options[i].checked) {
      selectedValue = options[i].value;
      break;
    }
  }

  const feedback = document.getElementById(questionId + '-feedback');

  if (!selectedValue) {
    feedback.textContent = "Please select an option.";
    applyFeedbackStyles(feedback, 'hint');
    return;
  }

  if (selectedValue === correctAnswer) {
    feedback.textContent = correctMessage;
    applyFeedbackStyles(feedback, 'correct');
  } else {
    feedback.textContent = incorrectMessage;
    applyFeedbackStyles(feedback, 'wrong');
  }
}

// with MathJax support
function checkTrueFalse2(questionId, correctAnswer, correctMessage, incorrectMessage) {
  const options = document.getElementsByName(questionId);
  let selectedValue = null;

  for (let i = 0; i < options.length; i++) {
    if (options[i].checked) { selectedValue = options[i].value; break; }
  }

  const feedback = document.getElementById(questionId + '-feedback');

  if (!selectedValue) {
    feedback.textContent = "Please select an option.";
    applyFeedbackStyles(feedback, 'hint');
    return;
  }

  const ok = (selectedValue === correctAnswer);
  feedback.innerHTML = ok ? correctMessage : incorrectMessage;  // <-- use innerHTML
  applyFeedbackStyles(feedback, ok ? 'correct' : 'wrong');

  // Re-typeset just this feedback node (MathJax v3)
  if (window.MathJax && MathJax.typesetPromise) {
    MathJax.typesetPromise([feedback]);
  }
  // Or, if using KaTeX auto-render:
  else if (window.renderMathInElement) {
    renderMathInElement(feedback, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "\\(", right: "\\)", display: false },
        { left: "$", right: "$", display: false }
      ],
      throwOnError: false
    });
  }
}


// Generalized MCQ checking function
function checkMCQ(questionId, correctAnswer, correctMessage, incorrectMessage) {
  const options = document.getElementsByName(questionId);
  let selectedValue = null;

  for (let i = 0; i < options.length; i++) {
    if (options[i].checked) {
      selectedValue = options[i].value;
      break;
    }
  }

  const feedback = document.getElementById(questionId + '-feedback');

  if (!selectedValue) {
    feedback.textContent = "Please select an option.";
    applyFeedbackStyles(feedback, 'hint');
    return;
  }

  if (selectedValue === correctAnswer) {
    feedback.textContent = correctMessage;
    applyFeedbackStyles(feedback, 'correct');
  } else {
    feedback.textContent = incorrectMessage;
    applyFeedbackStyles(feedback, 'wrong');
  }
}

function checkMultipleTrueFalse(questionId, correctAnswers, correctMessage, incorrectMessage) {
  const options = document.getElementsByName(questionId);
  const selected = [];

  for (let opt of options) {
    if (opt.checked) selected.push(opt.value);
  }

  const feedback = document.getElementById(`${questionId}-feedback`);

  if (selected.length === 0) {
    feedback.textContent = "Please select at least one option.";
    applyFeedbackStyles(feedback, 'hint');
    return;
  }

  const allCorrect =
    selected.length === correctAnswers.length &&
    selected.every(v => correctAnswers.includes(v));

  if (allCorrect) {
    feedback.textContent = correctMessage;
    applyFeedbackStyles(feedback, 'correct');
  } else {
    feedback.textContent = incorrectMessage;
    applyFeedbackStyles(feedback, 'wrong');
  }
}

function checkMultipleTrueFalseRadio(questionId, answerMap, incorrectMessage) {
  const options = document.getElementsByName(questionId);
  let selected = null;

  for (let opt of options) {
    if (opt.checked) {
      selected = opt.value;
      break;
    }
  }

  const feedback = document.getElementById(`${questionId}-feedback`);

  if (!selected) {
    feedback.textContent = "Please select an option.";
    applyFeedbackStyles(feedback, 'hint');
    return;
  }

  if (answerMap[selected]) {
    feedback.textContent = answerMap[selected];
    applyFeedbackStyles(feedback, 'correct');
  } else {
    feedback.textContent = incorrectMessage;
    applyFeedbackStyles(feedback, 'wrong');
  }
}


// Function to toggle the answer visibility for each question
function showAnswer(questionId) {
  var answerDiv = document.getElementById("answer-" + questionId);
  if (answerDiv.style.display === "none") {
    answerDiv.style.display = "block";  // Show the answers
  } else {
    answerDiv.style.display = "none";   // Hide the answers
  }
}

function checkMultipleAnswers(questionId, correctAnswers, correctMessage, incorrectMessage) {
  const options = document.getElementsByName(questionId);
  let selectedValues = [];

  for (let i = 0; i < options.length; i++) {
    if (options[i].checked) {
      selectedValues.push(options[i].value);
    }
  }

  const feedback = document.getElementById(questionId + '-feedback');

  if (selectedValues.length === 0) {
    feedback.innerHTML = "Please select at least one option.";
    applyFeedbackStyles(feedback, 'hint');
    return;
  }

  const correctCount = selectedValues.filter(value => correctAnswers.includes(value)).length;
  const incorrectCount = selectedValues.length - correctCount;

  if (correctCount === correctAnswers.length && incorrectCount === 0) {
    feedback.innerHTML = correctMessage; // All correct
    applyFeedbackStyles(feedback, 'correct');
  } else if (correctCount > 0) {
    feedback.innerHTML = `<strong>Partially correct!</strong> You selected ${correctCount} out of ${correctAnswers.length} correct answers.`;
    applyFeedbackStyles(feedback, 'partial');
  } else {
    feedback.innerHTML = incorrectMessage; // None correct
    applyFeedbackStyles(feedback, 'wrong');
  }
}

// General drag-and-drop event handlers
function allowDrop(ev) {
  ev.preventDefault();
  const zone = ev.currentTarget;
  if (zone && zone.classList && zone.classList.contains('drop-zone')) {
    document.querySelectorAll('.drop-zone').forEach((z) => {
      if (z !== zone) z.classList.remove('drop-zone--drag-over');
    });
    zone.classList.add('drop-zone--drag-over');
  }
}

function drag(ev) {
  ev.dataTransfer.setData("id", ev.target.id);
  if (ev.target.classList && ev.target.classList.contains('drag-item')) {
    ev.target.classList.add('drag-item--dragging');
  }
}

function dragEnd(ev) {
  if (ev.target.classList && ev.target.classList.contains('drag-item')) {
    ev.target.classList.remove('drag-item--dragging');
  }
  document.querySelectorAll('.drop-zone--drag-over').forEach((z) => z.classList.remove('drop-zone--drag-over'));
}

function drop(ev) {
  ev.preventDefault();
  const zone = ev.target.closest ? ev.target.closest('.drop-zone') : null;
  if (!zone) return;

  const draggedId = ev.dataTransfer.getData("id");
  const draggedElement = document.getElementById(draggedId);

  if (draggedElement && zone !== draggedElement.parentElement) {
    zone.appendChild(draggedElement);
  }
}

// Generalized function to check drag-and-drop answers
function checkDragDropAnswer(correctMapping, feedbackId) {
  document.querySelectorAll('.drop-zone').forEach((z) => {
    z.classList.remove('drop-zone--ok', 'drop-zone--bad');
  });
  document.querySelectorAll('.drag-item').forEach((el) => {
    el.classList.remove('drag-item--wrong-zone', 'drag-item--correct');
  });

  let totalCorrect = 0;
  let totalItems = 0;
  let allZonesPerfect = true;

  for (const [zoneId, correctItems] of Object.entries(correctMapping)) {
    const zone = document.getElementById(zoneId);
    const userItems = Array.from(document.querySelectorAll(`#${zoneId} .drag-item`)).map((e) => e.id);
    totalItems += correctItems.length;

    correctItems.forEach((item) => {
      if (userItems.includes(item)) totalCorrect += 1;
    });

    const wrongInZone = userItems.filter((id) => !correctItems.includes(id));
    const missing = correctItems.filter((id) => !userItems.includes(id));
    const zonePerfect =
      wrongInZone.length === 0 &&
      missing.length === 0 &&
      userItems.length === correctItems.length;

    if (!zonePerfect) allZonesPerfect = false;

    if (zone) {
      if (zonePerfect) zone.classList.add('drop-zone--ok');
      else zone.classList.add('drop-zone--bad');
    }
    wrongInZone.forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.classList.add('drag-item--wrong-zone');
    });
    userItems.forEach((id) => {
      if (correctItems.includes(id)) {
        const el = document.getElementById(id);
        if (el) el.classList.add('drag-item--correct');
      }
    });
  }

  const feedback = document.getElementById(feedbackId);
  if (!feedback) return;

  const allPerfect = allZonesPerfect && totalCorrect === totalItems && totalItems > 0;

  if (allPerfect) {
    feedback.textContent = `Excellent — all ${totalItems} items are in the right category.`;
    applyFeedbackStyles(feedback, 'correct');
  } else {
    feedback.textContent = `Matched ${totalCorrect}/${totalItems} required placements. Remove distractors from the box or add missing features, then check again.`;
    applyFeedbackStyles(feedback, 'partial');
  }
}

function checkDropdownAnswers(feedbackId) {
  let totalCorrect = 0;
  let totalQuestions = 0;

  document.querySelectorAll("select.answer").forEach(select => {
    const expected = select.getAttribute("data-answer")?.trim().toLowerCase();
    const actual = select.value?.trim().toLowerCase();
    totalQuestions++;

    if (expected === actual && actual !== "") {
      totalCorrect++;
      select.style.backgroundColor = "#c8f7c5"; // green
    } else {
      select.style.backgroundColor = "#f7c5c5"; // red
    }
  });

  const feedback = document.getElementById(feedbackId);
  if (feedback) {
    if (totalCorrect === totalQuestions) {
      feedback.textContent = `Excellent — all ${totalCorrect}/${totalQuestions} answers are correct.`;
      applyFeedbackStyles(feedback, 'correct');
    } else {
      feedback.textContent = `You got ${totalCorrect}/${totalQuestions} correct. Try again!`;
      applyFeedbackStyles(feedback, 'partial');
    }
  }
}

// Specific call for the Serial vs. Parallel Robot Question
function checkRobotStructure() {
  checkDragDropAnswer(
    {
      "serial-zone": ["open-chain", "serially-linked"],
      "parallel-zone": ["closed-chain"],
    },
    "robot-feedback"
  );
}




function approxEqual(val, target, absTol, relTol) {
  const diff = Math.abs(val - target);
  const rel = Math.abs(diff / (Math.abs(target) + 1e-12));
  return (diff <= absTol) || (rel <= relTol);
}

function checkCh1Hard() {
  // Ground-truth values (computed from problem statement)
  const delta = 165 / 4096;                 // °C/LSB
  const sigma_q = delta / Math.sqrt(12);    // °C
  const sigma_random = 0.30;                // °C
  const sigma_single = Math.sqrt(sigma_random ** 2 + sigma_q ** 2); // combined
  const Mmin = Math.ceil((sigma_single / 0.10) ** 2);             // target 0.10 °C
  const fs = 10;                             // Hz
  const delay = (Mmin - 1) / (2 * fs);       // seconds, moving average
  const tau = 0.8;                            // s
  const f3db = 1 / (2 * Math.PI * tau);       // Hz
  const f = 0.20;                             // Hz
  const r = f / f3db;
  const atten = 1 / Math.sqrt(1 + r * r);       // first-order LP magnitude
  const sigma_avg = sigma_single / Math.sqrt(Mmin); // post-average std
  const bias = 0.6;                           // °C

  // User inputs
  const u_delta = parseFloat(document.getElementById('hard-delta').value);
  const u_sigmaq = parseFloat(document.getElementById('hard-sigmaq').value);
  const u_M = parseFloat(document.getElementById('hard-M').value);
  const u_delay = parseFloat(document.getElementById('hard-delay').value);
  const u_f3db = parseFloat(document.getElementById('hard-f3db').value);
  const u_atten = parseFloat(document.getElementById('hard-atten').value);
  const u_sigmaavg = parseFloat(document.getElementById('hard-sigmaavg').value);
  const u_bias = parseFloat(document.getElementById('hard-bias').value);

  let results = [];

  // Tolerances (abs, rel)
  const ok_delta = approxEqual(u_delta, delta, 0.001, 0.05);   // ±0.001 abs or ±5%
  const ok_sigmaq = approxEqual(u_sigmaq, sigma_q, 0.001, 0.08);   // ±0.001 abs or ±8%
  const ok_M = (Math.round(u_M) === Mmin);
  const ok_delay = approxEqual(u_delay, delay, 0.03, 0.07);   // ±0.03 s or ±7%
  const ok_f3db = approxEqual(u_f3db, f3db, 0.002, 0.02);   // tight
  const ok_atten = approxEqual(u_atten, atten, 0.02, 0.03);   // ±0.02 abs or ±3%
  const ok_sigmaavg = approxEqual(u_sigmaavg, sigma_avg, 0.01, 0.08);   // ±0.01 °C or ±8%
  const ok_bias = approxEqual(u_bias, bias, 0.05, 0.05);   // ±0.05 °C or ±5%

  results.push(ok_delta ? "✅ 1) Resolution correct" : "❌ 1) Resolution off");
  results.push(ok_sigmaq ? "✅ 2) Quantization σ correct" : "❌ 2) Quantization σ off");
  results.push(ok_M ? "✅ 3) M (length) correct" : "❌ 3) M (length) should be an integer ≥ required minimum");
  results.push(ok_delay ? "✅ 4) Moving-average delay correct" : "❌ 4) Delay off");
  results.push(ok_f3db ? "✅ 5) f₃dB correct" : "❌ 5) f₃dB off");
  results.push(ok_atten ? "✅ 6) First-order amplitude ratio correct" : "❌ 6) Amplitude ratio off");
  results.push(ok_sigmaavg ? "✅ 7) Post-average σ correct" : "❌ 7) Post-average σ off");
  results.push(ok_bias ? "✅ 8) Bias (accuracy error) correct" : "❌ 8) Bias (accuracy error) off");

  const allOk = ok_delta && ok_sigmaq && ok_M && ok_delay && ok_f3db && ok_atten && ok_sigmaavg && ok_bias;

  let fb = results.join("<br>");
  if (allOk) {
    fb = "🎉 All answers correct!<br>" + fb;
  }
  document.getElementById('ch1-hard-feedback').innerHTML = fb;
}

/* ----------------------------------------------------------------------------
 * Full-screen "Good Job!" celebration on correct answer.
 * Listens to the `ds-correct-answer` event dispatched by applyFeedbackStyles().
 * Self-contained: injects its own styles + DOM on first use.
 * -------------------------------------------------------------------------- */
(function setupDSGoodJobOverlay() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const STYLE_ID = 'ds-goodjob-style';
  const OVERLAY_ID = 'ds-goodjob-overlay';
  const DURATION_MS = 1800;
  const CONFETTI_COUNT = 80;
  const PRAISE_WORDS = [
    'Good Job!', 'Awesome!', 'Well done!', 'Nice!', 'Perfect!',
    'Superb!', 'Brilliant!', 'Excellent!', 'Fantastic!', 'Amazing!'
  ];

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      #${OVERLAY_ID} {
        position: fixed;
        inset: 0;
        z-index: 2147483646;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
        background: radial-gradient(ellipse at center,
                    rgba(79, 70, 229, 0.18) 0%,
                    rgba(15, 23, 42, 0.55) 70%,
                    rgba(15, 23, 42, 0.78) 100%);
        opacity: 0;
        transition: opacity 220ms ease-out;
        overflow: hidden;
      }
      #${OVERLAY_ID}.ds-gj-show { opacity: 1; pointer-events: auto; }
      #${OVERLAY_ID} .ds-gj-text {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                     "Helvetica Neue", Arial, sans-serif;
        font-weight: 900;
        font-size: clamp(3.5rem, 14vw, 11rem);
        letter-spacing: -0.04em;
        line-height: 1;
        color: #fff;
        text-shadow:
          0 4px 0 #4338ca,
          0 8px 24px rgba(79, 70, 229, 0.55),
          0 16px 60px rgba(0, 0, 0, 0.35);
        background: linear-gradient(135deg, #fde68a 0%, #f59e0b 35%, #ec4899 70%, #6366f1 100%);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        transform: scale(0.4) rotate(-8deg);
        animation: dsGjPop 1.6s cubic-bezier(0.18, 1.3, 0.4, 1) forwards;
        text-align: center;
        padding: 0 1rem;
        user-select: none;
      }
      #${OVERLAY_ID} .ds-gj-sub {
        position: absolute;
        bottom: 18%;
        left: 0; right: 0;
        text-align: center;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        font-size: clamp(1rem, 2vw, 1.4rem);
        font-weight: 600;
        color: rgba(255, 255, 255, 0.92);
        letter-spacing: 0.05em;
        text-transform: uppercase;
        opacity: 0;
        animation: dsGjSubIn 0.6s ease-out 0.35s forwards;
      }
      #${OVERLAY_ID} .ds-gj-ring {
        position: absolute;
        top: 50%; left: 50%;
        width: 30vmin;
        height: 30vmin;
        border: 4px solid rgba(255, 255, 255, 0.85);
        border-radius: 50%;
        transform: translate(-50%, -50%) scale(0.2);
        opacity: 0.9;
        animation: dsGjRing 1.4s ease-out forwards;
      }
      #${OVERLAY_ID} .ds-gj-confetti {
        position: absolute;
        top: -20px;
        width: 10px;
        height: 16px;
        border-radius: 2px;
        opacity: 0;
        animation: dsGjFall var(--ds-gj-dur, 1.8s) linear forwards;
        animation-delay: var(--ds-gj-delay, 0s);
        transform: translateY(-20px) rotate(0deg);
      }
      @keyframes dsGjPop {
        0%   { transform: scale(0.3) rotate(-12deg); opacity: 0; filter: blur(8px); }
        45%  { transform: scale(1.18) rotate(3deg);  opacity: 1; filter: blur(0); }
        65%  { transform: scale(0.96) rotate(-1.5deg); }
        100% { transform: scale(1) rotate(0deg); opacity: 1; }
      }
      @keyframes dsGjSubIn {
        from { opacity: 0; transform: translateY(12px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes dsGjRing {
        0%   { transform: translate(-50%, -50%) scale(0.2); opacity: 0.9; }
        100% { transform: translate(-50%, -50%) scale(3.4); opacity: 0; }
      }
      @keyframes dsGjFall {
        0%   { transform: translateY(-20px) rotate(0deg);   opacity: 0; }
        8%   { opacity: 1; }
        100% { transform: translateY(110vh) rotate(720deg); opacity: 1; }
      }
      @media (prefers-reduced-motion: reduce) {
        #${OVERLAY_ID} .ds-gj-text,
        #${OVERLAY_ID} .ds-gj-sub,
        #${OVERLAY_ID} .ds-gj-ring,
        #${OVERLAY_ID} .ds-gj-confetti { animation: none !important; }
        #${OVERLAY_ID} .ds-gj-text { transform: none; opacity: 1; }
        #${OVERLAY_ID} .ds-gj-sub  { opacity: 1; }
      }
    `;
    document.head.appendChild(style);
  }

  function buildConfetti(overlay) {
    const colors = ['#f59e0b', '#ec4899', '#6366f1', '#10b981', '#ef4444',
                    '#3b82f6', '#fde68a', '#a855f7'];
    const frag = document.createDocumentFragment();
    for (let i = 0; i < CONFETTI_COUNT; i++) {
      const piece = document.createElement('span');
      piece.className = 'ds-gj-confetti';
      const left = Math.random() * 100;
      const delay = Math.random() * 0.4;
      const dur = 1.4 + Math.random() * 1.2;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const w = 6 + Math.random() * 8;
      const h = 10 + Math.random() * 12;
      piece.style.left = left + 'vw';
      piece.style.background = color;
      piece.style.width = w + 'px';
      piece.style.height = h + 'px';
      piece.style.setProperty('--ds-gj-delay', delay + 's');
      piece.style.setProperty('--ds-gj-dur', dur + 's');
      frag.appendChild(piece);
    }
    overlay.appendChild(frag);
  }

  let isShowing = false;
  let hideTimer = null;

  function showGoodJob() {
    if (isShowing) return;
    isShowing = true;
    injectStyles();

    const old = document.getElementById(OVERLAY_ID);
    if (old) old.remove();

    const overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    overlay.setAttribute('role', 'status');
    overlay.setAttribute('aria-live', 'polite');

    const ring = document.createElement('div');
    ring.className = 'ds-gj-ring';
    overlay.appendChild(ring);

    const text = document.createElement('div');
    text.className = 'ds-gj-text';
    text.textContent = PRAISE_WORDS[Math.floor(Math.random() * PRAISE_WORDS.length)];
    overlay.appendChild(text);

    const sub = document.createElement('div');
    sub.className = 'ds-gj-sub';
    sub.textContent = 'Correct answer · Keep going!';
    overlay.appendChild(sub);

    if (!prefersReducedMotion()) buildConfetti(overlay);

    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add('ds-gj-show'));

    const dismiss = () => {
      if (!overlay.isConnected) return;
      overlay.classList.remove('ds-gj-show');
      setTimeout(() => {
        overlay.remove();
        isShowing = false;
      }, 260);
    };

    overlay.addEventListener('click', dismiss);
    clearTimeout(hideTimer);
    hideTimer = setTimeout(dismiss, DURATION_MS);
  }

  window.addEventListener('ds-correct-answer', showGoodJob);
})();

/* ----------------------------------------------------------------------------
 * Full-screen "Try Again!" animation on wrong answer.
 * Listens to the `ds-wrong-answer` event dispatched by applyFeedbackStyles().
 * Same pattern as the good-job overlay — friendly, encouraging tone.
 * -------------------------------------------------------------------------- */
(function setupDSTryAgainOverlay() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const STYLE_ID = 'ds-tryagain-style';
  const OVERLAY_ID = 'ds-tryagain-overlay';
  const DURATION_MS = 1500;
  const ENCOURAGEMENTS = [
    'Try Again!', 'Not Quite!', 'Almost!', 'Keep Trying!',
    'Give it Another Go!', 'So Close!', 'One More Try!', 'Don’t Give Up!'
  ];

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      #${OVERLAY_ID} {
        position: fixed;
        inset: 0;
        z-index: 2147483646;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
        background: radial-gradient(ellipse at center,
                    rgba(239, 68, 68, 0.18) 0%,
                    rgba(30, 10, 10, 0.55) 70%,
                    rgba(15, 23, 42, 0.78) 100%);
        opacity: 0;
        transition: opacity 200ms ease-out;
        overflow: hidden;
      }
      #${OVERLAY_ID}.ds-ta-show { opacity: 1; pointer-events: auto; }
      #${OVERLAY_ID} .ds-ta-text {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                     "Helvetica Neue", Arial, sans-serif;
        font-weight: 900;
        font-size: clamp(3rem, 12vw, 9.5rem);
        letter-spacing: -0.04em;
        line-height: 1;
        color: #fff;
        text-shadow:
          0 4px 0 #991b1b,
          0 8px 24px rgba(239, 68, 68, 0.55),
          0 16px 60px rgba(0, 0, 0, 0.4);
        background: linear-gradient(135deg, #fca5a5 0%, #ef4444 40%, #f97316 75%, #fbbf24 100%);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        transform: scale(0.5);
        animation: dsTaShake 1.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) forwards;
        text-align: center;
        padding: 0 1rem;
        user-select: none;
      }
      #${OVERLAY_ID} .ds-ta-sub {
        position: absolute;
        bottom: 18%;
        left: 0; right: 0;
        text-align: center;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        font-size: clamp(1rem, 2vw, 1.4rem);
        font-weight: 600;
        color: rgba(255, 255, 255, 0.92);
        letter-spacing: 0.05em;
        text-transform: uppercase;
        opacity: 0;
        animation: dsTaSubIn 0.55s ease-out 0.3s forwards;
      }
      #${OVERLAY_ID} .ds-ta-cross {
        position: absolute;
        top: 50%; left: 50%;
        width: 28vmin;
        height: 28vmin;
        border: 5px solid rgba(252, 165, 165, 0.85);
        border-radius: 50%;
        transform: translate(-50%, -50%) scale(0.2);
        opacity: 0.95;
        animation: dsTaRing 1.3s ease-out forwards;
      }
      @keyframes dsTaShake {
        0%   { transform: scale(0.5) translateX(0);    opacity: 0; filter: blur(8px); }
        20%  { transform: scale(1.15) translateX(-22px); opacity: 1; filter: blur(0); }
        35%  { transform: scale(1.05) translateX(22px); }
        50%  { transform: scale(1.05) translateX(-14px); }
        65%  { transform: scale(1.02) translateX(14px); }
        80%  { transform: scale(1) translateX(-6px); }
        100% { transform: scale(1) translateX(0);     opacity: 1; }
      }
      @keyframes dsTaSubIn {
        from { opacity: 0; transform: translateY(12px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes dsTaRing {
        0%   { transform: translate(-50%, -50%) scale(0.2); opacity: 0.95; border-color: rgba(252,165,165,0.95); }
        100% { transform: translate(-50%, -50%) scale(3.2); opacity: 0; border-color: rgba(252,165,165,0); }
      }
      @media (prefers-reduced-motion: reduce) {
        #${OVERLAY_ID} .ds-ta-text,
        #${OVERLAY_ID} .ds-ta-sub,
        #${OVERLAY_ID} .ds-ta-cross { animation: none !important; }
        #${OVERLAY_ID} .ds-ta-text { transform: none; opacity: 1; }
        #${OVERLAY_ID} .ds-ta-sub  { opacity: 1; }
      }
    `;
    document.head.appendChild(style);
  }

  let isShowing = false;
  let hideTimer = null;

  function showTryAgain() {
    if (isShowing) return;
    isShowing = true;
    injectStyles();

    const old = document.getElementById(OVERLAY_ID);
    if (old) old.remove();

    const overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    overlay.setAttribute('role', 'status');
    overlay.setAttribute('aria-live', 'polite');

    const ring = document.createElement('div');
    ring.className = 'ds-ta-cross';
    overlay.appendChild(ring);

    const text = document.createElement('div');
    text.className = 'ds-ta-text';
    text.textContent = ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)];
    overlay.appendChild(text);

    const sub = document.createElement('div');
    sub.className = 'ds-ta-sub';
    sub.textContent = 'Not the right answer · Have another look!';
    overlay.appendChild(sub);

    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add('ds-ta-show'));

    const dismiss = () => {
      if (!overlay.isConnected) return;
      overlay.classList.remove('ds-ta-show');
      setTimeout(() => {
        overlay.remove();
        isShowing = false;
      }, 240);
    };

    overlay.addEventListener('click', dismiss);
    clearTimeout(hideTimer);
    hideTimer = setTimeout(dismiss, DURATION_MS);
  }

  window.addEventListener('ds-wrong-answer', showTryAgain);
})();

if (typeof document !== 'undefined') {
  document.addEventListener('dragend', dragEnd, true);
  document.addEventListener('DOMContentLoaded', () => {
    if (typeof restoreDSFeedbackFromSession === 'function') restoreDSFeedbackFromSession();
    if (typeof updateDSProgressBar === 'function') updateDSProgressBar();
    // After numbered-toc.js injects .toc-number, prepend emoji in DS-planning TOC
    setTimeout(() => {
      if (typeof applyDsPlanningTocEmojis === 'function') applyDsPlanningTocEmojis();
    }, 0);
  });
}