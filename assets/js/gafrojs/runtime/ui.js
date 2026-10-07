export function clear(el) {
    if (el) el.replaceChildren();
}

export function label(el, text) {
    const s = document.createElement('span');
    s.textContent = text;
    el.appendChild(s);
    return s;
}

export function slider(el, { min = 0, max = 1, step = 0.01, value = 0, title = '' } = {}, onInput) {
    const wrap = document.createElement('label');
    wrap.style.marginRight = '10px';
    const name = document.createElement('span');
    name.textContent = title + ' ';
    const input = document.createElement('input');
    input.type = 'range';
    input.min = min;
    input.max = max;
    input.step = step;
    input.value = value;
    input.style.width = '140px';
    const read = document.createElement('span');
    read.textContent = ` ${Number(value).toFixed(2)}`;
    input.addEventListener('input', () => {
        read.textContent = ` ${Number(input.value).toFixed(2)}`;
        onInput(Number(input.value));
    });
    wrap.append(name, input, read);
    el.appendChild(wrap);
    /** Show a value the animation is driving, without firing onInput. */
    input.sync = (v) => {
        input.value = String(v);
        read.textContent = ` ${Number(v).toFixed(2)}`;
    };
    return input;
}

export function button(el, title, onClick) {
    const b = document.createElement('button');
    b.textContent = title;
    b.addEventListener('click', onClick);
    el.appendChild(b);
    return b;
}

export function select(el, options, onChange) {
    const s = document.createElement('select');
    for (const [value, labelText] of options) {
        const o = document.createElement('option');
        o.value = value;
        o.textContent = labelText;
        s.appendChild(o);
    }
    s.addEventListener('change', () => onChange(s.value));
    el.appendChild(s);
    return s;
}

export function checkbox(el, title, checked, onChange) {
    const wrap = document.createElement('label');
    wrap.style.marginRight = '8px';
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = checked;
    input.addEventListener('change', () => onChange(input.checked));
    wrap.append(input, document.createTextNode(' ' + title));
    el.appendChild(wrap);
    return input;
}

/** Boolean option bar. `spec` is { key: [title, defaultBool] }. */
export function toggles(el, spec, onChange) {
    const state = {};
    const inputs = {};
    for (const [key, [title, value]] of Object.entries(spec)) {
        state[key] = value;
        inputs[key] = checkbox(el, title, value, (on) => {
            state[key] = on;
            onChange(state);
        });
    }
    // set a toggle from code and keep the checkbox in step, without re-firing
    Object.defineProperty(state, 'set', {
        enumerable: false,
        value(key, on) {
            if (state[key] === on) return;
            state[key] = on;
            if (inputs[key]) inputs[key].checked = on;
        },
    });
    return state;
}
