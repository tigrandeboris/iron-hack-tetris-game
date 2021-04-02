class Block {
    squareSize = 10;
    position = [];
    rotation = 0;
    type = '';

    oBlock = [
        [0,1,this.squareSize,this.squareSize+1],
        [0,1,this.squareSize,this.squareSize+1],
        [0,1,this.squareSize,this.squareSize+1],
        [0,1,this.squareSize,this.squareSize+1]
    ]

    iBlock = [
        [1,this.squareSize+1,this.squareSize*2+1,this.squareSize*3+1],
        [this.squareSize,this.squareSize+1,this.squareSize+2,this.squareSize+3],
        [1,this.squareSize+1,this.squareSize*2+1,this.squareSize*3+1],
        [this.squareSize,this.squareSize+1,this.squareSize+2,this.squareSize+3]
    ]

    blockTypes = ['iBlock', 'oBlock'];

    constructor() {
        this.build();
    }

    build() {
        this.type = this.blockTypes[Math.floor(Math.random() * this.blockTypes.length)];
        this.rotation = Math.floor(Math.random() * 4);
        this.position = this[this.type][this.rotation];
    }
    rotate() {
        this.rotation = ++this.rotation % 4;
        this.position = this[this.type][this.rotation];
    }

}