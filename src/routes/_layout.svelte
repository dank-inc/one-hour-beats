<script context="module">
  // initial state
  import {
    jamStore,
    entryStore,
    jamRoomStore,
    userStore,
    voteStore,
    chatLogStore,
    voteTokenStore
  } from "../store";

  export async function preload(page) {
    const jams = await this.fetch("/api/jams");
    jamStore.set(await jams.json());

    const entries = await this.fetch("/api/entries");
    entryStore.set(await entries.json());

    const jamRooms = await this.fetch("/api/jamRooms");
    jamRoomStore.set(await jamRooms.json());

    const chatLogs = await this.fetch("/api/chatLogs");
    chatLogStore.set(await chatLogs.json());
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

  const socket = io(); // could pass userid for user in sockets... hmm

  socket.on("entriesUpdated", entryIndex => {
    // Milestone 1 - scope down into user's concerns
    console.log("Entries Updated!", entryIndex);
    entryStore.set(entryIndex);
  });
  socket.on("jamsUpdated", jams => {
    // Milestone 1 - scope down into user's concerns
    console.log("Jams Updated!", jams);
    jamStore.set(jams);
  });
  socket.on("votesUpdated", votes => {
    // Milestone 1 - scope down into user's concerns
    voteStore.set(votes);
    console.log("Vote Happened!", votes);
  });
  socket.on("jamRoomsUpdated", rooms => {
    console.log("jam rooms updated!", rooms);
    jamRoomStore.set(rooms);
  });

  socket.on("voteTokensUpdated", voteTokens => {
    console.log("vote tokens updated", voteTokens);
    voteTokenStore.set(voteTokens);
  });

  setContext("socket", {
    getSocket: () => socket
  });

  onMount(async () => {
    const userId = window.localStorage.getItem("ohb.username");
    if (!userId) {
      console.log("user not found in locastorage. wtf");
    }
    const votes = await fetch(`/api/voteTokens/${userId}`);
    voteTokenStore.set(await votes.json());
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
