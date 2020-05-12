<script>
  import axios from "axios";
  import { userStore } from "../store";
  import { onMount } from "svelte";
  // get username from localstorage, then do a get and update store.

  let error = "";
  let password = "";
  let newUser = false;
  let passwordConfirmation = "";
  let message = "";
  let email = "";

  $: username = "";
  $: passwordEntry = false;

  onMount(async () => {
    // get user from API (auto login for now)
    const id = localStorage.getItem("ohb.username");

    if (id) {
      const { data } = await axios.get(`/api/users/${id}`);
      if (data) {
        console.log("user found =>", data);
        userStore.set(data);
        localStorage.setItem("ohb.username", id);
      } else {
        console.log("user not found!", id);
        localStorage.removeItem("ohb.username");
      }
    }
  });

  const reset = () => {
    if (!passwordEntry) return;
    console.log("reset");
    password = "";
    passwordEntry = false;
  };

  const handleSubmit = async () => {
    message = "";
    error = "";

    if (username.length < 6) {
      error = "your username must be 6 characters or greater";
      return;
    }

    if (newUser) {
      if (password !== passwordConfirmation) {
        error = "your passwords do not match";
        return;
      } else if (!email) {
        error = "please enter your email";
        return;
      }
      try {
        console.log("creating user");
        await axios.post("/api/users", {
          id: username,
          username,
          email,
          password
        });
        const { data } = await axios.get(`api/users/${username}`);
        userStore.set(data);
        localStorage.setItem("ohb.username", username);
      } catch (err) {
        error = "something went wrong!!!" + err;
        return;
      }
    }

    if (!newUser && passwordEntry) {
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
        console.log("looking for", username);
        const res = await fetch(`/api/users/${username}`);
        const user = await res.json();
        console.log("login", user);

        newUser = false;
        passwordEntry = true;
        return;
      } catch {
        // adding user
        console.log("user not found, creating");
        message = `Please create an account, ${username}!`;
        newUser = true;
        passwordEntry = true;
      }
    }
  };
</script>

<form on:submit|preventDefault={handleSubmit}>
  <div>
    <label>
      Username:
      <input bind:value={username} on:change={reset} />
    </label>
  </div>
  {#if passwordEntry}
    <div>
      <label>
        Password:
        <input bind:value={password} type="password" />
      </label>
    </div>
    {#if newUser}
      <div>
        <label>
          Confirm Password:
          <input bind:value={passwordConfirmation} type="password" />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input bind:value={email} type="email" />
        </label>
      </div>
    {/if}
    <button>Log In</button>
  {/if}
  {#if error}
    <div class="error">{error}</div>
  {/if}
  {#if message}
    <div class="message">{message}</div>
  {/if}

</form>
