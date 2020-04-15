import http from "http";
const server = http.createServer();

// todo replace this with DB
import store from "./backend/datastore";
console.log("STORE", store);
import { App } from "./backend/app";

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

const app = new App({ server, store, env: { dev, port: PORT } });
