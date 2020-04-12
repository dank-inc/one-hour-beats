<script context="module">
  import { jamStore } from "../../store";

  export async function preload(page) {
    let jam;

    jamStore.subscribe(index => (jam = index[page.params.id]));

    return Promise.resolve({ id: page.params.id, jam });
  }
</script>

<script>
  import { onMount } from "svelte";
  import { getUnix } from "../../utils/time";

  export let id;
  export let jam;
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
    jam = { ...jam, startedAt: getUnix() };
    console.log("starting Jam!", getUnix());
  };

  const handleSubmit = () => {
    // get user to submit entry.
    console.log("submitting entry");
  };
</script>

<h1>{jam.name}</h1>
<div>id: {id}</div>
<div>name: {jam.name}</div>
<div>description: {jam.description}</div>
<div>Time Limit: {jam.timeLimit / 60} minutes</div>

{#if jam.startedAt}
  <div>Started At: {jam.startedAt}</div>
  <div>Time Left: {jam.startedAt + jam.timeLimit - currentTime}</div>
  <button on:click={handleSubmit}>Submit Entry</button>
{:else}
  <button on:click={handleStart}>Start Jam!</button>
{/if}
