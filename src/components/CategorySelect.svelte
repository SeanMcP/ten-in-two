<script>
  import Emoji from "svelte-emoji";
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
  let isCustom = false;
  let customValue = "choose-your-own";
  let selectedCategory = CATEGORIES[0];
  let selectId = "category-select";

  function handleChange(e) {
    const { value } = e.target;
    selectedCategory = value;
    if (value === customValue) {
      isCustom = true;
    } else if (isCustom) {
      isCustom = false;
    }
  }

  function randomSelect() {
    let randomIndex = Math.floor(Math.random() * CATEGORIES.length);

    selectedCategory = CATEGORIES[randomIndex];
    isCustom = false;
  }
</script>

<style>
  header {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }
  label {
    display: block;
  }
  .button--emoji {
    margin-right: -0.5rem;
  }
  select {
    width: 100%;
  }
  .custom {
    display: grid;
    gap: 0.5rem;
    margin-top: 1rem;
  }
</style>

<header>
  <label for={selectId}>
    <b>Category</b>
  </label>
  <button
    aria-label="Select a random category"
    class="button--emoji"
    on:click={randomSelect}>
    <Emoji symbol="🎲" />
  </button>
</header>
<select id={selectId} on:change={handleChange} value={selectedCategory}>
  <optgroup label="Custom">
    <option value={customValue}>Choose your own</option>
  </optgroup>
  <optgroup label="Suggestions">
    {#each CATEGORIES as category}
      <option value={category}>{category}</option>
    {/each}
  </optgroup>
</select>
{#if isCustom}
  <label class="custom">
    <b>Custom category</b>
    <input autofocus />
  </label>
{/if}
