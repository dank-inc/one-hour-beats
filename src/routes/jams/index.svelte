<script>
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

{#each Object.entries(jamIndex) as [id, jam]}
  <div class="jam-list">
    <h3>
      <a rel="prefetch" href={`/jams/${jam.id}`}>{jam.name}</a>
    </h3>
    <div>
      <p>
        Active?: {jam.startedAt && currentTime - jam.startedAt + jam.timeLimit > 0 ? true : false}
      </p>
      <p>Started?: {jam.startedAt ? true : false}</p>
    </div>
  </div>
{/each}
