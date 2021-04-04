class Board {
    currentBlock;
    width = 15;
    height = 20;
    squareSize = 30;
    canvasCtx;
    currentPosition = 6;
    endCallback;
    scoreUpdateCallback;
    score = 0;

    constructor(canvasCtx) {
        this.canvasCtx = canvasCtx;
        this.canvasCtx.canvas.height = this.height * this.squareSize;
        this.canvasCtx.canvas.width = this.width * this.squareSize;
        this.init();
    }

    init() {
        this.squares = (new Array(this.width * this.height)).fill(0);
        this.insertBlock();
        this.refreshCanvas();
    }

    insertBlock() {
        this.currentBlock = new Block();
        this.currentPosition = 6;
        this.draw();
    }

    step() {
        this.moveDown();
    }

    rotate() {
        this.unDraw();
        this.currentBlock.rotate();
        this.checkRotatedPosition();
        this.draw();
    }

    moveDown() {
        this.unDraw();
        this.currentPosition += this.width;
        this.draw();
        this.freeze();
    }

    moveLeft() {
        this.unDraw();
        const isAtLeftEdge = this.currentBlock.position.some(index => {
            return (this.currentPosition + index) % this.width === 0;
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
            index => (this.currentPosition + index) % this.width ===
                this.width - 1);
        if (!isAtRightEdge) this.currentPosition += 1;
        if (this.currentBlock.position.some(index => {
            return this.squares[this.currentPosition + index] === 2;
        })) {
            this.currentPosition -= 1;
        }
        this.draw();
    }

    isAtRight() {
        return this.currentBlock.position.some(index=> (this.currentPosition + index + 1) % this.width === 0)
    }

    isAtLeft() {
        return this.currentBlock.position.some(index=> (this.currentPosition + index) % this.width === 0)
    }

    checkRotatedPosition(position){
        position = position || this.currentPosition
        if ((position+1) % this.width < 4) {
            if (this.isAtRight()){
                this.currentPosition += 1
                this.checkRotatedPosition(position)
            }
        }
        else if (position % this.width > 5) {
            if (this.isAtLeft()){
                this.currentPosition -= 1
                this.checkRotatedPosition(position)
            }
        }
    }

    freeze() {
        let collision = this.currentBlock.position.some(index => {
            return this.currentPosition + index + this.width >= this.squares.length || this.squares[this.currentPosition + index + this.width] === 2;
        })
        if (collision) {
            this.unDraw();
            this.currentBlock.position.forEach(index => {
                this.squares[this.currentPosition + index] = 2;
            });
            this.refreshCanvas();

            this.addScore();

            let ifMustEnd = this.currentPosition < 4 * this.width + 6;

            if(ifMustEnd) {
                this.endCallback();
            } else {
                this.insertBlock();
            }
        }
    }

    addScore() {
        for (let i = 0; i < this.squares.length; i +=this.width) {
            const row = [];
            for(let j = 0; j < this.width; j++) {
                row.push(i+j);
            }

            if(row.every(index => this.squares[index] === 2)) {
                this.score +=this.width;
                this.scoreUpdateCallback(this.score);
                row.forEach(index => {
                    this.squares[index] = 0;
                })
                const squaresRemoved = this.squares.splice(i, this.width);
                this.squares = squaresRemoved.concat(this.squares);
            }
        }
    }

    draw() {
        this.currentBlock.position.forEach((index) => {
            this.squares[this.currentPosition + index] = 1;
        });

        this.refreshCanvas();
    }

    unDraw() {
        this.currentBlock.position.forEach((index) => {
            this.squares[this.currentPosition + index] = 0;
        });
    }



    refreshCanvas() {

        this.squares.forEach((value, index) => {
            let x = (index % this.width) * this.squareSize;
            let y = Math.floor(index / this.width) * this.squareSize;
            this.canvasCtx.beginPath();
            this.canvasCtx.strokeStyle = "#ffffff";
            switch (value) {
                case 0:
                    this.canvasCtx.fillStyle = '#484848';
                    break;
                case 1:
                    this.canvasCtx.fillStyle = this.currentBlock.color;
                    this.canvasCtx.strokeRect(x, y, this.squareSize, this.squareSize);
                    break;
                case 2:
                    this.canvasCtx.fillStyle = '#777777';
                    this.canvasCtx.strokeRect(x, y, this.squareSize, this.squareSize);
                    break;
            }
            //this.canvasCtx.stroke = 'black'

            this.canvasCtx.fillRect(x, y, this.squareSize, this.squareSize);
        });
    }
}