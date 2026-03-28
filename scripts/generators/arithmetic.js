import { MathUtils } from '../math.js';

export class Arithmetic {
    static generators = [
        // Addition
        () => {
            const a = MathUtils.randNonTrivial(-150, 150, true);
            const b = MathUtils.randNonTrivial(-150, 150, true);
            return { latex: `${a} + ${MathUtils.formatNeg(b)}`, answer: a + b };
        },

        // Subtraction
        () => {
            const a = MathUtils.randNonTrivial(-150, 150, true);
            const b = MathUtils.randNonTrivial(-150, 150, true);
            return { latex: `${a} - ${MathUtils.formatNeg(b)}`, answer: a - b };
        },

        // Multiplication
        () => {
            const a = MathUtils.randNonTrivial(-25, 25);
            const b = MathUtils.randNonTrivial(-25, 25);
            return {
                latex: `${MathUtils.formatNeg(a)} \\times ${MathUtils.formatNeg(b)}`,
                answer: a * b,
            };
        },

        // Division
        () => {
            const b = MathUtils.randNonTrivial(2, 25);
            const answer = MathUtils.randNonTrivial(-25, 25);
            return { latex: `\\frac{${b * answer}}{${b}}`, answer: answer };
        },

        // Exponentiation
        () => {
            const a = MathUtils.rand(2, 9);
            let maxExp = 3; // Default for 6-9 (e.g., 9^3 = 729)
            if (a === 2)
                maxExp = 9; // 2^9 = 512
            else if (a === 3)
                maxExp = 6; // 3^6 = 729
            else if (a <= 5) maxExp = 4; // 4^4 = 256, 5^4 = 625

            const answer = MathUtils.rand(2, maxExp);
            return { latex: `${a}^{${answer}}`, answer: Math.pow(a, answer) };
        },

        // Logarithms
        () => {
            const base = MathUtils.rand(2, 9);
            let maxAns = 3;
            if (base === 2) maxAns = 9;
            else if (base === 3) maxAns = 6;
            else if (base <= 5) maxAns = 4;

            const answer = MathUtils.rand(2, maxAns);
            const argument = Math.pow(base, answer);

            return { latex: `\\log_{${base}}(${argument})`, answer: answer };
        },
    ];

    static generateProblem() {
        return MathUtils.pickRandom(this.generators)();
    }
}
