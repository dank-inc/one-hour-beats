<script>
  export let chat;
  export let userId;
</script>

{#each chat.slice(0, 10) as message}
  <div class={`msg ${userId === message.userId ? 'self' : 'other'}`}>
    <div class="username">
      <p>{message.userId[0]}</p>
    </div>
    <div class="text">{message.text}</div>
  </div>
{/each}

<style>
  .msg {
    margin: 0.2rem auto 0.4rem 0;
  }

  .username {
    display: flex;
    align-content: center;
    width: 2rem;
    height: 2rem;
    text-align: center;
    font-weight: bolder;
    font-family: var(--header-font);
    text-shadow: 1px 1px #000a;
    color: #fff;
    background-image: linear-gradient(
      115deg,
      var(--accent-color-light),
      #af1703
    );
    border-radius: 1rem;
  }
  .username p {
    padding-top: 0.5rem;
    margin: auto;
  }

  .self {
    flex-direction: row-reverse;
    margin-right: 0;
  }
  .self .text {
    background: var(--accent-color-dark);
    color: #fff;
    margin: auto 0.5rem 0.1rem;
    padding: 0.2rem 1rem;
    border-radius: 1rem;
  }
  .msg {
    display: flex;
    padding: 0.1rem;
  }
  .other .text {
    color: #777;
    background: #ddd;
    margin: auto 0.5rem 0.1rem;
    padding: 0.2rem 1rem;
    border-radius: 1rem;
  }
</style>
