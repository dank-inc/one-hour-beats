export const reduceEntriesByJam = (entries) => {
  const entriesByJam = {};
  for (let entry of entries) {
    entriesByJam[entry.jamId] = [...(entriesByJam[entry.jamId] || []), entry];
  }
  return entriesByJam;
};
