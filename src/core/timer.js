export class GameTimer {
    constructor(durationSeconds, onCompleteCallback) {
        this.duration = durationSeconds;
        this.onComplete = onCompleteCallback;
        this.barElement = document.getElementById('time-bar');
        this.timeoutId = null;
    }

    start() {
        // 1. Reset visual state immediately to 100% without animation
        this.barElement.style.transition = 'none';
        this.barElement.style.transform = 'scaleX(1)';

        // 2. Force a browser reflow. This is a crucial JS trick so the browser
        // registers the 100% width before we tell it to animate to 0%.
        void this.barElement.offsetWidth;

        this.barElement.style.transition = `transform ${this.duration}s linear`;
        this.barElement.style.transform = 'scaleX(0)';

        this.timeoutId = setTimeout(() => {
            if (this.onComplete) this.onComplete();
        }, this.duration * 1000);
    }

    stop() {
        clearTimeout(this.timeoutId);

        const style = window.getComputedStyle(this.barElement);
        const matrix = style.transform;

        this.barElement.style.transition = 'none';
        this.barElement.style.transform = matrix;
    }
}
