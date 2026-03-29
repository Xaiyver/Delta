import * as Generators from '../generators/index.js';

export class ProblemManager {
    constructor(ui) {
        this.ui = ui;
        this.currentProblem = null;
    }

    generate(activeModuleIds) {
        const randomModuleId = activeModuleIds[Math.floor(Math.random() * activeModuleIds.length)];
        this.currentProblem = Generators[randomModuleId].generateProblem();
        this.ui.renderExpression(this.currentProblem.latex);
    }

    isCorrect(userInput) {
        const val = parseInt(userInput, 10);
        return val === this.currentProblem.answer;
    }
}
