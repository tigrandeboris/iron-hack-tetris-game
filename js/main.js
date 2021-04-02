
window.addEventListener('load', () => {
    let start = document.querySelector('div.start');
    let game = document.querySelector('div.game');
    let end = document.querySelector('div.end');
    let startBtn = document.querySelector('button.start');
    let retryBtn = document.querySelector('button.retry');
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let board = new Board(ctx);

    function control(e) {
        if(e.keyCode === 37) {
            board.moveLeft()
        } else if (e.keyCode === 32) {
            board.rotate()
        } else if (e.keyCode === 39) {
            board.moveRight()
        } else if (e.keyCode === 40) {
            board.moveDown()
        }
    }
    document.addEventListener('keyup', control)

    startBtn.addEventListener('click', () => {
        start.style.display = 'none';
        game.style.display = 'block';
        board.start();
    })

    retryBtn.addEventListener('click', () => {
        end.style.display = 'none';
        game.style.display = 'none';
        start.style.display = 'block';
    })



})


