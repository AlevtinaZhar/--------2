const addHabitButton = document.getElementById('addHabitButton');
const newHabitModal = document.getElementById('newHabitModal');
const closeNewHabitModal = document.getElementById('closeNewHabitModal');
const saveHabitButton = document.getElementById('saveHabitButton');
const editHabitModal = document.getElementById('editHabitModal');
const closeEditHabitModal = document.getElementById('closeEditHabitModal');
const updateHabitButton = document.getElementById('updateHabitButton');
const deleteHabitModal = document.getElementById('deleteHabitModal');
const closeDeleteHabitModal = document.getElementById('closeDeleteHabitModal');
const confirmDeleteButton = document.getElementById('confirmDeleteButton');
const cancelDeleteButton = document.getElementById('cancelDeleteButton');
const habitInput = document.getElementById('habitInput');
const goalInput = document.getElementById('goalInput');
const goalList = document.getElementById('goalList');

let habits = [];
let editingHabitIndex = null;

// Закрытие модального окна новой привычки
closeNewHabitModal.onclick = function() {
    closeModalFunction(newHabitModal);
};

// Закрытие модального окна редактирования привычки
closeEditHabitModal.onclick = function() {
    closeModalFunction(editHabitModal);
};

// Закрытие модального окна удаления привычки
closeDeleteHabitModal.onclick = function() {
    closeModalFunction(deleteHabitModal);
};

// Добавление новой привычки
addHabitButton.onclick = function() {
    showModal(newHabitModal);
};
// добавление новой привычки
saveHabitButton.onclick = function() {
    const habitText = habitInput.value.trim();
    const goalValue = parseInt(goalInput.value, 10);
    if (habitText && !isNaN(goalValue) && goalValue > 0) {
        habits.push({ text: habitText, goal: goalValue });
        habitInput.value = '';
        goalInput.value = '';
        closeModalFunction(newHabitModal);
        renderCalendar();
    }
};

// Открытие модального окна для редактирования привычки
function openEditHabitModal(index) {
    editingHabitIndex = index;
    const habit = habits[index];
    editHabitInput.value = habit.text;
    editGoalInput.value = habit.goal;
    showModal(editHabitModal);
}

// Обновление привычки
updateHabitButton.onclick = function() {
    const updatedText = editHabitInput.value.trim();
    const updatedGoal = parseInt(editGoalInput.value, 10);
    if (updatedText && !isNaN(updatedGoal) && updatedGoal > 0) {
        habits[editingHabitIndex].text = updatedText;
        habits[editingHabitIndex].goal = updatedGoal;
        closeModalFunction(editHabitModal);
        renderCalendar(); // Обновляем календарь после изменения привычки
    }
};

// Открытие модального окна для удаления привычки
function openDeleteHabitModal(index) {
    editingHabitIndex = index;
    showModal(deleteHabitModal);
}

// Подтверждение удаления привычки
confirmDeleteButton.onclick = function() {
    habits.splice(editingHabitIndex, 1);
    closeModalFunction(deleteHabitModal);
    renderCalendar(); // Обновляем календарь после удаления привычки
};

// Отображение целей
function renderGoals() {
    goalList.innerHTML = '';
    habits.forEach(habit => {
        const remaining = habit.goal - (completedDaysForHabit(habit.text) || []).length;
        const goalItem = document.createElement('div');
        goalItem.textContent = `${habit.text}: осталось ${remaining} раз(а)`;
        if (remaining <= 0) {
            goalItem.textContent = `${habit.text}: Поздравляю, вы выполнили свою цель!`;
        }
        goalList.appendChild(goalItem);
    });
}

// Получение выполненных дней для привычки
function completedDaysForHabit(habitText) {
    const monthYearKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}`;
    return completedDays[monthYearKey]?.[habitText] || [];
}
