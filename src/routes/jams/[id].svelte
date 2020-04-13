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
  $: userId = $userStore.id;
  $: currentTime = getUnix();
  $: timeLeft = jam.startedAt + jam.timeLimit - currentTime;
  $: chat = $chatLogStore[id];

  onMount(() => {
    const socket = getSocket();
    const interval = setInterval(() => {
      currentTime = getUnix();
    }, 1000);

    const jamId = $page.params.id;

    // socket.on("connect", () => {
    //   socket.emit("room", { userId, jamId });
    // });

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

  const includesSelf = (arr, userId) => {
    return arr && !!arr.find(a => a.userId === userId);
  };

  const handleStart = () => {
    const socket = getSocket();
    socket.emit("startJam", { id });
  };
</script>

<style>
  .jam-room {
    padding: 1rem;
    display: flex;
  }

  .jam-room-info {
    flex: 5;
  }

  .jam-room-right {
    flex: 3;
  }
</style>

<svelte:head>
  <title>One Hour Beats - {jam.name}</title>
</svelte:head>

<header>
  <h1>{jam.name}</h1>
  <p>Created by: {jam.createdBy}</p>
</header>

<div class="jam-room page-content">
  <div class="jam-room-info">
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
    {/if}
  </div>

  <div class="jam-room-right">
    {#if jam.startedAt}
      <div class="jam-entries">
        <h2>Entries</h2>
        {#each entries || [] as entry}
          <Entry {entry} />
        {/each}
        {#if !includesSelf(entries, userId)}
          <EntryForm jamId={id} />
        {/if}
      </div>
    {/if}

    <div class="jam-chat">
      <h2>Chatroom</h2>
      {#if chat}
        <ChatLog {chat} />
      {:else}
        <div>All is quiet...</div>
      {/if}
      <ChatForm jamId={id} />
    </div>
  </div>
</div>
