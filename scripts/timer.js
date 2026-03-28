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
        this.barElement.style.width = '100%';

        // 2. Force a browser reflow. This is a crucial JS trick so the browser 
        // registers the 100% width before we tell it to animate to 0%.
        void this.barElement.offsetWidth;

        // 3. Start the visual drain over the specified duration
        this.barElement.style.transition = `width ${this.duration}s linear`;
        this.barElement.style.width = '0%';

        // 4. Start the logical countdown to end the run
        this.timeoutId = setTimeout(() => {
            if (this.onComplete) this.onComplete();
        }, this.duration * 1000);
    }

    stop() {
        // Clear the logical timer
        clearTimeout(this.timeoutId);
        
        // Freeze the visual bar at its exact current width when stopped
        const currentWidth = window.getComputedStyle(this.barElement).width;
        this.barElement.style.transition = 'none';
        this.barElement.style.width = currentWidth;
    }
}
