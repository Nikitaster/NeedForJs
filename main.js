const score = document.querySelector('.score'),
    start = document.querySelector('.start'),
    gameArea = document.querySelector('.gameArea'),
    car = document.createElement('div');

car.classList.add('car');

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false,
};

const setting = {
    start: false,
    score: 0,
    speed: 3,
};


let startGame = function() {
    start.classList.add('hide');
    setting.start = true;
    gameArea.appendChild(car);
    requestAnimationFrame(playGame) // анимация, функция playgame будет вызвана (сбалансированный метод)
};

let playGame = function() {
    console.log('Play game!')
    if (setting.start) {
        requestAnimationFrame(playGame) // анимация, функция playgame сама себя будет перезапускать (плавная сбалансированная рекурсия)
    }
};

let startRun = function(event) {
    event.preventDefault(); // отменить стандартное действие
    keys[event.key] = true;
};

let stopRun = function(event) {
    event.preventDefault(); // отменить стандартное действие
    keys[event.key] = false;
};


start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

// console.dir(score)