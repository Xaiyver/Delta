import { MathUtils } from './math.js';

export class Arithmetic {
    // Define an array of standalone generator functions
    static generators = [
        // Addition
        () => {
            const a = MathUtils.randNonTrivial(-50, 50, true);
            const b = MathUtils.randNonTrivial(-50, 50, true);
            return { latex: `${a} + ${MathUtils.formatNeg(b)}`, answer: a + b };
        },
        
        // Subtraction
        () => {
            const a = MathUtils.randNonTrivial(-50, 50, true);
            const b = MathUtils.randNonTrivial(-50, 50, true);
            return { latex: `${a} - ${MathUtils.formatNeg(b)}`, answer: a - b };
        },
        
        // Multiplication
        () => {
            const a = MathUtils.randNonTrivial(-12, 12);
            const b = MathUtils.randNonTrivial(-12, 12);
            return { latex: `${MathUtils.formatNeg(a)} \\times ${MathUtils.formatNeg(b)}`, answer: a * b };
        },
        
        // Division
        () => {
            const b = MathUtils.randNonTrivial(2, 12);
            const answer = MathUtils.randNonTrivial(-12, 12);
            return { latex: `\\frac{${b * answer}}{${b}}`, answer: answer };
        },

        // Exponentiation
        () => {
            const a = MathUtils.rand(2, 5);
            const answer = MathUtils.rand(2, a === 2 ? 6 : (a === 3 ? 4 : 3));
            return { latex: `${a}^{${answer}}`, answer: Math.pow(a, answer) };
        }
    ];

    // The entire generation logic is now just one line
    static generateProblem() {
        return MathUtils.pickRandom(this.generators)();
    }
};
