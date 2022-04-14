export const hasParam = (search: string, key: string): boolean =>
  new URLSearchParams(search).has(key);
