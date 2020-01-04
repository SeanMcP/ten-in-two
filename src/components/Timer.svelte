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
  div p {
    font-family: Menlo, Monaco, monospace;
    font-size: 4em;
    margin: 1rem 0;
    text-align: center;
  }

  div p.done {
    animation: blinking 1s linear infinite;
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

<div>
  <p class={clb(secondsRemaining <= 0 && 'done')}>
    {formatClockTime(secondsRemaining)}
  </p>
  
  <button
    disabled={secondsRemaining === 0}
    on:click={isRunning ? stopClock : startClock}>
    {isRunning ? 'Stop' : 'Start'}
  </button>
  <button on:click={resetClock}>Reset</button>
</div>
