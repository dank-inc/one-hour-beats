import sirv from "sirv";
import http from "http";
import polka from "polka";
import send from "@polka/send-type";
import { json } from "body-parser";
import _ from "lodash";
import io from "socket.io";
import compression from "compression";
import * as sapper from "@sapper/server";

import { initializeSockets } from "./backend/socket";

import jams from "./mock-db/jams";
import entries from "./mock-db/entries";
import users from "./mock-db/users";
import voteTokens from "./mock-db/voteTokens";

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

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
const server = http.createServer();
const app = polka({ server });

app.store = {
  jamIndex,
  entryIndex,
  entriesByJam,
  jamRooms,
  chatLogs,
  userIndex,
  votesIndex,
  voteTokensByUser,
};

app
  .use(json())
  .get("/api/jams/:id?", ({ params }, res, next) => {
    const { store } = app;
    if (params.id) {
      send(res, 200, store.jamIndex[params.id]);
    } else {
      send(res, 200, store.jamIndex);
    }
  })
  // post to /jams => create jam
  // put to /jams/:id => update jam
  .get("/api/entries/:jamId?/:id?", ({ params }, res, next) => {
    const { store } = app;
    if (params.jamId) {
      send(res, 200, store.entriesByJam[params.jamId]);
    } else {
      send(res, 200, store.entriesByJam);
    }
  })
  .get("/api/voteTokens/:userId", ({ params }, res, next) => {
    const voteTokens = app.store.voteTokensByUser[params.userId];
    send(res, 200, voteTokens || {});
  })
  .get("/api/jamRooms", (req, res, next) => {
    send(res, 200, app.store.jamRooms);
  })
  .get("/api/chatLogs", (req, res, next) => {
    send(res, 200, app.store.chatLogs);
  })
  .get("/api/votes", (req, res, next) => {
    send(res, 200, app.store.votesIndex);
  })
  .get("/api/users/:id?", ({ params }, res, next) => {
    if (!params.id) {
      send(res, 200, app.store.userIndex);
    }
    const user = app.store.userIndex[params.id];
    if (user) {
      send(res, 200, user);
    } else {
      send(res, 404);
    }
    // get users
  })
  .post("/api/users?", ({ body }, res, next) => {
    const user = { ...body, thumbs: 0, wins: 0 };
    app.store.userIndex = { ...app.store.userIndex, user };
    // get users
  })
  .post("/api/login", ({ body }, res, next) => {
    console.log("login", body);
    const user = app.store.userIndex[body.username];
    console.log("Login", body, user);
    if (user.password == body.password) {
      send(res, 200);
    } else {
      send(res, 401);
    }
  })
  .use(
    compression({ threshold: 0 }),
    sirv("static", { dev }),
    sapper.middleware()
  )
  .listen(PORT, (err) => {
    if (err) console.log("error", err);
  });

initializeSockets(io, server, app);
