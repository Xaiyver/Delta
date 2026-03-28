class MathUtils {
    static rand(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static randNonTrivial(min, max, allowOne = false) {
        let val;
        do { 
            val = this.rand(min, max); 
        } while (val === 0 || (!allowOne && Math.abs(val) === 1));
        return val;
    }

    static formatNeg(num) {
        return num < 0 ? `(${num})` : `${num}`;
    }

    // NEW: Helper to pick a random element from an array
    static pickRandom(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
    static formatTrigBound(k) {
        if (k === 0) return '0';
        if (k === 1) return '\\frac{\\pi}{2}';
        if (k === 2) return '\\pi';
        if (k === 3) return '\\frac{3\\pi}{2}';
        if (k === 4) return '2\\pi';
    }
}

window.MathModules = {};
