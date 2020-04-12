<script>
  import Entry from "../../components/Entry.svelte";
  import EntryForm from "../../components/EntryForm.svelte";

  import { jamStore, entryStore } from "../../store";

  import { onMount, getContext } from "svelte";
  import { getUnix } from "../../utils/time";
  import { stores } from "@sapper/app";
  const { page } = stores();
  const { getSocket } = getContext("socket");

  let {
    params: { id }
  } = $page;

  $: jam = $jamStore[id];
  $: entries = $entryStore[id];
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
    const socket = getSocket();
    socket.emit("startJam", { id });
    // api call to database, sockets => update store.
    // const jam = { ...$jamStore[id], startedAt: getUnix() };
    // console.log("starting Jam!", getUnix());
    // jamStore.update(jamIndex => ({ ...jamIndex, [jam.id]: jam }));
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
    <EntryForm jamId={id} />
  {/if}
</div>

{#if entries && entries.length}
  <div class="jam-entries">
    <h2>Entries</h2>
    <p>todo: embed playables</p>
    {#each entries as entry}
      <Entry {entry} />
    {/each}
    <p>todo: animate in thumbs</p>
  </div>
{/if}
