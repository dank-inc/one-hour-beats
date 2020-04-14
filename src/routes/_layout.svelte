<script context="module">
  // initial state
  import {
    jamStore,
    entryStore,
    jamRoomStore,
    userStore,
    voteStore
  } from "../store";

  export async function preload(page) {
    const jamsRes = await this.fetch("/api/jams");
    const jamsData = await jamsRes.json();
    jamStore.set(jamsData);

    const entriesRes = await this.fetch("/api/entries");
    const entriesData = await entriesRes.json();
    entryStore.set(entriesData);

    // get initial app state and populate stores

    // get jam rooms
    // get participants
    // get chats
    // get all votes

    // shit could also just do a `socket.emit("initialState")` then init right back to that bro.
    // fuck restapi

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
  socket.on("votesUpdated", votes => {
    // Milestone 1
    // check jam id to see if it's relevant
    voteStore.set(votes);
    console.log("Vote Happened!", votes);
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

<footer>
  <p>Made by Elijah Lucian - elijahlucian.ca</p>
  <p>&copy; The year of our LORD this twenty and two thousand</p>
</footer>
