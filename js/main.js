let canvas = null;
window.addEventListener('load', () => {
    let startScreen = document.querySelector('div.start');
    let gameScreen = document.querySelector('div.game');
    let endScreen = document.querySelector('div.end');
    let startBtn = document.querySelector('button.start');
    let retryBtn = document.querySelector('button.retry');


    startBtn.addEventListener('click', () => {
        startScreen.style.display = 'none';
        gameScreen.style.display = 'block';
        canvas = document.createElement('canvas');
        gameScreen.appendChild(canvas)
        let canvasCtx = canvas.getContext('2d');
        let game = new Game(canvasCtx);
        document.addEventListener('keyup', (event) => {
            game.processEvent(event);
        });
        game.start(() => {
            gameScreen.style.display = 'none';
            endScreen.style.display = 'block';
            canvas.remove();
        });
    })

    retryBtn.addEventListener('click', () => {
        endScreen.style.display = 'none';
        gameScreen.style.display = 'none';
        startScreen.style.display = 'block';
    })



})


