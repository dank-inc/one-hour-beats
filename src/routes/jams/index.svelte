<script>
  import { jamStore } from "../../store";
  const jamIds = Object.keys(jamStore);
  let currentTime = parseInt(new Date().getTime() / 1000);

  let jamIndex;

  jamStore.subscribe(index => (jamIndex = index));
</script>

<svelte:head>
  <title>Jam Listings</title>
</svelte:head>

<h1>All The Jammin</h1>

{#each Object.entries(jamIndex) as [id, jam]}
  <div>
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
