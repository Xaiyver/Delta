import { MathUtils } from '../math.js';

export class Integrals {
    static generators = [
        // Trigonometric
        () => {
            const isSin = Math.random() > 0.5;
            const A = MathUtils.randNonTrivial(-5, 5, true); 
            const a_k = MathUtils.rand(0, 3);
            const b_k = MathUtils.rand(a_k + 1, 4);
            const getVal = (func, k) => Math.round(func((k * Math.PI) / 2));
            const coeff = A === 1 ? '' : A === -1 ? '-' : A;

            if (isSin) {
                return {
                    latex: `\\int_{${MathUtils.formatTrigBound(a_k)}}^{${MathUtils.formatTrigBound(b_k)}} ${coeff}\\sin(x) \\, dx`,
                    answer: -A * getVal(Math.cos, b_k) - (-A * getVal(Math.cos, a_k))
                };
            } else {
                return {
                    latex: `\\int_{${MathUtils.formatTrigBound(a_k)}}^{${MathUtils.formatTrigBound(b_k)}} ${coeff}\\cos(x) \\, dx`,
                    answer: A * getVal(Math.sin, b_k) - A * getVal(Math.sin, a_k)
                };
            }
        },

        // Power Rule
        () => {
            const n = MathUtils.rand(1, 2); 
            const m = MathUtils.rand(1, 4); 
            const a = MathUtils.rand(-2, 2);
            const b = MathUtils.rand(a + 1, 3);
            const coeff = m * (n + 1);
            return {
                latex: `\\int_{${a}}^{${b}} ${n === 1 ? `${coeff}x` : `${coeff}x^2`} \\, dx`,
                answer: m * (Math.pow(b, n + 1) - Math.pow(a, n + 1))
            };
        },

        // Exponential
        () => {
            const A = MathUtils.randNonTrivial(-4, 4, true);
            const a = MathUtils.rand(1, 4);
            const b = MathUtils.rand(a + 1, 8); 
            const coeff = A === 1 ? '' : A === -1 ? '-' : A;
            const formatLn = (val) => val === 1 ? '0' : `\\ln(${val})`;
            return {
                latex: `\\int_{${formatLn(a)}}^{${formatLn(b)}} ${coeff}e^x \\, dx`,
                answer: A * (b - a)
            };
        },

        // Reciprocal
        () => {
            const m = MathUtils.randNonTrivial(-6, 6, true);
            const a = MathUtils.rand(0, 3);
            const b = MathUtils.rand(a + 1, 5);
            const formatE = (val) => val === 0 ? '1' : val === 1 ? 'e' : `e^{${val}}`;
            const topStr = m === 1 ? '1' : m === -1 ? '-1' : m;
            return {
                latex: `\\int_{${formatE(a)}}^{${formatE(b)}} \\frac{${topStr}}{x} \\, dx`,
                answer: m * (b - a)
            };
        }
    ];

    static generateProblem() {
        return MathUtils.pickRandom(this.generators)();
    }
};
