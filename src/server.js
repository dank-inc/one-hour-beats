import User from "../models/user";
import Jam from "../models/jam";
import Entry from "../models/entry";
import VoteToken from "../models/votetoken";

import http from "http";
const server = http.createServer();

const models = {
  User,
  Jam,
  Entry,
  VoteToken,
};

// todo replace this with DB
import store from "./backend/datastore";
import { App } from "./backend/app";

const env = require("dotenv").config().parsed;

// console.log("ENV =>", env);

const app = new App({ server, store, env, models });
