class Block {
    boardWidth = 15;
    position = [];
    rotation = 0;
    coords;
    color;

    oBlock = [
        [0,1,this.boardWidth,this.boardWidth+1],
        [0,1,this.boardWidth,this.boardWidth+1],
        [0,1,this.boardWidth,this.boardWidth+1],
        [0,1,this.boardWidth,this.boardWidth+1]
    ];

    iBlock = [
        [1,this.boardWidth+1,this.boardWidth*2+1,this.boardWidth*3+1],
        [this.boardWidth,this.boardWidth+1,this.boardWidth+2,this.boardWidth+3],
        [1,this.boardWidth+1,this.boardWidth*2+1,this.boardWidth*3+1],
        [this.boardWidth,this.boardWidth+1,this.boardWidth+2,this.boardWidth+3]
    ];

    lBlock = [
        [1, this.boardWidth+1, this.boardWidth*2+1, 2],
        [this.boardWidth, this.boardWidth+1, this.boardWidth+2, this.boardWidth*2+2],
        [1, this.boardWidth+1, this.boardWidth*2+1, this.boardWidth*2],
        [this.boardWidth, this.boardWidth*2, this.boardWidth*2+1, this.boardWidth*2+2]
    ];

    zBlock = [
        [0,this.boardWidth,this.boardWidth+1,this.boardWidth*2+1],
        [this.boardWidth+1, this.boardWidth+2,this.boardWidth*2,this.boardWidth*2+1],
        [0,this.boardWidth,this.boardWidth+1,this.boardWidth*2+1],
        [this.boardWidth+1, this.boardWidth+2,this.boardWidth*2,this.boardWidth*2+1]
    ]

    tBlock = [
        [1,this.boardWidth,this.boardWidth+1,this.boardWidth+2],
        [1,this.boardWidth+1,this.boardWidth+2,this.boardWidth*2+1],
        [this.boardWidth,this.boardWidth+1,this.boardWidth+2,this.boardWidth*2+1],
        [1,this.boardWidth,this.boardWidth+1,this.boardWidth*2+1]
    ]

    blocks = [this.iBlock, this.oBlock, this.lBlock, this.zBlock, this.tBlock];

    constructor() {
        this.build();
    }

    build() {
        this.coords = this.blocks[Math.floor(Math.random() * this.blocks.length)];
        this.rotation = Math.floor(Math.random() * 4);
        this.position = this.coords[this.rotation];
        this.color = this.randomColor();
    }
    rotate() {
        this.rotation = ++this.rotation % 4;
        this.position = this.coords[this.rotation];
    }

    randomColor() {
        return ['#DD0000','#00DD00','#0000DD','#DDDD00'][Math.floor(Math.random() * 4)];
    }

}