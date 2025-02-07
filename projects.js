document.addEventListener('DOMContentLoaded', async () => {
    const projectsGrid = document.querySelector('.projects-grid');
    
    try {
        const response = await fetch('./content.json');
        if (!response.ok) throw new Error('Failed to fetch content');
        
        const data = await response.json();
        if (!data || !data.projects) throw new Error('Invalid data structure');

        const projectsHTML = data.projects.map(project => `
            <div class="project-card">
                <div class="project-header">
                    <h3>${project.title}</h3>
                    <span class="company-badge ${project.company === 'Personal Project' ? 'personal' : ''}">${project.company}</span>
                </div>
                <div class="project-content">
                    <p>${project.description}</p>
                    <div class="tech-stack">
                        ${project.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');

        projectsGrid.innerHTML = projectsHTML;

        // Update copyright year
        document.getElementById('current-year').textContent = new Date().getFullYear();
        
        // Add immediate logging
        console.log('Attempting to fetch from:', window.location.href);
        
    } catch (error) {
        console.error('Error:', error);
        projectsGrid.innerHTML = `
            <div class="error-message">
                <p>Error loading projects. Please try refreshing the page.</p>
                <p>Error details: ${error.message}</p>
            </div>
        `;
    }
}); 