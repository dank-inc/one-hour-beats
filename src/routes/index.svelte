<script>
  import { jamStore } from "../store";
  import JamLink from "../components/JamLink.svelte";
  let currentTime = parseInt(new Date().getTime() / 1000);
  let jamIndex = $jamStore;
</script>

<style>
  p.right {
    width: 100%;
    text-align: right;
  }
</style>

<svelte:head>
  <title>One Hour Beats - Home</title>
</svelte:head>

<header>
  <h1>Home</h1>
</header>

<h3>Jam Listings</h3>

{#each Object.entries(jamIndex) as [id, jam]}
  <JamLink {jam} />
{/each}

<p class="right">
  <a class="button" href="/create">Make a new Jam</a>
</p>
