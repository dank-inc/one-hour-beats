<script>
  import { jamStore, entriesByJam } from "../../store";

  import { onMount } from "svelte";
  import { getUnix } from "../../utils/time";
  import { stores } from "@sapper/app";
  const { page } = stores();

  let {
    params: { id }
  } = $page;

  $: jam = $jamStore[id];

  let entries;
  let entryLink;
  let entryArtist;

  entriesByJam.subscribe(index => (entries = index[id]));

  $: currentTime = getUnix();

  onMount(() => {
    const interval = setInterval(() => {
      currentTime = getUnix();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  const handleStart = () => {
    // update jam record, reload?
    const jam = { ...jam, startedAt: getUnix() };
    console.log("starting Jam!", getUnix());
    jamStore.update(jamIndex => ({ ...jamIndex, [jam.id]: jam }));
  };

  const handleSubmit = () => {
    // get user to submit entry.
    let entry = {
      name: entryName,
      artist: entryArtist,
      jamId: id
    };
    entryLink = "";
    entryArtist = "";
    console.log("submitting entry", entry);
  };
</script>

<style>

</style>

<h1>{jam.name}</h1>
<div class="jam-info">
  <h3>Jam Info</h3>
  <p>id: {id}</p>
  <p>name: {jam.name}</p>
  <p>description: {jam.description}</p>
  <p>Time Limit: {jam.timeLimit / 60} minutes</p>

  {#if !jam.startedAt}
    <button on:click={handleStart}>Start Jam!</button>
  {:else}
    <p>Started At: {jam.startedAt}</p>
    <p>Time Left: {jam.startedAt + jam.timeLimit - currentTime}</p>
    <form on:submit|preventDefault={handleSubmit}>
      <div>
        <label>
          Artist Name:
          <input bind:value={entryArtist} type="text" />
        </label>
      </div>
      <div>
        <label>
          Entry link:
          <input
            bind:value={entryLink}
            type="url"
            placeholder="http://soundcloud.com/cool-artist/dank-beat" />
        </label>
      </div>
      <button>Submit Entry</button>
    </form>
  {/if}
</div>

{#if entries.length}
  <div class="jam-entries">
    <h2>Entries</h2>
    <p>todo: embed playables</p>
    {#each entries as entry}
      <div>
        {entry.artist} -
        <a href={entry.link} target="_blank">
          {entry.link.split('://')[1].split('/')[0]}
        </a>
      </div>
    {/each}
  </div>
{/if}
