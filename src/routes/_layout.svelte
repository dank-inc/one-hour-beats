<script context="module">
  // initial state
  import { jamStore, entryStore, jamRoomStore, userStore } from "../store";

  export async function preload(page) {
    const jamsRes = await this.fetch("/api/jams");
    const jamsData = await jamsRes.json();
    jamStore.set(jamsData);

    const entriesRes = await this.fetch("/api/entries");
    const entriesData = await entriesRes.json();
    entryStore.set(entriesData);

    // get initial app state and populate stores
    // get jam rooms
    // get chats

    userStore.set({});

    return Promise.resolve();
  }
</script>

<script>
  import io from "socket.io-client";
  import Nav from "../components/Nav.svelte";
  import { onMount, setContext } from "svelte";
  import UserForm from "../components/UserForm.svelte";

  $: user = $userStore;
  export let segment;

  const socket = io(); // we don't care about userId here?

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
  socket.on("jamRoomsUpdated", rooms => {
    console.log("jam rooms updated!", rooms);
    jamRoomStore.set(rooms);
  });

  setContext("socket", {
    getSocket: () => socket
  });

  // Socket listeners and shit here.
</script>

<style>

</style>

<Nav />
<main>
  {#if !user}
    <div>Loading...</div>
  {:else if user.name}
    <slot />
  {:else}
    <UserForm />
  {/if}
</main>

<footer>look a footer</footer>
