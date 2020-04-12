<script>
  import { jamRoomStore } from "../store";
  import { generateInt } from "../utils/faker";
  import { getJamState } from "../utils/jam";
  export let jam;

  $: userIds = $jamRoomStore[jam.id];
</script>

<div>
  <h2>
    <a href={`/jams/${jam.id}`}>{jam.name}</a>
    <p>{getJamState(jam)}</p>
    {#if userIds}
      <p>{userIds.length} participants!</p>
    {:else}
      <p>0 participants!</p>
    {/if}
  </h2>
</div>
