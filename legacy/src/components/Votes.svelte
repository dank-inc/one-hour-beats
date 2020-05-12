<script>
  // TODO: Fun animations on load!
  export let votes;
</script>

<div class="votes">
  {#each votes as vote}
    <div class="vote">
      <div class="vote-letter">{vote.userId[0]}</div>
    </div>
  {/each}
</div>

<style>
  .votes {
    display: flex;
  }

  .vote {
    font-weight: bold;
    font-family: var(--header-font);

    width: 2rem;
    height: 2rem;
    margin: 0.1rem;
    box-shadow: 1px 1px #0005;
    border-radius: 1rem;
    background-image: linear-gradient(
      115deg,
      var(--accent-color-light),
      #af1703
    );
    transition: all ease-out 0.1s;
  }

  .vote:hover {
    margin-top: -1px;
    margin-left: -1px;
    box-shadow: 2px 2px 2px #0005;
  }

  .vote-letter {
    cursor: default;
    font-size: 14pt;
    padding-top: 0.3rem;
    padding-right: 0.1rem;
    text-shadow: 2px 2px 2px #000a;
    color: #fff;
    margin: auto;
    text-align: center;
  }
</style>
