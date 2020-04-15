<script>
  import { userStore } from "../store";
  import { getContext } from "svelte";
  let { getSocket } = getContext("socket");
  export let jamId;
  let link;
  $: user = $userStore;
  let artist = $userStore.id;
  let title = "";

  let error = "";

  const handleSubmit = () => {
    if (!title) {
      error = "you must supply a title";
      return;
    }
    let entry = {
      link,
      artist,
      title,
      userId: user.id,
      jamId: jamId
    };
    link = "";
    console.log("Adding Entry", entry);
    const socket = getSocket();
    socket.emit("addEntry", entry);
  };
</script>

<form on:submit|preventDefault={handleSubmit}>
  <div>
    <label>
      Artist Name:
      <input bind:value={artist} type="text" />
    </label>
  </div>
  <div>
    <label>
      Entry Title:
      <input bind:value={title} type="text" placeholder="Creative Title" />
    </label>
  </div>
  <div>
    <label>
      Entry link:
      <input
        bind:value={link}
        type="url"
        placeholder="http://soundcloud.com/cool-artist/dank-beat" />
    </label>
  </div>
  {#if error}
    <div class="error">{error}</div>
  {/if}
  <button>Submit Entry</button>
</form>
