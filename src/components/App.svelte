<script>
  import CategorySelect from "./CategorySelect.svelte";
  import Footer from "./Footer.svelte";
  import Header from "./Header.svelte";
  import Score from "./Score.svelte";
  import Timer from "./Timer.svelte";

  let isPlaying = false;
  function startPlaying() {
    isPlaying = true;
  }
  function stopPlaying() {
    isPlaying = false;
  }
</script>

<style>
  .App {
    padding: 1em;
    max-width: 632px;
    margin: 0 auto;
  }

  main {
    padding: 1rem 0;
  }

  @media (max-width: 632px) {
    .App {
      max-width: none;
    }
  }

  div {
    margin: 1rem 0;
    text-align: center;
  }
</style>

<div class="App">
  <Header />
  <main>
    <CategorySelect />
    {#if isPlaying}
      <Timer />
      <Score />
    {:else}
      <div>
        <button class="button--primary" on:click={startPlaying}>Play!</button>
      </div>
    {/if}
  </main>
  <Footer />
</div>
