<script>
  import { userStore } from "../store";
  import { onMount } from "svelte";
  // get username from localstorage, then do a get and update store.

  let username = "";
  let error = "";

  onMount(async () => {
    // get user from API (auto login for now)
    const id = localStorage.getItem("ohb.username");

    if (id) {
      userStore.set({ id, name: id });
    }
  });

  const handleSubmit = () => {
    if (username.length < 6) {
      error = "your username must be 6 characters or greater";
      return;
    }
    //
    userStore.set({ id: username, name: username });
    localStorage.setItem("ohb.username", username);
  };
</script>

<form on:submit|preventDefault={handleSubmit}>

  <label>
    Username:
    <input bind:value={username} />
  </label>
  {#if error}
    <div class="error">{error}</div>
  {/if}
</form>
