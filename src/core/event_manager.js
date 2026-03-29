export class EventManager {
    constructor(game) {
        this.game = game; // Reference to the main GameManager
        this.ui = game.ui;
        this.els = game.ui.els;
        this.init();
    }

    init() {
        // Start/Restart
        this.els.startBtn.addEventListener('click', () => this.game.start());
        this.els.restartBtn.addEventListener('click', () => this.game.start());

        // Navigation
        this.els.configBtn.addEventListener('click', () => this.game.showScreen('config'));
        this.els.configBackBtn.addEventListener('click', () => {
            this.game.ui.showScreen('start');
            this.game.ui.renderChart();
        });

        this.els.backToMenuBtn.addEventListener('click', () => {
            if (this.game.runTimer) this.game.runTimer.stop();
            this.game.ui.showScreen('start');
            this.game.ui.renderChart();
        });

        // Input
        this.els.input.addEventListener('input', () =>
            this.game.engine.checkAnswer(this.game.ui.els.input.value),
        );

        // Configuration
        this.els.fontSizeSlider.addEventListener('input', (e) => {
            const size = e.target.value;
            this.els.fontSizeDisplay.innerText = size;
            document.documentElement.style.setProperty('--expr-size', `${size}rem`);
            localStorage.setItem('speedmath_fontsize', size);
        });
    }
}
