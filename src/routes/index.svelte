<script>
  import { jamStore } from "../store";
  import JamLink from "../components/JamLink.svelte";
  import { userStore } from "../store";
  $: userName = $userStore.name;

  let currentTime = parseInt(new Date().getTime() / 1000);
  $: jamIndex = $jamStore;
</script>

<svelte:head>
  <title>One Hour Beats - Home</title>
</svelte:head>

<header>
  <h1>Home</h1>
  <p>Welcome, {userName}</p>
</header>

<div class="page-content jam-list">
  {#each Object.entries(jamIndex) as [id, jam]}
    <JamLink {jam} />
  {/each}

  <p class="right">
    <a class="button" href="/create">Make a new Jam</a>
  </p>
</div>

<style>
  .jam-list {
    display: flex;
    flex-direction: column-reverse;
  }
  p.right {
    width: 100%;
    text-align: right;
  }
</style>
