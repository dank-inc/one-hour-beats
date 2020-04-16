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
import http from "http";

import { getVoteTokenIndex } from "../utils/viewHelpers";

const { Sequelize } = require("sequelize");

export class App {
  constructor({ env, models, logger }) {
    this.logger = logger;
    const server = http.createServer();
    this.store = { socketUserMap: {}, jamRooms: {}, chatLogs: {} };
    this.env = env;

    this.server = polka({ server });
    this.server.use(json());

    this.defineRoutes();

    this.db = new Sequelize("one_hour_beats", "ohb", "ohb", {
      dialect: "postgres",
      logging: false,
    });

    this.initDB();
    this.initModels(models);
    this.middleware();
    this.start();

    this.sockets = io(server);
    this.defineSockets();
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

    this.db.Entry.afterCreate(async ({ userId, jamId }) => {
      console.log("Creating Vote Token Automagically", userId, jamId);
      try {
        await this.db.VoteToken.create({ userId, jamId });
      } catch (err) {
        console.log("FAILED to create VoteToken!", err);
      }
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
        const entriesByJam = _.groupBy(await this.db.Entry.findAll(), "jamId");
        if (params.jamId) {
          send(res, 200, entriesByJam[params.jamId]);
        } else {
          send(res, 200, entriesByJam);
        }
      })
      .get("/api/voteTokens", async ({ params }, res, next) => {
        try {
          const tokens = await this.db.VoteToken.findAll();
          // send(res, 200, tokens);
          const voteIndex = getVoteTokenIndex(tokens);
          send(res, 200, voteIndex);
        } catch (err) {
          send(res, 500, { message: "wtf", err });
        }
      })
      .get("/api/jamRooms", (req, res, next) => {
        send(res, 200, this.store.jamRooms); // participants? ephemeral?
      })
      .get("/api/chatLogs", (req, res, next) => {
        send(res, 200, this.store.chatLogs); // chats, todo add to db
      })
      .get("/api/votes/:jamId?", async ({ params }, res, next) => {
        try {
          if (params.jamId) {
          } else {
            const votes = _.groupBy(
              await this.db.VoteToken.findAll(),
              "entryId"
            );
            send(res, 200, votes);
          }
        } catch (err) {
          console.error("Error getting votes:", err);
          send(res, 404);
        }
      })
      .get("/api/users/:id?", async ({ params }, res, next) => {
        if (!params.id) {
          send(res, 200, await this.db.User.findAll());
        } else {
          try {
            const user = await this.db.User.findOne({
              where: { id: params.id },
            });
            if (user) {
              send(res, 200, user);
            } else {
              send(res, 404);
            }
          } catch {
            send(res, 404);
          }
        }
      })
      .post("/api/users", async ({ body }, res, next) => {
        try {
          console.log("CREATING UESR", body);
          const user = {
            ...body,
            thumbs: 0,
            wins: 0,
            id: body.id,
          };
          await this.db.User.create(user);
          send(res, 200);
        } catch {
          send(res, 422);
        }
        // send socekts
      })
      .post("/api/login", async ({ body }, res, next) => {
        console.log("login", body.username);
        const user = await this.db.User.findOne({
          where: { username: body.username },
        });
        if (user && user.password == body.password) {
          send(res, 200);
        } else {
          send(res, 401);
        }
      });
  }

  defineSockets() {
    console.log("making el sockets");
    this.sockets.on("connection", (socket) => {
      console.log("Connected =>", socket.id);

      socket.emit("state", { ...this.store });

      socket.on("disconnect", () => {
        // todo remove user from any active rooms.
        // filter out all the users
        const userId = this.store.socketUserMap[socket.id];
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

        try {
          const created = await this.db.Jam.create({
            ...jam,
            id,
            createdAt: getUnix(),
            startedAt: null,
          });
          console.log(">> jam created =>", id);

          const jamIndex = _.keyBy(await this.db.Jam.findAll(), "id");
          socket.emit("jamsUpdated", jamIndex);
          socket.broadcast.emit("jamsUpdated", jamIndex);
        } catch (err) {
          console.error("Erro creating jam", err);
        }
      });

      socket.on("startJam", async (body) => {
        try {
          const created = await this.db.Jam.update(
            { startedAt: new Date() },
            { where: { id: body.id } }
          );

          console.log("Started Jam", body.id, created);

          const jamIndex = _.keyBy(await this.db.Jam.findAll(), "id");
          socket.emit("jamsUpdated", jamIndex);
          socket.broadcast.emit("jamsUpdated", jamIndex);
        } catch {
          console.error("Could not start jam!", body);
        }

        //
      });

      socket.on("addEntry", async (entry) => {
        const id = `${entry.userId}-${entry.jamId}-${entry.title}`;

        const entryWithID = {
          ...entry,
          id,
        };
        try {
          await this.db.Entry.create(entryWithID);
          console.log("entry added!", id);

          const voteTokens = await this.db.VoteToken.findAll();
          socket.emit("voteTokensUpdated", getVoteTokenIndex(voteTokens));

          const entries = _.groupBy(await this.db.Entry.findAll(), "jamId");
          socket.emit("entriesUpdated", entries);
          socket.broadcast.emit("entriesUpdated", entries);
        } catch (err) {
          console.error("something happened while creating entry", err);
        }
      });

      socket.on("addVote", async ({ entryId, userId }) => {
        try {
          const { jamId } = await this.db.Entry.findOne({
            where: { id: entryId },
          });

          console.log("casting vote!", jamId, entryId, userId);
          await this.db.VoteToken.update(
            { entryId },
            { where: { userId, jamId } }
          );

          const votes = await this.db.VoteToken.findAll();

          // group by user
          const voteIndex = getVoteTokenIndex(votes);
          socket.emit("voteTokensUpdated", voteIndex);

          const votesByEntry = _.groupBy(votes, "entryId");
          socket.emit("votesUpdated", votesByEntry);
          socket.broadcast.emit("votesUpdated", votesByEntry);
        } catch (err) {
          console.log("error casting vote", err);
        }
      });

      socket.on("joinJamRoom", ({ userId, jamId }) => {
        // ephemeral
        this.store.socketUserMap[socket.id] = userId;
        console.log("user", userId, "joined", jamId, "socketId", socket.id);
        // map socket users to user ids
        const room = this.store.jamRooms[jamId];
        this.store.jamRooms[jamId] = [...(room || []), userId];
        socket.emit("jamRoomsUpdated", this.store.jamRooms);
        socket.broadcast.emit("jamRoomsUpdated", this.store.jamRooms);
      });

      socket.on("leaveJamRoom", ({ userId, jamId }) => {
        // ephemeral
        console.log("user", userId, "left", jamId);
        const userIds = this.store.jamRooms[jamId] || [];
        this.store.jamRooms[jamId] = [...userIds.filter((id) => id !== userId)];
        socket.emit("jamRoomsUpdated", this.store.jamRooms);
        socket.broadcast.emit("jamRoomsUpdated", this.store.jamRooms);
      });

      socket.on("chat", (chat) => {
        // ephemeral
        const { jamId } = chat;
        console.log("new chat recieved", chat);
        const messages = this.store.chatLogs[jamId] || [];
        const message = { ...chat, createdAt: getUnix() };
        this.store.chatLogs[jamId] = [message, ...messages];

        socket.emit("chatUpdated", this.store.chatLogs);
        socket.broadcast.emit("chatUpdated", this.store.chatLogs);
      });
    });
  }
}
