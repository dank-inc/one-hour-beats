<script>
  export let segment;
</script>

<style>
  ul {
    display: flex;
    justify-content: space-around;
    margin: 1vmin;
  }
  li {
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

  nav {
    background: #ccc;
    padding: 1vmin 2vmin;
    font-size: 18pt;
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
