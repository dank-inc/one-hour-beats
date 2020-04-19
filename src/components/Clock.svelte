<script>
  import { onMount } from "svelte";
  const width = 300;
  const height = 300;

  export let total;
  export let startedAt;
  let canvas;
  let ctx;

  $: current = new Date() / 1000;
  $: started = new Date(startedAt) / 1000;
  $: remaining = started - current + total;

  const draw = () => {
    ctx.fillStyle = "#333";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "#fff";
    ctx.fillRect(width / 2, 20, 20, 20);
  };

  onMount(() => {
    ctx = canvas.getContext("2d");

    const interval = setInterval(() => {
      current = new Date() / 1000;
      draw();
    }, 1000 / 30);

    return () => {
      clearInterval(interval);
    };
  });
</script>

<canvas bind:this={canvas} {width} {height} />

<div>
  <h3>clock</h3>
  <p>total: {total}</p>
  <p>started: {started}</p>
  <p>current: {current}</p>
  <p>remaining: {remaining}</p>
  <p>percent remaining: {remaining / total}</p>
  <p>percent elapsed: {1 - remaining / total}</p>
</div>
