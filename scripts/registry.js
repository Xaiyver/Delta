// Central configuration for the game's subjects and modules
export const MathRegistry = {
    Arithmetic: {
        defaultActive: true,
        modules: [{ id: 'BasicOperations', name: 'Basic Operations', sig: '14 + (-16)' }],
    },
    'Linear Algebra': {
        defaultActive: true,
        modules: [
            {
                id: 'Determinants',
                name: 'Determinants',
                sig: '\\begin{vmatrix} 12 & -6 \\\\ 2 & 11 \\end{vmatrix}',
            },
        ],
    },
    'Real Calculus': {
        defaultActive: true,
        modules: [
            {
                id: 'Limits',
                name: 'Limits',
                sig: '\\displaystyle \\lim_{x \\to \\infty} \\frac{x}{2x}',
            },
            {
                id: 'Integrals',
                name: 'Definite Integrals',
                sig: '\\displaystyle \\int_0^\\pi \\sin(x) dx',
            },
            {
                id: 'Derivatives',
                name: 'Derivatives',
                sig: '\\left. \\frac{d}{dx}(x^2) \\right|_{x=3}',
            },
        ],
    },
};
