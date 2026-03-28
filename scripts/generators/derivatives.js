import { MathUtils } from '../math.js';

export class Derivatives {
    static generators = [
        // Quadratic: f(x) = ax^2 + bx evaluated at x
        () => {
            const a = MathUtils.randNonTrivial(-5, 5, true);
            const b = MathUtils.rand(-10, 10);
            const x = MathUtils.rand(-4, 4);
            
            const aStr = a === 1 ? '' : (a === -1 ? '-' : a);
            let bStr = '';
            if (b > 0) bStr = `+ ${b}x`;
            else if (b < 0) bStr = `- ${Math.abs(b)}x`;

            return {
                latex: `\\left. \\frac{d}{dx} (${aStr}x^2 ${bStr}) \\right|_{x=${x}}`,
                answer: 2 * a * x + b
            };
        },

        // Cubic: f(x) = ax^3 evaluated at x
        () => {
            const a = MathUtils.randNonTrivial(-3, 3, true);
            const x = MathUtils.rand(-3, 3);
            
            const aStr = a === 1 ? '' : (a === -1 ? '-' : a);
            
            return {
                latex: `\\left. \\frac{d}{dx} (${aStr}x^3) \\right|_{x=${x}}`,
                answer: 3 * a * x * x
            };
        },

        // Trigonometric: f(x) = a*sin(bx) evaluated at x=0
        () => {
            const a = MathUtils.randNonTrivial(-9, 9, true);
            // Ensuring b is positive to keep the mental math straightforward
            const b = MathUtils.rand(2, 5); 
            
            const aStr = a === 1 ? '' : (a === -1 ? '-' : a);
            
            return {
                latex: `\\left. \\frac{d}{dx} (${aStr}\\sin(${b}x)) \\right|_{x=0}`,
                answer: a * b
            };
        }
    ];

    static generateProblem() {
        return MathUtils.pickRandom(this.generators)();
    }
}
