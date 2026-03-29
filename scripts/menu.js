// menu.js

import { MathRegistry } from './registry.js';
import { ScoreManager } from './core/score_manager.js';

export class MenuManager {
    constructor() {
        this.container = document.getElementById('dynamic-menu');
        this.init();
    }

    init() {
        this.container.innerHTML = '';

        for (const [subjectName, subjectData] of Object.entries(MathRegistry)) {
            const subjectBox = this.createSubjectBox(subjectName, subjectData);
            this.container.appendChild(subjectBox);
        }

        this.renderSignatures();
        this.attachSelectionListeners(); // Add listener to handle singular selections
    }

    createSubjectBox(subjectName, subjectData) {
        const wrapper = document.createElement('div');
        wrapper.className = 'subject-box';

        const title = document.createElement('div');
        title.className = 'subject-title';
        title.innerText = subjectName;
        wrapper.appendChild(title);

        const grid = document.createElement('div');
        grid.className = 'modules-grid';

        subjectData.modules.forEach((mod) => {
            const label = document.createElement('label');
            label.className = 'module-card';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = mod.id;
            checkbox.checked = subjectData.defaultActive;
            checkbox.className = 'module-checkbox';

            // Retrieve high score for this specific module
            const highScore = ScoreManager.getModuleHighScore(mod.id);

            const content = document.createElement('div');
            content.className = 'card-content';
            content.innerHTML = `
                <span class="module-name">${mod.name}</span>
                <span class="module-sig" data-latex="${mod.sig}"></span>
                <div class="module-highscore">Best: ${highScore}</div>
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
        sigElements.forEach((el) => {
            const latex = el.getAttribute('data-latex');
            katex.render(latex, el, { throwOnError: false });
        });
    }

    // Inside menu.js -> MenuManager class

    attachSelectionListeners() {
        const hintEl = document.getElementById('selection-hint');
        const checkboxes = document.querySelectorAll('.module-checkbox');

        const updateUIState = () => {
            const activeIds = MenuManager.getActiveModules();

            if (activeIds.length > 1) {
                this.container.classList.add('multi-select');
                hintEl.innerText = 'Individual high-scores are disabled in mixed mode.';
            } else {
                this.container.classList.remove('multi-select');
                hintEl.innerText = ''; // Clear the warning
            }
        };

        checkboxes.forEach((cb) => {
            cb.addEventListener('change', updateUIState);
        });

        // Run once on init to catch the default state
        updateUIState();
    }
    static getActiveModules() {
        const checkboxes = document.querySelectorAll('.module-checkbox:checked');
        return Array.from(checkboxes).map((cb) => cb.value);
    }
}

// ... DOMContentLoaded listener remains the same
document.addEventListener('DOMContentLoaded', () => {
    window.MenuUI = new MenuManager();
});
