import { AmendOptions, GetOptions } from '../types';

export const isNumeric = (n: any): boolean =>
  !isNaN(parseFloat(n)) && isFinite(n);
export const isBoolean = (n: any): boolean => n === 'true' || n === 'false';

export const parseValue = (param: any, options?: GetOptions) => {
  if (options?.parseNumbers && isNumeric(param)) {
    return Number(param);
  }
  if (options?.parseBooleans && isBoolean(param)) {
    return param === 'true';
  }
  return param;
};

export const amendSearchParams = ({
  search,
  params,
  config,
}: AmendOptions): string => {
  const startingParams = new URLSearchParams(search || '');
  for (let index in params) {
    if (Array.isArray(params[index])) {
      switch (config?.arrayType) {
        case 'separator':
          let mergedValue = params[index]
            .map((element: string) => element)
            .join(config?.separator || '|');
          startingParams.append(index, mergedValue);
          break;
        case 'bracket':
          params[index].forEach((element: string) => {
            startingParams.append(`${index}[]`, element);
          });
          break;
        case 'indexedBracket':
          params[index].forEach((element: string, i: number) => {
            startingParams.append(`${index}[${i}]`, element);
          });
          break;
        default:
          params[index].forEach((element: string) => {
            startingParams.append(index, element);
          });
      }
    } else {
      startingParams.append(index, params[index]);
    }
  }
  return decodeURIComponent(startingParams.toString());
};
