class Chronometer {
    constructor() {
        this.currentTime = 0;
        this.intervalId = 0;
    }

    startTimer(printTime) {
        this.intervalId = setInterval(() => {
            this.currentTime += 1;
            if (printTime) {
                let time = this.getTime();
                printTime(time);
            }
        }, 1000);
    }

    stopTimer() {
        clearInterval(this.intervalId);
    }

    getMinutes() {
        return Math.floor(this.currentTime / 60);
    }

    getSeconds() {
        return this.currentTime - (this.getMinutes() * 60);
    }

    twoDigitsNumber(num) {
        if (num < 10) {
            return `0${num}`;
        } else {
            return `${num}`;
        }
    }

    getTime() {
        let minutes = this.twoDigitsNumber(this.getMinutes());
        let seconds = this.twoDigitsNumber(this.getSeconds());
        return minutes + ':' + seconds;
    }
}




