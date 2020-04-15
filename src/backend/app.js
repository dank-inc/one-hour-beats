import polka from "polka";
import sirv from "sirv";
import send from "@polka/send-type";
import { json } from "body-parser";
import * as sapper from "@sapper/server";
import compression from "compression";
import io from "socket.io";
import _ from "lodash";
import { getUnix } from "../utils/time";
import { generateId } from "../utils/faker";
// import models from "../../models";
const { Sequelize } = require("sequelize");

import { reduceEntriesByJam } from "../utils/viewHelpers";

export class App {
  constructor({ server, store, env, models }) {
    this.store = store;
    this.env = env;

    this.server = polka({ server });
    this.server.use(json());
    this.sockets = io(server);
    this.defineRoutes();
    this.defineSockets();

    this.db = new Sequelize("one_hour_beats", "ohb", "ohb", {
      dialect: "postgres",
    });
    this.initDB();
    this.initModels(models);
    console.log("MODELS", this.models);

    this.middleware();
    this.start();
  }

  middleware() {
    this.server.use(
      compression({ threshold: 0 }),
      sirv("static", { dev: this.env.NODE_ENV === "development" }),
      sapper.middleware()
    );
  }

  start() {
    this.server.listen(this.env.PORT, (err) => {
      if (err) console.log("error", err);
    });
  }

  initModels(models) {
    Object.keys(models).forEach((modelName) => {
      const model = models[modelName](this.db);
      this.db[modelName] = model;
      this.db[modelName].associate(this.db);
    });
  }

  async initDB() {
    try {
      await this.db.authenticate();
      console.log("database connected!");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }

  defineRoutes() {
    this.server
      .get("/api/jams/:id?", async ({ params }, res, next) => {
        if (!params.id) {
          send(res, 200, _.keyBy(await this.db.Jam.findAll(), "id"));
        } else {
          try {
            send(res, 200, await this.db.Jam.findOne({ id: params.id }));
          } catch {
            send(res, 404);
          }
        }
      })
      // post to /jams => create jam
      // put to /jams/:id => update jam
      .get("/api/entries/:jamId?", async ({ params }, res, next) => {
        const entriesByJam = reduceEntriesByJam(await this.db.Entry.findAll());
        if (params.jamId) {
          send(res, 200, entriesByJam[params.jamId]);
        } else {
          send(res, 200, entriesByJam);
        }
      })
      .get("/api/voteTokens/:userId", async ({ params }, res, next) => {
        const voteTokens = await this.db.VoteToken.findAll({
          userId: params.userId,
        });
        send(res, 200, _.keyBy(voteTokens, "userId"));
      })
      .get("/api/jamRooms", (req, res, next) => {
        send(res, 200, this.store.jamRooms); // participants? ephemeral?
      })
      .get("/api/chatLogs", (req, res, next) => {
        send(res, 200, this.store.chatLogs); // chats, todo add to db
      })
      .get("/api/votes", async (req, res, next) => {
        send(res, 200, await this.db.VoteToken.findAll());
      })
      .get("/api/users/:id?", async ({ params }, res, next) => {
        if (!params.id) {
          send(res, 200, await this.db.User.findAll());
        }
        try {
          send(res, 200, await this.db.User.findOne({ id: params.id }));
        } catch {
          send(res, 404);
        }
      })
      .post("/api/users", async ({ body }, res, next) => {
        try {
          const user = { ...body, thumbs: 0, wins: 0, id: body.username };
          await this.db.User.create(user);
          send(res, 200);
        } catch {
          send(res, 422);
        }
        // send socekts
      })
      .post("/api/login", async ({ body }, res, next) => {
        console.log("login", body);

        const user = await this.db.User.findOne({ username: body.username });

        console.log("Login", body, user);
        if (user && user.password == body.password) {
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

      socket.on("createJam", async (jam) => {
        const id = generateId();
        console.log("jam created", id);

        try {
          await this.db.Jam.create({
            ...jam,
            id,
            createdAt: getUnix(),
            startedAt: null,
          });

          const jamIndex = _.keyBy(await this.db.Jam.getAll(), "id");
          socket.emit("jamsUpdated", jamIndex);
          socket.broadcast.emit("jamsUpdated", jamIndex);
        } catch {
          console.error("Erro creating jam", jam);
        }
      });

      socket.on("startJam", async (body) => {
        await this.db.Jam.update(
          { startedAt: new Date() },
          { where: { id: body.id } }
        );

        console.log("Starting Jam", body.id);

        const jamIndex = _.keyBy(await this.db.Jam.getAll(), "id");
        socket.emit("jamsUpdated", jamIndex);
        socket.broadcast.emit("jamsUpdated", jamIndex);
        //
      });

      socket.on("addEntry", async (entry) => {
        const id = `${entry.userId}-${entry.jamId}-${entry.title}`;

        const entryWithID = {
          ...entry,
          id,
        };
        await this.db.Entry.create(entryWithID);
        await this.db.VoteToken.create({
          userId: entry.userId,
          jamId: entry.jamId,
        });
        const voteTokens = await this.db.VoteToken.findAll({
          userId: entry.userId,
        });
        socket.emit("voteTokensUpdated", _.keyBy(voteTokens, "jamId"));
        const entries = reduceEntriesByJam(await this.db.Entry.findAll());
        socket.emit("entriesUpdated", entries);
        socket.broadcast.emit("entriesUpdated", entries);
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
