import { MathUtils } from '../utils/math.js';

export class BasicOperations {
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
            const exp = MathUtils.rand(2, 6);
            let base;

            if (exp === 2) {
                base = MathUtils.randNonTrivial(-31, 31, true); // e.g., 31^2 = 961, (-25)^2 = 625
            } else if (exp === 3) {
                base = MathUtils.randNonTrivial(-10, 10, true); // e.g., 9^3 = 729, (-10)^3 = -1000
            } else if (exp === 4) {
                base = MathUtils.randNonTrivial(-5, 5, true); // e.g., 5^4 = 625, (-4)^4 = 256
            } else if (exp === 5) {
                base = MathUtils.randNonTrivial(-3, 3, true); // e.g., 3^5 = 243, (-3)^5 = -243
            } else {
                // exp === 6
                base = MathUtils.randNonTrivial(-3, 3, true); // e.g., 3^6 = 729
            }

            // Format negative bases properly with parentheses for correct LaTeX rendering
            const baseStr = base < 0 ? `(${base})` : `${base}`;
            return { latex: `${baseStr}^{${exp}}`, answer: Math.pow(base, exp) };
        },

        // Logarithms
        () => {
            // Allow negative answers (which will correspond to fractional arguments)
            // Exclude -1, 0, 1 to keep it non-trivial
            let answer = MathUtils.rand(-4, 4);
            if (answer >= -1 && answer <= 1) answer = 5; // Push trivial answers to a harder positive power

            const absAns = Math.abs(answer);
            let base;

            // Determine safe base based on the absolute exponent
            if (absAns === 2) base = MathUtils.rand(2, 31);
            else if (absAns === 3) base = MathUtils.rand(2, 10);
            else if (absAns === 4) base = MathUtils.rand(2, 5);
            else base = MathUtils.rand(2, 3); // For absAns 5

            const argument = Math.pow(base, absAns);

            // If the answer is negative, represent the argument as a LaTeX fraction
            const latexArg = answer < 0 ? `\\frac{1}{${argument}}` : `${argument}`;

            return { latex: `\\log_{${base}}(${latexArg})`, answer: answer };
        },
    ];

    static generateProblem() {
        return MathUtils.pickRandom(this.generators)();
    }
}
