<script>
  import { getContext } from "svelte";
  let { getSocket } = getContext("socket");
  export let jamId;
  let link;
  let artist;

  const handleSubmit = () => {
    // get user to submit entry.
    // api call to database, sockets => update store.
    let entry = {
      link,
      artist,
      jamId: jamId
    };
    link = "";
    artist = "";
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
      Entry link:
      <input
        bind:value={link}
        type="url"
        placeholder="http://soundcloud.com/cool-artist/dank-beat" />
    </label>
  </div>
  <button>Submit Entry</button>
</form>
