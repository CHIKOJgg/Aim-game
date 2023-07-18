const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
const restart = document.querySelector('.restart');
const timeLast = document.querySelector('.time-last');
let time = 10;
let score = 0;

startBtn.addEventListener('click', (event) => {
  event.preventDefault();
  screens[0].classList.add('up');
});

timeList.addEventListener('click', (event) => {
  if (event.target.classList.contains('time-btn')) {
    time = parseInt(event.target.getAttribute('data-time'));
    startGame();
    screens[1].classList.add('up');
  }
});
board.addEventListener('click', (event) => {
  if (event.target.classList.contains('circle')) {
    score++;
    event.target.remove();
    createRandomCircle();
  }
});

//DEBUG
startGame();
function startGame() {
  setInterval(decreaseTime, 1000);
  createRandomCircle();
  setTime(time);
}

function decreaseTime() {
  if (time === 0) {
    finishGame(); 
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}
function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}
function finishGame() {
  timeLast.textContent = 'Time is up!';

  board.innerHTML = `<h1>Score: <span class="primary">${score}</span></h1>`;
}

function createRandomCircle() {
  const circle = document.createElement('div');
  const size = getRandomNum(30, 90);
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNum(0, width - size);
  const y = getRandomNum(0, height - size);

  circle.classList.add('circle');
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;

  board.append(circle);
}
function getRandomNum(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
restart.addEventListener('click', function () {
  location.reload();
});
