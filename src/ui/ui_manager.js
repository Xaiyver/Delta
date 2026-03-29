export class UIManager {
    constructor() {
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
            chartContainer: document.getElementById('chart-container'),
        };
    }

    showScreen(screen) {
        // Hide all
        [
            this.els.startScreen,
            this.els.gameScreen,
            this.els.endScreen,
            this.els.configScreen,
            this.els.backToMenuBtn,
        ].forEach((el) => el.classList.add('hidden'));

        // Show target
        if (screen === 'start') this.els.startScreen.classList.remove('hidden');
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

    renderExpression(latex) {
        katex.render(latex, this.els.expression, { throwOnError: false, displayMode: true });
    }

    updateScore(score) {
        this.els.score.innerText = score;
    }

    clearInput() {
        this.els.input.value = '';
        this.els.input.focus();
    }

    renderChart(db = []) {
        this.els.chartContainer.innerHTML = '';
        if (!db || db.length === 0) {
            this.els.chartContainer.innerHTML =
                '<span class="empty-chart">No games played yet.</span>';
            return;
        }

        const recentGames = db.slice(-20);
        const maxScore = Math.max(...recentGames.map((g) => g.score), 10);

        recentGames.forEach((game) => {
            const bar = document.createElement('div');
            bar.className = 'chart-bar';
            bar.style.height = `${Math.max((game.score / maxScore) * 100, 5)}%`;
            bar.setAttribute('data-score', game.score);
            this.els.chartContainer.appendChild(bar);
        });
    }

    setEndScreenStats(score, rawCorrect, pts) {
        this.els.finalScore.innerText = score;
        this.els.statsBreakdown.innerText = `(${rawCorrect} solved at ${pts} pts each)`;
    }
}
