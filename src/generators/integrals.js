import { MathUtils } from '../utils/math.js';

export class Integrals {
    static generators = [
        // 1. Quadratic Polynomial
        // Integrates ax^2 + bx. Coefficients are multiples of 3 and 2 to guarantee integers.
        () => {
            const aBase = MathUtils.randNonTrivial(-3, 3, true);
            const aCoeff = aBase * 3;
            const bBase = MathUtils.randNonTrivial(-4, 4, true);
            const bCoeff = bBase * 2;

            const upper = MathUtils.rand(1, 4);
            const lower = MathUtils.rand(-2, upper - 1);

            const aStr = aCoeff === 1 ? '' : aCoeff === -1 ? '-' : aCoeff;
            const bStr = bCoeff > 0 ? `+ ${bCoeff}x` : `- ${Math.abs(bCoeff)}x`;

            const answer =
                aBase * (Math.pow(upper, 3) - Math.pow(lower, 3)) +
                bBase * (Math.pow(upper, 2) - Math.pow(lower, 2));

            return {
                latex: `\\int_{${lower}}^{${upper}} (${aStr}x^2 ${bStr}) \\, dx`,
                answer: Math.round(answer),
            };
        },

        // 2. Exponential with U-Substitution
        // Integrates 2ax * e^(x^2) -> a * e^(x^2). Limits yield integer difference.
        () => {
            const a = MathUtils.randNonTrivial(-5, 5, true);
            const c = MathUtils.rand(2, 6); // Inner limit variable

            const coeffVal = a * 2;
            const coeffStr = coeffVal === 1 ? '' : coeffVal === -1 ? '-' : coeffVal;

            return {
                latex: `\\int_{0}^{\\sqrt{\\ln(${c})}} ${coeffStr}x e^{x^2} \\, dx`,
                answer: a * (c - 1),
            };
        },

        // 3. Trigonometric with Chain Rule
        // Integrates A*b*sin(bx) or cos(bx). Pre-multiplied to ensure integer after division.
        () => {
            const A = MathUtils.randNonTrivial(-6, 6, true);
            const b = MathUtils.rand(2, 4);
            const A_adj = A * b;

            const exactSin = (n) => [0, 1, 0, -1][((n % 4) + 4) % 4];
            const exactCos = (n) => [1, 0, -1, 0][((n % 4) + 4) % 4];

            const k1 = MathUtils.rand(-2, 2);
            const k2 = MathUtils.rand(k1 + 1, k1 + 3);

            // Simplifies the limit fractions for LaTeX rendering
            const formatBound = (k, b) => {
                if (k === 0) return '0';
                const sign = k < 0 ? '-' : '';
                const num = Math.abs(k);
                const den = b * 2;

                const gcd = (x, y) => (y === 0 ? x : gcd(y, x % y));
                const g = gcd(num, den);
                const n = num / g;
                const d = den / g;

                const piStr = n === 1 ? '\\pi' : `${n}\\pi`;
                if (d === 1) return `${sign}${piStr}`;
                return `${sign}\\frac{${piStr}}{${d}}`;
            };

            const isSin = Math.random() > 0.5;
            const coeffStr = A_adj === 1 ? '' : A_adj === -1 ? '-' : A_adj;

            if (isSin) {
                return {
                    latex: `\\int_{${formatBound(k1, b)}}^{${formatBound(k2, b)}} ${coeffStr}\\sin(${b}x) \\, dx`,
                    answer: -A * exactCos(k2) - -A * exactCos(k1),
                };
            } else {
                return {
                    latex: `\\int_{${formatBound(k1, b)}}^{${formatBound(k2, b)}} ${coeffStr}\\cos(${b}x) \\, dx`,
                    answer: A * exactSin(k2) - A * exactSin(k1),
                };
            }
        },

        // 4. Fractional Power (Square Root)
        // Integrates A*sqrt(x) -> (2/3)Ax^(3/2). Coefficient is a multiple of 3.
        () => {
            const A_base = MathUtils.randNonTrivial(-4, 4, true);
            const A = A_base * 3;
            const a = MathUtils.rand(0, 2);
            const b = MathUtils.rand(a + 1, 4);

            const coeffStr = A === 1 ? '' : A === -1 ? '-' : A;

            return {
                latex: `\\int_{${a * a}}^{${b * b}} ${coeffStr}\\sqrt{x} \\, dx`,
                answer: A_base * 2 * (Math.pow(b, 3) - Math.pow(a, 3)),
            };
        },

        // 5. Logarithmic U-Substitution
        // Integrates A*ln(x)/x -> (A/2)(ln(x))^2. Coefficient is an even number.
        () => {
            const A_base = MathUtils.randNonTrivial(-4, 4, true);
            const A = A_base * 2;
            const a = MathUtils.rand(0, 2);
            const b = MathUtils.rand(a + 1, 4);

            const formatE = (val) => (val === 0 ? '1' : val === 1 ? 'e' : `e^{${val}}`);

            let latexStr = '';
            if (A === 2) latexStr = `\\frac{\\ln(x)}{x}`;
            else if (A === -2) latexStr = `-\\frac{\\ln(x)}{x}`;
            else latexStr = `\\frac{${A}\\ln(x)}{x}`;

            return {
                latex: `\\int_{${formatE(a)}}^{${formatE(b)}} ${latexStr} \\, dx`,
                answer: A_base * (b * b - a * a),
            };
        },

        // 6. Shifted Reciprocal
        // Integrates A/(x+c) -> A*ln|x+c|. Limits are offset to yield an integer.
        () => {
            const A = MathUtils.randNonTrivial(-5, 5, true);
            const c = MathUtils.randNonTrivial(-5, 5, true);
            const a = MathUtils.rand(0, 3);
            const b = MathUtils.rand(a + 1, 5);

            const formatLimit = (expVal, offset) => {
                const ePart = expVal === 0 ? '1' : expVal === 1 ? 'e' : `e^{${expVal}}`;
                if (offset === 0) return ePart;
                const sign = offset > 0 ? '-' : '+';
                const absOffset = Math.abs(offset);

                if (expVal === 0) return `${1 - offset}`;
                return `${ePart} ${sign} ${absOffset}`;
            };

            const numStr = A === 1 ? '1' : A === -1 ? '-1' : A;
            const denomStr = c > 0 ? `x + ${c}` : `x - ${Math.abs(c)}`;

            return {
                latex: `\\int_{${formatLimit(a, c)}}^{${formatLimit(b, c)}} \\frac{${numStr}}{${denomStr}} \\, dx`,
                answer: A * (b - a),
            };
        },

        // 7. Secant Squared
        // Integrates A*sec^2(x) -> A*tan(x). Evaluates at nice angles.
        () => {
            const A = MathUtils.randNonTrivial(-6, 6, true);
            const coeffStr = A === 1 ? '' : A === -1 ? '-' : A;

            const limits = [
                { lower: '0', upper: '\\frac{\\pi}{4}', val: 1 },
                { lower: '-\\frac{\\pi}{4}', upper: '\\frac{\\pi}{4}', val: 2 },
                { lower: '-\\frac{\\pi}{4}', upper: '0', val: 1 },
            ];
            const pick = MathUtils.pickRandom(limits);

            return {
                latex: `\\int_{${pick.lower}}^{${pick.upper}} ${coeffStr}\\sec^2(x) \\, dx`,
                answer: A * pick.val,
            };
        },

        // 8. Symmetric Odd Function (Trick Question)
        // Mental math shortcut testing interval symmetry.
        () => {
            const c = MathUtils.randNonTrivial(-9, 9, true);
            const a = MathUtils.rand(1, 5);

            const formatA = a === 1 ? '\\pi' : `${a}\\pi`;
            const cStr = c === 1 ? '' : c === -1 ? '-' : c;

            const types = [
                `${cStr}x^3 \\cos(x)`,
                `${cStr}x \\sin(x^2)`,
                `\\frac{${cStr}x}{x^2 + 1}`,
            ];
            const funcStr = MathUtils.pickRandom(types);

            return {
                latex: `\\int_{-${formatA}}^{${formatA}} ${funcStr} \\, dx`,
                answer: 0,
            };
        },
    ];

    static generateProblem() {
        return MathUtils.pickRandom(this.generators)();
    }
}
