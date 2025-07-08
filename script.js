class Portfolio {
    constructor() { this.init(); }
    init() {
        this.loadTheme();
        this.setupThemeToggle();
        this.setupSectionToggles();
        this.loadContent();
        this.setupCopyrightYear();
    }
    loadTheme() {
        const savedTheme = localStorage.getItem('theme');
        document.documentElement.setAttribute('data-theme', savedTheme || 'dark');
        this.updateThemeIcon();
    }
    updateThemeIcon() {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            const currentTheme = document.documentElement.getAttribute('data-theme');
            icon.classList.remove('fa-moon', 'fa-sun');
            icon.classList.add(currentTheme === 'dark' ? 'fa-sun' : 'fa-moon');
        }
    }
    setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                this.updateThemeIcon();
            });
        }
    }
    setupSectionToggles() {
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => {
            const header = section.querySelector('.section-header');
            const content = section.querySelector('.section-content');
            const icon = header.querySelector('.fa-chevron-down');
            if (header && content && icon) {
                content.style.display = 'none';
                icon.style.transform = 'rotate(-90deg)';
                header.addEventListener('click', () => {
                    const isOpen = content.style.display === 'block';
                    content.style.display = isOpen ? 'none' : 'block';
                    icon.style.transform = isOpen ? 'rotate(-90deg)' : 'rotate(0)';
                });
            }
        });
    }
    async loadContent() {
        try {
            if (document.querySelector('#about .section-content')) {
                const response = await fetch('content.json');
                if (!response.ok) throw new Error('Failed to load content');
                const content = await response.json();
                const aboutContent = document.querySelector('#about .section-content');
                if (aboutContent && content.about?.paragraphs) {
                    aboutContent.innerHTML = content.about.paragraphs.map(p => `<p>${p}</p>`).join('');
                }
                const experienceContent = document.querySelector('#experience .section-content');
                if (experienceContent && content.experience?.companies) {
                    experienceContent.innerHTML = content.experience.companies.map(c => `<div class="company"><h3>${c.name}</h3>${c.positions.map(p => `<div class="position"><h4>${p.title}</h4><p class="period">${p.period}</p><ul>${p.points.map(pt => `<li>${pt}</li>`).join('')}</ul></div>`).join('')}</div>`).join('');
                }
            }
        } catch (error) { console.error('Error loading content:', error); }
    }
    setupCopyrightYear() {
        const yearSpan = document.getElementById('current-year');
        if (yearSpan) { yearSpan.textContent = new Date().getFullYear(); }
    }
}
document.addEventListener('DOMContentLoaded', () => { new Portfolio(); });