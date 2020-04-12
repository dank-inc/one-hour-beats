<script context="module">
  export async function preload(page) {
    const res = await this.fetch("/api/jams");
    const data = await res.json();
    console.log("PREFETCH", data);
    return Promise.resolve({ jamIndex: data });
  }
</script>

<script>

</script>

<svelte:head>
  <title>One Hour Beats - Home</title>
</svelte:head>

<h1>One Hour Beats</h1>

<h3>Home</h3>

<p>
  <a href="/create">Make a new Jam</a>
</p>

<h3>Jam Listings</h3>
