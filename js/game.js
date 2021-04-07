class Game {
    intervalId = 0;
    endCallback;
    timerTimeout = 1000;
    speedUpCounter = 0;

    constructor(canvasCtx, scoreUpdateCallback) {
        this.board = new Board(canvasCtx);
        this.board.endCallback = this.stop.bind(this);
        this.board.scoreUpdateCallback = scoreUpdateCallback;
        this.sounds = new Sounds;
        this.board.playLineCallback = this.playLine.bind(this);
    }

    start(endCallback) {
        this.endCallback = endCallback;
        this.intervalId = setInterval(() => {
            this.checkIfMustSpeedUp();
            this.board.step();
        }, this.timerTimeout);
    }

    stop() {
        clearInterval(this.intervalId);
        this.intervalId = 0;
        window.setTimeout(() => {
            this.endCallback();
            this.playGameOver();
        }, 1000);

    }

    checkIfMustSpeedUp() {
        let speedUpCounter = Math.floor(this.board.score / 30);
        if (this.speedUpCounter !== speedUpCounter) {
            this.speedUpCounter = speedUpCounter;
            this.speedUp();
        }
    }

    speedUp() {
        this.timerTimeout /= 1.2;
        clearInterval(this.intervalId);
        this.intervalId = setInterval(() => {
            this.checkIfMustSpeedUp();
            this.board.step();
        }, this.timerTimeout);
    }

    handleEvent (event) {
        if(this.intervalId === 0) {
            return;
        }
        switch (event.keyCode) {
            case 40:
                this.board.moveDown();
                break;
            case 37:
                this.board.moveLeft();
                break;
            case 39:
                this.board.moveRight();
                break;
            case 32:
                this.board.rotate();
        }
    }

    playLine() {
        this.sounds.playLine();
    }
    playGameOver() {
        this.sounds.playGameOver();
    }
}