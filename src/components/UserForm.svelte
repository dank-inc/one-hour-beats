<script>
  import axios from "axios";
  import { userStore } from "../store";
  import { onMount } from "svelte";
  // get username from localstorage, then do a get and update store.

  let error = "";
  let password = "";

  $: username = "";
  $: passwordEntry = false;

  onMount(async () => {
    // get user from API (auto login for now)
    const id = localStorage.getItem("ohb.username");

    if (id) {
      userStore.set({ id, name: id });
    }
  });

  const reset = () => {
    if (!passwordEntry) return;
    console.log("reset");
    password = "";
    passwordEntry = false;
  };

  const handleSubmit = async () => {
    if (username.length < 6) {
      error = "your username must be 6 characters or greater";
      return;
    }

    if (passwordEntry) {
      try {
        const { data } = await axios.post("/api/login", { username, password });
        console.log("logged in");
        userStore.set({ id: username, name: username });
        localStorage.setItem("ohb.username", username);
        return;
      } catch {
        error = "incorrect password";
        return;
      }
    } else {
      try {
        const res = await fetch(`/api/users/${username}`);
        const user = await res.json();
        console.log("login", user);
        passwordEntry = true;
        return;
      } catch {
        // adding user
        console.log("user not found, creating");
        const addUserResponse = await fetch("/api/users", {
          method: "POST",
          body: { id: username, name: userName }
        });
      }
    }
  };
</script>

<form on:submit|preventDefault={handleSubmit}>

  <label>
    Username:
    <input bind:value={username} on:change={reset} autofocus />
  </label>
  {#if passwordEntry}
    <label>
      Password:
      <input bind:value={password} type="password" />
    </label>
    <button>Log In</button>
  {/if}
  {#if error}
    <div class="error">{error}</div>
  {/if}

</form>
