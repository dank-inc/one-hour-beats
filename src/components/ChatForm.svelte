<script>
  export let jamId;
  import { getContext } from "svelte";
  import { userStore } from "../store";
  const { getSocket } = getContext("socket");

  $: userId = $userStore.id;
  let text = "";

  const handleSubmit = () => {
    const socket = getSocket();

    socket.emit("chat", { jamId, userId, text });
    text = "";
  };
</script>

<form on:submit|preventDefault={handleSubmit}>
  <label>
    <input bind:value={text} placeholder="enter chat message" />
  </label>
</form>
