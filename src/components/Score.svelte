<script>
  let score = 0;
  let isDone = false;

  function decrement() {
    if (score > 0) score--;
  }
  function increment() {
    score++;
    if (score >= 10) isDone = true;
  }
  function reset() {
    score = 0;
    isDone = false;
  }
</script>

<style>
  section {
    margin: 1rem 0;
  }
  div {
    display: grid;
    gap: 1rem;
    grid-template-columns: 4rem auto 4rem;
  }
</style>

<section aria-label="Score">
  {#if isDone}
    <p>
      You won!
      <button on:click={reset}>Play again?</button>
    </p>
  {:else}
    <div>
      <button on:click={decrement} aria-label="Subtract one">-1</button>
      <progress max="10" value={score} aria-label="Score">
        {score / 10}%
      </progress>
      <button on:click={increment} aria-label="Add one">+1</button>
    </div>
  {/if}
</section>
