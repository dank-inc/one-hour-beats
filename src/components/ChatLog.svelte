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

}
</style>

{#each chat.slice(0, 10) as message}
  <di class={userId === chat.userId ? "self" : "other"}v>{message.userId} - {message.text}</div>
{/each}
