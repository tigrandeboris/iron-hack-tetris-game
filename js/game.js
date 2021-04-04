class Game {
    intervalId = 0;
    endCallback;

    constructor(canvasCtx, scoreUpdateCallback) {
        this.board = new Board(canvasCtx);
        this.board.endCallback = this.stop.bind(this);
        this.board.scoreUpdateCallback = scoreUpdateCallback;
    }

    start(endCallback) {
        this.endCallback = endCallback;
        this.intervalId = setInterval(() => {
            this.board.step();
        }, 500);
    }

    stop() {
        clearInterval(this.intervalId);
        this.intervalId = 0;
        window.setTimeout(() => {
            this.endCallback();
        }, 1000);

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
}