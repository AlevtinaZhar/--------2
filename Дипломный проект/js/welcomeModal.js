const welcomeModal = document.getElementById('welcomeModal');
const closeModal = document.getElementById('closeModal');

// Функция для отображения всплывающего окна
function showModal(modal) {
    modal.style.display = "block";
}

// Функция для закрытия всплывающего окна
function closeModalFunction(modal) {
    modal.style.display = "none";
}

// Закрытие модального окна приветствия
closeModal.onclick = function() {
    closeModalFunction(welcomeModal);
};

// Инициализация
showModal(welcomeModal);
