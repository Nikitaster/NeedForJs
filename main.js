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
    speed: 30,
    traffic: 3,
};

let getQuanityElementElements = function(heightElement, ) {
    return document.documentElement.clientHeight / heightElement + 1; 
}

let startGame = function() {
    start.classList.add('hide');

    for (let i = 0; i < getQuanityElementElements(100); i++) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = (i * 100) + 'px';
        line.y = i * 100;
        gameArea.appendChild(line);
    }
    for (let i = 0 ; i < getQuanityElementElements(100 * setting.traffic); i++) {
        const enemy = document.createElement('div');
        enemy.classList.add('enemy');
        enemy.y = -100 * setting.traffic * (i + 1);
        enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - car.offsetWidth)) + 'px';  
        enemy.style.top = enemy.y + 'px';
        if (Math.random() > 0.5){
            enemy.style.background = 'transparent url("./image/enemy.png") center / cover no-repeat';
        }
        else {
            enemy.style.background = 'transparent url("./image/enemy2.png") center / cover no-repeat';
        }
        
        gameArea.appendChild(enemy);
    }

    setting.start = true;
    gameArea.appendChild(car);
    setting.x = car.offsetLeft;
    setting.y = car.offsetTop;
    requestAnimationFrame(playGame) // анимация, функция playgame будет вызвана (сбалансированный метод)
};

let playGame = function() {
    moveRoad();
    moveEnemy();
    if (setting.start) {
        if (keys.ArrowLeft && setting.x > 0) {
            setting.x -= setting.speed;
        }
        if (keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)) {
            setting.x += setting.speed ;
        }
        if (keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)) {
            setting.y += setting.speed ;
        }
        if (keys.ArrowUp && setting.y > 0) {
            setting.y -= setting.speed ;
        }
        car.style.left = setting.x + 'px';
        car.style.top = setting.y + 'px';
        requestAnimationFrame(playGame) // анимация, функция playgame сама себя будет перезапускать (плавная сбалансированная рекурсия)
    }
};

let moveRoad = function() {
    let lines = document.querySelectorAll('.line');
    lines.forEach(function(item, i, arr) {
        item.y += setting.speed; // item = line in lines list, i - index, arr - link to lines list
        item.style.top = item.y + 'px';
        if (item.y >= document.documentElement.clientHeight) {
            item.y = -100;
        }
    })
}

let moveEnemy = function() {
    let enemies = document.querySelectorAll('.enemy');
    enemies.forEach(function(item, i, arr) {
        item.y += setting.speed / 1.25;
        item.style.top = item.y + 'px';
        if (item.y >= document.documentElement.clientHeight) {
            item.y = -100 * setting.traffic;
            item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - car.offsetWidth)) + 'px';  
        }
    })
}

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