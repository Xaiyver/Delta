import { UIManager } from './ui/ui_manager.js';
import { ScoreManager } from './core/score_manager.js';
import { ProblemManager } from './core/problem_manager.js';
import { EventManager } from './core/event_manager.js';
import { GameEngine } from './core/game_engine.js';
import { MenuManager } from './ui/menu.js';

class GameManager {
    constructor() {
        this.ui = new UIManager();
        this.problemManager = new ProblemManager(this.ui);
        this.events = new EventManager(this);
        this.engine = new GameEngine(this.ui, this.problemManager, () => {
            console.log('Game finished!');
        });

        this.ui.renderChart(ScoreManager.getRecentScores());
        this.els = this.ui.els;
        this.loadConfig();
    }

    start() {
        this.engine.start();
    }

    loadConfig() {
        const savedSize = localStorage.getItem('speedmath_fontsize') || '3';
        this.els.fontSizeSlider.value = savedSize;
        this.els.fontSizeDisplay.innerText = savedSize;
        document.documentElement.style.setProperty('--expr-size', `${savedSize}rem`);
    }
}

document.addEventListener('DOMContentLoaded', () => new GameManager());
