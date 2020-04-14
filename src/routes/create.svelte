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

    socket.emit("createJam", { name, description, timeLimit, userId });
    // send jam to db
    // generate id for jam
    // return id from server
    // navigate to `jams/id`
    console.log("submitting form");
    goto("/jams");
  }
</script>

<style>
  .sexyform {
    font-size: 16pt;
    width: 100%;
    padding: 4vmin;
    margin: auto;
    border-radius: 1vmin;
  }
  .sexyform input {
    font-size: 14pt;
    padding: 2vmin;
    border-radius: 2vmin;
    color: #555;
    letter-spacing: 0.05em;
    width: 100%;
  }

  .sexyform label {
    display: block;
  }
  .sexyform textarea {
    font-size: 14pt;
    width: 100%;
    padding: 2vmin;
    border-radius: 1vmin;
    font-family: "Roboto", sans-serif;
    color: #555;
    letter-spacing: 0.05em;
  }
  .sexyform button {
    border-radius: 1vmin;
    padding: 1vmin;
  }
</style>

<svelte:head>
  <title>One Hour Beats - Create Jam</title>
</svelte:head>

<header>
  <h1>Create Jam!</h1>
  <p>Make your very own jam here!</p>
</header>

<div class="page-content">
  <form on:submit|preventDefault={handleSubmit} class="sexyform">
    <div>
      <label>Name of Jam:</label>
      <input bind:value={name} placeholder="Jam Name" />
    </div>
    <div>
      <label>time limit (in minutes):</label>
      <input bind:value={timeLimit} type="number" min="60" max="240" />
    </div>
    <div>
      <label>Outline of the rules of the jam:</label>
    </div>
    <textarea
      bind:value={description}
      placeholder="Eg: every sound must be in reverse" />
    <div>
      <button type="submit">Create!</button>
    </div>
  </form>
</div>
