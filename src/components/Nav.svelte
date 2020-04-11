<script>
  export let segment;
</script>

<style>
  ul {
    display: flex;
    justify-content: space-around;
  }
  li {
    list-style: none;
    font-weight: bold;
    color: darkslategrey;
  }

  a:hover {
    color: darkolivegreen;
  }

  nav {
    background: #ccc;
    padding: 2vmin;
  }
</style>

<nav>
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
