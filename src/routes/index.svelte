<script>
  import { jamStore } from "../store";
  let currentTime = parseInt(new Date().getTime() / 1000);
  let jamIndex = $jamStore;
</script>

<svelte:head>
  <title>One Hour Beats - Home</title>
</svelte:head>

<h1>One Hour Beats</h1>

<h3>Home</h3>

<p>
  <a href="/create">Make a new Jam</a>
</p>

<h3>Jam Listings</h3>
