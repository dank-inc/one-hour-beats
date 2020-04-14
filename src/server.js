import sirv from "sirv";
import http from "http";
import polka from "polka";
import send from "@polka/send-type";
import { json } from "body-parser";
import _ from "lodash";
import io from "socket.io";
import compression from "compression";
import * as sapper from "@sapper/server";
import faker from "faker";

import jams from "./mock-db/jams";
import entries from "./mock-db/entries";
import users from "./mock-db/users";

import { getUnix } from "./utils/time";
import { generateId } from "./utils/faker";
const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

const jamIndex = _.keyBy(jams, "id");
const entryIndex = {};
for (const entry of entries) {
  entryIndex[entry.jamId] = [...(entryIndex[entry.jamId] || []), entry];
}
// TODO: entries by id - gonna need an actual db lol

// votesByEntry
const votesIndex = {};

// jamRooms[jamId] = [array of user ids]
const jamRooms = {};
// chatlogs[jamId] = [array of chats]
const chatLogs = {};
// socket-id => user-id
const socketUserMap = {};

const userIndex = _.keyBy(users, "id");
const server = http.createServer();
const app = polka({ server });
app.store = { jamIndex, entryIndex, jamRooms, chatLogs, userIndex, votesIndex };

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
      send(res, 200, store.entryIndex[params.jamId]);
    } else {
      send(res, 200, store.entryIndex);
    }
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

io(server).on("connection", (socket) => {
  console.log("Connected =>", socket.id);

  socket.emit("state", { ...app.store });

  socket.on("disconnect", () => {
    // todo remove user from any active rooms.
    // filter out all the users
    const userId = socketUserMap[socket.id];
    console.log("Disonnected =>", socket.id, "userId:", userId);

    // iterate over all the rooms and remove userid...
    for (const [jamId, userIds] of Object.entries(app.store.jamRooms)) {
      app.store.jamRooms[jamId] = [...userIds.filter((id) => id !== userId)];
    }

    socket.emit("jamRoomsUpdated", app.store.jamRooms);
    socket.broadcast.emit("jamRoomsUpdated", app.store.jamRooms);
  });

  socket.on("createJam", (jam) => {
    const id = generateId();
    console.log("jam created", id);
    app.store.jamIndex[id] = {
      ...jam,
      id,
      createdAt: getUnix(),
      startedAt: null,
    };
    socket.emit("jamsUpdated", app.store.jamIndex);
    socket.broadcast.emit("jamsUpdated", app.store.jamIndex);
  });

  socket.on("startJam", (body) => {
    const jam = { ...app.store.jamIndex[body.id] };
    jam.startedAt = getUnix();
    console.log("Starting Jam", jam);
    app.store.jamIndex = { ...app.store.jamIndex, [body.id]: jam };
    socket.emit("jamsUpdated", app.store.jamIndex);
    socket.broadcast.emit("jamsUpdated", app.store.jamIndex);
    //
  });

  socket.on("addEntry", (entry) => {
    const jamEntries = [...(app.store.entryIndex[entry.jamId] || []), entry];
    app.store.entryIndex[entry.jamId] = jamEntries;
    console.log("Adding Entry", entry);
    socket.emit("entriesUpdated", app.store.entryIndex);
    socket.broadcast.emit("entriesUpdated", app.store.entryIndex);
  });

  socket.on("joinJamRoom", ({ userId, jamId }) => {
    socket.join(jamId);
    socketUserMap[socket.id] = userId;
    console.log("user", userId, "joined", jamId, "socketId", socket.id);
    // map socket users to user ids
    const room = app.store.jamRooms[jamId];
    app.store.jamRooms[jamId] = [...(room || []), userId];
    socket.emit("jamRoomsUpdated", app.store.jamRooms);
    socket.broadcast.emit("jamRoomsUpdated", app.store.jamRooms);
  });

  socket.on("leaveJamRoom", ({ userId, jamId }) => {
    console.log("user", userId, "left", jamId);
    const userIds = app.store.jamRooms[jamId] || [];
    app.store.jamRooms[jamId] = [...userIds.filter((id) => id !== userId)];
    socket.emit("jamRoomsUpdated", app.store.jamRooms);
    socket.broadcast.emit("jamRoomsUpdated", app.store.jamRooms);
  });

  socket.on("chat", (chat) => {
    const { jamId } = chat;
    console.log("new chat recieved", chat);
    const messages = app.store.chatLogs[jamId] || [];
    const message = { ...chat, createdAt: getUnix() };
    app.store.chatLogs[jamId] = [message, ...messages];

    socket.emit("chatUpdated", app.store.chatLogs);
    socket.broadcast.emit("chatUpdated", app.store.chatLogs);
  });

  socket.on("addVote", ({ entryId, userId }) => {
    console.log("vote has been cast!", entryId, userId);
    app.store.votesIndex[entryId] = [
      ...(app.store.votesIndex[entryId] || []),
      userId,
    ];
    io.emit("votesUpdated", app.store.votesIndex);
    // socket.emit("votesUpdated", app.store.votesIndex);
    // socket.broadcast.emit("votesUpdated", app.store.votesIndex);
  });
});
