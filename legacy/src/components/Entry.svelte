<script>
  import Votes from "../components/Votes.svelte";
  import { userStore, voteStore } from "../store";
  import { getContext } from "svelte";

  const { getSocket } = getContext("socket");

  export let entry;
  export let canVote;
  $: userId = $userStore.id;
  $: votes = $voteStore[entry.id];

  // TODO: the only way a user can vote is if they submit an entry.
  // when a user submits an entry they get a "vote" token for that jam.
  // TODO: to show or not to show the user names as votes...
  // TODO: Find an easy way to figure out if a user has voted in this jam
  // idea - jam.voted = userId[] // can eventually be a query

  const handleVote = () => {
    const socket = getSocket();
    const payload = { userId, entryId: entry.id };
    socket.emit("addVote", payload);
  };
  // todo embed playablaes
  // todo socket on votes - animate in thumbs
</script>

<div class="entry">
  <h3 class="header">{entry.userId} - {entry.title}</h3>
  <div class="details">
    <div class="details-main">
      <a href={entry.link} target="_blank">
        Listen on {entry.link.split('://')[1].split('/')[0]}
      </a>
      {#if canVote && entry.userId != userId}
        <button on:click={handleVote} class="button">vote!</button>
      {/if}
    </div>
    {#if votes}
      <Votes {votes} />
    {/if}
  </div>
</div>

<style>
  .header {
    background: #ccc;
    color: #fff;
    padding: 0.7rem 1rem 0.5rem;
    border-radius: 0.5rem 0.5rem 0 0;
    margin: 0;
  }
  .button {
    font-size: 8pt;
    border-radius: 0.5rem;
    padding: 0.2rem 1rem 0.1rem;
  }
  .details {
    padding: 1rem 1rem 1rem;
    border-radius: 0 0 0.5rem 0.5rem;
    border: solid #ccc;
    border-width: 0px 4px 2px 1px;
  }
  .details-main {
    display: flex;
    justify-content: space-between;
  }
</style>
