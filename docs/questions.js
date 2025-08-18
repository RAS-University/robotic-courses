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
        {left: "$$", right: "$$", display: true},
        {left: "\\(", right: "\\)", display: false},
        {left: "$",  right: "$",  display: false}
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
    feedback.textContent = "Please select at least one option.";
    feedback.style.color = "red";
    return;
  }

  // Check if the selected options match exactly the correct answers
  if (
    selectedValues.length === correctAnswers.length &&
    selectedValues.every(value => correctAnswers.includes(value))
  ) {
    feedback.textContent = correctMessage;
    feedback.style.color = "green";
  } else {
    feedback.textContent = incorrectMessage;
    feedback.style.color = "red";
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

  // Check if selected options exactly match the correct answers
  if (
    selectedValues.length === correctAnswers.length &&
    selectedValues.every(value => correctAnswers.includes(value))
  ) {
    feedback.innerHTML = correctMessage; // <-- use innerHTML here
    feedback.style.color = "green";
  } else {
    feedback.innerHTML = incorrectMessage; // <-- and here as well
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





  