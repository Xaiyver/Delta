import { MathUtils } from './math.js';

export class Limits {
    static generators = [
        // Polynomial
        () => {
            const a = MathUtils.rand(-5, 5);
            const b = MathUtils.randNonTrivial(-5, 5, true);
            const c = MathUtils.rand(-10, 10);
            const sign = c >= 0 ? '+' : '-';
            return {
                latex: `\\lim_{x \\to ${a}} (${b === 1 ? '' : b === -1 ? '-' : b}x ${sign} ${Math.abs(c)})`,
                answer: b * a + c
            };
        },
        
        // Rational Hole
        () => {
            const a = MathUtils.randNonTrivial(-10, 10);
            return {
                latex: `\\lim_{x \\to ${a}} \\frac{x^2 - ${a * a}}{x - ${MathUtils.formatNeg(a)}}`,
                answer: 2 * a
            };
        },

        // Infinity
        () => {
            const c = MathUtils.randNonTrivial(1, 4);
            const answer = MathUtils.randNonTrivial(-8, 8);
            const a = c * answer;
            const b = MathUtils.rand(-5, 5);
            const d = MathUtils.rand(-5, 5);
            const signB = b >= 0 ? '+' : '-';
            const signD = d >= 0 ? '+' : '-';
            return {
                latex: `\\lim_{x \\to \\infty} \\frac{${a}x^2 ${signB} ${Math.abs(b)}x}{${c}x^2 ${signD} ${Math.abs(d)}}`,
                answer: answer
            };
        },

        // Trigonometric
        () => {
            const b = MathUtils.randNonTrivial(1, 4);
            const answer = MathUtils.randNonTrivial(-6, 6);
            const a = b * answer;
            return {
                latex: `\\lim_{x \\to 0} \\frac{\\sin(${a}x)}{${b}x}`,
                answer: answer
            };
        }
    ];

    static generateProblem() {
        return MathUtils.pickRandom(this.generators)();
    }
};
