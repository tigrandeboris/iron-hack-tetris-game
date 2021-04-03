class Game {
    intervalId;

    constructor(canvasCtx) {
        this.board = new Board(canvasCtx);
        this.board.endCallback = this.stop.bind(this);
    }

    start(endCallback) {
        this.endCallback = endCallback;
        this.board.insertBlock();
        this.intervalId = setInterval(() => {
            this.board.step();
        }, 1000);
    }

    stop() {
        clearInterval(this.intervalId);
        this.endCallback();
    }

    processEvent(e) {
        if (e.keyCode === 37) {
            this.board.moveLeft();
        } else if (e.keyCode === 32) {
            this.board.rotate();
        } else if (e.keyCode === 39) {
            this.board.moveRight();
        } else if (e.keyCode === 40) {
            this.board.moveDown();
        }
    }
}