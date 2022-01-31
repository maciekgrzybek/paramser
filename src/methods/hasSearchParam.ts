export const hasSearchParam = (search: string, key: string): boolean =>
  new URLSearchParams(search).has(key);
