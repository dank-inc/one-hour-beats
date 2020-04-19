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
    const u = 1 - remaining / total;
    const second = Math.abs(1 - (remaining % 1));
    const w = width / 2;
    const h = height / 2;
    const r = w * 0.9;

    ctx.save();
    ctx.fillStyle = "#fff8";
    ctx.fillRect(0, 0, width, height);

    ctx.translate(w, h);
    ctx.rotate(Math.PI / 2);

    ctx.lineWidth = 5;
    ctx.fillStyle = "#333";
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, u * Math.PI * 2);
    ctx.fill();
    // ctx.fillRect(u * width, height / 2, 20, 20);

    ctx.fillStyle = "#0004";
    ctx.strokeStyle = "#0004";
    ctx.beginPath();
    ctx.arc(0, 0, r * second, 0, second * Math.PI * 2);
    // ctx.fill();
    ctx.stroke();

    ctx.restore();
    // ctx.fillRect(second * width, height * 0.33, 20, 20);
  };

  onMount(() => {
    ctx = canvas.getContext("2d");

    const interval = setInterval(() => {
      current = new Date() / 1000;
      draw();
    }, 1000 / 15);

    return () => {
      clearInterval(interval);
    };
  });
</script>

<canvas bind:this={canvas} {width} {height} />

<!-- <div>
  <h3>clock</h3>
  <p>total: {total}</p>
  <p>started: {started}</p>
  <p>current: {current}</p>
  <p>remaining: {remaining}</p>
  <p>percent remaining: {remaining / total}</p>
  <p>percent elapsed: {1 - remaining / total}</p>
</div> -->
