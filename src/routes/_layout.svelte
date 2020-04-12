<script context="module">
  // initial state
  import { jamStore, entryStore, participantStore } from "../store";

  export async function preload(page) {
    const jamsRes = await this.fetch("/api/jams");
    const jamsData = await jamsRes.json();
    jamStore.set(jamsData);

    const entriesRes = await this.fetch("/api/entries");
    const entriesData = await entriesRes.json();
    entryStore.set(entriesData);

    return Promise.resolve();
  }
</script>

<script>
  import Nav from "../components/Nav.svelte";
  import { onMount, setContext } from "svelte";

  export let segment;
  import io from "socket.io-client";

  const socket = io();

  socket.on("entriesUpdated", entryIndex => {
    // Milestone 1 - check user id to see if relevant
    console.log("Entries Updated!", entryIndex);
    entryStore.set(entryIndex);
  });
  socket.on("jamsUpdated", jams => {
    // Milestone 1 - check users jam id to see if relevant
    console.log("Jams Updated!", jams);
    jamStore.set(jams);
  });
  socket.on("vote", socket => {
    // Milestone 1
    // check jam id to see if it's relevant
    console.log("Vote Happened!");
  });
  socket.on("participantsUpdated", participants => {});

  setContext("socket", {
    getSocket: () => socket
  });

  // Socket listeners and shit here.
</script>

<style>
  main {
    position: relative;
    max-width: 56em;
    background-color: white;
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>

<Nav />

<main>

  <slot />
</main>
