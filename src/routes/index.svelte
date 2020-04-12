<script>
  import { jamStore } from "../store";
  import JamLink from "../components/JamLink.svelte";
  let currentTime = parseInt(new Date().getTime() / 1000);
  let jamIndex = $jamStore;
</script>

<svelte:head>
  <title>One Hour Beats - Home</title>
</svelte:head>

<header>
  <h1>One Hour Beats</h1>
  <p>Home</p>
</header>

<p>
  <a href="/create">Make a new Jam</a>
</p>

<h3>Jam Listings</h3>

{#each Object.entries(jamIndex) as [id, jam]}
  <JamLink {jam} />
{/each}
