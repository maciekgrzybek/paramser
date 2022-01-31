export const pickSearchParam = (
  search: string,
  keys: string | string[]
): string => {
  const startingParams = new URLSearchParams(search);
  const entries: string[][] = Array.from(startingParams.entries());

  entries.forEach((entry: string[]) => {
    if (Array.isArray(keys)) {
      if (!keys.includes(entry[0])) {
        startingParams.delete(entry[0]);
      }
    } else {
      if (keys !== entry[0]) {
        startingParams.delete(entry[0]);
      }
    }
  });
  return startingParams.toString();
};
