import polka from "polka";
import sirv from "sirv";
import send from "@polka/send-type";
import { json } from "body-parser";
import * as sapper from "@sapper/server";
import compression from "compression";
import io from "socket.io";
import { getUnix } from "../utils/time";
import { generateId } from "../utils/faker";

export class App {
  constructor({ server, store, env }) {
    this.store = store;
    this.env = env;
    this.server = polka({ server });
    this.server.use(json());
    this.sockets = io(server);
    this.defineRoutes();
    this.defineSockets();
    this.middleware();
    this.start();
  }

  middleware() {
    this.server.use(
      compression({ threshold: 0 }),
      sirv("static", { dev: this.env.dev }),
      sapper.middleware()
    );
  }

  start() {
    this.server.listen(this.env.port, (err) => {
      if (err) console.log("error", err);
    });
  }

  defineRoutes() {
    this.server
      .get("/api/jams/:id?", ({ params }, res, next) => {
        const { store } = this;
        if (params.id) {
          send(res, 200, store.jamIndex[params.id]);
        } else {
          send(res, 200, store.jamIndex);
        }
      })
      // post to /jams => create jam
      // put to /jams/:id => update jam
      .get("/api/entries/:jamId?/:id?", ({ params }, res, next) => {
        const { store } = this;
        if (params.jamId) {
          send(res, 200, store.entriesByJam[params.jamId]);
        } else {
          send(res, 200, store.entriesByJam);
        }
      })
      .get("/api/voteTokens/:userId", ({ params }, res, next) => {
        const voteTokens = this.store.voteTokensByUser[params.userId];
        send(res, 200, voteTokens || {});
      })
      .get("/api/jamRooms", (req, res, next) => {
        send(res, 200, this.store.jamRooms);
      })
      .get("/api/chatLogs", (req, res, next) => {
        send(res, 200, this.store.chatLogs);
      })
      .get("/api/votes", (req, res, next) => {
        send(res, 200, this.store.votesIndex);
      })
      .get("/api/users/:id?", ({ params }, res, next) => {
        if (!params.id) {
          send(res, 200, this.store.userIndex);
        }
        const user = this.store.userIndex[params.id];
        if (user) {
          send(res, 200, user);
        } else {
          send(res, 404);
        }
        // get users
      })
      .post("/api/users?", ({ body }, res, next) => {
        const user = { ...body, thumbs: 0, wins: 0 };
        this.store.userIndex = { ...this.store.userIndex, user };
        // get users
      })
      .post("/api/login", ({ body }, res, next) => {
        console.log("login", body);
        const user = this.store.userIndex[body.username];
        console.log("Login", body, user);
        if (user.password == body.password) {
          send(res, 200);
        } else {
          send(res, 401);
        }
      });
  }

  defineSockets() {
    this.socketUserMap = {};

    this.sockets.on("connection", (socket) => {
      console.log("Connected =>", socket.id);

      socket.emit("state", { ...this.store });

      socket.on("disconnect", () => {
        // todo remove user from any active rooms.
        // filter out all the users
        const userId = this.socketUserMap[socket.id];
        console.log("Disonnected =>", socket.id, "userId:", userId);

        // iterate over all the rooms and remove userid...
        for (const [jamId, userIds] of Object.entries(this.store.jamRooms)) {
          this.store.jamRooms[jamId] = [
            ...userIds.filter((id) => id !== userId),
          ];
        }

        socket.emit("jamRoomsUpdated", this.store.jamRooms);
        socket.broadcast.emit("jamRoomsUpdated", this.store.jamRooms);
      });

      socket.on("createJam", (jam) => {
        const id = generateId();
        console.log("jam created", id);
        this.store.jamIndex[id] = {
          ...jam,
          id,
          createdAt: getUnix(),
          startedAt: null,
        };
        socket.emit("jamsUpdated", this.store.jamIndex);
        socket.broadcast.emit("jamsUpdated", this.store.jamIndex);
      });

      socket.on("startJam", (body) => {
        const jam = { ...this.store.jamIndex[body.id] };
        jam.startedAt = getUnix();
        console.log("Starting Jam", jam);
        this.store.jamIndex = { ...this.store.jamIndex, [body.id]: jam };
        socket.emit("jamsUpdated", this.store.jamIndex);
        socket.broadcast.emit("jamsUpdated", this.store.jamIndex);
        //
      });

      socket.on("addEntry", (entry) => {
        const id = `${entry.userId}-${entry.jamId}-${entry.title}`;
        const entryWithID = {
          ...entry,
          id,
        };
        const jamEntries = [
          ...(this.store.entriesByJam[entry.jamId] || []),
          entryWithID,
        ];
        this.store.entriesByJam[entry.jamId] = jamEntries;
        this.store.entryIndex[id] = entryWithID;

        console.log("Adding Entry", entry);
        const voteTokens = {
          ...this.store.voteTokensByUser[entry.userId],
          [entry.jamId]: true,
        };
        console.log("vote tokens updated for user", entry.userId, voteTokens);
        this.store.voteTokensByUser[entry.userId] = voteTokens;
        socket.emit(
          "voteTokensUpdated",
          this.store.voteTokensByUser[entry.userId]
        );

        socket.emit("entriesUpdated", this.store.entriesByJam);
        socket.broadcast.emit("entriesUpdated", this.store.entriesByJam);
      });

      socket.on("joinJamRoom", ({ userId, jamId }) => {
        socket.join(jamId);
        this.socketUserMap[socket.id] = userId;
        console.log("user", userId, "joined", jamId, "socketId", socket.id);
        // map socket users to user ids
        const room = this.store.jamRooms[jamId];
        this.store.jamRooms[jamId] = [...(room || []), userId];
        socket.emit("jamRoomsUpdated", this.store.jamRooms);
        socket.broadcast.emit("jamRoomsUpdated", this.store.jamRooms);
      });

      socket.on("leaveJamRoom", ({ userId, jamId }) => {
        console.log("user", userId, "left", jamId);
        const userIds = this.store.jamRooms[jamId] || [];
        this.store.jamRooms[jamId] = [...userIds.filter((id) => id !== userId)];
        socket.emit("jamRoomsUpdated", this.store.jamRooms);
        socket.broadcast.emit("jamRoomsUpdated", this.store.jamRooms);
      });

      socket.on("chat", (chat) => {
        const { jamId } = chat;
        console.log("new chat recieved", chat);
        const messages = this.store.chatLogs[jamId] || [];
        const message = { ...chat, createdAt: getUnix() };
        this.store.chatLogs[jamId] = [message, ...messages];

        socket.emit("chatUpdated", this.store.chatLogs);
        socket.broadcast.emit("chatUpdated", this.store.chatLogs);
      });

      socket.on("addVote", ({ entryId, userId }) => {
        console.log("vote has been cast!", entryId, userId);
        const jamId = this.store.entryIndex[entryId].jamId;

        this.store.votesIndex[entryId] = [
          ...(this.store.votesIndex[entryId] || []),
          userId,
        ];

        this.store.voteTokensByUser[userId][jamId] = false;
        socket.emit("voteTokensUpdated", this.store.voteTokensByUser[userId]);
        socket.emit("votesUpdated", this.store.votesIndex);
        socket.broadcast.emit("votesUpdated", this.store.votesIndex);
      });
    });
  }
}
