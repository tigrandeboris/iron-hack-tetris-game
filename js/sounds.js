class Sounds {
    lineSound;
    gameOverSound;
    moveSound;

    constructor() {
        this.lineSound = new Audio('sounds/line.wav');
        this.gameOverSound = new Audio('sounds/gameover.wav');
        this.moveSound = new Audio('sounds/selection.wav');
    }

    playLine() {
        this.lineSound.play();
    }

    playGameOver() {
        this.gameOverSound.play();
    }

    playMove() {
        this.moveSound.play();
    }
}