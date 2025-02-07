class Portfolio {
    constructor() {
        this.initTheme();
        this.initSections();
        this.initObservers();
        this.initDynamicContent();
        this.addKeyboardNavigation();
        this.addCopyrightYear();
    }

    // Theme management
    initTheme() {
        this.themeToggle = document.getElementById('themeToggle');
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        this.setInitialTheme();
    }

    setInitialTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.body.classList.toggle('dark-theme', savedTheme === 'dark');
        this.animateThemeToggle(savedTheme);
    }

    toggleTheme() {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        this.animateThemeToggle(isDark ? 'dark' : 'light');
    }

    animateThemeToggle(theme) {
        this.themeToggle.style.transform = theme === 'dark' ? 'rotate(180deg)' : 'rotate(0deg)';
    }

    // Section management
    initSections() {
        this.sections = document.querySelectorAll('.section');
        this.sections.forEach(section => {
            const header = section.querySelector('.section-header');
            header.addEventListener('click', () => this.toggleSection(section));
            this.restoreSectionState(section);
        });
    }

    toggleSection(section) {
        const wasExpanded = section.classList.contains('expanded');
        section.classList.toggle('expanded', !wasExpanded);
        this.saveSectionState(section);
    }

    saveSectionState(section) {
        const state = section.classList.contains('expanded');
        localStorage.setItem(section.id, state);
    }

    restoreSectionState(section) {
        const state = localStorage.getItem(section.id) === 'true';
        section.classList.toggle('expanded', state);
    }

    // Scroll animations
    initObservers() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.profile-section, .section').forEach(el => {
            observer.observe(el);
        });
    }

    // Dynamic content
    async initDynamicContent() {
        try {
            const response = await fetch('content.json');
            const content = await response.json();
            this.populateContent(content);
        } catch (error) {
            console.error('Error loading content:', error);
            this.showContentError();
        }
    }

    populateContent(content) {
        document.querySelector('#about .section-content p').textContent = content.about;
        document.querySelector('#experience .section-content p').textContent = content.experience;
        document.querySelector('#projects .section-content p').textContent = content.projects;
    }

    showContentError() {
        const sections = document.querySelectorAll('.section-content p');
        sections.forEach(p => {
            p.textContent = 'Content failed to load. Please try refreshing the page.';
        });
    }

    // Accessibility
    addKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const focusedSection = document.activeElement.closest('.section-header');
                if (focusedSection) {
                    this.toggleSection(focusedSection.parentElement);
                }
            }
        });
    }

    // Copyright year
    addCopyrightYear() {
        document.getElementById('current-year').textContent = new Date().getFullYear();
    }
}

// Initialize when ready
document.addEventListener('DOMContentLoaded', () => new Portfolio());
