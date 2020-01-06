<script>
  import { onDestroy } from "svelte";
  import clb from "class-list-builder";
  import formatClockTime from "../utils/format-clock-time";

  const initialSeconds = 120;

  let timeout;
  let secondsRemaining = initialSeconds;
  let isRunning = false;

  function cleanupTimer() {
    clearInterval(timeout);
  }

  function startClock() {
    isRunning = true;
    timeout = setInterval(() => {
      secondsRemaining--;
      if (secondsRemaining <= 0) {
        stopClock();
      }
    }, 1000);
  }

  function stopClock() {
    isRunning = false;
    cleanupTimer();
  }

  function resetClock() {
    if (isRunning) {
      stopClock();
    }
    secondsRemaining = initialSeconds;
  }

  onDestroy(() => {
    cleanupTimer();
  });
</script>

<style>
  .Timer__display {
    font-family: var(--typeface-mono);
    font-size: 4em;
    margin: 1rem 0;
    text-align: center;
  }

  .Timer__display--done,
  .Timer__display--stopped {
    animation: blinking 1s linear infinite;
  }

  .Timer__buttons {
    display: flex;
    justify-content: center;
  }

  .Timer__buttons button {
    margin: 0 0.5rem;
    width: 96px;
  }

  @keyframes blinking {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 1;
    }
    51% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }
</style>

<div class="Timer">
  <p
    class={clb('Timer__display', !isRunning && secondsRemaining < initialSeconds && 'Timer__display--stopped', secondsRemaining <= 0 && 'Timer__display--done')}>
    {formatClockTime(secondsRemaining)}
  </p>

  <div class="Timer__buttons">
    <button
      class="button--primary"
      disabled={secondsRemaining === 0}
      on:click={isRunning ? stopClock : startClock}>
      {isRunning ? 'Stop' : 'Start'}
    </button>
    <button on:click={resetClock}>Reset</button>
  </div>

</div>
