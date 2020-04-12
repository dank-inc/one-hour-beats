<script>
  import Entry from "../../components/Entry.svelte";
  import EntryForm from "../../components/EntryForm.svelte";
  import ChatForm from "../../components/ChatForm.svelte";
  import ChatLog from "../../components/ChatLog.svelte";

  import { jamStore, entryStore, userStore, chatLogStore } from "../../store";

  import { onMount, getContext } from "svelte";
  import { getUnix, getTimeLeft } from "../../utils/time";
  import { stores } from "@sapper/app";
  const { page } = stores();
  const { getSocket } = getContext("socket");

  // Add a socket for a room to add numbers

  let {
    params: { id }
  } = $page;

  $: jam = $jamStore[id];
  $: entries = $entryStore[id];
  $: currentTime = getUnix();
  $: timeLeft = jam.startedAt + jam.timeLimit - currentTime;
  $: chat = $chatLogStore[id];

  onMount(() => {
    const socket = getSocket();
    const interval = setInterval(() => {
      currentTime = getUnix();
    }, 1000);
    const userId = $userStore.id;
    const jamId = $page.params.id;

    socket.on("connect", () => {
      socket.emit("room", { userId, jamId });
    });

    socket.on("chatUpdated", chatLog => {
      console.log("your chat has been updated", chatLog);
      chatLogStore.set(chatLog);
    });

    socket.emit("joinJamRoom", { jamId, userId });
    return () => {
      socket.emit("leaveJamRoom", { jamId, userId });
      clearInterval(interval);
    };
  });

  const handleStart = () => {
    const socket = getSocket();
    socket.emit("startJam", { id });
  };
</script>

<style>

</style>

<svelte:head>
  <title>One Hour Beats - {jam.name}</title>
</svelte:head>

<header>
  <h1>{jam.name}</h1>
  <p>maybe some quick stats - authored by?</p>
</header>

<div class="jam-info">
  <h3>Jam Info</h3>
  <p>id: {id}</p>
  <p>name: {jam.name}</p>
  <p>description: {jam.description}</p>
  <p>Time Limit: {jam.timeLimit / 60} minutes</p>

  {#if !jam.startedAt}
    <button on:click={handleStart}>Start Jam!</button>
  {:else if timeLeft < 0}
    <div>Time To Vote!</div>
  {:else}
    <p>Started At: {jam.startedAt}</p>
    <p>Time Left: {timeLeft}</p>
    <EntryForm jamId={id} />
  {/if}
</div>

{#if entries && entries.length}
  <div class="jam-entries">
    <h2>Entries</h2>
    <p>todo: embed playables</p>
    {#each entries as entry}
      <Entry {entry} />
    {/each}
    <p>todo: animate in thumbs</p>
  </div>
{/if}

<h2>Chatroom</h2>
{#if chat}
  <ChatLog {chat} />
{:else}
  <div>All is quiet...</div>
{/if}
<ChatForm jamId={id} />
