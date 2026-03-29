import { GameTimer } from './timer.js';
import { ScoreManager } from './score_manager.js';
import { MenuManager } from '../ui/menu.js';

export class GameEngine {
    constructor(ui, problemManager, onEndCallback) {
        this.ui = ui;
        this.problemManager = problemManager;
        this.onEnd = onEndCallback;
        this.score = 0;
        this.timer = new GameTimer(30, this.handleTimeUp.bind(this));
    }

    start() {
        this.score = 0;
        this.rawCorrect = 0;
        this.activeModules = MenuManager.getActiveModules();

        if (this.activeModules.length === 0) {
            alert('Select a module!');
            return;
        }

        this.ui.updateScore(0);
        this.ui.showScreen('game');
        this.timer.start();
        this.nextQuestion();
    }

    nextQuestion() {
        this.problemManager.generate(this.activeModules);
        this.ui.clearInput();
    }

    checkAnswer(input) {
        const val = parseInt(input, 10);
        if (isNaN(val)) return;

        if (this.problemManager.isCorrect(input)) {
            this.score += 1;
            this.ui.updateScore(this.score);
            this.nextQuestion();
        }
    }

    handleTimeUp() {
        this.ui.showScreen('end');
        this.ui.setEndScreenStats(this.score, this.rawCorrect, 1);
        ScoreManager.saveGame(this.score, this.activeModules);
        this.onEnd();
    }
}
