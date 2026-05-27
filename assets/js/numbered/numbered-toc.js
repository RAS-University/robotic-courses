document.addEventListener('DOMContentLoaded', function () {
    const wrapper = document.querySelector('.numbered');
    if (!wrapper) return;

    // Parse inline counter-reset: "h1 15 h2 3 h3 0 h4 0"
    const styleAttr = wrapper.getAttribute('style') || '';
    const match = styleAttr.match(/counter-reset:\s*([^;]+);?/);
    const initial = { h1: 0, h2: 0, h3: 0, h4: 0 };
    if (match && match[1]) {
        const tokens = match[1].trim().split(/\s+/);
        for (let i = 0; i + 1 < tokens.length; i += 2) {
            const name = tokens[i];
            const val = parseInt(tokens[i + 1], 10) || 0;
            if (initial.hasOwnProperty(name)) initial[name] = val;
        }
    }

    const counters = { ...initial };

    // Walk headings in document order to compute numbers
    const headings = Array.from(wrapper.querySelectorAll('h1,h2,h3,h4'));
    const headingNumbers = {}; // map id -> number string

    headings.forEach(h => {
        const lvl = parseInt(h.tagName.charAt(1), 10);
        if (!h.id) return; // skip headings without id
        if (lvl === 2) {
            counters.h3 += 1;
            counters.h4 = 0;
            headingNumbers[h.id] = `${counters.h1}.${counters.h2}.${counters.h3}`;
        } else if (lvl === 3) {
            counters.h4 += 1;
            headingNumbers[h.id] = `${counters.h1}.${counters.h2}.${counters.h3}.${counters.h4}`;
        } else if (lvl === 1) {
            headingNumbers[h.id] = `${counters.h1}.${counters.h2}`;
        }
    });

    // Insert numbers into the generated markdown TOC only (avoid headings' inline anchor links)
    const tocContainer = wrapper.querySelector('#markdown-toc') || wrapper.querySelector('.markdown-toc');
    // Only touch links inside the auto-generated TOC — never all # links (would break custom nav outlines)
    const tocLinks = tocContainer
        ? Array.from(tocContainer.querySelectorAll('a[href^="#"]'))
        : [];

    tocLinks.forEach(a => {
        const href = (a.getAttribute('href') || '').slice(1);
        if (!href) return;
        const number = headingNumbers[href];
        if (!number) return;
        if (a.querySelector('.toc-number')) return; // avoid duplicate
        const span = document.createElement('span');
        span.className = 'toc-number';
        span.textContent = number + ' ';
        a.insertBefore(span, a.firstChild);
    });

    // --- Inject numbers into actual headings on the page (defensive) ---
    let injectedAny = false;
    headings.forEach(h => {
        // never inject into h4 (user preference: "don't number ####")
        if (h.tagName === 'H4') return;
        const id = h.id;
        const number = headingNumbers[id];
        if (!number) return;
        // skip if already injected
        if (h.querySelector('.heading-number')) return;
        // skip if author manually prefixed the heading text with a number (e.g. "14.3.2.1 ...")
        const headingText = (h.textContent || '').trim();
        if (/^\d+(\.\d+)*\b/.test(headingText)) return;

        const span = document.createElement('span');
        span.className = 'heading-number';
        span.textContent = number + ' ';

        // If the heading has an "anchor" link node (common in many markdown renderers),
        // insert after it so the anchor icon remains left-most.
        const anchor = h.querySelector('a.anchor, a.anchor-heading');
        if (anchor && anchor.parentNode === h) {
            h.insertBefore(span, anchor.nextSibling);
        } else {
            h.insertBefore(span, h.firstChild);
        }
        injectedAny = true;
    });

    // Add a class so CSS can suppress the ::before pseudo-elements (avoids double numbers)
    if (injectedAny) wrapper.classList.add('js-numbered');
});