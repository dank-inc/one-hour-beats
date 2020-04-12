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

  const handleSubmit = async () => {
    if (username.length < 6) {
      error = "your username must be 6 characters or greater";
      return;
    }

    const user = await (await fetch(`/api/users/${username}`)).json();

    if (user) {
      error = "username is already taken";

      return;
    }

    userStore.set({ id: username, name: username });

    // add user to database
    const addUserResponse = await fetch("/api/users", {
      method: "POST",
      body: { id: username, name: userName }
    });

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
