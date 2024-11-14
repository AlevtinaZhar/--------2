const addNoteButton = document.getElementById('addNoteButton');
    const newNoteModal = document.getElementById('newNoteModal');
    const closeNewNoteModal = document.getElementById('closeNewNoteModal');
    const saveNoteButton = document.getElementById('saveNoteButton');
    const noteInput = document.getElementById('noteInput');
    const noteList = document.getElementById('noteList');

    const editNoteModal = document.getElementById('editNoteModal');
    const editNoteInput = document.getElementById('editNoteInput');
    const updateNoteButton = document.getElementById('updateNoteButton');
    const closeEditNoteModal = document.getElementById('closeEditNoteModal');

    const deleteNoteModal = document.getElementById('deleteNoteModal');
    const confirmDeleteNoteButton = document.getElementById('confirmDeleteNoteButton');
    const cancelDeleteNoteButton = document.getElementById('cancelDeleteNoteButton');

    let notes = [];
    let editingNoteIndex = null;

    // Открытие модального окна для добавления заметки
    addNoteButton.onclick = function() {
        showModal(newNoteModal);
    };

    // Сохранение новой заметки
    saveNoteButton.onclick = function() {
        const noteText = noteInput.value.trim();
        if (noteText) {
            const noteDate = new Date().toLocaleDateString();
            notes.push({ text: noteText, date: noteDate });
            noteInput.value = '';
            closeModalFunction(newNoteModal);
            renderNotes();
        }
    };

    // Отображение заметок
    function renderNotes() {
        noteList.innerHTML = '';
        notes.forEach((note, index) => {
            const noteItem = document.createElement('div');
            noteItem.classList.add('note-item');
            noteItem.textContent = `${note.text} (Создано: ${note.date})`;
            
            const editButton = document.createElement('button');
            editButton.textContent = 'Редактировать';
            editButton.onclick = () => openEditNoteModal(index);
            
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Удалить';
            deleteButton.onclick = () => openDeleteNoteModal(index);
            
            noteItem.appendChild(editButton);
            noteItem.appendChild(deleteButton);
            noteList.appendChild(noteItem);
        });
    }

    // Открытие модального окна для редактирования заметки
    function openEditNoteModal(index) {
        editingNoteIndex = index;
        const note = notes[index];
        editNoteInput.value = note.text; // Заполняем текст заметки для редактирования
        showModal(editNoteModal);
    }

    // Обновление заметки
    updateNoteButton.onclick = function() {
        const updatedNote = editNoteInput.value.trim();
        if (updatedNote) {
            notes[editingNoteIndex].text = updatedNote; // Обновляем текст заметки в массиве
            closeModalFunction(editNoteModal);
            renderNotes(); // Обновляем отображение заметок
        }
    };

    // Открытие модального окна для удаления заметки
    function openDeleteNoteModal(index) {
        editingNoteIndex = index;
        showModal(deleteNoteModal);
    }

    // Подтверждение удаления заметки
    confirmDeleteNoteButton.onclick = function() {
        notes.splice(editingNoteIndex, 1); // Удаляем заметку из массива
        closeModalFunction(deleteNoteModal);
        renderNotes(); // Обновляем отображение заметок
    };

    // Отмена удаления заметки
    cancelDeleteNoteButton.onclick = function() {
        closeModalFunction(deleteNoteModal);
    };

    // Функция для показа модального окна
    function showModal(modal) {
        modal.style.display = 'block';
    }

    // Функция для закрытия модального окна
    function closeModalFunction(modal) {
        modal.style.display = 'none';
    }

    // Закрытие модального окна для новой заметки
    closeNewNoteModal.onclick = function() {
        closeModalFunction(newNoteModal);
    };

    // Закрытие модального окна для редактирования заметки
    closeEditNoteModal.onclick = function() {
        closeModalFunction(editNoteModal);
    };