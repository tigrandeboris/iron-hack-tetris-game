let canvas = null;
window.addEventListener('load', () => {
    let startScreen = document.querySelector('div.start-screen');
    let gameScreen = document.querySelector('div.game-screen');
    let endScreen = document.querySelector('div.end-screen');
    let startBtn = document.querySelector('button.start');
    let retryBtn = document.querySelector('button.retry');
    let score1 = document.querySelector('.game-screen .score');
    let score2 = document.querySelector('.end-screen .score');


    startBtn.addEventListener('click', () => {
        startScreen.style.display = 'none';
        gameScreen.style.display = 'block';
        let canvas = document.createElement('canvas');
        gameScreen.appendChild(canvas);
        let canvasCtx = canvas.getContext('2d');
        let game = new Game(canvasCtx, (value) => {
            score1.innerText = value;
            score2.innerText = value;
        });
        document.addEventListener('keydown', game.handleEvent.bind(game));
        game.start(() => {
            gameScreen.style.display = 'none';
            endScreen.style.display = 'block';
            canvas.remove();
        });
    })

    retryBtn.addEventListener('click', () => {
        endScreen.style.display = 'none';
        startScreen.style.display = 'block';
    })



})


