export const getUnix = (t) => parseInt(new Date() / 1000);
export const unixify = (ts) => Math.floor(new Date(ts) / 1000);

export const getTimeLeft = (jam, currentTime) =>
  currentTime - jam.startedAt + jam.timeLimit;
