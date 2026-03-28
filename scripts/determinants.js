import { MathUtils } from './math.js';

export class Determinants {
    static generators = [
        // 2x2 Determinant
        () => {
            const a = MathUtils.rand(-9, 9);
            const b = MathUtils.rand(-9, 9);
            const c = MathUtils.rand(-9, 9);
            const d = MathUtils.rand(-9, 9);
            return {
                latex: `\\begin{vmatrix} ${a} & ${b} \\\\ ${c} & ${d} \\end{vmatrix}`,
                answer: (a * d) - (b * c)
            };
        },
        
        // 3x3 Determinant
        () => {
            const matrix = Array.from({length: 9}, () => MathUtils.rand(-5, 5));
            matrix[MathUtils.rand(0, 8)] = 0; // Inject at least one zero
            const [a, b, c, d, e, f, g, h, i] = matrix;
            return {
                latex: `\\begin{vmatrix} ${a} & ${b} & ${c} \\\\ ${d} & ${e} & ${f} \\\\ ${g} & ${h} & ${i} \\end{vmatrix}`,
                answer: a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g)
            };
        }
    ];

    static generateProblem() {
        return MathUtils.pickRandom(this.generators)();
    }
};
