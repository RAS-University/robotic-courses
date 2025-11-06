document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.drag-item');
    const dropZones = document.querySelectorAll('.drop-zone');
    const initialContainer = document.getElementById('items-to-drag');
    const checkButton = document.getElementById('check-button');
    const resetButton = document.getElementById('reset-button');

    let draggedItem = null;

    function dragStart(e) {
        draggedItem = e.target;
        e.target.classList.add('dragging');
        e.dataTransfer.setData('text/plain', e.target.id);
    }

    function dragEnd(e) {
        e.target.classList.remove('dragging');
        draggedItem = null;
    }

    function dragOver(e) {
        e.preventDefault();
        if (draggedItem && draggedItem.parentElement !== e.currentTarget) {
           e.currentTarget.classList.add('over');
        }
    }

    function dragLeave(e) {
        e.currentTarget.classList.remove('over');
    }

    function drop(e) {
        e.preventDefault();
        e.currentTarget.classList.remove('over');

        const id = e.dataTransfer.getData('text/plain');
        const item = document.getElementById(id);

        if (item) {
            item.classList.remove('correct', 'incorrect');
            e.currentTarget.appendChild(item);
        }
    }

    items.forEach(item => {
        item.addEventListener('dragstart', dragStart);
        item.addEventListener('dragend', dragEnd);
    });

    dropZones.forEach(zone => {
        zone.addEventListener('dragover', dragOver);
        zone.addEventListener('dragleave', dragLeave);
        zone.addEventListener('drop', drop);
    });


    function checkAnswers() {
        items.forEach(item => {
            const correctZoneType = item.getAttribute('data-correct-zone');
            const currentParent = item.parentElement;

            item.classList.remove('correct', 'incorrect');

            if (currentParent.classList.contains('drop-zone')) {
                const currentZoneType = currentParent.getAttribute('data-zone-type');

                if (currentZoneType === correctZoneType) {
                    item.classList.add('correct');
                } else {
                    item.classList.add('incorrect');
                }
            }
        });
    }

    function resetExercise() {
        items.forEach(item => {
            item.classList.remove('correct', 'incorrect');
            initialContainer.appendChild(item);
        });
        dropZones.forEach(zone => {
            zone.classList.remove('over');
        });
    }

    checkButton.addEventListener('click', checkAnswers);
    resetButton.addEventListener('click', resetExercise);

    resetExercise();
});
