import { writable } from "svelte/store";
import _ from "lodash";

import allJams from "../mock-db/jams";
import allEntries from "../mock-db/entries";

const jamIndex = _.keyBy(allJams, "id");
export const jamStore = writable(jamIndex);

const byJam = {};
for (const entry of allEntries) {
  const existing = byJam[entry.jamId];
  byJam[entry.jamId] = [...(existing || []), entry];
}
export const entriesByJam = writable(byJam);

console.log(jamIndex);
console.log(byJam);
