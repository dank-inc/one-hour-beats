export const getUnix = (t) => {
  return parseInt(new Date() / 1000);
};

export const getTimeLeft = (jam, currentTime) =>
  currentTime - jam.startedAt + jam.timeLimit;
