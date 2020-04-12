<script>
  export let entry;
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
    border-radius: 1rem;
    padding: 0.2rem 1rem 0.1rem;
    margin: 0;
    background: var(--accent-color-light);
  }
  .details {
    padding: 1rem 1rem 1rem;
    border-radius: 0 0 0.5rem 0.5rem;
    display: flex;
    justify-content: space-between;
    border: 2px solid #ccc;
    border-top: 0;
  }
</style>

<div class="entry">
  <h3 class="header">{entry.artist}</h3>
  <div class="details">
    <a href={entry.link} target="_blank">
      {entry.link.split('://')[1].split('/')[0]}
    </a>
    <a class="button">vote!</a>
  </div>
</div>
