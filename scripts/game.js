import * as Generators from './generators/index.js';

import { UIManager } from './core/ui_manager.js';
import { ScoreManager } from './core/score_manager.js';
import { ProblemManager } from './core/problem_manager.js';
import { EventManager } from './core/event_manager.js';
import { GameEngine } from './core/game_engine.js';

import { MathRegistry } from './registry.js';
import { MenuManager } from './menu.js';
import { GameTimer } from './timer.js';

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

    checkAnswer() {
        this.engine.checkAnswer(this.ui.els.input.value);
    }

    loadConfig() {
        const savedSize = localStorage.getItem('speedmath_fontsize') || '3';
        this.els.fontSizeSlider.value = savedSize;
        this.els.fontSizeDisplay.innerText = savedSize;
        document.documentElement.style.setProperty('--expr-size', `${savedSize}rem`);
    }

    checkAnswer() {
        const inputVal = this.ui.els.input.value;
        if (inputVal === '') return;

        if (this.problemManager.isCorrect(inputVal)) {
            this.score += this.pointsPerQuestion;
            this.rawCorrect++;
            this.ui.updateScore(this.score);
            this.nextProblem();
        }
    }

    showScreen(screen) {
        this.ui.showScreen(screen);
    }

    endGame() {
        if (this.runTimer) {
            this.runTimer.stop();
            this.runTimer = null;
        }
        this.showScreen('end');
        this.els.finalScore.innerText = this.score;
        this.els.statsBreakdown.innerText = `(${this.rawCorrect} solved at ${this.pointsPerQuestion} pts each)`;

        ScoreManager.saveGame(this.score, this.activeModules);
    }
}

document.addEventListener('DOMContentLoaded', () => new GameManager());
