// Central configuration for the game's subjects and modules
window.MathRegistry = {
    "Arithmetic": {
        defaultActive: true,
        modules: [
            { id: "Arithmetic", name: "Basic Operations", sig: "14 + (-16)" }
        ]
    },
    "Linear Algebra": {
        defaultActive: true,
        modules: [
            { id: "Determinants", name: "Determinants", sig: "\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix}" }
        ]
    },
    "Real Calculus": {
        defaultActive: true,
        modules: [
            { id: "Limits", name: "Limits", sig: "\\displaystyle \\lim_{x \\to \\infty} \\frac{x}{2x}" },
            { id: "Integrals", name: "Definite Integrals", sig: "\\displaystyle \\int_0^\\pi \\sin(x) dx" }
        ]
    }
    // Future subjects (Multivariate, Real Analysis) easily plug in here
};
