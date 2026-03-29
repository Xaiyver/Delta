import { MathUtils } from '../utils/math.js';

export class Derivatives {
    static generators = [
        // Quadratic: f(x) = ax^2 + bx evaluated at x
        () => {
            const a = MathUtils.randNonTrivial(-5, 5, true);
            const b = MathUtils.rand(-10, 10);
            const x = MathUtils.rand(-4, 4);

            const aStr = a === 1 ? '' : a === -1 ? '-' : a;
            let bStr = '';
            if (b > 0) bStr = `+ ${b}x`;
            else if (b < 0) bStr = `- ${Math.abs(b)}x`;

            return {
                latex: `\\left. \\frac{d}{dx} (${aStr}x^2 ${bStr}) \\right|_{x=${x}}`,
                answer: 2 * a * x + b,
            };
        },

        // Cubic: f(x) = ax^3 evaluated at x
        () => {
            const a = MathUtils.randNonTrivial(-3, 3, true);
            const x = MathUtils.rand(-3, 3);

            const aStr = a === 1 ? '' : a === -1 ? '-' : a;

            return {
                latex: `\\left. \\frac{d}{dx} (${aStr}x^3) \\right|_{x=${x}}`,
                answer: 3 * a * x * x,
            };
        },

        // 3. Trigonometric (Sine): f(x) = a*sin(bx) evaluated at multiples of pi/2
        () => {
            const a = MathUtils.randNonTrivial(-9, 9, true);
            const b = MathUtils.rand(1, 5);
            const k = MathUtils.rand(-5, 5); // x = k * pi/2

            const aStr = a === 1 ? '' : a === -1 ? '-' : a;
            const bStr = b === 1 ? '' : b;

            // Formats k * pi/2 cleanly into LaTeX
            const formatX = (k) => {
                if (k === 0) return '0';
                const sign = k < 0 ? '-' : '';
                const absK = Math.abs(k);
                if (absK % 2 === 0) {
                    const num = absK / 2;
                    return `${sign}${num === 1 ? '' : num}\\pi`;
                }
                return `${sign}\\frac{${absK === 1 ? '' : absK}\\pi}{2}`;
            };

            // Exact evaluation to bypass floating point inaccuracies in Math.cos()
            const exactCos = (n) => [1, 0, -1, 0][((n % 4) + 4) % 4];

            return {
                latex: `\\left. \\frac{d}{dx} (${aStr}\\sin(${bStr}x)) \\right|_{x=${formatX(k)}}`,
                answer: a * b * exactCos(b * k),
            };
        },

        // 4. Trigonometric (Cosine): f(x) = a*cos(bx) evaluated at multiples of pi/2
        () => {
            const a = MathUtils.randNonTrivial(-9, 9, true);
            const b = MathUtils.rand(1, 5);
            const k = MathUtils.rand(-5, 5); // x = k * pi/2

            const aStr = a === 1 ? '' : a === -1 ? '-' : a;
            const bStr = b === 1 ? '' : b;

            const formatX = (k) => {
                if (k === 0) return '0';
                const sign = k < 0 ? '-' : '';
                const absK = Math.abs(k);
                if (absK % 2 === 0) {
                    const num = absK / 2;
                    return `${sign}${num === 1 ? '' : num}\\pi`;
                }
                return `${sign}\\frac{${absK === 1 ? '' : absK}\\pi}{2}`;
            };

            // Exact evaluation to bypass floating point inaccuracies in Math.sin()
            const exactSin = (n) => [0, 1, 0, -1][((n % 4) + 4) % 4];

            return {
                latex: `\\left. \\frac{d}{dx} (${aStr}\\cos(${bStr}x)) \\right|_{x=${formatX(k)}}`,
                answer: -a * b * exactSin(b * k), // Note the negative sign for derivative of cosine
            };
        },
        // 5. Exponential: f(x) = a*e^(bx) evaluated at x=0
        () => {
            const a = MathUtils.randNonTrivial(-5, 5, true);
            const b = MathUtils.randNonTrivial(-4, 4, true);

            const aStr = a === 1 ? '' : a === -1 ? '-' : a;
            const bStr = b === 1 ? '' : b === -1 ? '-' : b;

            return {
                latex: `\\left. \\frac{d}{dx} (${aStr}e^{${bStr}x}) \\right|_{x=0}`,
                answer: a * b,
            };
        },

        // 6. Natural Logarithm: f(x) = a*ln(x) evaluated at x=c
        // Ensures integer answers by making 'a' a multiple of 'c'
        () => {
            const c = MathUtils.rand(2, 5);
            const multiplier = MathUtils.randNonTrivial(-4, 4, true);
            const a = c * multiplier;

            const aStr = a === 1 ? '' : a === -1 ? '-' : a;

            return {
                latex: `\\left. \\frac{d}{dx} (${aStr}\\ln(x)) \\right|_{x=${c}}`,
                answer: multiplier,
            };
        },

        // 7. Reciprocal: f(x) = a/x evaluated at x=c
        // Ensures integer answers by making 'a' a multiple of c^2
        () => {
            const c = MathUtils.rand(2, 4);
            const multiplier = MathUtils.randNonTrivial(-3, 3, true);
            const a = c * c * multiplier;

            return {
                latex: `\\left. \\frac{d}{dx} \\left(\\frac{${a}}{x}\\right) \\right|_{x=${c}}`,
                answer: -multiplier,
            };
        },

        // 8. Square Root: f(x) = a*sqrt(x) evaluated at x=c^2
        // Ensures integer answers by making 'a' a multiple of 2c
        () => {
            const c = MathUtils.rand(2, 4); // so x is 4, 9, or 16
            const x = c * c;
            const multiplier = MathUtils.randNonTrivial(-3, 3, true);
            const a = 2 * c * multiplier;

            const aStr = a === 1 ? '' : a === -1 ? '-' : a;

            return {
                latex: `\\left. \\frac{d}{dx} (${aStr}\\sqrt{x}) \\right|_{x=${x}}`,
                answer: multiplier,
            };
        },

        // 9. Chain Rule (Linear Power): f(x) = (x + b)^2 evaluated at x=c
        // Tests simple chain rule/expansion
        () => {
            const b = MathUtils.randNonTrivial(-5, 5, true);
            const c = MathUtils.rand(-3, 3);

            const bStr = b > 0 ? `+ ${b}` : `- ${Math.abs(b)}`;

            return {
                latex: `\\left. \\frac{d}{dx} (x ${bStr})^2 \\right|_{x=${c}}`,
                answer: 2 * (c + b),
            };
        },

        // 10. Product Rule Base: f(x) = a*x*e^x evaluated at x=0
        // d/dx(x*e^x) = e^x(x + 1). At x=0, this is simply 1. Thus, answer is 'a'.
        () => {
            const a = MathUtils.randNonTrivial(-8, 8, true);
            const aStr = a === 1 ? '' : a === -1 ? '-' : a;

            return {
                latex: `\\left. \\frac{d}{dx} (${aStr}xe^x) \\right|_{x=0}`,
                answer: a,
            };
        },
    ];

    static generateProblem() {
        return MathUtils.pickRandom(this.generators)();
    }
}
