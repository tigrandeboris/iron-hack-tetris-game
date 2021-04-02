class Board {
    currentBlock;
    width = 10;
    height = 15;
    squareSize = 10;
    canvasCtx;
    currentPosition = 4;
    intervalId;

    constructor(canvasCtx) {
        this.canvasCtx = canvasCtx;
        this.squares = (new Array(this.width * (this.height - 1))).fill(0);
        for (let i =1; i<=this.width;i++) {
            this.squares.push(3);
        }
    }

    start() {
        this.insertBlock();
        this.intervalId = setInterval(() =>{
            this.moveDown();
        }, 1000)
    }

    stop() {
        clearInterval(this.intervalId);
    }

    insertBlock() {
        this.currentBlock = new Block();
        this.currentPosition = 4;
    }

    rotate() {
        this.unDraw();
        this.currentBlock.rotate();
        this.checkRotatedPosition();
        this.draw();
    }

    moveDown() {
        this.unDraw();
        this.currentPosition += this.squareSize;
        this.draw();
        this.freeze();
    }

    moveLeft() {
        this.unDraw();
        const isAtLeftEdge = this.currentBlock.position.some(index => {
            return (this.currentPosition + index) % this.squareSize === 0;
        });
        if (!isAtLeftEdge) this.currentPosition -= 1;
        if (this.currentBlock.position.some(index => {
            return this.squares[this.currentPosition + index] === 2;
        })) {
            this.currentPosition += 1;
        }
        this.draw();
    }

    moveRight() {
        this.unDraw();
        const isAtRightEdge = this.currentBlock.position.some(
            index => (this.currentPosition + index) % this.squareSize ===
                this.squareSize - 1);
        if (!isAtRightEdge) this.currentPosition += 1;
        if (this.currentBlock.position.some(index => {
            return this.squares[this.currentPosition + index] === 2;
        })) {
            this.currentPosition -= 1;
        }
        this.draw();
    }

    isAtRight() {
        return this.currentBlock.position.some(index=> (this.currentPosition + index + 1) % this.squareSize === 0)
    }

    isAtLeft() {
        return this.currentBlock.position.some(index=> (this.currentPosition + index) % this.squareSize === 0)
    }

    checkRotatedPosition(position){
        position = position || this.currentPosition
        if ((position+1) % this.squareSize < 4) {
            if (this.isAtRight()){
                this.currentPosition += 1
                this.checkRotatedPosition(position)
            }
        }
        else if (position % this.squareSize > 5) {
            if (this.isAtLeft()){
                this.currentPosition -= 1
                this.checkRotatedPosition(position)
            }
        }
    }

    freeze() {
        let collision = this.currentBlock.position.some(index => {
            return this.squares[this.currentPosition + index + this.squareSize] === 2 || this.squares[this.currentPosition + index + this.squareSize] === 3;
        })
        if (collision) {
            this.currentBlock.position.forEach(index => {
                this.squares[this.currentPosition + index] = 2;
            });

            this.insertBlock();
            this.draw();
            let ifMustEnd = this.currentBlock.position.some(index => {
                return this.squares[this.currentPosition + index] > 1;
            });
            if(ifMustEnd) {
                console.log('END')
                this.stop();
            }
        }
    }

    draw() {
        this.currentBlock.position.forEach((x) => {
            this.squares[this.currentPosition + x] = 1;
        });

        this.refreshCanvas();
    }

    unDraw() {
        console.log(this.currentBlock);
        this.currentBlock.position.forEach((x) => {
            this.squares[this.currentPosition + x] = 0;
        });
        this.refreshCanvas();
    }

    refreshCanvas() {

        this.squares.forEach((value, index) => {

            if (value === 1) {
                this.canvasCtx.fillStyle = 'red';

            } else if (value === 2) {
                this.canvasCtx.fillStyle = 'blue';

            } else if (value === 0) {
                this.canvasCtx.fillStyle = 'white';
            } else {
                return;
            }
            this.canvasCtx.beginPath();
            let x = (index % (this.width)) * this.squareSize;
            let y = Math.floor(index / this.width) * this.squareSize;
            this.canvasCtx.rect(x, y, this.squareSize, this.squareSize);
            this.canvasCtx.fill();
        });
    }
}