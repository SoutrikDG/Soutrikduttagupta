// Global toggle function
function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    const content = section.querySelector('.section-content');
    const icon = section.querySelector('.fa-chevron-down');
    
    if (content.style.display === 'none' || content.style.display === '') {
        content.style.display = 'block';
        icon.style.transform = 'rotate(0deg)';
    } else {
        content.style.display = 'none';
        icon.style.transform = 'rotate(-90deg)';
    }
}

class Portfolio {
    constructor() {
        this.init();
    }

    init() {
        // Set dark theme as default
        document.documentElement.setAttribute('data-theme', 'dark');
        
        this.setupThemeToggle();
        this.setupSectionToggles();
        this.loadContent();
        this.setupCopyrightYear();
    }

    setupSectionToggles() {
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => {
            const header = section.querySelector('.section-header');
            const content = section.querySelector('.section-content');
            const icon = header.querySelector('.fa-chevron-down');
            
            // Initially collapse all sections
            content.style.display = 'none';
            icon.style.transform = 'rotate(-90deg)';
            
            header.addEventListener('click', () => {
                const isOpen = content.style.display === 'block';
                content.style.display = isOpen ? 'none' : 'block';
                icon.style.transform = isOpen ? 'rotate(-90deg)' : 'rotate(0)';
            });
        });
    }

    async loadContent() {
        try {
            const response = await fetch('content.json');
            if (!response.ok) throw new Error('Failed to load content');
            const content = await response.json();
            
            // Load about content
            const aboutContent = document.querySelector('#about .section-content');
            if (aboutContent && content.about?.paragraphs) {
                aboutContent.innerHTML = content.about.paragraphs
                    .map(paragraph => `<p>${paragraph}</p>`)
                    .join('');
            }
            
            // Load experience content
            const experienceContent = document.querySelector('#experience .section-content');
            if (experienceContent && content.experience?.companies) {
                experienceContent.innerHTML = content.experience.companies
                    .map(company => `
                        <div class="company">
                            <h3>${company.name}</h3>
                            ${company.positions.map(position => `
                                <div class="position">
                                    <h4>${position.title}</h4>
                                    <p class="period">${position.period}</p>
                                    <ul>
                                        ${position.points.map(point => `
                                            <li>${point}</li>
                                        `).join('')}
                                    </ul>
                                </div>
                            `).join('')}
                        </div>
                    `).join('');
            }
        } catch (error) {
            console.error('Error loading content:', error);
        }
    }

    setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        const icon = themeToggle.querySelector('i');
        
        // Set initial icon based on theme
        icon.classList.remove('fa-moon', 'fa-sun');
        icon.classList.add(document.documentElement.getAttribute('data-theme') === 'dark' ? 'fa-sun' : 'fa-moon');

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            
            // Update icon
            icon.classList.toggle('fa-sun');
            icon.classList.toggle('fa-moon');
        });
    }

    setupCopyrightYear() {
        const yearSpan = document.getElementById('current-year');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Portfolio();
});
