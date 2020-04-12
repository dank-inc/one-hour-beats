import { getUnix } from "../utils/time";

export default [
  {
    id: "dank-rhinos",
    name: "first one hour beat!",
    description: "make a beat within the hour! anything goes!",
    timeLimit: 3600,
    startedAt: getUnix() - 1800,
  },
  {
    id: "cool-unicorns",
    name: "a new ohb",
    description: "make a song with only human noises!",
    timeLimit: 3600,
    startedAt: null,
  },
];
