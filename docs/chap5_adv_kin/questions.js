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
