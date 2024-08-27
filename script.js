const timerElement = document.getElementById('timer');
const startButton = document.getElementById('botonsin');
const resetButton = document.getElementById('reiniciar');
const pomodoroButton = document.querySelector('.botonPomodoro');
const descansoButton = document.querySelector('.botonDescansote');

let isPomodoro = true;
let isRunning = false;
let timeLeft = 25 * 60; // 25 minutos en segundos
let timerInterval;

// Función para actualizar el tiempo en pantalla
function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Función para iniciar el temporizador
function startTimer() {
  if (!isRunning) {
    timerInterval = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateTimer();
      } else {
        clearInterval(timerInterval);
        if (isPomodoro) {
          // Cambiar a modo descanso
          document.body.classList.add('descanso');
          isPomodoro = false;
          timeLeft = 5 * 60; // 5 minutos de descanso
          updateTimer();
        } else {
          // Cambiar a modo Pomodoro
          document.body.classList.remove('descanso');
          isPomodoro = true;
          timeLeft = 25 * 60; // 25 minutos de trabajo
          updateTimer();
        }
        startButton.textContent = 'START';
        isRunning = false;
      }
    }, 1000);
    isRunning = true;
    startButton.textContent = 'DETENER';
  } else {
    clearInterval(timerInterval);
    isRunning = false;
    startButton.textContent = 'EMPEZAR';
  }
}

// Función para reiniciar el temporizador
function resetTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  if (isPomodoro) {
    timeLeft = 25 * 60; // 25 minutos de Pomodoro
  } else {
    timeLeft = 5 * 60; // 5 minutos de descanso
  }
  updateTimer();
  startButton.textContent = 'START';
}

// Evento para manejar el inicio y detención del temporizador
startButton.addEventListener('click', startTimer);

// Evento para manejar el reinicio del temporizador
resetButton.addEventListener('click', resetTimer);

// Evento para cambiar manualmente entre Pomodoro y Descanso
pomodoroButton.addEventListener('click', () => {
  clearInterval(timerInterval);
  isPomodoro = true;
  isRunning = false;
  document.body.classList.remove('descanso');
  timeLeft = 25 * 60;
  updateTimer();
  startButton.textContent = 'START';
});

descansoButton.addEventListener('click', () => {
  clearInterval(timerInterval);
  isPomodoro = false;
  isRunning = false;
  document.body.classList.add('descanso');
  timeLeft = 5 * 60;
  updateTimer();
  startButton.textContent = 'START';
});

// Inicializar el temporizador en 25:00 al cargar la página
updateTimer();
