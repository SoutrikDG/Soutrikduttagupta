// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Theme Management
    const toggleTheme = () => {
        document.body.classList.toggle('dark-theme');
        localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
    };

    // Set initial theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') document.body.classList.add('dark-theme');

    // Event Listeners
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);

    // Section expand/collapse
    document.querySelectorAll('.card h2').forEach(header => {
        header.addEventListener('click', () => {
            header.nextElementSibling.classList.toggle('expanded');
        });
    });
});
