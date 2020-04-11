<script context="module">
  import jams from "../../mock-db/jams";

  export async function preload(page) {
    // use page.path, filter ID from path to find a jam.
    return { jams }; // sorted by latest 10 or so (from server)
  }
</script>

<script>
  export let jams;
  let currentTime = parseInt(new Date().getTime() / 1000);
</script>

<svelte:head>
  <title>Jam Listings</title>
</svelte:head>

<h1>All The Jammin</h1>

{#each jams as jam}
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
