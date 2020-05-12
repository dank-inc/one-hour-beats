import { getUnix, getTimeLeft } from "./time";

export const getJamState = (jam) => {
  if (!jam.startedAt) return "Not Started";
  const currentTime = getUnix();
  return getTimeLeft(jam, currentTime) > 0 ? "Active" : "Finished";
};
