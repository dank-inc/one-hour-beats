<script>
  import { generateInt } from "../utils/faker";
  import { getJamState } from "../utils/jam";
  export let jam;
</script>

<div>
  <h2>
    <a href={`/jams/${jam.id}`}>{jam.name}</a>
    - {getJamState(jam)}! - {generateInt()} participants!
  </h2>
</div>
