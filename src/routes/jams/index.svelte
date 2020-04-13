<script>
  import JamLink from "../../components/JamLink.svelte";
  import { jamStore } from "../../store";
  let currentTime = parseInt(new Date().getTime() / 1000);
  $: jamIndex = $jamStore;

  // todo if jam.createdAt is less that 30 seconds ago, make it flash or add a highlight on it
  // also sort by createdAt
</script>

<svelte:head>
  <title>Jam Listings</title>
</svelte:head>

<header>
  <h1>All The Jammin</h1>
  <p>soem little description blah</p>
</header>

<div class="page-content">
  {#each Object.entries(jamIndex) as [id, jam]}
    <JamLink {jam} />
  {/each}
</div>
