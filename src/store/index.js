import { writable } from "svelte/store";

export const jamStore = writable({});
export const entryStore = writable({});
export const userStore = writable({
  id: "elijah",
  name: "elijah",
  wins: 12,
  thumbs: 100,
});

// { [jamId]: number}
export const jamRoomStore = writable({});
