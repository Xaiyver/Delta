export class ScoreManager {
    static DB_KEY = 'speedmath_db';
    static HS_PREFIX = 'highscore_';

    /**
     * Records a game entry and updates module-specific high scores.
     */
    static saveGame(score, activeModules) {
        if (score === 0) return;

        // 1. Save to global history
        const db = this.getAllScores();
        db.push({ score, timestamp: Date.now() });
        localStorage.setItem(this.DB_KEY, JSON.stringify(db));

        // 2. Save module-specific high score if only one module was active
        if (activeModules.length === 1) {
            this.updateModuleHighScore(activeModules[0], score);
        }
    }

    static updateModuleHighScore(moduleId, score) {
        const storageKey = `${this.HS_PREFIX}${moduleId}`;
        const currentHighScore = parseInt(localStorage.getItem(storageKey), 10) || 0;
        if (score > currentHighScore) {
            localStorage.setItem(storageKey, score);
        }
    }

    static getModuleHighScore(moduleId) {
        return parseInt(localStorage.getItem(`${this.HS_PREFIX}${moduleId}`), 10) || 0;
    }

    static getAllScores() {
        return JSON.parse(localStorage.getItem(this.DB_KEY) || '[]');
    }

    /**
     * Returns the last N scores for chart rendering
     */
    static getRecentScores(limit = 20) {
        return this.getAllScores().slice(-limit);
    }
}
