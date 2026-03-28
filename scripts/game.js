import * as Generators from './generators/index.js';

import { MathRegistry } from './registry.js';
import { MenuManager } from './menu.js';
import { GameTimer } from './timer.js';

class GameManager {
    constructor() {
        this.score = 0;
        this.rawCorrect = 0;
        this.pointsPerQuestion = 1;
        this.timeLeft = 120;
        this.timerInterval = null;
        this.currentProblem = null;
        this.activeModules = [];
        this.runTimer = null;

        this.els = {
            startBtn: document.getElementById('start-btn'),
            restartBtn: document.getElementById('restart-btn'),
            configBtn: document.getElementById('config-btn'),
            configBackBtn: document.getElementById('config-back-btn'),
            backToMenuBtn: document.getElementById('back-to-menu-btn'),
            input: document.getElementById('answer-input'),
            startScreen: document.getElementById('start-screen'),
            gameScreen: document.getElementById('game-screen'),
            endScreen: document.getElementById('end-screen'),
            configScreen: document.getElementById('config-screen'),
            expression: document.getElementById('expression'),
            timer: document.getElementById('time-bar'),
            score: document.getElementById('score'),
            finalScore: document.getElementById('final-score'),
            statsBreakdown: document.getElementById('stats-breakdown'),
            fontSizeSlider: document.getElementById('font-size-slider'),
            fontSizeDisplay: document.getElementById('font-size-display'),
        };

        this.initEventListeners();
        this.loadConfig();
        this.renderChart(); // Draw chart on load
    }

    initEventListeners() {
        this.els.startBtn.addEventListener('click', () => this.startGame());
        this.els.restartBtn.addEventListener('click', () => this.startGame());
        this.els.input.addEventListener('input', () => this.checkAnswer());

        this.els.configBtn.addEventListener('click', () => this.showScreen('config'));
        this.els.configBackBtn.addEventListener('click', () => {
            this.showScreen('start');
            this.renderChart();
        });

        this.els.backToMenuBtn.addEventListener('click', () => {
            if (this.runTimer) this.runTimer.stop();
            clearInterval(this.timerInterval);
            this.showScreen('start');
            this.renderChart();
        });

        this.els.fontSizeSlider.addEventListener('input', (e) => {
            const size = e.target.value;
            this.els.fontSizeDisplay.innerText = size;
            document.documentElement.style.setProperty('--expr-size', `${size}rem`);
            localStorage.setItem('speedmath_fontsize', size);
        });
    }

    loadConfig() {
        const savedSize = localStorage.getItem('speedmath_fontsize') || '3';
        this.els.fontSizeSlider.value = savedSize;
        this.els.fontSizeDisplay.innerText = savedSize;
        document.documentElement.style.setProperty('--expr-size', `${savedSize}rem`);
    }

    renderChart() {
        const db = JSON.parse(localStorage.getItem('speedmath_db') || '[]');
        const chartContainer = document.getElementById('chart-container');
        chartContainer.innerHTML = '';

        if (db.length === 0) {
            chartContainer.innerHTML = '<span class="empty-chart">No games played yet.</span>';
            return;
        }

        // Take the last 20 games to prevent the chart from overflowing
        const recentGames = db.slice(-20);
        const maxScore = Math.max(...recentGames.map((g) => g.score), 10);

        recentGames.forEach((game) => {
            const bar = document.createElement('div');
            bar.className = 'chart-bar';
            const heightPct = Math.max((game.score / maxScore) * 100, 5); // 5% minimum height for visibility
            bar.style.height = `${heightPct}%`;
            bar.setAttribute('data-score', game.score);
            chartContainer.appendChild(bar);
        });
    }

    showScreen(screen) {
        this.els.startScreen.classList.add('hidden');
        this.els.gameScreen.classList.add('hidden');
        this.els.endScreen.classList.add('hidden');
        this.els.configScreen.classList.add('hidden');
        this.els.backToMenuBtn.classList.add('hidden');

        if (screen === 'start') {
            this.els.startScreen.classList.remove('hidden');
            // If the user went back to menu, re-render the menu to update potentially new high scores
            if (window.MenuUI) window.MenuUI.init();
        }
        if (screen === 'config') this.els.configScreen.classList.remove('hidden');
        if (screen === 'game') {
            this.els.gameScreen.classList.remove('hidden');
            this.els.backToMenuBtn.classList.remove('hidden');
        }
        if (screen === 'end') {
            this.els.endScreen.classList.remove('hidden');
            this.els.backToMenuBtn.classList.remove('hidden');
        }
    }

    startGame() {
        this.activeModules = MenuManager.getActiveModules();

        if (this.activeModules.length === 0) {
            alert('Please select at least one module to start.');
            return;
        }

        this.score = 0;
        this.rawCorrect = 0;
        this.timeLeft = 120;
        this.els.score.innerText = this.score;

        this.showScreen('game');
        this.els.input.value = '';
        this.els.input.focus();

        this.runTimer = new GameTimer(120, () => this.endGame());
        this.runTimer.start();
        this.nextProblem();
    }

    nextProblem() {
        const randomModuleId =
            this.activeModules[Math.floor(Math.random() * this.activeModules.length)];

        this.currentProblem = Generators[randomModuleId].generateProblem();

        katex.render(this.currentProblem.latex, this.els.expression, {
            throwOnError: false,
            displayMode: true,
        });
        this.els.input.value = '';
    }

    checkAnswer() {
        if (this.els.input.value === '') return;
        const userVal = parseInt(this.els.input.value, 10);

        if (userVal === this.currentProblem.answer) {
            this.score += this.pointsPerQuestion;
            this.rawCorrect++;
            this.els.score.innerText = this.score;
            this.nextProblem();
        }
    }

    endGame() {
        if (this.runTimer) {
            this.runTimer.stop();
            this.runTimer = null;
        }
        this.showScreen('end');
        this.els.finalScore.innerText = this.score;
        this.els.statsBreakdown.innerText = `(${this.rawCorrect} solved at ${this.pointsPerQuestion} pts each)`;

        this.saveScore(this.score);
        this.saveModuleHighScore(this.score);
        this.renderChart();
    }

    saveScore(score) {
        if (score === 0) return; // Don't chart 0 point runs
        const db = JSON.parse(localStorage.getItem('speedmath_db') || '[]');
        db.push({ score, timestamp: Date.now() });
        localStorage.setItem('speedmath_db', JSON.stringify(db));
    }

    saveModuleHighScore(score) {
        // Only save to specific module if exactly ONE module was active
        if (this.activeModules.length === 1) {
            const moduleId = this.activeModules[0];
            const storageKey = `highscore_${moduleId}`;
            const currentHighScore = parseInt(localStorage.getItem(storageKey), 10) || 0;

            if (score > currentHighScore) {
                localStorage.setItem(storageKey, score);
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => new GameManager());
