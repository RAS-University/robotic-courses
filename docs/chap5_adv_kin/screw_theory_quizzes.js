// Quiz feedback is independent of WebGL and remains usable if a scene cannot load.
(() => {
  const quizzes=[...document.querySelectorAll('.st-quiz')];
  const progress=document.getElementById('st-quiz-progress');
  function updateProgress() {
    if(progress) progress.textContent=`${quizzes.filter(q=>q.dataset.status==='correct').length} of ${quizzes.length} checkpoints understood. Retry any question; your latest answer counts.`;
  }
  quizzes.forEach((quiz,index)=> {
    const choices=[...quiz.querySelectorAll('input[type=radio]')];
    choices.forEach(input=>input.name=`st-quiz-${index}`);
    const feedback=quiz.querySelector('.st-feedback');
    quiz.querySelector('[data-check]').addEventListener('click',()=> {
      const answer=choices.find(input=>input.checked);
      if(!answer) {feedback.textContent='Choose a prediction first. You can change it after checking.';return;}
      const correct=answer.value===quiz.dataset.answer;quiz.dataset.status=correct?'correct':'retry';
      feedback.textContent=`${correct?'Yes.':'Try once more.'} ${answer.dataset.explanation || quiz.dataset.explanation}`;updateProgress();
    });
    const hint=quiz.querySelector('[data-hint]'),hintButton=quiz.querySelector('[data-show-hint]');
    if(hintButton && hint) hintButton.addEventListener('click',()=>{hint.hidden=!hint.hidden;hintButton.setAttribute('aria-expanded',String(!hint.hidden));});
    choices.forEach(input=>input.addEventListener('change',()=>{delete quiz.dataset.status;feedback.textContent='';updateProgress();}));
  });updateProgress();
})();
