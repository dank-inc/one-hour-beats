<script>
  export let entry;
</script>

<div>
  {entry.artist} -
  <a href={entry.link} target="_blank">
    {entry.link.split('://')[1].split('/')[0]}
  </a>
  👍
</div>
