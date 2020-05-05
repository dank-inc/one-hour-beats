<script>

</script>

<style>
  ul {
    display: flex;
    justify-content: flex-end;
    align-content: center;
    margin: auto 1vmin 0;
  }
  li {
    font-size: 12pt;
    margin: auto 2vmin 0;
    list-style: none;
    transition: all 0.2s linear;
    padding: 0.3rem;
    border-radius: 0.3rem;
  }

  li:hover {
    /* background: #3333; */
  }

  nav {
    padding: 1vmin 2vmin;
    font-size: 18pt;
    display: flex;
    justify-content: space-between;
    vertical-align: center;
  }

  .left {
    display: flex;
    justify-content: flex-start;
    vertical-align: center;
  }

  img {
    height: 75px;
    margin-right: 1vmin;
    filter: invert(1);
    mix-blend-mode: lighten;
  }

  .lightTheme {
    color: #fff;
    background: var(--accent-color-light);
  }

  .darkTheme {
    color: var(--accent-color-light);
    background: #333;
    mix-blend-mode: multiply;
  }

  .username {
    font-size: 10pt;
    margin: auto auto 1vmin;
  }
</style>

<nav class="lightTheme">
  <div class="left">
    <a href="/">
      <img class="lightTheme" src="/images/ohb-logo.jpeg" alt="logo" />
    </a>
  </div>
  <ul>

    <a href="/">
      <li>Home</li>
    </a>
    <a href="/create">
      <li>Create</li>
    </a>
    <a href="/about">
      <li>About</li>
    </a>
    <a href="/jams">
      <li>Jams</li>
    </a>

  </ul>
</nav>
