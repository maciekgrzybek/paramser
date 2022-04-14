import { parseValue } from './shared';
import { GetOptions } from '../types';

export const getParam = (
  search: string,
  key: string,
  options?: GetOptions
): string | number | boolean | (string | number | boolean)[] | null => {
  const params = new URLSearchParams(search).getAll(key);
  if (params.length === 0) {
    return null;
  }
  if (params.length === 1) {
    return parseValue(params[0], options);
  }
  return params.map((singleParam) => parseValue(singleParam, options));
};
