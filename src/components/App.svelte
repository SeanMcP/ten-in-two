<script>
  import Footer from "./Footer.svelte";
  import Header from "./Header.svelte";
  import Timer from "./Timer.svelte";
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
</style>

<div class="App">
  <Header />
  <main>
    <Timer />
  </main>
  <Footer />
</div>
