import { parseValue } from './shared';
import { GetAllOptions } from '../types';

export const getAllSearchParams = (
  search: string,
  options?: GetAllOptions
): Record<string, any> | string[] => {
  if (options?.keysOnly) {
    return Array.from(new URLSearchParams(search).keys());
  } else if (options?.valuesOnly) {
    return Array.from(new URLSearchParams(search).values()).map((singleParam) =>
      parseValue(singleParam, options)
    );
  }
  return Array.from(new URLSearchParams(search).entries()).reduce(
    (returnObj, entry: string[]) => {
      returnObj[entry[0]] = parseValue(entry[1], options);
      return returnObj;
    },
    {}
  );
};
