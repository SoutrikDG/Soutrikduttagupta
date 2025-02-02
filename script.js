// Toggle dark/light mode
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    // Save preference to localStorage
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Section expand/collapse
function toggleSection(id) {
    const section = document.getElementById(id);
    section.querySelector('.content').classList.toggle('expanded');
}

// On page load
document.addEventListener('DOMContentLoaded', () => {
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    if (savedTheme === 'dark') document.body.classList.add('dark-theme');
    
    // Add click listener to theme button
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    
    // Expand "About Me" by default
    toggleSection('about');
});