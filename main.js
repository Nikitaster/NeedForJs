const MAX_ENEMY = 7;

const music = document.createElement('audio');
music.src = 'music.mp3';
music.loop='true';
music.volume = 0.05;
// music.remove()

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
    traffic: 3,
    difficultyPoint: 9,
    trafficPoint: 3,
};

let getQuanityElementElements = function(heightElement, ) {
    return document.documentElement.clientHeight / heightElement + 1; 
}

let startGame = function() {
    start.classList.add('hide');
    gameArea.innerHTML = '';
    for (let i = 0; i < getQuanityElementElements(100); i++) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = (i * 100) + 'px';
        line.y = i * 100;
        gameArea.append(line);
    }
    for (let i = 0 ; i < getQuanityElementElements(100 * setting.traffic); i++) {
        const enemy = document.createElement('div');
        const randomEnemy = Math.floor(Math.random() * MAX_ENEMY) + 1
        enemy.classList.add('enemy');
        enemy.y = -100 * setting.traffic * (i + 1);
        enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';  
        enemy.style.top = enemy.y + 'px';
        enemy.style.background = `transparent url("./image/enemy${randomEnemy}.png") center / cover no-repeat`;
        gameArea.append(enemy);
    }
    setting.score = 0;
    setting.speed = 3;
    setting.traffic = 3;
    setting.difficultyPoint = 9;
    setting.trafficPoint = 3;
    setting.start = true;
    gameArea.append(car);
    car.style.top = 'auto';
    car.style.bottom = '10px';
    car.style.left = gameArea.offsetWidth / 2 - car.offsetWidth / 2;
    // gameArea.append(music);
    music.currentTime = 0
    music.play();
    setting.x = car.offsetLeft;
    setting.y = car.offsetTop;
    requestAnimationFrame(playGame) // анимация, функция playgame будет вызвана (сбалансированный метод)
};

let difficultyUpdate = function() {
    if (setting.score >= setting.difficultyPoint) {
        setting.difficultyPoint += (setting.speed + setting.traffic) * setting.speed * setting.traffic;
        setting.speed++;
        setting.trafficPoint--;
    }
    if (setting.trafficPoint <= 0 && setting.traffic > 1) {
        setting.trafficPoint = 2;
        setting.traffic--;
    }

    console.log("UPDATE DIFFICULTY");
    console.log("speed " + setting.speed);
    console.log("trafic " + setting.traffic);
    console.log("traficPoint " + setting.trafficPoint);
    console.log("difficulty " + setting.difficultyPoint);
    console.log("==========");
}

let playGame = function() {
    moveRoad();
    moveEnemy();
    score.innerHTML = `SCORE: ${setting.score}`;
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
        let carRect= car.getBoundingClientRect();
        let enemyRect= item.getBoundingClientRect();

        if (carRect.top <= enemyRect.bottom && 
            carRect.right >= enemyRect.left && 
            carRect.left <= enemyRect.right &&
            carRect.bottom >= enemyRect.top) {
                setting.start = false;
                music.pause();
                music.remove();
                start.classList.remove('hide');
                start.style.top = score.offsetHeight;
        }

        item.y += setting.speed / 1.25;
        item.style.top = item.y + 'px';
        if (item.y >= document.documentElement.clientHeight) {
            item.y = -100 * setting.traffic;
            item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';  
            const randomEnemy = Math.floor(Math.random() * MAX_ENEMY) + 1
            item.style.background = `transparent url("./image/enemy${randomEnemy}.png") center / cover no-repeat`;
            setting.score += setting.speed;
            difficultyUpdate();
        }
    })
}

let startRun = function(event) {
    if (keys.hasOwnProperty(event.key)) {
        event.preventDefault(); // отменить стандартное действие
        keys[event.key] = true;
    }
    
};

let stopRun = function(event) {
    if (keys.hasOwnProperty(event.key)) {
        event.preventDefault(); // отменить стандартное действие
        keys[event.key] = false;
    }
};


start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

// console.dir(score)