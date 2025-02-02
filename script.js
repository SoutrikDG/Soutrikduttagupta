// script.js
// Theme Toggle
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Initialize Theme
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    if (savedTheme === 'dark') document.body.classList.add('dark-theme');
    
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    
    // Add smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// Add project cards dynamically (example)
const projects = [
    { title: 'E-Commerce Platform', tech: 'React/Node.js', description: 'Full-stack shopping platform' },
    { title: 'Portfolio Website', tech: 'HTML/CSS/JS', description: 'Responsive personal portfolio' },
    { title: 'Task Manager', tech: 'Vue.js/Firebase', description: 'Real-time collaboration app' }
];

const projectsGrid = document.querySelector('.projects-grid');
projects.forEach(project => {
    projectsGrid.innerHTML += `
        <article class="project-card">
            <h4>${project.title}</h4>
            <p class="tech-stack">${project.tech}</p>
            <p class="project-description">${project.description}</p>
        </article>
    `;
});

// Add skill badges (example)
const skills = ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Git', 'AWS'];
const skillsContainer = document.querySelector('.skills-container');
skills.forEach(skill => {
    skillsContainer.innerHTML += `
        <div class="skill-badge">${skill}</div>
    `;
});// test 
