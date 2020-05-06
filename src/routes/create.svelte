<script>
  import { getContext } from "svelte";
  import { userStore } from "../store";
  import { goto } from "@sapper/app";
  import { prompts } from "../constants/prompts";

  let { getSocket } = getContext("socket");

  const placeholder =
    prompts[Math.floor(Math.random() * (prompts.length - 1))];

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
    goto("/");
  }
</script>

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
        <textarea bind:value={description} {placeholder} />
      </div>
      <div>
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
