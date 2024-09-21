const circle = document.querySelector('.progress-ring__circle');
const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;
circle.style.strokeDasharray = circumference;
circle.style.strokeDashoffset = circumference;

const timerText = document.getElementById("timer-text");
const startStopBtn = document.getElementById("start-stop-btn");
const resetBtn = document.getElementById("reset-btn");

const hoursInput = document.getElementById("hours-input");
const minutesInput = document.getElementById("minutes-input");
const secondsInput = document.getElementById("seconds-input");

let totalTime = 0;  // Total time in seconds
let elapsedTime = 0;
let interval;
let isRunning = false;

// Start/Stop button event
startStopBtn.addEventListener('click', () => {
    if (isRunning) {
        stopTimer();
    } else {
        setTimeFromInputs();  // Set the time from inputs before starting
        startTimer();
    }
});

resetBtn.addEventListener('click', resetTimer);

// Helper function to set total time from inputs
function setTimeFromInputs() {
    const hours = parseInt(hoursInput.value) || 0;
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;
    totalTime = (hours * 3600) + (minutes * 60) + seconds;
    displayTime(totalTime);
}

// Timer functions
function startTimer() {
    if (totalTime > 0) {
        isRunning = true;
        startStopBtn.textContent = "Stop";
        interval = setInterval(() => {
            if (elapsedTime < totalTime) {
                elapsedTime++;
                updateProgress();
            } else {
                stopTimer();
            }
        }, 1000);
    }
}

function stopTimer() {
    clearInterval(interval);
    isRunning = false;
    startStopBtn.textContent = "Start";
}

function resetTimer() {
    stopTimer();
    elapsedTime = 0;
    updateProgress();
    displayTime(totalTime);
    hoursInput.value = '';
    minutesInput.value = '';
    secondsInput.value = '';
}

function updateProgress() {
    const progress = (elapsedTime / totalTime) * circumference;
    circle.style.strokeDashoffset = circumference - progress;

    displayTime(totalTime - elapsedTime);
    
    // Color change logic
    const ratio = elapsedTime / totalTime;
    if (ratio <= 0.33) {
        circle.style.stroke = 'green';
    } else if (ratio <= 0.66) {
        circle.style.stroke = 'yellow';
    } else {
        circle.style.stroke = 'red';
    }
}

function displayTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    timerText.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
