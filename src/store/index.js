import { writable } from "svelte/store";
import _ from "lodash";

import allJams from "../mock-db/jams";

const jamIndex = _.keyBy(allJams, "id");

console.log(jamIndex);

export const jamStore = writable(jamIndex);
