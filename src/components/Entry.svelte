<script>
  export let entry;

  const handleVote = () => {
    console.log("voting");
  };
  // todo embed playablaes
  // todo socket on votes - animate in thumbs
</script>

<style>
  .header {
    background: #ccc;
    color: #fff;
    padding: 0.7rem 1rem 0.5rem;
    border-radius: 0.5rem 0.5rem 0 0;
    margin: 0;
  }
  .button {
    font-size: 8pt;
    border-radius: 0.5rem;
    padding: 0.2rem 1rem 0.1rem;
    margin: 0;
  }
  .details {
    padding: 1rem 1rem 1rem;
    border-radius: 0 0 0.5rem 0.5rem;
    display: flex;
    justify-content: space-between;
    border: solid #ccc;
    border-width: 0px 4px 2px 1px;
  }
</style>

<div class="entry">
  <h3 class="header">{entry.artist}</h3>
  <div class="details">
    <a href={entry.link} target="_blank">
      Listen on {entry.link.split('://')[1].split('/')[0]}
    </a>
    <button on:click={handleVote} class="button">vote!</button>
  </div>
</div>
