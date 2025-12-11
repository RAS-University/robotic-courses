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
    feedback.style.color = "red";
    return;
  }

  if (selectedValue === correctAnswer) {
    feedback.textContent = correctMessage;
    feedback.style.color = "green";
  } else {
    feedback.textContent = incorrectMessage;
    feedback.style.color = "red";
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
    feedback.style.color = "red";
    return;
  }

  const ok = (selectedValue === correctAnswer);
  feedback.innerHTML = ok ? correctMessage : incorrectMessage;  // <-- use innerHTML
  feedback.style.color = ok ? "green" : "red";

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
    feedback.style.color = "red";
    return;
  }

  if (selectedValue === correctAnswer) {
    feedback.textContent = correctMessage;
    feedback.style.color = "green";
  } else {
    feedback.textContent = incorrectMessage;
    feedback.style.color = "red";
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
    feedback.style.color = "red";
    return;
  }

  const allCorrect =
    selected.length === correctAnswers.length &&
    selected.every(v => correctAnswers.includes(v));

  if (allCorrect) {
    feedback.textContent = correctMessage;
    feedback.style.color = "green";
  } else {
    feedback.textContent = incorrectMessage;
    feedback.style.color = "red";
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
    feedback.style.color = "red";
    return;
  }

  if (answerMap[selected]) {
    feedback.textContent = answerMap[selected];
    feedback.style.color = "green";
  } else {
    feedback.textContent = incorrectMessage;
    feedback.style.color = "red";
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
    feedback.style.color = "red";
    return;
  }

  const correctCount = selectedValues.filter(value => correctAnswers.includes(value)).length;
  const incorrectCount = selectedValues.length - correctCount;

  if (correctCount === correctAnswers.length && incorrectCount === 0) {
    feedback.innerHTML = correctMessage; // All correct
    feedback.style.color = "green";
  } else if (correctCount > 0) {
    feedback.innerHTML = `<strong>Partially correct!</strong> You selected ${correctCount} out of ${correctAnswers.length} correct answers.`;
    feedback.style.color = "orange"; // Partially correct
  } else {
    feedback.innerHTML = incorrectMessage; // None correct
    feedback.style.color = "red";
  }
}

// General drag-and-drop event handlers
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("id", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  if (!ev.target.classList.contains("drop-zone")) return;

  const draggedId = ev.dataTransfer.getData("id");
  const draggedElement = document.getElementById(draggedId);

  if (draggedElement && ev.target !== draggedElement.parentElement) {
    ev.target.appendChild(draggedElement);
  }
}

// Generalized function to check drag-and-drop answers
function checkDragDropAnswer(correctMapping, feedbackId) {

  let totalCorrect = 0;
  let totalItems = 0;

  // Calculate correct answers clearly for each zone
  for (const [zoneId, correctItems] of Object.entries(correctMapping)) {
    const userItems = Array.from(document.querySelectorAll(`#${zoneId} .drag-item`)).map(e => e.id);
    totalItems += correctItems.length;

    correctItems.forEach(item => {
      if (userItems.includes(item)) {
        totalCorrect += 1;
      }
    });
  }

  const feedback = document.getElementById(feedbackId);

  if (totalCorrect === totalItems) {
    feedback.textContent = `✅ Excellent! All answers (${totalCorrect}/${totalItems}) are correctly classified.`;
    feedback.style.color = "green";
  } else {
    feedback.textContent = `⚠️ You got ${totalCorrect}/${totalItems} correct. Keep trying!`;
    feedback.style.color = "orange";
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
      feedback.textContent = `✅ Excellent! All ${totalCorrect}/${totalQuestions} answers are correct.`;
      feedback.style.color = "green";
    } else {
      feedback.textContent = `⚠️ You got ${totalCorrect}/${totalQuestions} correct. Try again!`;
      feedback.style.color = "orange";
    }
  }
}

// Specific call for the Serial vs. Parallel Robot Question
function checkRobotStructure() {
  const correctMapping = {
    "serial-zone": ["open-chain", "serially-linked"],
    "parallel-zone": ["closed-chain", "fixed-motors"]
  };

  let totalCorrect = 0;
  let totalItems = 0;

  // Calculate correct answers clearly for each zone
  for (const [zoneId, correctItems] of Object.entries(correctMapping)) {
    const userItems = Array.from(document.querySelectorAll(`#${zoneId} .drag-item`)).map(e => e.id);
    totalItems += correctItems.length;

    correctItems.forEach(item => {
      if (userItems.includes(item)) {
        totalCorrect += 1;
      }
    });
  }

  const feedback = document.getElementById("robot-feedback");

  if (totalCorrect === totalItems) {
    feedback.textContent = `✅ Excellent! All answers (${totalCorrect}/${totalItems}) are correctly classified.`;
    feedback.style.color = "green";
  } else {
    feedback.textContent = `⚠️ You got ${totalCorrect}/${totalItems} correct. Keep trying!`;
    feedback.style.color = "orange";
  }
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