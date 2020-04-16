export const getVoteTokenIndex = (tokens) => {
  const index = {};
  for (const token of tokens) {
    index[token.userId] = {
      ...index[token.userId],
      [token.jamId]: token.jamId ? !token.entryId : false,
    };
  }
  return index;
};
