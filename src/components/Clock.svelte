<script>
  import { onMount } from "svelte";

  export let total;
  export let startedAt;
  $: current = new Date() / 1000;
  $: started = new Date(startedAt) / 1000;
  $: remaining = started - current + total;

  onMount(() => {
    const interval = setInterval(() => {
      current = new Date() / 1000;
    }, 1000 / 30);

    return () => {
      clearInterval(interval);
    };
  });
</script>

<div>
  <h3>clock</h3>
  <p>total: {total}</p>
  <p>started: {started}</p>
  <p>current: {current}</p>
  <p>remaining: {remaining}</p>
  <p>percent remaining: {remaining / total}</p>
  <p>percent elapsed: {1 - remaining / total}</p>
</div>
