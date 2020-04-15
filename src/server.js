import http from "http";
const server = http.createServer();

// todo replace this with DB
import store from "./backend/datastore";
import { App } from "./backend/app";

const env = require("dotenv").config().parsed;

// console.log("ENV =>", env);

const app = new App({ server, store, env });
