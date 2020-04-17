<script context="module">
  // initial state
  import axios from "axios";
  axios;
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

    const votes = await this.fetch("/api/votes");
    voteStore.set(await votes.json());

    const voteTokens = await this.fetch("/api/voteTokens");
    voteTokenStore.set(await voteTokens.json());

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
    } else {
      const user = axios.get(`/api/users/${userId}`);
      if (!user) window.localStorage.removeItem("ohb.username");
      window.location.reload();
    }
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
