import User from "../models/user";
import Jam from "../models/jam";
import Entry from "../models/entry";
import VoteToken from "../models/votetoken";
// import logger from "winston";

const models = {
  User,
  Jam,
  Entry,
  VoteToken,
};

import { App } from "./backend/app";

const env = require("dotenv").config().parsed;

const app = new App({ env, models });
