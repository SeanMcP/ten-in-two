const CATEGORIES = [
  "Animals",
  "Books",
  "Brands",
  "Cars",
  "Clothing",
  "Foods",
  "Fruits",
  "Games",
  "Movies",
  "Shoes",
  "Sports",
  "Toys",
  "Vegetables"
];

const CUSTOM_VALUE = "choose-your-own";
const INITIAL_SECONDS = 120;

const suggestedCategories = document.getElementById("suggested-categories");
const categorySelect = document.getElementById("category-select");
const randomCategoryButton = document.getElementById("random-category");
const customCategoryLabel = document.querySelector(".CategorySelect .custom");
const customCategoryInput = document.getElementById("custom-category");

const timerDisplay = document.getElementById("timer-display");
const timerToggleButton = document.getElementById("timer-toggle");
const timerResetButton = document.getElementById("timer-reset");

let secondsRemaining = INITIAL_SECONDS;
let isRunning = false;
let timerInterval;

function formatClockTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function renderCategoryOptions() {
  CATEGORIES.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    suggestedCategories.append(option);
  });

  categorySelect.value = CATEGORIES[0];
}

function updateCategoryCustomState() {
  const isCustom = categorySelect.value === CUSTOM_VALUE;
  customCategoryLabel.hidden = !isCustom;
  if (isCustom) {
    customCategoryInput.focus();
  }
}

function selectRandomCategory() {
  const randomIndex = Math.floor(Math.random() * CATEGORIES.length);
  categorySelect.value = CATEGORIES[randomIndex];
  updateCategoryCustomState();
}

function cleanupTimer() {
  clearInterval(timerInterval);
}

function updateTimerDisplay() {
  timerDisplay.textContent = formatClockTime(secondsRemaining);
  timerDisplay.className = "Timer__display";
  if (secondsRemaining <= 0) {
    timerDisplay.classList.add("Timer__display--done");
  } else if (!isRunning && secondsRemaining < INITIAL_SECONDS) {
    timerDisplay.classList.add("Timer__display--stopped");
  }
}

function stopClock() {
  isRunning = false;
  cleanupTimer();
  timerToggleButton.textContent = "Start";
  updateTimerDisplay();
}

function startClock() {
  isRunning = true;
  timerToggleButton.textContent = "Stop";
  timerInterval = setInterval(() => {
    secondsRemaining -= 1;
    if (secondsRemaining <= 0) {
      secondsRemaining = 0;
      stopClock();
      timerToggleButton.disabled = true;
      return;
    }
    updateTimerDisplay();
  }, 1000);
  updateTimerDisplay();
}

function resetClock() {
  if (isRunning) {
    stopClock();
  }
  secondsRemaining = INITIAL_SECONDS;
  timerToggleButton.disabled = false;
  updateTimerDisplay();
}

categorySelect.addEventListener("change", updateCategoryCustomState);
randomCategoryButton.addEventListener("click", selectRandomCategory);
timerToggleButton.addEventListener("click", () => {
  if (isRunning) {
    stopClock();
  } else {
    startClock();
  }
});
timerResetButton.addEventListener("click", resetClock);
window.addEventListener("beforeunload", cleanupTimer);

renderCategoryOptions();
updateCategoryCustomState();
updateTimerDisplay();
