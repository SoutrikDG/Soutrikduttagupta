// script.js
// Theme Toggle
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Section Toggle
function toggleSection(id) {
    const section = document.getElementById(id);
    const content = section.querySelector('.content');
    content.classList.toggle('expanded');
    
    // Rotate arrow
    const arrow = section.querySelector('h2').innerHTML.includes('▼') ? '▶' : '▼';
    section.querySelector('h2').innerHTML = section.querySelector('h2').innerHTML.replace(/[▼▶]/, arrow);
}

// Initial Setup
document.addEventListener('DOMContentLoaded', () => {
    // Theme
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    if (savedTheme === 'dark') document.body.classList.add('dark-theme');
    
    // Event Listeners
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.matches('.dropbtn')) {
            const dropdowns = document.querySelectorAll('.dropdown-content');
            dropdowns.forEach(dropdown => dropdown.style.display = 'none');
        }
    });
});