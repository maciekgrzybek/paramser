export const excludeParam = (
  search: string,
  keys: string | string[]
): string => {
  const startingParams = new URLSearchParams(search);

  if (Array.isArray(keys)) {
    keys.forEach((key) => {
      startingParams.delete(key);
    });
  } else {
    startingParams.delete(keys);
  }

  return startingParams.toString();
};
