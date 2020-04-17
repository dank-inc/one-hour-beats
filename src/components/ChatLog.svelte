<script>
  export let chat;
  export let userId;
  console.log("chat => ", chat);
</script>

<style>
  .self {
    background: var(--accent-color-light);
    color: #fff;
  }

  .other {
    color: var(--accent-color-light);
    background: #fff;
  }
</style>

{#each chat.slice(0, 10) as message}
  <div class={userId === chat.userId ? 'self' : 'other'}>
    {message.userId} - {message.text}
  </div>
{/each}
