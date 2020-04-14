import { writable } from "svelte/store";

export const jamStore = writable({});
export const entryStore = writable({});

export const userStore = writable();

// { [jamId]: number }
export const jamRoomStore = writable({});
export const chatLogStore = writable({});

// { [entryId]: userIds[] }
export const voteStore = writable({});
