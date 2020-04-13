<script>
  import { jamRoomStore } from "../store";
  import { generateInt } from "../utils/faker";
  import { getJamState } from "../utils/jam";
  export let jam;

  $: userIds = $jamRoomStore[jam.id];

  // TODO: add animation when user count changes on any jam.
  // TODO: add animation when status changes on a jam.
  // TODO: add animation when a new jam is created.
</script>

<style>
  .jam-link {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    /* background: #ccc5; */
    margin: 0.5rem 0;
    padding: 1rem 2rem;
    border-radius: 0.3rem;
    transition: all 0.1s ease-in;
    border: solid #eee;
    border-width: 1px 7px 3px 1px;
  }

  .jam-link:hover {
    border: 2px solid #ccc;
  }

  .jam-link h2,
  .jam-link p {
    margin: auto auto auto 0;
  }

  .jam-link .users {
    margin: auto 0 auto auto;
  }
</style>

<a href={`/jams/${jam.id}`}>
  <div class="jam-link">
    <h2>{jam.name}</h2>
    <p>{getJamState(jam)}</p>
    <p class="users">
      {#if userIds}{userIds.length} participants!{:else}0 participants!{/if}
    </p>
  </div>
</a>
