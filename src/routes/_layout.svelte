<script context="module">
  import { jamStore } from "../store";

  export async function preload(page) {
    const res = await this.fetch("/api/jams");
    const data = await res.json();
    console.log("PREFETCH", data);
    jamStore.set(data);
    return Promise.resolve({ jamIndex: data });
  }
</script>

<script>
  import Nav from "../components/Nav.svelte";
  export let segment;
</script>

<style>
  main {
    position: relative;
    max-width: 56em;
    background-color: white;
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>

<Nav />

<main>
  <slot />
</main>
