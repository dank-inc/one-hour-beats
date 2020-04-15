import _ from "lodash";

import jams from "../mock-db/jams";
import entries from "../mock-db/entries";
import users from "../mock-db/users";
import voteTokens from "../mock-db/voteTokens";

const jamIndex = _.keyBy(jams, "id");
const entriesByJam = {};
for (const entry of entries) {
  entriesByJam[entry.jamId] = [...(entriesByJam[entry.jamId] || []), entry];
}
const entryIndex = _.keyBy(entries, "id");
// TODO: entries by id - gonna need an actual db lol

// votesByEntry
const votesIndex = {};
// userId { jamId: true } - does user have ability to vote y/n
const voteTokensByUser = {};
for (const { jamId, userId, entryId } of voteTokens) {
  if (!jamId) continue;
  voteTokensByUser[userId] = { [jamId]: entryId ? false : true };
}

// jamRooms[jamId] = [array of user ids]
const jamRooms = {};
// chatlogs[jamId] = [array of chats]
const chatLogs = {};

const userIndex = _.keyBy(users, "id");

export default {
  jamIndex,
  entryIndex,
  entriesByJam,
  jamRooms,
  chatLogs,
  userIndex,
  votesIndex,
  voteTokensByUser,
};
