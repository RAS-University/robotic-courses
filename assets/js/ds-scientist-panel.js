/* Scientist click -> Progress tracker panel (live overview of quizzes on this page).
 * Loaded as an external file so kramdown (Jekyll) does not mangle the JS source.
 */
(function setupDsScientistPanel() {
  if (typeof document === "undefined") return;

  var STYLE_ID = "ds-sci-panel-style";
  var PANEL_ID = "ds-sci-panel";

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;
    var style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = [
      "#" + PANEL_ID + " {",
      "  position: fixed;",
      "  right: 1.1rem;",
      "  bottom: 17.5rem;",
      "  width: min(380px, calc(100vw - 2rem));",
      "  max-height: min(70vh, 600px);",
      "  z-index: 60;",
      "  background: #ffffff;",
      "  border: 1px solid #e2e8f0;",
      "  border-radius: 14px;",
      "  box-shadow: 0 18px 50px -18px rgba(15, 23, 42, 0.35), 0 2px 8px rgba(15, 23, 42, 0.08);",
      "  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;",
      "  color: #0f172a;",
      "  display: none;",
      "  flex-direction: column;",
      "  overflow: hidden;",
      "  transform-origin: 90% 100%;",
      "  opacity: 0;",
      "  transform: translateY(8px) scale(0.96);",
      "  transition: opacity 180ms ease-out, transform 180ms ease-out;",
      "}",
      "#" + PANEL_ID + ".is-open { display: flex; opacity: 1; transform: translateY(0) scale(1); }",
      "#" + PANEL_ID + " .ds-sci-header {",
      "  display: flex; align-items: center; justify-content: space-between;",
      "  padding: 0.65rem 0.65rem 0.6rem 0.9rem;",
      "  background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);",
      "  border-bottom: 1px solid #e2e8f0;",
      "}",
      "#" + PANEL_ID + " .ds-sci-title {",
      "  font-size: 0.82rem; font-weight: 700; letter-spacing: 0.04em;",
      "  text-transform: uppercase; color: #475569;",
      "}",
      "#" + PANEL_ID + " .ds-sci-close {",
      "  appearance: none; background: transparent; border: 0;",
      "  width: 28px; height: 28px; border-radius: 8px;",
      "  color: #64748b; font-size: 1.2rem; line-height: 1; cursor: pointer;",
      "}",
      "#" + PANEL_ID + " .ds-sci-close:hover { background: #e2e8f0; color: #0f172a; }",
      "#" + PANEL_ID + " .ds-sci-overall {",
      "  padding: 0.9rem 1rem 0.95rem;",
      "  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);",
      "  border-bottom: 1px solid #e2e8f0;",
      "}",
      "#" + PANEL_ID + " .ds-sci-overall-row {",
      "  display: flex; align-items: baseline; justify-content: space-between;",
      "  gap: 0.5rem; margin-bottom: 0.55rem;",
      "}",
      "#" + PANEL_ID + " .ds-sci-overall-pct {",
      "  font-size: 1.7rem; font-weight: 800; letter-spacing: -0.03em;",
      "  color: #4f46e5; line-height: 1;",
      "}",
      "#" + PANEL_ID + " .ds-sci-overall-pct.is-complete { color: #16a34a; }",
      "#" + PANEL_ID + " .ds-sci-overall-label { font-size: 0.82rem; font-weight: 600; color: #64748b; }",
      "#" + PANEL_ID + " .ds-sci-track {",
      "  height: 8px; background: #e2e8f0; border-radius: 999px; overflow: hidden;",
      "}",
      "#" + PANEL_ID + " .ds-sci-bar {",
      "  height: 100%; width: 0%;",
      "  background: linear-gradient(90deg, #6366f1 0%, #4f46e5 100%);",
      "  border-radius: 999px;",
      "  transition: width 360ms cubic-bezier(0.22, 1, 0.36, 1);",
      "}",
      "#" + PANEL_ID + " .ds-sci-bar.is-complete {",
      "  background: linear-gradient(90deg, #22c55e 0%, #16a34a 100%);",
      "}",
      "#" + PANEL_ID + " .ds-sci-stats {",
      "  display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.45rem; margin-top: 0.7rem;",
      "}",
      "#" + PANEL_ID + " .ds-sci-stat {",
      "  background: #fff; border: 1px solid #e2e8f0; border-radius: 10px;",
      "  padding: 0.45rem 0.5rem; text-align: center;",
      "}",
      "#" + PANEL_ID + " .ds-sci-stat-num {",
      "  display: block; font-size: 1.1rem; font-weight: 800; line-height: 1.1; color: #0f172a;",
      "}",
      "#" + PANEL_ID + " .ds-sci-stat-num.is-correct { color: #16a34a; }",
      "#" + PANEL_ID + " .ds-sci-stat-num.is-wrong   { color: #dc2626; }",
      "#" + PANEL_ID + " .ds-sci-stat-lbl {",
      "  display: block; margin-top: 2px;",
      "  font-size: 0.68rem; font-weight: 700;",
      "  text-transform: uppercase; letter-spacing: 0.05em; color: #64748b;",
      "}",
      "#" + PANEL_ID + " .ds-sci-body {",
      "  flex: 1; overflow: auto; padding: 0.6rem 0.85rem 0.85rem; background: #fff;",
      "}",
      "#" + PANEL_ID + " .ds-sci-section-title {",
      "  margin: 0.5rem 0 0.4rem; font-size: 0.72rem; font-weight: 700;",
      "  letter-spacing: 0.06em; text-transform: uppercase; color: #94a3b8;",
      "}",
      "#" + PANEL_ID + " .ds-sci-list {",
      "  list-style: none; margin: 0; padding: 0;",
      "  display: flex; flex-direction: column; gap: 0.35rem;",
      "}",
      "#" + PANEL_ID + " .ds-sci-row {",
      "  display: flex; align-items: center; gap: 0.6rem;",
      "  padding: 0.5rem 0.55rem; background: #f8fafc;",
      "  border: 1px solid #e2e8f0; border-radius: 9px;",
      "  cursor: pointer; text-align: left; width: 100%; font: inherit; color: inherit;",
      "  transition: background 120ms, border-color 120ms, transform 120ms;",
      "}",
      "#" + PANEL_ID + " .ds-sci-row:hover {",
      "  background: #eef2ff; border-color: #c7d2fe; transform: translateX(2px);",
      "}",
      "#" + PANEL_ID + " .ds-sci-row .ds-sci-status {",
      "  flex: 0 0 22px; width: 22px; height: 22px; border-radius: 50%;",
      "  background: #e2e8f0; color: #64748b;",
      "  font-size: 0.78rem; font-weight: 800;",
      "  display: inline-flex; align-items: center; justify-content: center; line-height: 1;",
      "}",
      "#" + PANEL_ID + " .ds-sci-row.is-done .ds-sci-status { background: #dcfce7; color: #15803d; }",
      "#" + PANEL_ID + " .ds-sci-row.is-partial .ds-sci-status { background: #fef3c7; color: #b45309; }",
      "#" + PANEL_ID + " .ds-sci-row.is-todo .ds-sci-status { background: #f1f5f9; color: #94a3b8; }",
      "#" + PANEL_ID + " .ds-sci-row-main { flex: 1; min-width: 0; }",
      "#" + PANEL_ID + " .ds-sci-row-name {",
      "  font-size: 0.9rem; font-weight: 600; color: #0f172a; line-height: 1.25;",
      "  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;",
      "}",
      "#" + PANEL_ID + " .ds-sci-row-meta { margin-top: 2px; font-size: 0.74rem; color: #64748b; }",
      "#" + PANEL_ID + " .ds-sci-row-meta .ds-sci-pill {",
      "  display: inline-block; padding: 1px 6px; margin-right: 4px;",
      "  border-radius: 999px; font-weight: 700; font-size: 0.68rem;",
      "  letter-spacing: 0.04em; text-transform: uppercase;",
      "}",
      "#" + PANEL_ID + " .ds-sci-pill.is-correct { background: #dcfce7; color: #15803d; }",
      "#" + PANEL_ID + " .ds-sci-pill.is-wrong   { background: #fee2e2; color: #b91c1c; }",
      "#" + PANEL_ID + " .ds-sci-pill.is-todo    { background: #f1f5f9; color: #64748b; }",
      "#" + PANEL_ID + " .ds-sci-mini {",
      "  margin-top: 6px; height: 4px; background: #e2e8f0;",
      "  border-radius: 999px; overflow: hidden;",
      "}",
      "#" + PANEL_ID + " .ds-sci-mini > span {",
      "  display: block; height: 100%;",
      "  background: linear-gradient(90deg, #6366f1, #4f46e5);",
      "  border-radius: 999px; transition: width 280ms ease;",
      "}",
      "#" + PANEL_ID + " .ds-sci-row.is-done .ds-sci-mini > span {",
      "  background: linear-gradient(90deg, #22c55e, #16a34a);",
      "}",
      "#" + PANEL_ID + " .ds-sci-empty {",
      "  text-align: center; font-size: 0.85rem; color: #94a3b8; padding: 1rem 0.5rem;",
      "}",
      "#" + PANEL_ID + " .ds-sci-footer {",
      "  display: flex; gap: 0.4rem; justify-content: space-between;",
      "  padding: 0.55rem 0.75rem;",
      "  border-top: 1px solid #e2e8f0; background: #f8fafc;",
      "}",
      "#" + PANEL_ID + " .ds-sci-btn {",
      "  appearance: none; border: 1px solid #e2e8f0;",
      "  background: #ffffff; color: #334155;",
      "  font-size: 0.82rem; font-weight: 600;",
      "  padding: 0.42rem 0.75rem; border-radius: 8px; cursor: pointer;",
      "}",
      "#" + PANEL_ID + " .ds-sci-btn:hover { background: #eef2ff; color: #4338ca; border-color: #c7d2fe; }",
      "#" + PANEL_ID + " .ds-sci-btn.is-danger:hover { background: #fee2e2; color: #b91c1c; border-color: #fecaca; }",
      "@media (max-width: 860px) { #" + PANEL_ID + " { bottom: 13rem; right: 0.5rem; } }"
    ].join("\n");
    document.head.appendChild(style);
  }

  function collectProgress() {
    var page = document.querySelector(".ds-page") || document;
    var allQuizzes = Array.prototype.slice.call(page.querySelectorAll(".ds-quiz, .ds-drag-game"));
    var totals = {
      total: allQuizzes.length,
      attempted: page.querySelectorAll(".ds-feedback.ds-attempted").length,
      correct: page.querySelectorAll(".ds-feedback.ds-feedback--correct").length,
      wrong: page.querySelectorAll(".ds-feedback.ds-feedback--wrong").length,
      partial: page.querySelectorAll(".ds-feedback.ds-feedback--partial").length,
      sections: [],
      ungrouped: { total: 0, correct: 0, attempted: 0 }
    };

    var sectionPanels = Array.prototype.slice.call(page.querySelectorAll("details.ds-section-game"));
    var seen = new WeakSet();
    sectionPanels.forEach(function (panel) {
      var summary = panel.querySelector("summary");
      var title = summary ? summary.textContent.replace(/^\s*Section game\s*[\u2014\-]\s*/i, "").trim() : "Section";
      if (!title) title = "Section";
      var quizzes = Array.prototype.slice.call(panel.querySelectorAll(".ds-quiz"));
      quizzes.forEach(function (q) { seen.add(q); });
      var total = quizzes.length;
      var correct = panel.querySelectorAll(".ds-feedback.ds-feedback--correct").length;
      var wrong = panel.querySelectorAll(".ds-feedback.ds-feedback--wrong").length;
      var attempted = panel.querySelectorAll(".ds-feedback.ds-attempted").length;
      totals.sections.push({ title: title, total: total, correct: correct, wrong: wrong, attempted: attempted, el: panel });
    });

    var others = allQuizzes.filter(function (q) {
      if (q.classList.contains("ds-quiz") && seen.has(q)) return false;
      return true;
    });
    others.forEach(function (q) {
      totals.ungrouped.total += 1;
      var fb = q.querySelector(".ds-feedback");
      if (!fb && q.parentElement) fb = q.parentElement.querySelector(".ds-feedback");
      if (!fb) return;
      if (fb.classList.contains("ds-attempted")) totals.ungrouped.attempted += 1;
      if (fb.classList.contains("ds-feedback--correct")) totals.ungrouped.correct += 1;
    });
    return totals;
  }

  function statusFor(section) {
    if (section.total === 0) return { cls: "is-todo", label: "\u2014" };
    if (section.correct >= section.total) return { cls: "is-done", label: "\u2713" };
    if (section.attempted > 0) return { cls: "is-partial", label: String(section.correct) };
    return { cls: "is-todo", label: "0" };
  }

  function renderProgress(panel) {
    var data = collectProgress();
    var bar = panel.querySelector(".ds-sci-bar");
    var pctEl = panel.querySelector(".ds-sci-overall-pct");
    var labelEl = panel.querySelector(".ds-sci-overall-label");
    var statCorrect = panel.querySelector('.ds-sci-stat-num[data-stat="correct"]');
    var statWrong = panel.querySelector('.ds-sci-stat-num[data-stat="wrong"]');
    var statTodo = panel.querySelector('.ds-sci-stat-num[data-stat="todo"]');
    var list = panel.querySelector(".ds-sci-list");

    var pct = data.total ? Math.round((data.correct / data.total) * 100) : 0;
    var isComplete = data.total > 0 && data.correct === data.total;
    bar.style.width = pct + "%";
    bar.classList.toggle("is-complete", isComplete);
    pctEl.textContent = pct + "%";
    pctEl.classList.toggle("is-complete", isComplete);
    labelEl.textContent = data.correct + "/" + data.total + " correct";
    if (statCorrect) statCorrect.textContent = String(data.correct);
    if (statWrong) statWrong.textContent = String(data.wrong);
    if (statTodo) statTodo.textContent = String(Math.max(0, data.total - data.attempted));

    list.innerHTML = "";
    var all = data.sections.slice();
    if (data.ungrouped.total > 0) {
      all.push({
        title: "Other activities",
        total: data.ungrouped.total,
        correct: data.ungrouped.correct,
        wrong: 0,
        attempted: data.ungrouped.attempted,
        el: null
      });
    }

    if (!all.length) {
      var empty = document.createElement("li");
      empty.className = "ds-sci-empty";
      empty.textContent = "No quizzes detected on this page yet.";
      list.appendChild(empty);
      return;
    }

    all.forEach(function (section) {
      var li = document.createElement("li");
      var row = document.createElement("button");
      row.type = "button";
      row.className = "ds-sci-row";
      var status = statusFor(section);
      row.classList.add(status.cls);
      var sectionPct = section.total ? Math.round((section.correct / section.total) * 100) : 0;

      var pillClass;
      if (section.attempted === 0) pillClass = "is-todo";
      else if (section.correct === section.total) pillClass = "is-correct";
      else if (section.wrong > 0) pillClass = "is-wrong";
      else pillClass = "is-todo";

      var pillText;
      if (section.attempted === 0) pillText = "Not started";
      else if (section.correct === section.total) pillText = "Complete";
      else pillText = section.correct + "/" + section.total;

      var statusSpan = document.createElement("span");
      statusSpan.className = "ds-sci-status";
      statusSpan.setAttribute("aria-hidden", "true");
      statusSpan.textContent = status.label;

      var main = document.createElement("span");
      main.className = "ds-sci-row-main";

      var name = document.createElement("span");
      name.className = "ds-sci-row-name";
      name.textContent = section.title;

      var meta = document.createElement("span");
      meta.className = "ds-sci-row-meta";
      var pill = document.createElement("span");
      pill.className = "ds-sci-pill " + pillClass;
      pill.textContent = pillText;
      meta.appendChild(pill);
      var metaDetail = document.createElement("span");
      metaDetail.className = "ds-sci-meta-detail";
      metaDetail.textContent = section.total ? (sectionPct + "% \u00b7 " + section.attempted + "/" + section.total + " checked") : "";
      meta.appendChild(metaDetail);

      var mini = document.createElement("span");
      mini.className = "ds-sci-mini";
      var miniFill = document.createElement("span");
      miniFill.style.width = sectionPct + "%";
      mini.appendChild(miniFill);

      main.appendChild(name);
      main.appendChild(meta);
      main.appendChild(mini);

      row.appendChild(statusSpan);
      row.appendChild(main);

      if (section.el) {
        row.addEventListener("click", function () {
          if (section.el.tagName.toLowerCase() === "details" && !section.el.open) {
            section.el.open = true;
          }
          section.el.scrollIntoView({ behavior: "smooth", block: "start" });
          closePanel();
        });
      } else {
        row.disabled = true;
        row.style.cursor = "default";
      }

      li.appendChild(row);
      list.appendChild(li);
    });
  }

  function buildPanel() {
    var existing = document.getElementById(PANEL_ID);
    if (existing) return existing;

    var panel = document.createElement("div");
    panel.id = PANEL_ID;
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-label", "Progress tracker");

    panel.innerHTML = [
      '<div class="ds-sci-header">',
      '  <span class="ds-sci-title">Your progress</span>',
      '  <button type="button" class="ds-sci-close" aria-label="Close panel">\u00d7</button>',
      '</div>',
      '<div class="ds-sci-overall">',
      '  <div class="ds-sci-overall-row">',
      '    <span class="ds-sci-overall-pct">0%</span>',
      '    <span class="ds-sci-overall-label">0/0 correct</span>',
      '  </div>',
      '  <div class="ds-sci-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">',
      '    <div class="ds-sci-bar"></div>',
      '  </div>',
      '  <div class="ds-sci-stats">',
      '    <div class="ds-sci-stat">',
      '      <span class="ds-sci-stat-num is-correct" data-stat="correct">0</span>',
      '      <span class="ds-sci-stat-lbl">Correct</span>',
      '    </div>',
      '    <div class="ds-sci-stat">',
      '      <span class="ds-sci-stat-num is-wrong" data-stat="wrong">0</span>',
      '      <span class="ds-sci-stat-lbl">Wrong</span>',
      '    </div>',
      '    <div class="ds-sci-stat">',
      '      <span class="ds-sci-stat-num" data-stat="todo">0</span>',
      '      <span class="ds-sci-stat-lbl">To do</span>',
      '    </div>',
      '  </div>',
      '</div>',
      '<div class="ds-sci-body">',
      '  <h4 class="ds-sci-section-title">By section</h4>',
      '  <ul class="ds-sci-list"></ul>',
      '</div>',
      '<div class="ds-sci-footer">',
      '  <button type="button" class="ds-sci-btn ds-sci-random">Random challenge</button>',
      '  <button type="button" class="ds-sci-btn is-danger ds-sci-reset">Reset progress</button>',
      '</div>'
    ].join("\n");
    document.body.appendChild(panel);

    panel.querySelector(".ds-sci-close").addEventListener("click", closePanel);
    panel.querySelector(".ds-sci-random").addEventListener("click", function () {
      if (typeof window.scrollToRandomInteractive === "function") {
        window.scrollToRandomInteractive();
        closePanel();
      }
    });
    panel.querySelector(".ds-sci-reset").addEventListener("click", function () {
      if (window.confirm("Clear all saved quiz results on this page and reload?")) {
        if (typeof window.clearDSPageSessionProgress === "function") {
          window.clearDSPageSessionProgress();
        } else {
          window.location.reload();
        }
      }
    });

    return panel;
  }

  function scheduleRender() {
    var panel = document.getElementById(PANEL_ID);
    if (!panel || !panel.classList.contains("is-open")) return;
    renderProgress(panel);
  }

  function openPanel() {
    injectStyles();
    var panel = buildPanel();
    renderProgress(panel);
    panel.classList.add("is-open");
  }
  function closePanel() {
    var panel = document.getElementById(PANEL_ID);
    if (panel) panel.classList.remove("is-open");
  }
  function togglePanel() {
    var panel = document.getElementById(PANEL_ID);
    if (panel && panel.classList.contains("is-open")) closePanel();
    else openPanel();
  }

  window.toggleDsSciPanel = togglePanel;
  window.openDsSciPanel = openPanel;
  window.closeDsSciPanel = closePanel;

  window.addEventListener("ds-correct-answer", scheduleRender);
  window.addEventListener("ds-wrong-answer", scheduleRender);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closePanel();
  });
  document.addEventListener("click", function (e) {
    var panel = document.getElementById(PANEL_ID);
    if (!panel || !panel.classList.contains("is-open")) return;
    if (panel.contains(e.target)) return;
    if (e.target.closest && e.target.closest("#ds-scientist-guide")) return;
    closePanel();
  });

  function wireScientistClick() {
    var scientist = document.getElementById("ds-scientist-assistant");
    if (!scientist) return;
    if (scientist.dataset.dsSciWired === "1") return;
    scientist.dataset.dsSciWired = "1";
    scientist.title = "Science assistant - click to see your progress";
    scientist.setAttribute("aria-label", "Science assistant. Click to open the progress tracker.");
    scientist.addEventListener("click", togglePanel);
    scientist.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        togglePanel();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", wireScientistClick);
  } else {
    wireScientistClick();
  }
})();
