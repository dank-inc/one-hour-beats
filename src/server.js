import sirv from "sirv";
import http from "http";
import polka from "polka";
import send from "@polka/send-type";
import _ from "lodash";
import io from "socket.io";
import compression from "compression";
import * as sapper from "@sapper/server";
import faker from "faker";

import jams from "./mock-db/jams";
import entries from "./mock-db/entries";
import { getUnix } from "./utils/time";
const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

const jamIndex = _.keyBy(jams, "id");
const entryIndex = {};
for (const entry of entries) {
  entryIndex[entry.jamId] = [...(entryIndex[entry.jamId] || []), entry];
}
// TODO: entries by id - gonna need an actual db lol

const server = http.createServer();

const app = polka({ server });
app.store = { jamIndex, entryIndex };

app
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
  // post to /entries => create entry
  // put to /entries/:id => update entry *milestone 2
  // CRUD /users *milestone 1
  .use(
    compression({ threshold: 0 }),
    sirv("static", { dev }),
    sapper.middleware()
  )
  .listen(PORT, (err) => {
    if (err) console.log("error", err);
  });

io(server).on("connection", (socket) => {
  console.log("SOCKET", socket.id);

  socket.on("createJam", (jam) => {
    const id = `${faker.internet.protocol()}-${faker.hacker.adjective()}-${faker.hacker.noun()}`;
    console.log("jam created", id);
    app.store.jamIndex[id] = {
      ...jam,
      id,
      createdAt: getUnix(),
      startedAt: null,
    };
    socket.emit("jamsUpdated", app.store.jamIndex);
    socket.broadcast.emit("jamsUpdated", app.store.jamIndex);
    // generate ID
    // remap jam list with new jam
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
});
