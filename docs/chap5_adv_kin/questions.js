/* Minimal JS to power simple MCQ blocks.
   Works with blocks like:

<div class="mcq" data-answer="A,B">
  <h4>Question text…</h4>
  <div class="options">
    <label><input type="checkbox" value="A"> (A) …</label>
    <label><input type="checkbox" value="B"> (B) …</label>
    <label>…</label>
  </div>
  <div class="actions"><button class="check-mcq">Check</button></div>
  <div class="result"></div>
</div>

- Supports both checkbox (multi-answer) and radio (single-answer) groups.
- The correct answers are provided as comma-separated letters in data-answer.
*/

(function () {
    function normalizeSet(arr) {
        return new Set(arr.map(s => s.trim().toUpperCase()).filter(Boolean));
    }

    function readCorrectAnswers(mcqEl) {
        const raw = mcqEl.getAttribute('data-answer') || '';
        return normalizeSet(raw.split(','));
    }

    function readUserAnswers(mcqEl) {
        const inputs = mcqEl.querySelectorAll('.options input');
        const picked = [];
        inputs.forEach(inp => {
            if ((inp.type === 'checkbox' || inp.type === 'radio') && inp.checked) {
                picked.push((inp.value || '').toUpperCase());
            }
        });
        return normalizeSet(picked);
    }

    function setsEqual(a, b) {
        if (a.size !== b.size) return false;
        for (const v of a) if (!b.has(v)) return false;
        return true;
    }

    function mark(mcqEl, ok) {
        mcqEl.classList.remove('correct', 'incorrect');
        mcqEl.classList.add(ok ? 'correct' : 'incorrect');
        const result = mcqEl.querySelector('.result');
        if (result) {
            result.textContent = ok ? '✅ Correct!' : '❌ Not quite. Try again.';
        }
    }

    function attachHandlers() {
        const blocks = document.querySelectorAll('.mcq');
        blocks.forEach(mcqEl => {
            const btn = mcqEl.querySelector('.check-mcq');
            if (!btn) return;
            btn.addEventListener('click', () => {
                const correct = readCorrectAnswers(mcqEl);
                const picked = readUserAnswers(mcqEl);
                mark(mcqEl, setsEqual(correct, picked));
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', attachHandlers);
    } else {
        attachHandlers();
    }
})();


/* Robust True/False quiz support for Jekyll pages.
   - Defines window.checkTrueFalse(...)
   - Also "auto-wires" buttons that *contain* onclick="checkTrueFalse(...)" by attaching real event listeners,
     so the quiz works even if inline handlers are blocked.
*/
(function () {
  function normBool(v) {
    if (v === true) return "true";
    if (v === false) return "false";
    v = (v === undefined || v === null) ? "" : String(v);
    return v.trim().toLowerCase();
  }

  function setMark(targetEl, ok) {
    if (!targetEl) return;
    targetEl.classList.remove("correct", "incorrect");
    targetEl.classList.add(ok ? "correct" : "incorrect");
  }

  // Global function (kept for compatibility with your existing markup)
  window.checkTrueFalse = function (formId, correctValue, correctMsg, incorrectMsg) {
    var form = document.getElementById(formId);
    if (!form) {
      console.warn("[checkTrueFalse] form not found:", formId);
      return;
    }

    var feedback =
      document.getElementById(formId + "-feedback") ||
      form.querySelector('[id="' + formId + '-feedback"]') ||
      form.querySelector('[id$="-feedback"]');

    var selected = form.querySelector('input[type="radio"]:checked');
    var box = form.closest ? (form.closest(".mcq") || form) : form;

    if (!selected) {
      if (feedback) feedback.innerHTML = "Please select an answer before checking.";
      setMark(box, false);
      return;
    }

    var ok = normBool(selected.value) === normBool(correctValue);

    if (feedback) feedback.innerHTML = ok ? correctMsg : incorrectMsg;
    setMark(box, ok);
  };

  // ---------- Auto-wire inline onclick="checkTrueFalse(...)" ----------
  // Parses the onclick attribute and attaches a real click handler.
  function splitArgs(argString) {
    var args = [];
    var cur = "";
    var inQuote = false;
    var quoteChar = "";

    for (var i = 0; i < argString.length; i++) {
      var ch = argString[i];

      if ((ch === "'" || ch === '"')) {
        if (!inQuote) {
          inQuote = true;
          quoteChar = ch;
          cur += ch;
          continue;
        } else if (quoteChar === ch) {
          inQuote = false;
          quoteChar = "";
          cur += ch;
          continue;
        }
      }

      if (ch === "," && !inQuote) {
        args.push(cur.trim());
        cur = "";
        continue;
      }

      cur += ch;
    }
    if (cur.trim()) args.push(cur.trim());
    return args;
  }

  function stripQuotes(s) {
    s = (s || "").trim();
    if ((s.startsWith("'") && s.endsWith("'")) || (s.startsWith('"') && s.endsWith('"'))) {
      return s.slice(1, -1);
    }
    return s;
  }

  function autoWireButtons() {
    var btns = document.querySelectorAll('button[onclick*="checkTrueFalse("]');
    for (var i = 0; i < btns.length; i++) {
      (function (btn) {
        var handlerText = btn.getAttribute("onclick") || "";
        var m = handlerText.match(/checkTrueFalse\s*\(([\s\S]*)\)\s*;?\s*$/);
        if (!m) return;

        var rawArgs = splitArgs(m[1]);
        if (rawArgs.length < 4) return;

        var formId = stripQuotes(rawArgs[0]);
        var correctValue = stripQuotes(rawArgs[1]);
        var correctMsg = stripQuotes(rawArgs[2]);
        var incorrectMsg = stripQuotes(rawArgs[3]);

        // Remove inline handler (avoids CSP/inline issues and double execution)
        btn.removeAttribute("onclick");

        btn.addEventListener("click", function () {
          window.checkTrueFalse(formId, correctValue, correctMsg, incorrectMsg);
        });
      })(btns[i]);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", autoWireButtons);
  } else {
    autoWireButtons();
  }
})();

/**
 * Multiple-choice question checker.
 *
 * Expected HTML pattern:
 *  <form id="q-id">
 *    <input type="radio" name="q-id" value="a"> ...
 *    ...
 *    <button type="button" onclick="checkMCQ('q-id','b', 'correct msg', 'incorrect msg')">Check</button>
 *    <p id="q-id-feedback"></p>
 *  </form>
 *
 * @param {string} formId - The <form> id (and the radio group name).
 * @param {string} correctValue - The value="" of the correct option (e.g., "b").
 * @param {string} correctMsg - Message shown when correct.
 * @param {string} incorrectMsg - Message shown when incorrect.
 */
function checkMCQ(formId, correctValue, correctMsg, incorrectMsg) {
  const form = document.getElementById(formId);
  if (!form) return;

  const feedback = document.getElementById(`${formId}-feedback`);
  if (!feedback) return;

  // Find selected radio
  const selected = form.querySelector(`input[name="${formId}"]:checked`);

  // Reset state
  form.classList.remove("correct", "incorrect");

  if (!selected) {
    feedback.textContent = "Please select an option before checking.";
    return;
  }

  const isCorrect = selected.value === correctValue;

  if (isCorrect) {
    form.classList.add("correct");
    feedback.textContent = correctMsg;
  } else {
    form.classList.add("incorrect");
    feedback.textContent = incorrectMsg;
  }
}
