import { getUnix } from "../utils/time";
import { generateId } from "../utils/faker";

export const initializeSockets = (io, server, app) => {
  // socket-id => user-id
  const socketUserMap = {};

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
      const id = `${entry.userId}-${entry.jamId}-${entry.title}`;
      const entryWithID = {
        ...entry,
        id,
      };
      const jamEntries = [
        ...(app.store.entriesByJam[entry.jamId] || []),
        entryWithID,
      ];
      app.store.entriesByJam[entry.jamId] = jamEntries;
      app.store.entryIndex[id] = entryWithID;

      console.log("Adding Entry", entry);
      const voteTokens = {
        ...app.store.voteTokensByUser[entry.userId],
        [entry.jamId]: true,
      };
      console.log("vote tokens updated for user", entry.userId, voteTokens);
      app.store.voteTokensByUser[entry.userId] = voteTokens;
      socket.emit(
        "voteTokensUpdated",
        app.store.voteTokensByUser[entry.userId]
      );

      socket.emit("entriesUpdated", app.store.entriesByJam);
      socket.broadcast.emit("entriesUpdated", app.store.entriesByJam);
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
      const jamId = app.store.entryIndex[entryId].jamId;

      app.store.votesIndex[entryId] = [
        ...(app.store.votesIndex[entryId] || []),
        userId,
      ];

      app.store.voteTokensByUser[userId][jamId] = false;
      socket.emit("voteTokensUpdated", app.store.voteTokensByUser[userId]);
      socket.emit("votesUpdated", app.store.votesIndex);
      socket.broadcast.emit("votesUpdated", app.store.votesIndex);
    });
  });
};
