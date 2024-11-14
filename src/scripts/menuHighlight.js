// scripts/menuHighlight.js
document.addEventListener('DOMContentLoaded', function () {
    const menuItems = document.querySelectorAll('#main-nav a');
    const currentPage = window.location.pathname;

    menuItems.forEach(item => {
        if (item.getAttribute('href') === currentPage.split('/').pop()) {
            item.classList.add('active');
        }

        item.addEventListener('mouseenter', () => {
            item.classList.add('hover');
        });

        item.addEventListener('mouseleave', () => {
            item.classList.remove('hover');
        });
    });
});
