<script>
  export let chat;
  console.log("chat => ", chat);
</script>

{#each chat as message}
  <div>{message.userId} - {message.text}</div>
{/each}
