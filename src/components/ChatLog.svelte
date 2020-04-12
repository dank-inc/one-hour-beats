<script>
  export let chat;
  console.log("chat => ", chat);
</script>

{#each chat.slice(0, 10) as message}
  <div>{message.userId} - {message.text}</div>
{/each}
