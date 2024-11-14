const calendar = document.getElementById("calendar");
const currentMonth = document.getElementById("currentMonth");
const prevMonth = document.getElementById("prevMonth");
const nextMonth = document.getElementById("nextMonth");
const noHabitsMessage = document.getElementById("noHabitsMessage");

let currentDate = new Date(2024, 10); // Ноябрь 2024
let completedDays = {};

// Отображение календаря для выбранного месяца
function renderCalendar() {
  calendar.innerHTML = "";
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Создаем заголовок таблицы
  const headerRow = document.createElement("tr");
  const habitHeader = document.createElement("th");
  habitHeader.textContent = "Привычки";
  headerRow.appendChild(habitHeader);

  for (let day = 1; day <= daysInMonth; day++) {
    const dayHeader = document.createElement("th");
    dayHeader.textContent = day;
    headerRow.appendChild(dayHeader);
  }
  calendar.appendChild(headerRow);

  // Проверка наличия привычек
  if (habits.length === 0) {
    noHabitsMessage.style.display = "block";
    goalList.innerHTML = ""; // Очищаем список целей
    return;
  } else {
    noHabitsMessage.style.display = "none";
  }

  // Создаем строки для каждой привычки
  habits.forEach((habit, index) => {
    const habitRow = document.createElement("tr");
    const habitCell = document.createElement("td");
    habitCell.textContent = habit.text;
    habitCell.classList.add("habit-cell");
    habitRow.appendChild(habitCell);

    // Кнопки редактирования и удаления
    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("edit-delete-buttons");

    const editButton = document.createElement("button");
    editButton.textContent = "✏️"; // иконка редактирования
    editButton.onclick = () => openEditHabitModal(index);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "🗑️"; // иконка удаления
    deleteButton.onclick = () => openDeleteHabitModal(index);
    buttonsDiv.appendChild(editButton);
    buttonsDiv.appendChild(deleteButton);
    habitCell.appendChild(buttonsDiv);

    // Добавляем ячейки для дней месяца
    for (let day = 1; day <= daysInMonth; day++) {
      const dayCell = document.createElement("td");
      const monthYearKey = `${year}-${month + 1}`; // Ключ для хранения выполненных дней
      const completedDaysForHabit =
        completedDays[monthYearKey]?.[habit.text] || [];

      // Проверяем, был ли день выполнен
      if (completedDaysForHabit.includes(day)) {
        dayCell.classList.add("completed");
      }

      dayCell.addEventListener("click", () =>
        toggleHabit(habit.text, day, dayCell)
      );
      habitRow.appendChild(dayCell);
    }
    calendar.appendChild(habitRow);
  });

  // Обновляем текст текущего месяца
  currentMonth.textContent = `${currentDate.toLocaleString("default", {
    month: "long",
  })} ${year}`;
  renderGoals();
}

// Переключение между месяцами
prevMonth.onclick = function () {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
};

nextMonth.onclick = function () {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
};

// Переключение состояния привычки
function toggleHabit(habitText, day, dayCell) {
  const monthYearKey = `${currentDate.getFullYear()}-${
    currentDate.getMonth() + 1
  }`;
  if (!completedDays[monthYearKey]) {
    completedDays[monthYearKey] = {};
  }
  if (!completedDays[monthYearKey][habitText]) {
    completedDays[monthYearKey][habitText] = [];
  }

  const completedDaysForHabit = completedDays[monthYearKey][habitText];
  const dayIndex = completedDaysForHabit.indexOf(day);
  // Обработка случая, когда привычка уже была выполнена
  if (dayIndex > -1) {
    completedDaysForHabit.splice(dayIndex, 1);
    dayCell.classList.remove("completed");
  }
  // Обработка случая, когда привычка не была выполнена
  else {
    completedDaysForHabit.push(day);
    dayCell.classList.add("completed");
  }
  renderGoals(); // Обновляем отображение целей после переключения
}

// Инициализация
renderCalendar();
