<script>
  import { userStore } from "../store";
  $: userName = $userStore.name;
</script>

<style>
  ul {
    display: flex;
    justify-content: flex-end;
    margin: 0 1vmin;
  }
  li {
    margin: 1vmin;
    list-style: none;
    font-weight: bold;
    color: darkslategrey;
  }

  a {
    text-decoration: none;
  }
  a:hover {
    color: darkolivegreen;
    text-decoration: underline;
  }

  .username {
    margin: auto 0;
  }
  nav {
    background: #ccc;
    padding: 1vmin 2vmin;
    font-size: 18pt;
    display: flex;
    justify-content: space-between;
    vertical-align: center;
  }
</style>

<nav>
  {#if userName}
    <div class="username">Welcome, {userName}</div>
  {/if}
  <ul>

    <li>
      <a href="/">Home</a>
    </li>
    <li>
      <a href="/create">Create</a>
    </li>
    <li>
      <a href="/about">About</a>
    </li>
    <li>
      <a rel="prefetch" href="/jams">Jams</a>
    </li>

  </ul>
</nav>
