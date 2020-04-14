<script>
  // TODO: Fun animations on load!
  export let votes;
</script>

<style>
  .votes {
    display: flex;
  }

  .vote {
    background: var(--accent-color-light);
    font-weight: bold;
    font-family: Garamond;
    color: #fff;
    width: 2rem;
    height: 2rem;
    margin: 0.1rem;
    border-radius: 1rem;
    transition: all ease-in 0.2s;
  }

  .vote div {
    font-size: 14pt;
    padding-top: 0.1rem;
    margin: auto;
    text-align: center;
  }
</style>

<div class="votes">
  {#each votes as vote}
    <div class="vote">
      <div>{vote[0]}</div>
    </div>
  {/each}
</div>
