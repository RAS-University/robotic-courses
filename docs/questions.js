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