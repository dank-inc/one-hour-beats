<script>
  import { jamStore } from "../../store";
  import { onMount } from "svelte";
  import { getUnix } from "../../utils/time";
  import { stores } from "@sapper/app";
  const { page } = stores();

  let jam;
  let {
    params: { id }
  } = $page;

  jamStore.subscribe(index => (jam = index[id]));

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
    // jam = { ...jam, startedAt: getUnix() };
    console.log("starting Jam!", getUnix());
    jamStore.update(jamIndex => ({ ...jamIndex, [jam.id]: jam }));
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
