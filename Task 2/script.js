let timerInterval;
let startTime = 0;
let elapsedTime = 0;
let paused = true;

const display = document.getElementById('display');
const startPauseButton = document.getElementById('startPauseButton');
const resetButton = document.getElementById('resetButton');
const lapButton = document.getElementById('lapButton');
const laps = document.getElementById('laps');

function updateDisplay(time) {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
}

function startPauseStopwatch() {
    if (paused) {
        paused = false;
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay(elapsedTime);
        }, 10);
        startPauseButton.textContent = 'Pause';
    } else {
        paused = true;
        clearInterval(timerInterval);
        startPauseButton.textContent = 'Start';
    }
}

function resetStopwatch() {
    clearInterval(timerInterval);
    paused = true;
    elapsedTime = 0;
    updateDisplay(0);
    startPauseButton.textContent = 'Start';
    laps.innerHTML = '';
}

function recordLap() {
    if (!paused) {
        const lapTime = document.createElement('li');
        lapTime.textContent = display.textContent;
        laps.appendChild(lapTime);
    }
}

startPauseButton.addEventListener('click', startPauseStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', recordLap);
