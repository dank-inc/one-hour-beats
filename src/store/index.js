import { writable } from "svelte/store";

export const jamStore = writable({});
export const entryStore = writable({});
export const userStore = writable({
  id: null,
  name: null,
  wins: 12,
  thumbs: 100,
});

// { [jamId]: number}
export const jamRoomStore = writable({});
export const chatLogStore = writable({});
