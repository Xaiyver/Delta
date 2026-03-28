export class MenuManager {
    constructor() {
        this.container = document.getElementById('dynamic-menu');
        this.init();
    }

    init() {
        this.container.innerHTML = ''; 

        for (const [subjectName, subjectData] of Object.entries(window.MathRegistry)) {
            const subjectBox = this.createSubjectBox(subjectName, subjectData);
            this.container.appendChild(subjectBox);
        }

        // Render all the LaTeX signatures after the DOM is built
        this.renderSignatures();
    }

    createSubjectBox(subjectName, subjectData) {
        const wrapper = document.createElement('div');
        wrapper.className = 'subject-box';

        // Subject Header
        const title = document.createElement('div');
        title.className = 'subject-title';
        title.innerText = subjectName;
        wrapper.appendChild(title);

        // Modules Grid
        const grid = document.createElement('div');
        grid.className = 'modules-grid';

        subjectData.modules.forEach(mod => {
            const label = document.createElement('label');
            label.className = 'module-card';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = mod.id;
            checkbox.checked = subjectData.defaultActive;
            checkbox.className = 'module-checkbox';

            const content = document.createElement('div');
            content.className = 'card-content';
            content.innerHTML = `
                <span class="module-name">${mod.name}</span>
                <span class="module-sig" data-latex="${mod.sig}"></span>
            `;

            label.appendChild(checkbox);
            label.appendChild(content);
            grid.appendChild(label);
        });

        wrapper.appendChild(grid);
        return wrapper;
    }

    renderSignatures() {
        const sigElements = this.container.querySelectorAll('.module-sig');
        sigElements.forEach(el => {
            const latex = el.getAttribute('data-latex');
            katex.render(latex, el, { throwOnError: false });
        });
    }

    static getActiveModules() {
        // Expose a helper for game.js to easily grab what's checked
        const checkboxes = document.querySelectorAll('.module-checkbox:checked');
        return Array.from(checkboxes).map(cb => cb.value);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.MenuUI = new MenuManager();
});
