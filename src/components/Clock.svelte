<script>
  import { onMount } from "svelte";
  const width = 150;
  const height = 150;

  export let total;
  export let startedAt;
  let canvas;
  let ctx;

  $: current = new Date() / 1000;
  $: started = new Date(startedAt) / 1000;
  $: remaining = started - current + total;

  const draw = () => {
    const u = remaining / total;
    const minute = (remaining % 60) / 60;
    const second = remaining % 1;
    const w = width / 2;
    const h = height / 2;
    const hr = w * 0.8;
    const mr = w * 0.6;
    const sr = w * 0.4;

    const warning = u < 0.3;

    if (warning) {
      const flicker = Math.sin(u * Math.PI * 2 * total);
      if (flicker > 0) {
        document.title = "WARNING";
      } else {
        document.title = "Jam Ending";
      }
    }

    ctx.save();
    ctx.fillStyle = "#fff8";
    ctx.fillRect(0, 0, width, height);

    ctx.translate(w, h);
    ctx.rotate(Math.PI / 2);

    ctx.lineWidth = width / 10;

    // ctx.strokeStyle = `hsl()`;
    ctx.strokeStyle = warning ? "#f33" : "#333";
    ctx.beginPath();
    ctx.arc(0, 0, hr, 0, u * Math.PI * 2);
    ctx.stroke();

    // ctx.strokeStyle = `hsl()`;
    ctx.strokeStyle = warning ? "#955" : "#555";
    ctx.beginPath();
    ctx.arc(0, 0, mr, 0, minute * Math.PI * 2);
    ctx.stroke();

    // ctx.strokeStyle = `hsl()`;
    ctx.strokeStyle = warning ? "#4004" : "#0004";
    ctx.beginPath();
    ctx.arc(0, 0, sr, 0, second * Math.PI * 2);
    ctx.stroke();

    ctx.restore();
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
