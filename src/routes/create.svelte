<script>
  import { getContext } from "svelte";
  import { userStore } from "../store";
  let { getSocket } = getContext("socket");
  import { goto } from "@sapper/app";
  let name;
  let description;
  let timeLimit = 60;
  let userId = $userStore.id;

  function handleSubmit() {
    const socket = getSocket();

    socket.emit("createJam", {
      name,
      description,
      timeLimit: timeLimit * 60,
      userId
    });
    console.log("submitting form");
    goto("/");
  }
</script>

<svelte:head>
  <title>One Hour Beats - Create Challenge</title>
</svelte:head>

<header>
  <h1>Create Challenge!</h1>
  <p>Make your very own challenge here!</p>
</header>

<div class="page-content">
  <form on:submit|preventDefault={handleSubmit} class="sexyform">
    <div>
      <label>Name of Challenge:</label>
      <input bind:value={name} placeholder="Challenge Name" />
    </div>
    <div>
      <label>time limit (in minutes):</label>
      <input bind:value={timeLimit} type="number" min="0" max="240" />
    </div>
    <h3>Outline of the rules of the challenge:</h3>
    <div>
      <div>
        <label>General Prompt</label>
        <input
          type="text"
          placeholder="eg: make a track that sounds like a childhood nightmare" />
      </div>
      <div>
        <div>
          <label>(optional) Video Prompt - link</label>
          <input
            type="url"
            placeholder="eg: Make a background track to match the muted video" />
        </div>
        <div>
          <label>(optional) Lyrical Prompt</label>
          <input
            type="text"
            placeholder="eg: First line must contain these words: love, dank" />
        </div>
        <button type="submit">Create!</button>
      </div>

    </div>
  </form>
</div>

<style>
  .sexyform {
    font-size: 16pt;
    width: 100%;
    padding: 4vmin;
    margin: auto;
    border-radius: 1vmin;
  }
  .sexyform input {
  }

  .sexyform label {
    display: block;
  }
  .sexyform textarea {
    font-size: 14pt;
    width: 100%;
    padding: 2vmin;
    border-radius: 1vmin;
    font-family: "Fira Code", sans-serif;
    color: #555;
    letter-spacing: 0.05em;
  }
  .sexyform button {
    border-radius: 1vmin;
    padding: 1vmin;
  }
</style>
