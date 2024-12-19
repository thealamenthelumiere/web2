document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('schedule-form');
    const container = document.getElementById('schedule-container');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const maxEventsPerDay = parseInt(document.getElementById('events-per-day').value, 10);
        const language = document.getElementById('language').value;

        // Собираем выбранные мероприятия
        const selectedLeisure = Array.from(document.querySelectorAll('input[name="leisure"]:checked'))
            .map(el => el.value);

        if (selectedLeisure.length === 0) {
            alert(language === 'ru' ? "Пожалуйста, выберите хотя бы одно мероприятие." : "Please select at least one event.");
            return;
        }

        container.innerHTML = '';
        const table = document.createElement('table');
        table.classList.add('schedule-table');

        // Дни недели и время суток для обоих языков
        const days = language === 'ru'
            ? ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']
            : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

        const timesOfDay = language === 'ru'
            ? ['Утро', 'День', 'Вечер', 'Ночь']
            : ['Morning', 'Afternoon', 'Evening', 'Night'];

        const eventNames = {
            spa: language === 'ru' ? 'Спа-процедуры' : 'Spa Session',
            yoga: language === 'ru' ? 'Йога на террасе' : 'Yoga on the Terrace',
            tour: language === 'ru' ? 'Экскурсия по городу' : 'City Tour',
            cooking: language === 'ru' ? 'Мастер-класс по кулинарии' : 'Cooking Masterclass',
            pool: language === 'ru' ? 'Бассейн и сауна' : 'Pool & Sauna'
        };

        // Заголовок таблицы с временем суток
        const headerRow = document.createElement('tr');
        const emptyHeader = document.createElement('td');
        headerRow.appendChild(emptyHeader);

        timesOfDay.forEach(time => {
            const timeCell = document.createElement('td');
            timeCell.textContent = time;
            headerRow.appendChild(timeCell);
        });
        table.appendChild(headerRow);

        // Заполнение таблицы днями недели и мероприятиями
        days.forEach(day => {
            const row = document.createElement('tr');
            const dayCell = document.createElement('td');
            dayCell.textContent = day;
            row.appendChild(dayCell);

            // Генерируем случайный набор индексов для заполнения времен суток
            const shuffledTimes = [...timesOfDay]
                .sort(() => Math.random() - 0.5) // Перемешиваем массив
                .slice(0, maxEventsPerDay); // Берём нужное количество времен суток

            timesOfDay.forEach(time => {
                const eventCell = document.createElement('td');
                if (shuffledTimes.includes(time)) {
                    // Выбираем случайное мероприятие
                    const randomEvent = selectedLeisure[Math.floor(Math.random() * selectedLeisure.length)];
                    eventCell.textContent = eventNames[randomEvent];
                }
                row.appendChild(eventCell);
            });

            table.appendChild(row);
        });

        container.appendChild(table);
    });

    // Переключение языка для названий мероприятий
    document.getElementById('language').addEventListener('change', (event) => {
        const selectedLanguage = event.target.value;
        form.querySelectorAll('label').forEach(label => {
            const leisureName = label.querySelector('input').value;
            label.lastChild.textContent = selectedLanguage === 'ru'
                ? leisureTranslations.ru[leisureName]
                : leisureTranslations.en[leisureName];
        });
    });

    const leisureTranslations = {
        ru: {
            spa: 'Спа-процедуры',
            yoga: 'Йога на террасе',
            tour: 'Экскурсия по городу',
            cooking: 'Мастер-класс по кулинарии',
            pool: 'Бассейн и сауна'
        },
        en: {
            spa: 'Spa Session',
            yoga: 'Yoga on the Terrace',
            tour: 'City Tour',
            cooking: 'Cooking Masterclass',
            pool: 'Pool & Sauna'
        }
    };
});
