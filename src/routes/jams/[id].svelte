<script>
  import Entry from "../../components/Entry.svelte";
  import EntryForm from "../../components/EntryForm.svelte";
  import ChatForm from "../../components/ChatForm.svelte";
  import ChatLog from "../../components/ChatLog.svelte";

  import {
    jamStore,
    entryStore,
    userStore,
    chatLogStore,
    voteTokenStore
  } from "../../store";

  import { onMount, getContext } from "svelte";
  import { getUnix, getTimeLeft, unixify } from "../../utils/time";
  import { stores } from "@sapper/app";
  const { page } = stores();
  const { getSocket } = getContext("socket");
  // if no entries by jam end, archive jam / delete
  // Add a socket for a room to add numbers

  let {
    params: { id }
  } = $page;

  $: jam = $jamStore[id];
  $: entries = $entryStore[id];
  $: userId = $userStore.id;
  $: canVote = $voteTokenStore[userId] && $voteTokenStore[userId][id];
  $: currentTime = getUnix();
  $: timeLeft = unixify(jam.startedAt) + jam.timeLimit - currentTime;
  $: chat = $chatLogStore[id];

  onMount(() => {
    const socket = getSocket();
    const interval = setInterval(() => {
      currentTime = getUnix();
    }, 1000);

    const jamId = $page.params.id;

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
  <p>Created by: {jam.userId}</p>
</header>

<div class="jam-room page-content">
  <div class="jam-room-info">
    <h2>Jam Info</h2>
    <p>description: {jam.description}</p>
    <p>Time Limit: {jam.timeLimit} minutes</p>

    {#if !jam.startedAt}
      <button on:click={handleStart}>Start Jam!</button>
    {:else if timeLeft < 0}
      <div>Time To Vote!</div>
    {:else}
      <p>Started At: {jam.startedAt}</p>
      <p>Time Left: {timeLeft}</p>
    {/if}
    <h3>debug</h3>
    <div>{userId} can vote?: {canVote}</div>
    <div>{userId} can submit?: {!includesSelf(entries, userId)}</div>

  </div>

  <div class="jam-room-right">
    {#if jam.startedAt}
      <div class="jam-entries">
        <h2>Entries</h2>
        {#if entries}
          {#each entries as entry}
            <Entry {canVote} {entry} />
          {/each}
        {:else}
          <p>This jam has no entries 😭 {timeLeft > 0 ? '...yet' : '!!'}</p>
        {/if}
      </div>
    {/if}

    {#if timeLeft > 0 && jam.startedAt && !includesSelf(entries, userId)}
      <EntryForm jamId={id} />
    {/if}

    <div class="jam-chat">
      <h2>Chatroom</h2>
      {#if chat}
        <ChatLog {chat} {userId} />
      {:else}
        <div>All is quiet...</div>
      {/if}
      <ChatForm jamId={id} />
    </div>
  </div>
</div>
