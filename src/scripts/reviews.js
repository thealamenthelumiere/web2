document.addEventListener('DOMContentLoaded', () => {
    const reviewsContainer = document.getElementById('reviews-container');
    const preloader = document.getElementById('preloader');
    const loadButton = document.getElementById('load-reviews');

    const fetchReviews = async () => {
        try {
            // Показываем прелоадер
            preloader.style.display = 'block';

            // Случайная фильтрация отзывов (id > 50)
            const response = await fetch('https://jsonplaceholder.typicode.com/comments?_limit=10');
            if (!response.ok) throw new Error('Ошибка загрузки данных');

            const reviews = await response.json();

            // Скрываем прелоадер
            preloader.style.display = 'none';

            // Очищаем контейнер
            reviewsContainer.innerHTML = '';

            // Добавляем отзывы на страницу
            reviews.forEach(review => {
                const reviewElement = document.createElement('div');
                reviewElement.className = 'review';
                reviewElement.innerHTML = `
                    <h3>${review.name}</h3>
                    <p><strong>Email:</strong> ${review.email}</p>
                    <p>${review.body}</p>
                `;
                reviewsContainer.appendChild(reviewElement);
            });
        } catch (error) {
            preloader.style.display = 'none';
            reviewsContainer.innerHTML = `<p style="color: red;">⚠ Что-то пошло не так: ${error.message}</p>`;
        }
    };

    // Обработчик кнопки
    loadButton.addEventListener('click', fetchReviews);

    // Загружаем отзывы при открытии страницы
    fetchReviews();
});
