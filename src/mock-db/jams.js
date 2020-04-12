import { getUnix } from "../utils/time";

export default [
  {
    id: "dank-rhinos",
    name: "first one hour beat!",
    description: "make a beat within the hour! anything goes!",
    createdAt: getUnix() - 3600,
    timeLimit: 3600,
    startedAt: getUnix() - 1800,
  },
  {
    id: "cool-unicorns",
    name: "a new ohb",
    description: "make a sketch with only human noises!",
    createdAt: getUnix() - 3600,
    timeLimit: 3600,
    startedAt: null,
  },
];
